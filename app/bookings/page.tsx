import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import { getAuthContext } from "@/lib/auth";
import type { ServiceBooking } from "@/lib/marketplace";
import LocalBookings from "./LocalBookings";

export default async function UserBookingsPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const { success } = await searchParams;
  const { supabase, profile } = await getAuthContext();
  if (!profile) {
    return (
      <section className="bg-ivory py-12">
        <div className="container-shell">
          <div className="mx-auto max-w-2xl rounded-3xl border border-navy/10 bg-white p-8 text-center shadow-soft">
            <h1 className="text-3xl font-black text-navy">Sign in to see your bookings</h1>
            <p className="mt-3 text-slate-600">Your mentor sessions, Calendly confirmations, payment status, and private meeting links stay inside your account.</p>
            <Link href="/login" className="btn-primary mt-6">Login -&gt;</Link>
          </div>
        </div>
      </section>
    );
  }

  const { data } = await supabase
    .from("service_bookings")
    .select("*,expert_services(title,category,duration_minutes)")
    .eq("user_id", profile.user_id)
    .order("created_at", { ascending: false });
  const bookings = (data ?? []).map((booking) => ({ ...booking, service: booking.expert_services })) as ServiceBooking[];

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <DashboardHeader profile={profile} title="My Bookings" description="Track payment, mentor acceptance, scheduling, and completed services." />
        {success === "1" && <p className="mb-6 rounded-2xl bg-skysoft p-5 font-bold text-navy">Payment verified. Your booking request has been sent to the mentor.</p>}
        <div className="grid gap-5 lg:grid-cols-2">
          {bookings.map((booking) => (
            <article key={booking.id} className="card p-6">
              <div className="flex justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-coral">{booking.service?.category}</p>
                  <h2 className="mt-2 text-xl font-black">{booking.service?.title ?? "Mentor service"}</h2>
                </div>
                <span className="h-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize">{booking.status}</span>
              </div>
              <p className="mt-4 text-sm text-slate-600"><strong>Booking intent:</strong> {booking.requirement_details}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-ivory p-4 text-sm">
                <p><strong>Price</strong><br />Rs. {Number(booking.price).toLocaleString("en-IN")}</p>
                <p><strong>Payment</strong><br /><span className="capitalize">{booking.payment_status}</span></p>
                <p><strong>Preferred</strong><br />{booking.preferred_date} - {booking.preferred_time}</p>
                <p><strong>Duration</strong><br />{booking.service?.duration_minutes ?? "-"} minutes</p>
              </div>
              {booking.status === "scheduled" && booking.meeting_link && <a href={booking.meeting_link} target="_blank" rel="noreferrer" className="btn-primary mt-5">Join Private Session</a>}
            </article>
          ))}
        </div>
        {bookings.length === 0 ? (
          <>
            <div className="card p-10 text-center">
              <h2 className="text-xl font-black">No database bookings yet.</h2>
              <p className="mt-2 text-slate-600">Browse mentor services to choose a slot. Calendly bridge bookings saved on this device appear below.</p>
              <Link href="/services" className="btn-primary mt-6">Explore Services</Link>
            </div>
            <LocalBookings />
          </>
        ) : (
          <div className="mt-8">
            <h2 className="text-2xl font-black text-navy">Calendly confirmations on this device</h2>
            <LocalBookings />
          </div>
        )}
      </div>
    </section>
  );
}
