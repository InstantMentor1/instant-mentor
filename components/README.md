# Mentrix Marketplace Components

The marketplace UI uses the existing Supabase-backed service and booking model,
while public copy positions the product as a premium SME marketplace for serious
students.

## Marketplace Components

- `marketplace/HomeSections.tsx`: Homepage sections for SME discovery,
  expertise menus, domains, SME partners, institutions, and conversion.
- `marketplace/ServiceDiscovery.tsx`: Client-side search and domain filtering
  for published SME expertise items.
- `marketplace/ServiceCard.tsx`: Public expertise preview showing the SME,
  SME-set price, duration, deliverables, and availability.
- `marketplace/ExpertServiceForm.tsx`: SME expertise item creation and editing.
- `marketplace/ServiceBookingForm.tsx`: Student booking intent, no-show
  acknowledgement, and existing test checkout flow.
- `marketplace/ServiceMenuActions.tsx`: SME expertise status and deletion
  controls.
- `marketplace/BookingStatusActions.tsx`: SME/admin booking workflow actions.

Internal role values such as `Student` and `Mentor` are retained for backward
compatibility. Public UI labels them as Student and SME Partner where suitable.
