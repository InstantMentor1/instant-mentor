import Link from "next/link";
import { Bookmark, CalendarClock, CheckCircle2, MessageCircle, Search } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";

export default async function UserDashboard() {
  const { supabase, profile } = await requireAuth(["Student"]);
  const { data: bookings } = await supabase
    .from("service_bookings")
    .select("*,expert_services(title,category,duration_minutes)")
    .order("created_at", { ascending: false })
    .limit(6);
  const items = bookings ?? [];
  const upcoming = items.filter((booking) => ["accepted", "scheduled"].includes(booking.status));
  const completed = items.filter((booking) => booking.status === "completed");
  const pending = items.filter((booking) => booking.status === "pending");

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell">
        <DashboardHeader
          profile={profile}
          title="My Dashboard"
          description={`Welcome, ${profile.full_name}. Discover expert-created services and manage your bookings.`}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "Upcoming bookings", value: upcoming.length, icon: CalendarClock },
            { label: "Pending requests", value: pending.length, icon: Search },
            { label: "Completed bookings", value: completed.length, icon: CheckCircle2 },
            { label: "Saved services", value: 0, icon: Bookmark },
            { label: "Messages", value: 0, icon: MessageCircle },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="card p-5">
              <Icon className="text-teal-700" />
              <p className="mt-4 text-xs font-bold uppercase text-slate-500">{label}</p>
              <p className="mt-1 text-3xl font-black">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/services" className="btn-primary">Explore Expert Services</Link>
          <Link href="/bookings" className="btn-secondary">My Bookings</Link>
          <Link href="/profile" className="btn-secondary">Update Profile</Link>
        </div>
        <div className="mt-9 flex items-center justify-between">
          <div><h2 className="text-2xl font-black">Recent bookings</h2><p className="mt-1 text-sm text-slate-600">Expert response, scheduling, payment, and delivery status in one place.</p></div>
          <Link href="/bookings" className="text-sm font-bold text-teal-700">View all →</Link>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {items.map((booking) => (
            <article key={booking.id} className="card p-6">
              <div className="flex justify-between gap-4">
                <div><p className="text-xs font-bold uppercase text-teal-700">{booking.expert_services?.category}</p><h3 className="mt-2 text-xl font-black">{booking.expert_services?.title ?? "Expert service"}</h3></div>
                <span className="h-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize">{booking.status}</span>
              </div>
              <p className="mt-4 text-sm text-slate-600">{booking.requirement_details}</p>
              <p className="mt-4 font-black text-teal-800">₹{Number(booking.price).toLocaleString("en-IN")} · <span className="capitalize">{booking.payment_status}</span></p>
            </article>
          ))}
        </div>
        {items.length === 0 && (
          <div className="card mt-6 p-10 text-center">
            <h2 className="text-xl font-black">Find the right expert for your next goal.</h2>
            <p className="mt-2 text-slate-600">Compare expert profiles, service outcomes, price, duration, and availability before booking.</p>
            <Link href="/services" className="btn-primary mt-6">Explore Expert Services</Link>
          </div>
        )}
      </div>
    </section>
  );
}
