alter table public.profiles
  add column if not exists user_type text,
  add column if not exists strikes integer not null default 0,
  add column if not exists account_status text not null default 'active';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_user_type_check'
  ) then
    alter table public.profiles
      add constraint profiles_user_type_check
      check (
        user_type is null
        or user_type in (
          'Undergraduate',
          'Postgraduate',
          'MBA',
          'PhD',
          'Research Scholar',
          'Recent Graduate'
        )
      );
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'profiles_strikes_non_negative'
  ) then
    alter table public.profiles
      add constraint profiles_strikes_non_negative
      check (strikes >= 0);
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'profiles_account_status_check'
  ) then
    alter table public.profiles
      add constraint profiles_account_status_check
      check (account_status in ('active', 'disabled'));
  end if;
end $$;

alter table public.mentor_profiles
  add column if not exists is_verified boolean not null default false,
  add column if not exists years_experience integer,
  add column if not exists location text;

alter table public.service_bookings
  add column if not exists booking_intent jsonb,
  add column if not exists deposit_acknowledged boolean not null default false,
  add column if not exists strike_applied_at timestamp with time zone;
