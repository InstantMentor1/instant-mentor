begin;

alter table public.payments
  add column if not exists product_type text,
  add column if not exists razorpay_order_id text,
  add column if not exists razorpay_payment_id text,
  add column if not exists razorpay_signature text,
  add column if not exists currency text not null default 'INR',
  add column if not exists updated_at timestamptz not null default now();

alter table public.user_subscriptions
  add column if not exists credit_period_started_at timestamptz;

update public.user_subscriptions
set credit_period_started_at = start_date
where credit_period_started_at is null;

alter table public.payments drop constraint if exists payments_status_check;
alter table public.payments add constraint payments_status_check
  check (status in ('created', 'pending', 'paid', 'failed', 'refunded'));

alter table public.payments drop constraint if exists payments_product_type_check;
alter table public.payments add constraint payments_product_type_check
  check (
    product_type is null
    or product_type in (
      'early_access',
      'single_session',
      'launch_offer',
      'regular_plan',
      'premium_plan'
    )
  );

create unique index if not exists payments_razorpay_order_unique
  on public.payments(razorpay_order_id)
  where razorpay_order_id is not null;

create unique index if not exists payments_razorpay_payment_unique
  on public.payments(razorpay_payment_id)
  where razorpay_payment_id is not null;

create table if not exists public.user_access (
  user_id uuid primary key references auth.users(id) on delete cascade,
  early_access_confirmed boolean not null default false,
  active_plan text,
  plan_started_at timestamptz,
  plan_expires_at timestamptz,
  session_credits integer not null default 0 check (session_credits >= 0),
  updated_at timestamptz not null default now(),
  check (
    active_plan is null
    or active_plan in ('single_session', 'launch_offer', 'regular_plan', 'premium_plan')
  )
);

insert into public.user_access (
  user_id,
  early_access_confirmed,
  active_plan,
  plan_started_at,
  plan_expires_at,
  session_credits
)
select
  subscription.user_id,
  true,
  case plan.name
    when 'Single Session' then 'single_session'
    when 'Launch Offer' then 'launch_offer'
    when 'Regular Plan' then 'regular_plan'
    when 'Premium Plan' then 'premium_plan'
  end,
  subscription.start_date,
  subscription.end_date,
  greatest(subscription.session_credits_total - subscription.session_credits_used, 0)
from public.user_subscriptions subscription
join public.plans plan on plan.id = subscription.plan_id
where subscription.status = 'active'
on conflict (user_id) do nothing;

drop trigger if exists payments_set_updated_at on public.payments;
create trigger payments_set_updated_at before update on public.payments
for each row execute procedure public.set_updated_at();

drop trigger if exists user_access_set_updated_at on public.user_access;
create trigger user_access_set_updated_at before update on public.user_access
for each row execute procedure public.set_updated_at();

alter table public.user_access enable row level security;

create policy "user_access_own_or_admin"
on public.user_access for select to authenticated
using (user_id = auth.uid() or public.current_user_role() = 'Admin');

grant select on public.user_access to authenticated;
grant all privileges on public.user_access to service_role;

notify pgrst, 'reload schema';
commit;
