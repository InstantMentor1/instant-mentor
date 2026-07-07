import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function SendRequirementPage() {
  await requireAuth(["Student"]);

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-navy">Send Requirement</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Describe the problem you need help with. My Expert Talk will help you discover matching expert services and collect custom quotes from relevant experts.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["Problem", "Goal", "Budget / timeline"].map((item) => (
              <div key={item} className="rounded-2xl bg-ivory p-5">
                <h2 className="font-black text-navy">{item}</h2>
                <p className="mt-2 text-sm text-slate-600">This will become part of the requirement form in the next build.</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/services" className="btn-primary">Browse Matching Services</Link>
            <Link href="/mentors" className="btn-secondary">Explore Experts</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
