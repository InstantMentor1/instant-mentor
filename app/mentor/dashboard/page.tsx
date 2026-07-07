import Link from "next/link";
import { Banknote, CalendarClock, CheckCircle2, PackagePlus, ShieldCheck, Store, Users } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";
import { calculatePlatformFee } from "@/lib/marketplace";

export default async function MentorDashboard() {
  const { supabase, profile } = await requireAuth(["Mentor", "Faculty", "Institution"]);
  const [{ data: services }, { data: bookings }] = await Promise.all([
    supabase.from("expert_services").select("*").order("created_at", { ascending: false }),
    supabase.from("service_bookings").select("*").order("created_at", { ascending: false }),
  ]);
  const menu = services ?? [];
  const requests = bookings ?? [];
  const paidPayout = requests
    .filter((booking) => booking.payment_status === "paid")
    .reduce((total, booking) => total + calculatePlatformFee(Number(booking.price)).smePayout, 0);

  return (
    <section className="bg-[#F8FAFC] py-10">
      <div className="container-shell">
        <DashboardHeader
          profile={profile}
          title="Expert Dashboard"
          description="Create menu services, packages, rooms, add-ons, promo codes, availability, and receive direct bookings through Google Meet."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {[
            { label: "Approval", value: profile.role === "Mentor" ? "Pending" : "Review", icon: ShieldCheck },
            { label: "My services", value: menu.filter((service) => service.status === "active").length, icon: Store },
            { label: "Add-ons", value: 0, icon: PackagePlus },
            { label: "Rooms", value: 0, icon: Users },
            { label: "Pending bookings", value: requests.filter((booking) => booking.status === "pending").length, icon: CalendarClock },
            { label: "Earnings", value: `Rs. ${paidPayout.toLocaleString("en-IN")}`, icon: Banknote },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="card p-5">
              <Icon className="text-blue-600" />
              <p className="mt-4 text-xs font-bold uppercase text-slate-500">{label}</p>
              <p className="mt-1 text-xl font-black capitalize">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/mentor/services/new" className="btn-primary">Create Service</Link>
          <Link href="/mentor/services" className="btn-secondary">My Services</Link>
          <Link href="/mentor/rooms" className="btn-secondary">My Rooms</Link>
          <Link href="/mentor/bookings" className="btn-secondary">Bookings</Link>
          <Link href="/mentor/promo-codes" className="btn-secondary">Promo Codes</Link>
          <Link href="/mentor/earnings" className="btn-secondary">Earnings</Link>
          <Link href="/mentor/verification" className="btn-secondary">Profile & Verification</Link>
        </div>
        <div className="mt-9 grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black">Recent services</h2>
            <div className="mt-5 space-y-3">
              {menu.slice(0, 4).map((service) => (
                <article key={service.id} className="card flex items-center justify-between gap-4 p-5">
                  <div>
                    <h3 className="font-black">{service.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">{service.category} - <span className="capitalize">{service.status}</span></p>
                  </div>
                  <p className="font-black text-navy">Rs. {Number(service.price).toLocaleString("en-IN")}</p>
                </article>
              ))}
              {menu.length === 0 && (
                <div className="card p-5">
                  <CheckCircle2 className="text-blue-600" />
                  <p className="mt-3 font-bold">Create your first expert service to start receiving bookings.</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black">Recent bookings</h2>
            <div className="mt-5 space-y-3">
              {requests.slice(0, 4).map((booking) => (
                <article key={booking.id} className="card flex items-center justify-between gap-4 p-5">
                  <div>
                    <h3 className="font-black">{booking.user_goal}</h3>
                    <p className="mt-1 text-xs text-slate-500 capitalize">{booking.status} - {booking.payment_status}</p>
                  </div>
                  <p className="font-black text-slate-900">Rs. {Number(booking.price).toLocaleString("en-IN")}</p>
                </article>
              ))}
              {requests.length === 0 && (
                <div className="card p-5">
                  <CheckCircle2 className="text-blue-600" />
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
