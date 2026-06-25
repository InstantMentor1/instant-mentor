# My Expert Talk Marketplace Components

The marketplace UI uses the existing Supabase-backed service and booking model,
while public copy positions the product as a premium mentor marketplace for serious
students.

## Marketplace Components

- `marketplace/HomeSections.tsx`: Homepage sections for mentor discovery,
  expertise menus, domains, experts, students, and conversion.
- `marketplace/ServiceDiscovery.tsx`: Client-side search and domain filtering
  for published mentor services.
- `marketplace/ServiceCard.tsx`: Public expertise preview showing the mentor,
  Expert-set price, duration, deliverables, and availability.
- `marketplace/ExpertServiceForm.tsx`: mentor service creation and editing.
- `marketplace/ServiceBookingForm.tsx`: Student booking intent, no-show
  acknowledgement, and existing test checkout flow.
- `marketplace/ServiceMenuActions.tsx`: mentor expertise status and deletion
  controls.
- `marketplace/BookingStatusActions.tsx`: mentor/admin booking workflow actions.

Internal role values such as `Student` and `Mentor` are retained for backward
compatibility. Public UI labels them as Student and mentor where suitable.
