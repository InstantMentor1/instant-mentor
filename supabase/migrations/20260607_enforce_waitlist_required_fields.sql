alter table public.waitlist_signups
  add constraint waitlist_phone_required
  check (phone is not null and length(trim(phone)) > 0) not valid,
  add constraint waitlist_college_or_company_required
  check (college_or_company is not null and length(trim(college_or_company)) > 0) not valid,
  add constraint waitlist_domain_of_interest_required
  check (domain_of_interest is not null and length(trim(domain_of_interest)) > 0) not valid,
  add constraint waitlist_mentor_faculty_profile_required
  check (
    role not in ('Mentor', 'Faculty')
    or (
      linkedin_or_portfolio is not null
      and length(trim(linkedin_or_portfolio)) > 0
    )
  ) not valid;
