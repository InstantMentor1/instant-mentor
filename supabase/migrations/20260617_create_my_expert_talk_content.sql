create table if not exists public.expert_talks (
  id uuid primary key default gen_random_uuid(),
  mentor_id uuid references auth.users(id) on delete set null,
  title text not null,
  category text not null,
  description text,
  scheduled_at timestamp with time zone,
  duration_minutes integer default 60,
  speaker_name text,
  format text default 'live',
  status text default 'draft',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists public.recordings (
  id uuid primary key default gen_random_uuid(),
  mentor_id uuid references auth.users(id) on delete set null,
  title text not null,
  category text not null,
  description text,
  recording_url text,
  status text default 'draft',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'expert_talks_status_check'
  ) then
    alter table public.expert_talks
      add constraint expert_talks_status_check
      check (status in ('draft', 'upcoming', 'live', 'recorded', 'cancelled'));
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'expert_talks_format_check'
  ) then
    alter table public.expert_talks
      add constraint expert_talks_format_check
      check (format in ('live', 'online', 'recorded'));
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'recordings_status_check'
  ) then
    alter table public.recordings
      add constraint recordings_status_check
      check (status in ('draft', 'published', 'archived'));
  end if;
end $$;

alter table public.expert_talks enable row level security;
alter table public.recordings enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'expert_talks'
      and policyname = 'Public can read published expert talks'
  ) then
    create policy "Public can read published expert talks"
    on public.expert_talks for select
    using (status in ('upcoming', 'live', 'recorded'));
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'recordings'
      and policyname = 'Public can read published recordings'
  ) then
    create policy "Public can read published recordings"
    on public.recordings for select
    using (status = 'published');
  end if;
end $$;

grant select on public.expert_talks, public.recordings to anon, authenticated;
grant all privileges on public.expert_talks, public.recordings to service_role;
