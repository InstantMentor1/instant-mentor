# Instant Mentor

Production web app for Instant Mentor, India's mentorship-first platform for technical students and career aspirants. It includes the public website, role-based workspaces, session requests, private chat, paid webinars, plans, manual payments, credits, mentor earnings, Supabase Auth/RLS, and Gmail SMTP notifications.

## Backend setup

1. Create a Supabase project.
2. Open the Supabase SQL editor and run:

   `supabase/migrations/20260607_create_waitlist_signups.sql`

3. Enable two-step verification on the Gmail sender account and create a Google App Password for email delivery.
4. Copy `.env.example` to `.env.local` and add your real credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
EMAIL_MODE=gmail
GMAIL_USER=hello.instantmentor@gmail.com
GMAIL_APP_PASSWORD=your-16-character-google-app-password
ADMIN_EMAIL=hello.instantmentor@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Keep `SUPABASE_SERVICE_ROLE_KEY` and `GMAIL_APP_PASSWORD` private. They are only read by server-side API routes.

If the original waitlist migration was already applied, also run:

`supabase/migrations/20260607_enforce_waitlist_required_fields.sql`

Also run the case-insensitive unique email migration:

`supabase/migrations/20260607_add_case_insensitive_email_unique_index.sql`

## Early Access Beta authentication

Run this migration before deploying the protected dashboards:

`supabase/migrations/20260608_beta_auth_sessions_rls.sql`

Then run the production platform upgrade:

`supabase/migrations/20260608_production_platform.sql`

Then run the paid webinar upgrade:

`supabase/migrations/20260609_create_paid_webinars.sql`

In Supabase Authentication URL Configuration, set:

- Site URL: `https://instant-mentor.vercel.app`
- Redirect URL: `https://instant-mentor.vercel.app/auth/callback`
- Local redirect URL: `http://localhost:3000/auth/callback`

Student and mentor profiles are created automatically by the server-side signup route. Public signup rejects personal email providers and validates role-specific institution or professional domains before creating an Auth user. Admin accounts are intentionally unavailable through public signup. Promote a trusted existing user with:

```sql
update public.profiles
set role = 'Admin'
where email = 'your-admin-email@example.com';
```

Protected beta routes:

- `/student/dashboard`
- `/mentor/dashboard`
- `/admin/dashboard`
- `/sessions/new`
- `/sessions`
- `/sessions/[id]`
- `/messages/[sessionId]`
- `/profile`
- `/billing`
- `/webinars`
- `/webinars/create`
- `/career-support`
- `/admin/payments`

Core server routes:

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/session/create`
- `POST /api/session/assign`
- `POST /api/session/accept`
- `POST /api/session/reject`
- `POST /api/session/schedule`
- `POST /api/session/complete`
- `POST /api/messages/send`
- `POST /api/webinars/create`
- `POST /api/webinars/register`
- `POST /api/admin/webinar-payment`
- `POST /api/admin/verify-mentor`
- `POST /api/admin/manual-payment`

Payments are manual during early access. A student selects a plan, which creates a pending payment. An admin marks it paid to activate the subscription and credits. Live payment-provider credentials are not required.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

On Windows, you can also double-click `start-dev.cmd` and keep its command window open.

## Pages

- `/` - Home
- `/students` - For Students
- `/mentors` - For Mentors
- `/pricing` - Pricing and FAQs
- `/waitlist` - Database-backed waitlist form
- `POST /api/waitlist` - Validates, stores, and emails new signups
- `GET /api/verify-email?token=...` - Verifies email ownership

## Verification behavior

- Students must use a college or institution email.
- Mentors must use a company or professional email and provide a LinkedIn or portfolio URL.
- Faculty must use an institution or professional email and provide a LinkedIn or portfolio URL.
- Institutions must use an official institution or company email.
- Personal email providers are rejected for every role.
