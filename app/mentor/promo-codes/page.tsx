import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function PromoCodesPage() {
  await requireAuth(["Mentor", "Faculty", "Institution"]);

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-navy">Promo Codes</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Experts will be able to create discount codes for their own services, rooms, courses, and mentorship plans. Codes should be controlled by the expert and tracked by the platform.
          </p>
          <div className="mt-6 rounded-2xl bg-ivory p-6">
            <h2 className="text-xl font-black text-navy">Promo code engine is planned.</h2>
            <p className="mt-2 text-slate-600">For launch, keep pricing clear on your service listing. Offer codes will be added after the payment flow is stable.</p>
            <Link href="/mentor/services" className="btn-primary mt-5">Manage Services</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
