import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function MentorAvailabilityPage() {
  await requireAuth(["Mentor", "Faculty", "Institution"]);

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-navy">Availability</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Set available days, time slots, buffer time, maximum sessions per day, and unavailable dates. Calendly is currently used for slot booking.
          </p>
          <Link href="/mentor/services" className="btn-primary mt-8">Manage services</Link>
        </div>
      </div>
    </section>
  );
}
