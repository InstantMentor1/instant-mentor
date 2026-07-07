import Link from "next/link";
import { BadgeCheck, CalendarClock, CreditCard, Scale, Star, Store } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";

export default async function AdminDashboard() {
  const { supabase, profile } = await requireAuth(["Admin"]);
  const [{ count: expertCount }, { count: serviceCount }, { count: bookingCount }, { count: paymentCount }] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).in("role", ["Mentor", "Faculty", "Institution"]),
    supabase.from("expert_services").select("*", { count: "exact", head: true }),
    supabase.from("service_bookings").select("*", { count: "exact", head: true }),
    supabase.from("payments").select("*", { count: "exact", head: true }),
  ]);
  return <section className="bg-slate-50 py-10"><div className="container-shell"><DashboardHeader profile={profile} title="Admin Control Room" description="Approve experts, manage services, track bookings, commission, disputes, payments, payouts, and reviews." /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
    { label: "Experts to monitor", value: expertCount ?? 0, icon: BadgeCheck },
    { label: "Services", value: serviceCount ?? 0, icon: Store },
    { label: "Bookings", value: bookingCount ?? 0, icon: CalendarClock },
    { label: "Payments", value: paymentCount ?? 0, icon: CreditCard },
  ].map(({ label, value, icon: Icon }) => <div key={label} className="card p-5"><Icon className="text-teal-700" /><p className="mt-4 text-xs font-bold uppercase text-slate-500">{label}</p><p className="mt-1 text-3xl font-black">{value}</p></div>)}</div><div className="mt-8 flex flex-wrap gap-3"><Link href="/admin/experts" className="btn-primary">Approve Experts</Link><Link href="/admin/services" className="btn-secondary">Manage Services</Link><Link href="/admin/bookings" className="btn-secondary">Track Bookings</Link><Link href="/admin/commission" className="btn-secondary"><Scale size={16} /> Manage Commission</Link><Link href="/admin/disputes" className="btn-secondary">Handle Disputes</Link><Link href="/admin/payments" className="btn-secondary">Payments/Payouts</Link><Link href="/admin/reviews" className="btn-secondary"><Star size={16} /> Monitor Reviews</Link></div></div></section>;
}
