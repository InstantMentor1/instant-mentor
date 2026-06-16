import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import ServiceMenuActions from "@/components/marketplace/ServiceMenuActions";
import { requireAuth } from "@/lib/auth";
import { formatDeliveryMode, type ExpertService } from "@/lib/marketplace";

export default async function ExpertServicesPage() {
  const { supabase, profile } = await requireAuth([
    "Mentor",
    "Faculty",
    "Institution",
  ]);
  const [{ data }, { data: bookingRows }] = await Promise.all([
    supabase
      .from("expert_services")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase.from("service_bookings").select("service_id"),
  ]);
  const services = (data ?? []) as ExpertService[];
  const bookingCounts = new Map<string, number>();
  (bookingRows ?? []).forEach((booking) => {
    bookingCounts.set(booking.service_id, (bookingCounts.get(booking.service_id) ?? 0) + 1);
  });

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell">
        <DashboardHeader
          profile={profile}
          title="My Expertise Menu"
          description="Create, price, publish, and manage the expertise items students can book."
        />

        <div className="mb-7 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black">Your expertise items</h2>
            <p className="mt-1 text-sm text-slate-600">
              {services.length} expertise listings
            </p>
          </div>
          <Link href="/mentor/services/new" className="btn-primary">
            Create Expertise
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {services.map((service) => (
            <article key={service.id} className="card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      service.status === "active"
                        ? "bg-teal-50 text-teal-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {service.status}
                  </span>
                  <h2 className="mt-4 text-xl font-black">{service.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {service.category}
                  </p>
                </div>
                <p className="text-2xl font-black text-teal-800">
                  ₹{Number(service.price).toLocaleString("en-IN")}
                </p>
              </div>
              <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
                {service.description}
              </p>
              <p className="mt-4 text-sm font-semibold">
                {service.duration_minutes} minutes - {formatDeliveryMode(service.delivery_mode)}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {bookingCounts.get(service.id) ?? 0} bookings - Availability: {service.availability_notes ?? "Not specified"}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={`/services/${service.id}`}
                  className="text-sm font-bold text-teal-700"
                >
                  View public page -&gt;
                </Link>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/mentor/services/${service.id}/edit`}
                    className="text-sm font-bold text-slate-700 hover:text-teal-700"
                  >
                    Edit
                  </Link>
                  <ServiceMenuActions
                    id={service.id}
                    status={service.status}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        {services.length === 0 && (
          <div className="card p-10 text-center">
            <h2 className="text-xl font-black">
              Your expertise menu is empty.
            </h2>
            <p className="mt-2 text-slate-600">
              Create a focused expertise item with a clear student outcome,
              price, duration, and format.
            </p>
            <Link href="/mentor/services/new" className="btn-primary mt-6">
              Create First Expertise Item
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
