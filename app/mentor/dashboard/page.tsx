import Link from "next/link";
import { BadgeCheck, Banknote, CalendarClock, Store } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";

export default async function MentorDashboard() {
  const { supabase, profile } = await requireAuth(["Mentor", "Faculty", "Institution"]);
  const [{ data: services }, { data: bookings }, { data: mentorProfile }] = await Promise.all([
    supabase.from("expert_services").select("*").order("created_at", { ascending: false }),
    supabase.from("service_bookings").select("*").order("created_at", { ascending: false }),
    supabase.from("mentor_profiles").select("*").eq("user_id", profile.user_id).maybeSingle(),
  ]);
  const menu = services ?? [];
  const requests = bookings ?? [];
  const paidRevenue = requests.filter((booking) => booking.payment_status === "paid").reduce((total, booking) => total + Number(booking.price), 0);
  const expertPayout = paidRevenue * 0.8;

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell">
        <DashboardHeader profile={profile} title="Expert workspace" description="Manage your service menu, booking requests, delivery, reputation, and earnings." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Active services", value: menu.filter((service) => service.status === "active").length, icon: Store },
            { label: "Booking requests", value: requests.filter((booking) => booking.status === "pending").length, icon: CalendarClock },
            { label: "Verification", value: mentorProfile?.verification_status ?? "pending", icon: BadgeCheck },
            { label: "Estimated payout", value: `₹${expertPayout.toLocaleString("en-IN")}`, icon: Banknote },
          ].map(({ label, value, icon: Icon }) => <div key={label} className="card p-5"><Icon className="text-teal-700" /><p className="mt-4 text-xs font-bold uppercase text-slate-500">{label}</p><p className="mt-1 text-xl font-black capitalize">{value}</p></div>)}
        </div>
        <div className="mt-6 flex flex-wrap gap-3"><Link href="/mentor/services/new" className="btn-primary">Create Service</Link><Link href="/mentor/services" className="btn-secondary">My Service Menu</Link><Link href="/mentor/bookings" className="btn-secondary">View Bookings</Link><Link href="/mentor/earnings" className="btn-secondary">Earnings</Link></div>
        <div className="mt-9 grid gap-6 lg:grid-cols-2">
          <div><h2 className="text-2xl font-black">Recent services</h2><div className="mt-5 space-y-3">{menu.slice(0, 4).map((service) => <article key={service.id} className="card flex items-center justify-between gap-4 p-5"><div><h3 className="font-black">{service.title}</h3><p className="mt-1 text-xs text-slate-500">{service.category} · <span className="capitalize">{service.status}</span></p></div><p className="font-black text-teal-800">₹{Number(service.price).toLocaleString("en-IN")}</p></article>)}</div></div>
          <div><h2 className="text-2xl font-black">Recent booking requests</h2><div className="mt-5 space-y-3">{requests.slice(0, 4).map((booking) => <article key={booking.id} className="card flex items-center justify-between gap-4 p-5"><div><h3 className="font-black">{booking.user_goal}</h3><p className="mt-1 text-xs text-slate-500 capitalize">{booking.status} · {booking.payment_status}</p></div><p className="font-black text-teal-800">₹{Number(booking.price).toLocaleString("en-IN")}</p></article>)}</div></div>
        </div>
      </div>
    </section>
  );
}
