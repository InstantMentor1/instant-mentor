create extension if not exists "pgcrypto";

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  role text not null check (role in ('Student', 'Mentor', 'Faculty', 'Institution')),
  college_or_company text,
  domain_of_interest text,
  linkedin_or_portfolio text,
  message text,
  verification_method text check (
    verification_method in (
      'college_email',
      'company_email',
      'institution_email',
      'linkedin_manual',
      'student_id_manual',
      'pending_manual_review'
    )
  ),
  verification_status text not null default 'unverified' check (
    verification_status in ('unverified', 'pending', 'verified', 'rejected')
  ),
  email_verified boolean not null default false,
  email_verification_token text,
  email_verification_sent_at timestamptz,
  created_at timestamptz not null default now(),
  constraint waitlist_signups_email_unique unique (email)
);

create index if not exists waitlist_signups_email_idx
  on public.waitlist_signups (email);
create index if not exists waitlist_signups_role_idx
  on public.waitlist_signups (role);
create index if not exists waitlist_signups_verification_status_idx
  on public.waitlist_signups (verification_status);
create index if not exists waitlist_signups_created_at_idx
  on public.waitlist_signups (created_at desc);

alter table public.waitlist_signups enable row level security;

-- No public RLS policies are intentionally defined. All access goes through
-- the server-only service role client in the Next.js API routes.
