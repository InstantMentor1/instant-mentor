begin;

alter table public.profiles add column if not exists verification_status text not null default 'pending';
alter table public.profiles add column if not exists email_verified boolean not null default false;
alter table public.profiles add column if not exists updated_at timestamptz not null default now();
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('Student', 'Mentor', 'Faculty', 'Institution', 'Admin'));

alter table public.mentor_profiles add column if not exists profile_id uuid references public.profiles(id) on delete cascade;
alter table public.mentor_profiles add column if not exists expertise text[] not null default '{}';
alter table public.mentor_profiles add column if not exists experience_years integer;
alter table public.mentor_profiles add column if not exists hourly_rate numeric(10,2);
alter table public.mentor_profiles add column if not exists payout_method text;
alter table public.mentor_profiles add column if not exists total_earnings numeric(12,2) not null default 0;
alter table public.mentor_profiles add column if not exists updated_at timestamptz not null default now();
update public.mentor_profiles mp
set profile_id = p.id,
    expertise = case when cardinality(mp.expertise) = 0 then mp.expertise_areas else mp.expertise end
from public.profiles p
where p.user_id = mp.user_id and mp.profile_id is null;
create unique index if not exists mentor_profiles_profile_id_unique
  on public.mentor_profiles(profile_id) where profile_id is not null;

alter table public.session_requests add column if not exists attachment_link text;
alter table public.session_requests add column if not exists updated_at timestamptz not null default now();
alter table public.session_requests drop constraint if exists session_requests_status_check;
alter table public.session_requests add constraint session_requests_status_check
  check (status in ('pending', 'assigned', 'accepted', 'rejected', 'scheduled', 'completed', 'cancelled'));
alter table public.session_requests add constraint session_requests_session_type_check
  check (session_type in (
    'Doubt-solving',
    'Masterclass',
    'Career guidance',
    'Resume/interview support',
    'Career roadmap support'
  )) not valid;

create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  price numeric(10,2) not null,
  billing_period text not null check (billing_period in ('monthly', 'one_time')),
  session_credits integer not null check (session_credits > 0),
  min_purchase_months integer not null default 1 check (min_purchase_months >= 0),
  features text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.plans (name, price, billing_period, session_credits, min_purchase_months, features)
values
  ('Launch Offer', 299, 'monthly', 5, 6, array[
    '5 doubt-solving sessions/month',
    'Pre-session chat access',
    'Mentor-reviewed session requests',
    'Community access'
  ]),
  ('Regular Plan', 399, 'monthly', 5, 1, array[
    '5 doubt-solving sessions/month',
    'Pre-session chat access',
    'Mentor-reviewed session requests',
    'Community access',
    'Selected masterclasses'
  ]),
  ('Premium Plan', 999, 'monthly', 10, 1, array[
    '10 doubt-solving sessions/month',
    'Access to all masterclasses',
    'Resume/interview support',
    'Career roadmap support',
    'Priority mentor access',
    'Pre-session chat access'
  ]),
  ('Single Session', 69, 'one_time', 1, 0, array[
    'One doubt-solving session',
    'Pre-session chat access',
    'Mentor acceptance based on expertise'
  ])
on conflict (name) do update set
  price = excluded.price,
  billing_period = excluded.billing_period,
  session_credits = excluded.session_credits,
  min_purchase_months = excluded.min_purchase_months,
  features = excluded.features,
  is_active = true;

create table if not exists public.user_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id uuid not null references public.plans(id),
  status text not null default 'pending' check (status in ('pending', 'active', 'expired', 'cancelled')),
  start_date timestamptz not null default now(),
  end_date timestamptz,
  session_credits_total integer not null,
  session_credits_used integer not null default 0 check (session_credits_used >= 0),
  created_at timestamptz not null default now()
);
create index if not exists user_subscriptions_user_idx on public.user_subscriptions(user_id, status);

