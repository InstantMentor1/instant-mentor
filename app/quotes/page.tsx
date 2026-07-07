import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function QuotesReceivedPage() {
  await requireAuth(["Student"]);

  return (
    <section className="bg-[#F8FAFC] py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <h1 className="text-3xl font-black text-[#0F172A]">Custom quote responses</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Custom quote responses are only for complex needs that do not fit a fixed expert menu item, package, room, or add-on.
          </p>
          <div className="mt-6 rounded-2xl bg-slate-50 p-6 text-center">
            <h2 className="text-xl font-black text-[#0F172A]">No custom responses yet.</h2>
            <p className="mt-2 text-slate-600">Browse expert menus first. Use custom quote only when your need is complex.</p>
            <Link href="/mentors" className="btn-primary mt-5">Browse Expert Menus</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
