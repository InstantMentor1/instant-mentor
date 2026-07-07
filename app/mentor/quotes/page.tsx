import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function ExpertQuotesPage() {
  await requireAuth(["Mentor", "Faculty", "Institution"]);

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-navy">Custom Quotes</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Student requirements that match your expertise will appear here. You can send a custom scope, price, delivery format, session link plan, promo code, and timeline.
          </p>
          <div className="mt-6 rounded-2xl bg-ivory p-6 text-center">
            <h2 className="text-xl font-black text-navy">No custom quote requests yet.</h2>
            <p className="mt-2 text-slate-600">Requests will appear after students send requirements that match your services.</p>
            <Link href="/mentor/services" className="btn-primary mt-5">Review My Services</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
