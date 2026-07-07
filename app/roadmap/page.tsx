import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function RoadmapPage() {
  await requireAuth(["Student"]);

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-navy">My Roadmap</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            After completed learning support sessions, your expert roadmap can show skill gaps, recommended tools, learning plan, projects to build, next session suggestion, and progress status.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["Skill gap", "Learning plan", "Next session"].map((item) => (
              <div key={item} className="rounded-2xl bg-ivory p-5">
                <h2 className="font-black text-navy">{item}</h2>
                <p className="mt-2 text-sm text-slate-600">Your expert will add this after your first session.</p>
              </div>
            ))}
          </div>
          <Link href="/mentors" className="btn-primary mt-8">Book your first expert session</Link>
        </div>
      </div>
    </section>
  );
}
