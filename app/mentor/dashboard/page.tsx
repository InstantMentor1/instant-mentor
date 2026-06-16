import Link from "next/link";
import { Banknote, CalendarClock, CheckCircle2, Clock3, Star, Store } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";
import { calculatePlatformFee } from "@/lib/marketplace";

export default async function ExpertDashboard() {
  const { supabase, profile } = await requireAuth(["Mentor", "Faculty", "Institution"]);
  const [{ data: services }, { data: bookings }, { data: reviews }] = await Promise.all([
    supabase.from("expert_services").select("*").order("created_at", { ascending: false }),
    supabase.from("service_bookings").select("*").order("created_at", { ascending: false }),
    supabase.from("service_reviews").select("rating").eq("expert_id", profile.user_id),
  ]);
  const menu = services ?? [];
  const requests = bookings ?? [];
  const paidPayout = requests
    .filter((booking) => booking.payment_status === "paid")
    .reduce((total, booking) => total + calculatePlatformFee(Number(booking.price)).smePayout, 0);

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell">
        <DashboardHeader profile={profile} title="SME Partner Dashboard" description="Manage your expertise menu, availability, student bookings, delivery, reputation, and earnings." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {[
            { label: "Active expertise", value: menu.filter((service) => service.status === "active").length, icon: Store },
            { label: "Pending bookings", value: requests.filter((booking) => booking.status === "pending").length, icon: CalendarClock },
            { label: "Scheduled", value: requests.filter((booking) => booking.status === "scheduled").length, icon: Clock3 },
            { label: "Availability", value: menu.some((service) => service.availability_notes) ? "Configured" : "Add details", icon: CheckCircle2 },
            { label: "Earnings", value: `₹${paidPayout.toLocaleString("en-IN")}`, icon: Banknote },
            { label: "Reviews", value: reviews?.length ?? 0, icon: Star },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="card p-5"><Icon className="text-teal-700" /><p className="mt-4 text-xs font-bold uppercase text-slate-500">{label}</p><p className="mt-1 text-xl font-black capitalize">{value}</p></div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/mentor/services/new" className="btn-primary">Create Expertise Item</Link>
          <Link href="/mentor/services" className="btn-secondary">My Expertise Menu</Link>
          <Link href="/mentor/bookings" className="btn-secondary">Bookings</Link>
          <Link href="/mentor/earnings" className="btn-secondary">Earnings</Link>
        </div>
        <div className="mt-9 grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black">Recent expertise items</h2>
            <div className="mt-5 space-y-3">
              {menu.slice(0, 4).map((service) => (
                <article key={service.id} className="card flex items-center justify-between gap-4 p-5">
                  <div><h3 className="font-black">{service.title}</h3><p className="mt-1 text-xs text-slate-500">{service.category} - <span className="capitalize">{service.status}</span></p></div>
                  <p className="font-black text-teal-800">₹{Number(service.price).toLocaleString("en-IN")}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black">Recent student bookings</h2>
            <div className="mt-5 space-y-3">
              {requests.slice(0, 4).map((booking) => (
                <article key={booking.id} className="card flex items-center justify-between gap-4 p-5">
                  <div><h3 className="font-black">{booking.user_goal}</h3><p className="mt-1 text-xs text-slate-500 capitalize">{booking.status} - {booking.payment_status}</p></div>
                  <p className="font-black text-teal-800">₹{Number(booking.price).toLocaleString("en-IN")}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
