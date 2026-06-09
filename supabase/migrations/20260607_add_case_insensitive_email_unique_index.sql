create unique index if not exists waitlist_signups_email_unique_lower
on public.waitlist_signups (lower(email));
