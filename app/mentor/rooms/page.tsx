import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function ExpertRoomsPage() {
  await requireAuth(["Mentor", "Faculty", "Institution"]);

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-navy">My Rooms</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Create group learning support rooms such as SQL Doubt Room, Business Analyst Support Room, MBA Project Help Room, or Interview Preparation Room. You decide the topic, seat limit, price, schedule, language, and resources.
          </p>
          <div className="mt-6 rounded-2xl bg-ivory p-6">
            <h2 className="text-xl font-black text-navy">Room builder is planned for the next release.</h2>
            <p className="mt-2 text-slate-600">For now, create a service listing and mention group-room delivery in the delivery method and requirements.</p>
            <Link href="/mentor/services/new" className="btn-primary mt-5">Create Service Listing</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
