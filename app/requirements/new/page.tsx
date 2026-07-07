import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function SendRequirementPage() {
  await requireAuth(["Student"]);

  return (
    <section className="bg-[#F8FAFC] py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <h1 className="text-3xl font-black text-[#0F172A]">Request custom quote</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Use this only for complex requirements that do not fit an expert&apos;s fixed menu services, packages, rooms, or add-ons.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["Problem", "Goal", "Budget / timeline"].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-5">
                <h2 className="font-black text-[#0F172A]">{item}</h2>
                <p className="mt-2 text-sm text-slate-600">This will become part of the requirement form in the next build.</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/mentors" className="btn-primary">Browse Expert Menus</Link>
            <Link href="/services" className="btn-secondary">Find Menu Services</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
