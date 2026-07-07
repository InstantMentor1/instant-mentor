import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function AdminCommissionPage() {
  await requireAuth(["Admin"]);

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-navy">Manage Commission</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Configure and review platform commission by booking type. MVP model: free expert signup with platform commission on successful bookings.
          </p>
          <Link href="/admin/payments" className="btn-primary mt-8">Review Payments / Payouts</Link>
        </div>
      </div>
    </section>
  );
}
