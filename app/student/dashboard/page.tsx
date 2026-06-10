import Link from "next/link";
import { CalendarClock, CheckCircle2, Search, WalletCards } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";

export default async function StudentDashboard() {
  const { supabase, profile } = await requireAuth(["Student"]);
  const [{ data: bookings }, { count: serviceCount }] = await Promise.all([
    supabase.from("service_bookings").select("*,expert_services(title,category,duration_minutes)").order("created_at", { ascending: false }).limit(6),
    supabase.from("expert_services").select("*", { count: "exact", head: true }).eq("status", "active"),
  ]);
  const items = bookings ?? [];
  const upcoming = items.filter((booking) => ["accepted", "scheduled"].includes(booking.status));
  const completed = items.filter((booking) => booking.status === "completed");
  const pending = items.filter((booking) => booking.status === "pending");

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell">
        <DashboardHeader profile={profile} title={`Welcome, ${profile.full_name}`} description="Browse expert menus and manage outcome-focused service bookings." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Services available", value: serviceCount ?? 0, icon: Search },
            { label: "Pending requests", value: pending.length, icon: CalendarClock },
            { label: "Upcoming", value: upcoming.length, icon: WalletCards },
            { label: "Completed", value: completed.length, icon: CheckCircle2 },
          ].map(({ label, value, icon: Icon }) => <div key={label} className="card p-5"><Icon className="text-teal-700" /><p className="mt-4 text-xs font-bold uppercase text-slate-500">{label}</p><p className="mt-1 text-3xl font-black">{value}</p></div>)}
        </div>
        <div className="mt-6 flex flex-wrap gap-3"><Link href="/services" className="btn-primary">Explore Expert Services</Link><Link href="/bookings" className="btn-secondary">My Bookings</Link><Link href="/profile" className="btn-secondary">Update Profile</Link></div>
        <div className="mt-9 flex items-center justify-between"><div><h2 className="text-2xl font-black">Recent bookings</h2><p className="mt-1 text-sm text-slate-600">Payment, expert response, and scheduling in one place.</p></div><Link href="/bookings" className="text-sm font-bold text-teal-700">View all →</Link></div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {items.map((booking) => <article key={booking.id} className="card p-6"><div className="flex justify-between gap-4"><div><p className="text-xs font-bold uppercase text-teal-700">{booking.expert_services?.category}</p><h3 className="mt-2 text-xl font-black">{booking.expert_services?.title ?? "Expert service"}</h3></div><span className="h-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize">{booking.status}</span></div><p className="mt-4 text-sm text-slate-600">{booking.user_goal}</p><p className="mt-4 font-black text-teal-800">₹{Number(booking.price).toLocaleString("en-IN")} · <span className="capitalize">{booking.payment_status}</span></p></article>)}
        </div>
        {items.length === 0 && <div className="card mt-6 p-10 text-center"><h2 className="text-xl font-black">Find the right expert for your next goal.</h2><p className="mt-2 text-slate-600">Compare service outcomes, price, duration, and expert experience before booking.</p><Link href="/services" className="btn-primary mt-6">Explore Services</Link></div>}
      </div>
    </section>
  );
}
