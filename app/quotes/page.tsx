import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function QuotesReceivedPage() {
  await requireAuth(["Student"]);

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-navy">Quotes Received</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Custom expert quotes for your requirements will appear here. Compare expert profile, service scope, price, delivery method, and proposed timeline before booking.
          </p>
          <div className="mt-6 rounded-2xl bg-ivory p-6 text-center">
            <h2 className="text-xl font-black text-navy">No quotes yet.</h2>
            <p className="mt-2 text-slate-600">Send a requirement or browse expert-created services to receive quotes.</p>
            <Link href="/requirements/new" className="btn-primary mt-5">Send Requirement</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
