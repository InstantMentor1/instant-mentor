begin;

alter table public.profiles
  add column if not exists technical_tracks text[] not null default '{}';

update public.profiles
set technical_tracks = array[technical_track]
where technical_track is not null
  and cardinality(technical_tracks) = 0;

notify pgrst, 'reload schema';

commit;
