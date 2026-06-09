begin;

alter table public.masterclasses
  add column if not exists access_level text not null default 'Regular',
  add column if not exists max_students integer;

alter table public.masterclasses drop constraint if exists masterclasses_access_level_check;
alter table public.masterclasses add constraint masterclasses_access_level_check
  check (access_level in ('Regular', 'Premium', 'All'));

alter table public.masterclasses drop constraint if exists masterclasses_max_students_check;
alter table public.masterclasses add constraint masterclasses_max_students_check
  check (max_students is null or max_students > 0);

alter table public.masterclasses drop constraint if exists masterclasses_status_check;
alter table public.masterclasses add constraint masterclasses_status_check
  check (status in ('draft', 'upcoming', 'live', 'completed', 'cancelled'));

drop policy if exists "masterclasses_authenticated_read" on public.masterclasses;
create policy "masterclasses_authenticated_read"
on public.masterclasses for select to authenticated
using (
  status in ('upcoming', 'live')
  or mentor_id = auth.uid()
  or public.current_user_role() = 'Admin'
);

revoke select on public.masterclasses from authenticated;
grant select (
  id,
  mentor_id,
  title,
  description,
  technical_track,
  scheduled_at,
  price,
  status,
  access_level,
  max_students,
  created_at
) on public.masterclasses to authenticated;

grant all privileges on public.masterclasses to service_role;
notify pgrst, 'reload schema';

commit;
