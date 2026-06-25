import Link from "next/link";
import { Bookmark, CalendarClock, CheckCircle2, MessageCircle, Mic2, MonitorPlay } from "lucide-react";
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
  const completed = items.filter((booking) => booking.status === "completed");

  return (
    <section className="bg-sky-50 py-10">
      <div className="container-shell">
        <DashboardHeader
          profile={profile}
          title="Student Learning Dashboard"
          description={`Welcome, ${profile.full_name}. Explore expert talks, book expert services, and manage your learning activity.`}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "Upcoming expert talks", value: 0, icon: Mic2 },
            { label: "Booked services", value: upcoming.length, icon: CalendarClock },
            { label: "Saved recordings", value: 0, icon: MonitorPlay },
            { label: "Messages", value: 0, icon: MessageCircle },
            { label: "Completed bookings", value: completed.length, icon: Bookmark },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="card border-blue-100 p-5">
              <Icon className="text-teal-700" />
              <p className="mt-4 text-xs font-bold uppercase text-slate-500">{label}</p>
              <p className="mt-1 text-3xl font-black">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/expert-talks" className="btn-primary">Explore Expert Talks</Link>
          <Link href="/services" className="btn-secondary">Book Expert Service</Link>
          <Link href="/recordings" className="btn-secondary">View Recordings</Link>
        </div>
        <div className="mt-9 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black">Recent bookings</h2>
            <p className="mt-1 text-sm text-slate-600">Mentor response, scheduling, payment, and delivery status in one place.</p>
          </div>
          <Link href="/bookings" className="text-sm font-bold text-teal-700">View all -&gt;</Link>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {items.map((booking) => (
            <article key={booking.id} className="card border-blue-100 p-6">
              <div className="flex justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase text-teal-700">{booking.expert_services?.category}</p>
                  <h3 className="mt-2 text-xl font-black">{booking.expert_services?.title ?? "Mentor service"}</h3>
                </div>
                <span className="h-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize">{booking.status}</span>
              </div>
              <p className="mt-4 text-sm text-slate-600">{booking.requirement_details}</p>
              <p className="mt-4 font-black text-teal-800">₹{Number(booking.price).toLocaleString("en-IN")} - <span className="capitalize">{booking.payment_status}</span></p>
            </article>
          ))}
        </div>
        {items.length === 0 && (
          <div className="card mt-6 border-blue-100 p-10 text-center">
            <CheckCircle2 className="mx-auto text-teal-700" />
            <h2 className="mt-3 text-xl font-black">Start your learning journey.</h2>
            <p className="mt-2 text-slate-600">Join expert talks, explore recordings, or book an expert service.</p>
            <Link href="/expert-talks" className="btn-primary mt-6">Explore Expert Talks</Link>
          </div>
        )}
      </div>
    </section>
  );
}
