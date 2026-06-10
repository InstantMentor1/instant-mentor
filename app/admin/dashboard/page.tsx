import Link from "next/link";
import { BriefcaseBusiness, CalendarClock, Store, Users } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";

export default async function AdminDashboard() {
  const { supabase, profile } = await requireAuth(["Admin"]);
  const [{ count: userCount }, { count: expertCount }, { count: serviceCount }, { count: bookingCount }] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }).in("role", ["Mentor", "Faculty", "Institution"]),
    supabase.from("expert_services").select("*", { count: "exact", head: true }),
    supabase.from("service_bookings").select("*", { count: "exact", head: true }),
  ]);
  return <section className="bg-slate-50 py-10"><div className="container-shell"><DashboardHeader profile={profile} title="Marketplace control room" description="Manage users, experts, services, bookings, categories, and payments." /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
    { label: "Users", value: userCount ?? 0, icon: Users },
    { label: "Experts", value: expertCount ?? 0, icon: BriefcaseBusiness },
    { label: "Services", value: serviceCount ?? 0, icon: Store },
    { label: "Bookings", value: bookingCount ?? 0, icon: CalendarClock },
  ].map(({ label, value, icon: Icon }) => <div key={label} className="card p-5"><Icon className="text-teal-700" /><p className="mt-4 text-xs font-bold uppercase text-slate-500">{label}</p><p className="mt-1 text-3xl font-black">{value}</p></div>)}</div><div className="mt-8 flex flex-wrap gap-3"><Link href="/admin/services" className="btn-primary">Manage Services</Link><Link href="/admin/bookings" className="btn-secondary">Manage Bookings</Link><Link href="/admin/experts" className="btn-secondary">Review Experts</Link><Link href="/admin/payments" className="btn-secondary">Payments</Link></div></div></section>;
}
