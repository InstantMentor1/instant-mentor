# Instant Mentor Marketplace Components

The marketplace UI uses the existing Supabase-backed service and booking model.

## Marketplace Components

- `marketplace/HomeSections.tsx`: Homepage sections for expert discovery,
  service menus, categories, expert partners, institutions, and conversion.
- `marketplace/ServiceDiscovery.tsx`: Client-side search and category filtering
  for real published expert services.
- `marketplace/ServiceCard.tsx`: Public service preview showing the expert,
  expert-set price, duration, deliverables, and availability.
- `marketplace/ExpertServiceForm.tsx`: Expert service creation and editing.
- `marketplace/ServiceBookingForm.tsx`: User booking request and existing test
  checkout flow.
- `marketplace/ServiceMenuActions.tsx`: Expert service status and deletion
  controls.
- `marketplace/BookingStatusActions.tsx`: Expert/admin booking workflow actions.

Internal role values such as `Student` and `Mentor` are retained for backward
compatibility. Public UI labels them as User and Expert Partner where suitable.
