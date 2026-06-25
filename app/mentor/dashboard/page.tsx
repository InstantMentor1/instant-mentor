import Link from "next/link";
import { Banknote, CalendarClock, CheckCircle2, Clock3, Mic2, Star, Store } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";
import { calculatePlatformFee } from "@/lib/marketplace";

export default async function MentorDashboard() {
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
    <section className="bg-sky-50 py-10">
      <div className="container-shell">
        <DashboardHeader
          profile={profile}
          title="Expert Dashboard"
          description="Create expert services, manage expert talks, handle bookings, and track your earnings on My Expert Talk."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {[
            { label: "My services", value: menu.filter((service) => service.status === "active").length, icon: Store },
            { label: "Upcoming talks", value: 0, icon: Mic2 },
            { label: "Pending bookings", value: requests.filter((booking) => booking.status === "pending").length, icon: CalendarClock },
            { label: "Scheduled", value: requests.filter((booking) => booking.status === "scheduled").length, icon: Clock3 },
            { label: "Earnings", value: `₹${paidPayout.toLocaleString("en-IN")}`, icon: Banknote },
            { label: "Reviews", value: reviews?.length ?? 0, icon: Star },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="card border-blue-100 p-5">
              <Icon className="text-teal-700" />
              <p className="mt-4 text-xs font-bold uppercase text-slate-500">{label}</p>
              <p className="mt-1 text-xl font-black capitalize">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/mentor/services/new" className="btn-primary">Create Service</Link>
          <Link href="/expert-talks" className="btn-secondary">Plan Expert Talk</Link>
          <Link href="/mentor/services" className="btn-secondary">My Services</Link>
          <Link href="/mentor/bookings" className="btn-secondary">Bookings</Link>
          <Link href="/mentor/earnings" className="btn-secondary">Earnings</Link>
        </div>
        <div className="mt-9 grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black">Recent services</h2>
            <div className="mt-5 space-y-3">
              {menu.slice(0, 4).map((service) => (
                <article key={service.id} className="card flex items-center justify-between gap-4 border-blue-100 p-5">
                  <div>
                    <h3 className="font-black">{service.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">{service.category} - <span className="capitalize">{service.status}</span></p>
                  </div>
                  <p className="font-black text-teal-800">₹{Number(service.price).toLocaleString("en-IN")}</p>
                </article>
              ))}
              {menu.length === 0 && (
                <div className="card border-blue-100 p-5">
                  <CheckCircle2 className="text-teal-700" />
                  <p className="mt-3 font-bold">Create your first expert service to start receiving bookings.</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black">Recent bookings</h2>
            <div className="mt-5 space-y-3">
              {requests.slice(0, 4).map((booking) => (
                <article key={booking.id} className="card flex items-center justify-between gap-4 border-blue-100 p-5">
                  <div>
                    <h3 className="font-black">{booking.user_goal}</h3>
                    <p className="mt-1 text-xs text-slate-500 capitalize">{booking.status} - {booking.payment_status}</p>
                  </div>
                  <p className="font-black text-teal-800">₹{Number(booking.price).toLocaleString("en-IN")}</p>
                </article>
              ))}
              {requests.length === 0 && (
                <div className="card border-blue-100 p-5">
                  <CheckCircle2 className="text-teal-700" />
                  <p className="mt-3 font-bold">Bookings will appear here after students choose your services.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
