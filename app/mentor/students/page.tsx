import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function MentorStudentsPage() {
  await requireAuth(["Mentor", "Faculty", "Institution"]);

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-navy">Students</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Only students who book you will appear here, with their goal, current level, booked service, shared files, previous notes, and progress.
          </p>
          <Link href="/mentor/bookings" className="btn-primary mt-8">View bookings</Link>
        </div>
      </div>
    </section>
  );
}
