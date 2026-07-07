import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function PaymentsPage() {
  await requireAuth(["Student"]);

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-navy">Payments</h1>
          <p className="mt-3 text-slate-600">Paid sessions, pending payments, invoices, and refund or reschedule status will appear here.</p>
          <div className="mt-6 rounded-2xl bg-ivory p-6 text-center">
            <h2 className="text-xl font-black text-navy">No payments yet.</h2>
            <p className="mt-2 text-slate-600">Book an expert session to see payment status here.</p>
            <Link href="/services" className="btn-primary mt-5">Browse services</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