create table if not exists public.masterclasses (
  id uuid primary key default gen_random_uuid(),
  mentor_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  technical_track text,
  scheduled_at timestamptz,
  meeting_link text,
  price numeric(10,2) not null default 0,
  status text not null default 'upcoming' check (status in ('draft', 'upcoming', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.masterclass_registrations (
  id uuid primary key default gen_random_uuid(),
  masterclass_id uuid not null references public.masterclasses(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(masterclass_id, student_id)
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id uuid references public.plans(id),
  session_id uuid references public.session_requests(id),
  amount numeric(10,2) not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  payment_method text,
  payment_reference text,
  created_at timestamptz not null default now()
);

create table if not exists public.commission_rules (
  id uuid primary key default gen_random_uuid(),
  service_type text not null unique,
  platform_commission_percent numeric(5,2) not null,
  mentor_payout_percent numeric(5,2) not null,
  check (platform_commission_percent + mentor_payout_percent = 100)
);

insert into public.commission_rules (service_type, platform_commission_percent, mentor_payout_percent)
values
  ('Doubt-solving', 10, 90),
  ('Masterclass', 20, 80),
  ('Career guidance', 20, 80),
  ('Resume/interview support', 25, 75),
  ('Career roadmap support', 25, 75)
on conflict (service_type) do update set
  platform_commission_percent = excluded.platform_commission_percent,
  mentor_payout_percent = excluded.mentor_payout_percent;

create table if not exists public.mentor_earnings (
  id uuid primary key default gen_random_uuid(),
  mentor_id uuid not null references auth.users(id) on delete cascade,
  session_id uuid references public.session_requests(id),
  masterclass_id uuid references public.masterclasses(id),
  service_type text not null,
  gross_amount numeric(10,2) not null,
  platform_commission numeric(10,2) not null,
  mentor_payout numeric(10,2) not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'paid')),
  created_at timestamptz not null default now(),
  check (session_id is not null or masterclass_id is not null)
);
create unique index if not exists mentor_earnings_session_unique
  on public.mentor_earnings(session_id) where session_id is not null;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute procedure public.set_updated_at();
drop trigger if exists mentor_profiles_set_updated_at on public.mentor_profiles;
create trigger mentor_profiles_set_updated_at before update on public.mentor_profiles
for each row execute procedure public.set_updated_at();
drop trigger if exists session_requests_set_updated_at on public.session_requests;
create trigger session_requests_set_updated_at before update on public.session_requests
for each row execute procedure public.set_updated_at();

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_role text;
  created_profile_id uuid;
  expertise_values text[];
begin
  requested_role := case
    when new.raw_user_meta_data->>'role' in ('Student', 'Mentor', 'Faculty', 'Institution')
      then new.raw_user_meta_data->>'role'
    else 'Student'
  end;

  insert into public.profiles (
    user_id, full_name, email, phone, role, college_or_company,
    technical_track, linkedin_or_portfolio, email_verified
  ) values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'full_name', ''), split_part(new.email, '@', 1)),
    lower(new.email),
    nullif(new.raw_user_meta_data->>'phone', ''),
    requested_role,
    nullif(new.raw_user_meta_data->>'college_or_company', ''),
    nullif(new.raw_user_meta_data->>'technical_track', ''),
    nullif(new.raw_user_meta_data->>'linkedin_or_portfolio', ''),
    new.email_confirmed_at is not null
  )
  returning id into created_profile_id;

  if jsonb_typeof(new.raw_user_meta_data->'expertise_areas') = 'array' then
    select coalesce(array_agg(value), '{}') into expertise_values
    from jsonb_array_elements_text(new.raw_user_meta_data->'expertise_areas');
  else
    expertise_values := array[new.raw_user_meta_data->>'technical_track'];
  end if;

  if requested_role in ('Mentor', 'Faculty') then
    insert into public.mentor_profiles (user_id, profile_id, expertise_areas, expertise)
    values (new.id, created_profile_id, expertise_values, expertise_values);
  end if;
  return new;
end;
$$;

alter table public.plans enable row level security;
alter table public.user_subscriptions enable row level security;
alter table public.masterclasses enable row level security;
alter table public.masterclass_registrations enable row level security;
alter table public.payments enable row level security;
alter table public.commission_rules enable row level security;
alter table public.mentor_earnings enable row level security;

drop policy if exists "mentor_profiles_select_authenticated" on public.mentor_profiles;
create policy "mentor_profiles_read_eligible"
on public.mentor_profiles for select to authenticated
using (
  user_id = auth.uid()
  or public.current_user_role() = 'Admin'
  or verification_status = 'verified'
);

drop policy if exists "sessions_select_participants_or_admin" on public.session_requests;
create policy "sessions_read_participants_or_admin"
on public.session_requests for select to authenticated
using (
  student_id = auth.uid()
  or mentor_id = auth.uid()
  or public.current_user_role() = 'Admin'
);

drop policy if exists "mentors_update_assigned_sessions" on public.session_requests;
create policy "mentors_update_assigned_sessions"
on public.session_requests for update to authenticated
using (mentor_id = auth.uid() and public.current_user_role() in ('Mentor', 'Faculty'))
with check (mentor_id = auth.uid());

create policy "plans_public_read"
on public.plans for select to anon, authenticated
using (is_active = true or public.current_user_role() = 'Admin');

create policy "subscriptions_own_or_admin"
on public.user_subscriptions for select to authenticated
using (user_id = auth.uid() or public.current_user_role() = 'Admin');

create policy "masterclasses_authenticated_read"
on public.masterclasses for select to authenticated
using (
  status = 'upcoming'
  or mentor_id = auth.uid()
  or public.current_user_role() = 'Admin'
);
create policy "mentors_manage_own_masterclasses"
on public.masterclasses for all to authenticated
using (mentor_id = auth.uid() or public.current_user_role() = 'Admin')
with check (
  (mentor_id = auth.uid() and public.current_user_role() in ('Mentor', 'Faculty'))
  or public.current_user_role() = 'Admin'
);

create policy "registrations_own_or_admin"
on public.masterclass_registrations for select to authenticated
using (student_id = auth.uid() or public.current_user_role() = 'Admin');
create policy "students_register_masterclasses"
on public.masterclass_registrations for insert to authenticated
with check (student_id = auth.uid() and public.current_user_role() = 'Student');

create policy "payments_own_or_admin"
on public.payments for select to authenticated
using (user_id = auth.uid() or public.current_user_role() = 'Admin');

create policy "commission_rules_authenticated_read"
on public.commission_rules for select to authenticated using (true);

create policy "earnings_mentor_or_admin"
on public.mentor_earnings for select to authenticated
using (mentor_id = auth.uid() or public.current_user_role() = 'Admin');

grant select on public.plans to anon, authenticated;
grant select on public.commission_rules to authenticated;
grant select on public.user_subscriptions, public.masterclasses, public.masterclass_registrations,
  public.payments, public.mentor_earnings to authenticated;
grant insert on public.masterclasses, public.masterclass_registrations to authenticated;
grant update, delete on public.masterclasses to authenticated;
grant all privileges on public.plans, public.user_subscriptions, public.masterclasses,
  public.masterclass_registrations, public.payments, public.commission_rules,
  public.mentor_earnings to service_role;

notify pgrst, 'reload schema';
commit;
