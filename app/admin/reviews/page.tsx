import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function AdminReviewsPage() {
  await requireAuth(["Admin"]);

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-navy">Monitor Reviews</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Monitor student reviews, expert ratings, flagged feedback, and trust signals before reviews become part of expert discovery.
          </p>
          <Link href="/admin/experts" className="btn-primary mt-8">Review Experts</Link>
        </div>
      </div>
    </section>
  );
}
