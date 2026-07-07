import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function AdminDisputesPage() {
  await requireAuth(["Admin"]);

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-navy">Handle Disputes</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Refund, reschedule, no-show, quality, and delivery disputes will be tracked here so the platform can protect trust between students and experts.
          </p>
          <Link href="/admin/bookings" className="btn-primary mt-8">Track Bookings</Link>
        </div>
      </div>
    </section>
  );
}
