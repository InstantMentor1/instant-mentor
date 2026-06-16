import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";
import type { ServiceBooking } from "@/lib/marketplace";

export default async function UserBookingsPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const { success } = await searchParams;
  const { supabase, profile } = await requireAuth(["Student"]);
  const { data } = await supabase.from("service_bookings").select("*,expert_services(title,category,duration_minutes)").order("created_at", { ascending: false });
  const bookings = (data ?? []).map((booking) => ({ ...booking, service: booking.expert_services })) as ServiceBooking[];
  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell">
        <DashboardHeader profile={profile} title="My Bookings" description="Track payment, SME acceptance, scheduling, and completed expertise items." />
        {success === "1" && <p className="mb-6 rounded-2xl bg-teal-50 p-5 font-bold text-teal-900">Payment verified. Your booking request has been sent to the SME.</p>}
        <div className="grid gap-5 lg:grid-cols-2">
          {bookings.map((booking) => (
            <article key={booking.id} className="card p-6">
              <div className="flex justify-between gap-3">
                <div><p className="text-xs font-bold uppercase tracking-wide text-teal-700">{booking.service?.category}</p><h2 className="mt-2 text-xl font-black">{booking.service?.title ?? "SME expertise item"}</h2></div>
                <span className="h-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize">{booking.status}</span>
              </div>
              <p className="mt-4 text-sm text-slate-600"><strong>Booking intent:</strong> {booking.requirement_details}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-4 text-sm">
                <p><strong>Price</strong><br />₹{Number(booking.price).toLocaleString("en-IN")}</p>
                <p><strong>Payment</strong><br /><span className="capitalize">{booking.payment_status}</span></p>
                <p><strong>Preferred</strong><br />{booking.preferred_date} - {booking.preferred_time}</p>
                <p><strong>Duration</strong><br />{booking.service?.duration_minutes ?? "-"} minutes</p>
              </div>
              {booking.status === "scheduled" && booking.meeting_link && <a href={booking.meeting_link} target="_blank" rel="noreferrer" className="btn-primary mt-5">Join Private Session</a>}
            </article>
          ))}
        </div>
        {bookings.length === 0 && (
          <div className="card p-10 text-center">
            <h2 className="text-xl font-black">No SME bookings yet.</h2>
            <p className="mt-2 text-slate-600">Browse SME profiles and expertise menus to choose the exact outcome you need.</p>
            <Link href="/smes" className="btn-primary mt-6">Explore SME Profiles</Link>
          </div>
        )}
      </div>
    </section>
  );
}
