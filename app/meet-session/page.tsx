import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function MeetSessionPage() {
  await requireAuth(["Student"]);

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-navy">Google Meet Session Details</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Confirmed session links, timing, expert instructions, pre-session requirements, and post-session resources will stay here. Meeting links are visible only after booking confirmation.
          </p>
          <div className="mt-6 rounded-2xl bg-ivory p-6 text-center">
            <h2 className="text-xl font-black text-navy">No confirmed sessions yet.</h2>
            <p className="mt-2 text-slate-600">Book an expert service to receive session details.</p>
            <Link href="/bookings" className="btn-primary mt-5">View My Bookings</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
