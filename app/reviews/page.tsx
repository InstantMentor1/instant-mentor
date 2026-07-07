import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function StudentReviewsPage() {
  await requireAuth(["Student"]);

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-navy">Reviews</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            After a completed session, you can review the expert, quality of delivery, clarity of next steps, and overall learning value.
          </p>
          <div className="mt-6 rounded-2xl bg-ivory p-6 text-center">
            <h2 className="text-xl font-black text-navy">No completed sessions to review.</h2>
            <p className="mt-2 text-slate-600">Your review options will appear after completed bookings.</p>
            <Link href="/bookings" className="btn-primary mt-5">Go to Bookings</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
