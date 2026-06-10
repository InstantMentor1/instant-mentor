begin;

create table if not exists public.expert_services (
  id uuid primary key default gen_random_uuid(),
  expert_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text not null,
  description text not null,
  target_audience text not null,
  deliverables text not null,
  requirements text not null,
  price numeric(10,2) not null check (price > 0),
  duration_minutes integer not null check (duration_minutes between 15 and 480),
  delivery_mode text not null check (delivery_mode in ('video_call', 'chat', 'document_review', 'hybrid')),
  availability_notes text,
  max_bookings_per_week integer not null default 5 check (max_bookings_per_week between 1 and 100),
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists expert_services_expert_idx
  on public.expert_services(expert_id, status);
create index if not exists expert_services_category_idx
  on public.expert_services(category, status);

create table if not exists public.service_bookings (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.expert_services(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete cascade,
  expert_id uuid not null references auth.users(id) on delete cascade,
  user_goal text not null,
  requirement_details text not null,
  preferred_date date not null,
  preferred_time text not null,
  attachment_link text,
  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'rejected', 'scheduled', 'completed', 'cancelled')),
  meeting_link text,
  scheduled_at timestamptz,
  rejection_reason text,
  price numeric(10,2) not null check (price > 0),
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  payment_id uuid references public.payments(id),
  platform_commission_percent numeric(5,2) not null default 20,
  expert_payout_percent numeric(5,2) not null default 80,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (platform_commission_percent + expert_payout_percent = 100)
);

alter table public.payments
  add column if not exists service_booking_id uuid references public.service_bookings(id);
alter table public.payments drop constraint if exists payments_product_type_check;
alter table public.payments add constraint payments_product_type_check
  check (
    product_type is null
    or product_type in (
      'early_access',
      'single_session',
      'launch_offer',
      'regular_plan',
      'premium_plan',
      'expert_service'
    )
  );

create index if not exists service_bookings_user_idx
  on public.service_bookings(user_id, created_at desc);
create index if not exists service_bookings_expert_idx
  on public.service_bookings(expert_id, created_at desc);
create unique index if not exists payments_service_booking_unique
  on public.payments(service_booking_id) where service_booking_id is not null;

create table if not exists public.service_reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.service_bookings(id) on delete cascade,
  service_id uuid not null references public.expert_services(id) on delete cascade,
  expert_id uuid not null references auth.users(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  review text,
  created_at timestamptz not null default now()
);

drop trigger if exists expert_services_set_updated_at on public.expert_services;
create trigger expert_services_set_updated_at before update on public.expert_services
for each row execute procedure public.set_updated_at();

drop trigger if exists service_bookings_set_updated_at on public.service_bookings;
create trigger service_bookings_set_updated_at before update on public.service_bookings
for each row execute procedure public.set_updated_at();

alter table public.expert_services enable row level security;
alter table public.service_bookings enable row level security;
alter table public.service_reviews enable row level security;

create policy "expert_services_public_read"
on public.expert_services for select to anon, authenticated
using (
  status = 'active'
  or expert_id = auth.uid()
  or public.current_user_role() = 'Admin'
);

create policy "experts_manage_own_services"
on public.expert_services for all to authenticated
using (
  expert_id = auth.uid()
  and public.current_user_role() in ('Mentor', 'Faculty', 'Institution')
)
with check (
  expert_id = auth.uid()
  and public.current_user_role() in ('Mentor', 'Faculty', 'Institution')
);

create policy "admins_manage_services"
on public.expert_services for all to authenticated
using (public.current_user_role() = 'Admin')
with check (public.current_user_role() = 'Admin');

create policy "bookings_participant_or_admin_read"
on public.service_bookings for select to authenticated
using (
  user_id = auth.uid()
  or expert_id = auth.uid()
  or public.current_user_role() = 'Admin'
);

create policy "students_create_service_bookings"
on public.service_bookings for insert to authenticated
with check (
  user_id = auth.uid()
  and public.current_user_role() = 'Student'
);

create policy "experts_update_own_bookings"
on public.service_bookings for update to authenticated
using (
  expert_id = auth.uid()
  and public.current_user_role() in ('Mentor', 'Faculty', 'Institution')
)
with check (expert_id = auth.uid());

create policy "admins_manage_service_bookings"
on public.service_bookings for all to authenticated
using (public.current_user_role() = 'Admin')
with check (public.current_user_role() = 'Admin');

create policy "service_reviews_public_read"
on public.service_reviews for select to anon, authenticated
using (true);

create policy "students_review_completed_bookings"
on public.service_reviews for insert to authenticated
with check (
  user_id = auth.uid()
  and public.current_user_role() = 'Student'
  and exists (
    select 1
    from public.service_bookings booking
    where booking.id = booking_id
      and booking.user_id = auth.uid()
      and booking.status = 'completed'
  )
);

create policy "admins_manage_service_reviews"
on public.service_reviews for all to authenticated
using (public.current_user_role() = 'Admin')
with check (public.current_user_role() = 'Admin');

grant select on public.expert_services, public.service_reviews to anon, authenticated;
grant select, insert, update on public.service_bookings to authenticated;
grant insert, update, delete on public.expert_services to authenticated;
grant insert on public.service_reviews to authenticated;
grant all privileges on public.expert_services, public.service_bookings, public.service_reviews to service_role;

notify pgrst, 'reload schema';
commit;
