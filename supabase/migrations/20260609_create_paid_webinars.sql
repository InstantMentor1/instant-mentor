begin;

create table if not exists public.webinars (
  id uuid primary key default gen_random_uuid(),
  mentor_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  technical_track text not null,
  scheduled_at timestamptz not null,
  meeting_link text,
  price numeric(10,2) not null check (price between 149 and 249),
  duration_minutes integer not null default 60 check (duration_minutes = 60),
  max_participants integer not null default 100 check (max_participants between 1 and 100),
  status text not null default 'upcoming' check (status in ('upcoming', 'live', 'completed', 'cancelled')),
  access_type text not null default 'regular' check (access_type in ('regular', 'premium')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.webinar_registrations (
  id uuid primary key default gen_random_uuid(),
  webinar_id uuid not null references public.webinars(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  original_price numeric(10,2) not null,
  final_price numeric(10,2) not null,
  discount_applied numeric(10,2) not null default 0,
  plan_name text not null,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'cancelled', 'refunded')),
  registered_at timestamptz not null default now(),
  unique(webinar_id, student_id)
);

create index if not exists webinars_mentor_idx on public.webinars(mentor_id, scheduled_at);
create index if not exists webinar_registrations_student_idx on public.webinar_registrations(student_id);

alter table public.mentor_earnings
  add column if not exists webinar_registration_id uuid references public.webinar_registrations(id) on delete set null;
do $$
declare
  constraint_name text;
begin
  for constraint_name in
    select conname
    from pg_constraint
    where conrelid = 'public.mentor_earnings'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) ilike '%session_id%'
      and pg_get_constraintdef(oid) ilike '%masterclass_id%'
  loop
    execute format('alter table public.mentor_earnings drop constraint %I', constraint_name);
  end loop;
end
$$;
alter table public.mentor_earnings drop constraint if exists mentor_earnings_source_check;
alter table public.mentor_earnings add constraint mentor_earnings_source_check
  check (session_id is not null or masterclass_id is not null or webinar_registration_id is not null);
create unique index if not exists mentor_earnings_webinar_registration_unique
  on public.mentor_earnings(webinar_registration_id) where webinar_registration_id is not null;

drop trigger if exists webinars_set_updated_at on public.webinars;
create trigger webinars_set_updated_at before update on public.webinars
for each row execute procedure public.set_updated_at();

alter table public.webinars enable row level security;
alter table public.webinar_registrations enable row level security;

create policy "webinars_authenticated_read"
on public.webinars for select to authenticated
using (true);

create policy "mentors_manage_own_webinars"
on public.webinars for all to authenticated
using (mentor_id = auth.uid() or public.current_user_role() = 'Admin')
with check (
  (mentor_id = auth.uid() and public.current_user_role() in ('Mentor', 'Faculty'))
  or public.current_user_role() = 'Admin'
);

create policy "webinar_registrations_own_mentor_admin_read"
on public.webinar_registrations for select to authenticated
using (
  student_id = auth.uid()
  or public.current_user_role() = 'Admin'
  or exists (
    select 1 from public.webinars w
    where w.id = webinar_id and w.mentor_id = auth.uid()
  )
);

revoke select on public.webinars from authenticated;
grant select (
  id, mentor_id, title, description, technical_track, scheduled_at, price,
  duration_minutes, max_participants, status, access_type, created_at, updated_at
) on public.webinars to authenticated;
grant select on public.webinar_registrations to authenticated;
grant insert, update, delete on public.webinars to authenticated;
grant all privileges on public.webinars, public.webinar_registrations to service_role;

insert into public.commission_rules (service_type, platform_commission_percent, mentor_payout_percent)
values ('Webinar', 20, 80)
on conflict (service_type) do update set
  platform_commission_percent = 20,
  mentor_payout_percent = 80;

update public.plans set features = array[
  'One doubt-solving session',
  'Pre-session chat access',
  'Mentor acceptance based on expertise'
] where name = 'Single Session';

update public.plans set features = array[
  '5 doubt-solving sessions/month',
  'Pre-session chat access',
  'Mentor-reviewed requests',
  'Community access'
] where name = 'Launch Offer';

update public.plans set features = array[
  '5 doubt-solving sessions/month',
  'Pre-session chat access',
  'Mentor-reviewed requests',
  'Community access',
  'Selected webinars at ₹99'
] where name = 'Regular Plan';

update public.plans set features = array[
  '10 doubt-solving sessions/month',
  'Any webinar at ₹79',
  'Resume/interview support',
  'Career roadmap support',
  'Priority mentor access',
  'Pre-session chat access'
] where name = 'Premium Plan';

notify pgrst, 'reload schema';
commit;
