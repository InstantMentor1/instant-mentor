import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function RoomsCoursesPage() {
  await requireAuth(["Student"]);

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-navy">My Rooms / Courses</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Group rooms, expert micro-courses, and longer mentorship plans you join will appear here. You only get access after booking or enrolling through an expert-created offer.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Expert Rooms", "Group learning rooms for doubt support, interview practice, or project help."],
              ["Micro-Courses", "Small expert-created learning modules with resources and optional live support."],
              ["Mentorship Plans", "7-day, 30-day, or monthly support plans created and priced by experts."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-2xl bg-ivory p-5">
                <h2 className="font-black text-navy">{title}</h2>
                <p className="mt-2 text-sm text-slate-600">{text}</p>
              </article>
            ))}
          </div>
          <Link href="/services" className="btn-primary mt-8">Explore Expert Services</Link>
        </div>
      </div>
    </section>
  );
}
