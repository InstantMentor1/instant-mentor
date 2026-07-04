# Calendly Setup For My Expert Talk

Use Calendly as the scheduling layer for mentor services and free expert talks until full backend booking automation is ready.

## Mentor Service Event Types

1. Create a Calendly account at https://calendly.com.
2. For each mentor service, create a new Event Type.
3. Use the exact service name, for example:
   - Resume Review for Freshers
   - Mock Interview for Software Roles
   - Career Roadmap Session
   - Project Review Session
4. Set the duration to match the service:
   - 30 minutes
   - 45 minutes
   - 60 minutes
5. Set Location to Google Meet so Calendly creates the meeting link automatically.
6. Add a 15-minute buffer after each session.
7. Set the confirmation page to redirect to:

```text
https://instant-mentor.vercel.app/payment-confirm?mentor=[mentorSlug]&service=[serviceSlug]&student={invitee_name}
```

Example:

```text
https://instant-mentor.vercel.app/payment-confirm?mentor=aarav-mehta&service=resume-review&student={invitee_name}
```

8. Add cancellation policy:

```text
Cancellations within 24 hours are non-refundable.
```

9. Copy the Calendly event URL, for example:

```text
https://calendly.com/myexperttalk-aarav/resume-review
```

10. Paste the URL into `lib/calendly-data.ts` under the relevant mentor and service key.

## Free Expert Talks

1. Create a Calendly Event Type for each expert talk.
2. Set payment to no payment required.
3. Use Google Meet as the location.
4. Paste each URL into `talkCalendlyUrls` in `lib/calendly-data.ts`.

## Current Payment Bridge

Calendly confirms the time slot first. After confirmation, users see `/payment-confirm`, which explains that a payment link will be sent manually by WhatsApp or email within 2 hours.

This is temporary. Replace it with real Razorpay payment automation when split payments are ready.

## Plan Note

Calendly Standard plan is recommended for multiple event types per mentor.
