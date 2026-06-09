create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  phone text,
  role text not null check (role in ('Student', 'Mentor', 'Admin')),
  college_or_company text,
  technical_track text,
  linkedin_or_portfolio text,
  created_at timestamptz not null default now()
);

create table if not exists public.mentor_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  expertise_areas text[] not null default '{}',
  bio text,
  verification_status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.session_requests (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  mentor_id uuid references auth.users(id) on delete set null,
  technical_track text not null,
  session_type text not null,
  title text not null,
  description text not null,
  preferred_date date not null,
  preferred_time text not null,
  status text not null default 'pending' check (
    status in ('pending', 'accepted', 'rejected', 'scheduled', 'completed', 'cancelled')
  ),
  meeting_link text,
  scheduled_at timestamptz,
  rejection_reason text,
  price numeric(10,2) not null default 0,
  platform_commission_percent numeric(5,2) not null default 20,
  mentor_payout_percent numeric(5,2) not null default 80,
  created_at timestamptz not null default now()
);

create table if not exists public.session_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.session_requests(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  sender_role text not null check (sender_role in ('Student', 'Mentor', 'Admin')),
  message text not null check (length(trim(message)) > 0),
  created_at timestamptz not null default now()
);

create index if not exists session_requests_student_idx on public.session_requests(student_id);
create index if not exists session_requests_mentor_idx on public.session_requests(mentor_id);
create index if not exists session_requests_status_idx on public.session_requests(status);
create index if not exists session_messages_session_idx on public.session_messages(session_id, created_at);

create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where user_id = auth.uid() limit 1
$$;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_role text;
begin
  requested_role := case
    when new.raw_user_meta_data->>'role' in ('Student', 'Mentor')
      then new.raw_user_meta_data->>'role'
    else 'Student'
  end;

  insert into public.profiles (
    user_id, full_name, email, phone, role, college_or_company,
    technical_track, linkedin_or_portfolio
  ) values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    lower(new.email),
    nullif(new.raw_user_meta_data->>'phone', ''),
    requested_role,
    nullif(new.raw_user_meta_data->>'college_or_company', ''),
    nullif(new.raw_user_meta_data->>'technical_track', ''),
    nullif(new.raw_user_meta_data->>'linkedin_or_portfolio', '')
  );

  if requested_role = 'Mentor' then
    insert into public.mentor_profiles (user_id, expertise_areas)
    values (
      new.id,
      case
        when nullif(new.raw_user_meta_data->>'technical_track', '') is null then '{}'
        else array[new.raw_user_meta_data->>'technical_track']
      end
    );
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_auth_user();

alter table public.profiles enable row level security;
alter table public.mentor_profiles enable row level security;
alter table public.session_requests enable row level security;
alter table public.session_messages enable row level security;

create policy "profiles_select_own_or_admin"
on public.profiles for select
using (user_id = auth.uid() or public.current_user_role() = 'Admin');

create policy "profiles_update_own_or_admin"
on public.profiles for update
using (user_id = auth.uid() or public.current_user_role() = 'Admin')
with check (user_id = auth.uid() or public.current_user_role() = 'Admin');

create policy "mentor_profiles_select_authenticated"
on public.mentor_profiles for select to authenticated
using (true);

create policy "mentor_profiles_update_own_or_admin"
on public.mentor_profiles for update
using (user_id = auth.uid() or public.current_user_role() = 'Admin');

create policy "sessions_select_participants_or_admin"
on public.session_requests for select
using (
  student_id = auth.uid()
  or mentor_id = auth.uid()
  or public.current_user_role() = 'Admin'
);

create policy "students_create_own_sessions"
on public.session_requests for insert
with check (
  student_id = auth.uid()
  and public.current_user_role() = 'Student'
  and mentor_id is null
  and status = 'pending'
  and meeting_link is null
);

create policy "mentors_update_assigned_sessions"
on public.session_requests for update
using (
  mentor_id = auth.uid()
  and public.current_user_role() = 'Mentor'
)
with check (mentor_id = auth.uid());

create policy "admins_manage_all_sessions"
on public.session_requests for all
using (public.current_user_role() = 'Admin')
with check (public.current_user_role() = 'Admin');

create policy "messages_select_session_participants"
on public.session_messages for select
using (
  public.current_user_role() = 'Admin'
  or exists (
    select 1 from public.session_requests s
    where s.id = session_id
      and (s.student_id = auth.uid() or s.mentor_id = auth.uid())
  )
);

create policy "messages_insert_session_participants"
on public.session_messages for insert
with check (
  sender_id = auth.uid()
  and (
    public.current_user_role() = 'Admin'
    or exists (
      select 1 from public.session_requests s
      where s.id = session_id
        and (s.student_id = auth.uid() or s.mentor_id = auth.uid())
    )
  )
);

grant usage on schema public to authenticated, service_role;
grant select, insert, update on public.profiles to authenticated;
grant select, update on public.mentor_profiles to authenticated;
grant select, insert, update on public.session_requests to authenticated;
grant select, insert on public.session_messages to authenticated;
grant all on public.profiles, public.mentor_profiles, public.session_requests, public.session_messages to service_role;

notify pgrst, 'reload schema';
