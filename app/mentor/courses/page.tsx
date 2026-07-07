import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function ExpertCoursesPage() {
  await requireAuth(["Mentor", "Faculty", "Institution"]);

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-navy">My Courses</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Micro-courses and longer expert-led learning plans will live here. Experts control the content, price, duration, promo codes, support format, and whether live sessions are included.
          </p>
          <div className="mt-6 rounded-2xl bg-ivory p-6">
            <h2 className="text-xl font-black text-navy">Course uploads are coming soon.</h2>
            <p className="mt-2 text-slate-600">Until then, package a micro-course as a service with clear deliverables and delivery method.</p>
            <Link href="/mentor/services/new" className="btn-primary mt-5">Package as Service</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
