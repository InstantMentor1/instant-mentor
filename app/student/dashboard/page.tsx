import Link from "next/link";
import { CalendarClock, CreditCard, FileText, MessageSquare, Search, Users } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";

export default async function StudentDashboard() {
  const { supabase, profile } = await requireAuth(["Student"]);
  const { data: bookings } = await supabase
    .from("service_bookings")
    .select("*,expert_services(title,category,duration_minutes)")
    .order("created_at", { ascending: false })
    .limit(6);
  const items = bookings ?? [];
  const upcoming = items.filter((booking) => ["accepted", "scheduled"].includes(booking.status));

  return (
    <section className="bg-[#F8FAFC] py-10">
      <div className="container-shell">
        <DashboardHeader
          profile={profile}
          title="Student Dashboard"
          description={`Hi ${profile.full_name}, find support by need, book expert sessions, join rooms, manage messages, payments, and your profile.`}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Upcoming sessions", value: upcoming.length, icon: CalendarClock },
            { label: "Rooms joined", value: "0", icon: Users },
            { label: "Messages", value: "0", icon: MessageSquare },
            { label: "Payments", value: items.filter((booking) => booking.payment_status === "paid").length, icon: CreditCard },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="card p-5">
              <Icon className="text-blue-600" />
              <p className="mt-4 text-xs font-bold uppercase text-slate-500">{label}</p>
              <p className="mt-1 text-3xl font-black">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/services" className="btn-primary">Find Support</Link>
          <Link href="/bookings" className="btn-secondary">My Bookings</Link>
          <Link href="/rooms" className="btn-secondary">My Rooms</Link>
          <Link href="/messages" className="btn-secondary">Messages</Link>
          <Link href="/payments" className="btn-secondary">Payments</Link>
          <Link href="/profile" className="btn-secondary">Profile</Link>
        </div>
        <div className="mt-9 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black">Recent bookings</h2>
            <p className="mt-1 text-sm text-slate-600">Your recently booked expert services and session status.</p>
          </div>
          <Link href="/bookings" className="text-sm font-bold text-blue-600">View all -&gt;</Link>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {items.map((booking) => (
            <article key={booking.id} className="card p-6">
              <div className="flex justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase text-academic">{booking.expert_services?.category}</p>
                  <h3 className="mt-2 text-xl font-black">{booking.expert_services?.title ?? "Expert service"}</h3>
                </div>
                <span className="h-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize">{booking.status}</span>
              </div>
              <p className="mt-4 text-sm text-slate-600">{booking.requirement_details}</p>
              <p className="mt-4 font-black text-navy">Rs. {Number(booking.price).toLocaleString("en-IN")} - <span className="capitalize">{booking.payment_status}</span></p>
            </article>
          ))}
        </div>
        {items.length === 0 && (
          <div className="card mt-6 p-10 text-center">
            <Search className="mx-auto text-blue-600" />
            <h2 className="mt-3 text-xl font-black">Start by finding support.</h2>
            <p className="mt-2 text-slate-600">Choose a need like resume, interview, project help, skill learning, subject doubt, or career guidance.</p>
            <Link href="/services" className="btn-primary mt-6">Find Support</Link>
          </div>
        )}
      </div>
    </section>
  );
}
