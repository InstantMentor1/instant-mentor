import Link from "next/link";
import { CalendarClock, GraduationCap, Presentation, Users } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";

export default async function AdminDashboard() {
  const { supabase, profile } = await requireAuth(["Admin"]);
  const [
    { count: studentCount },
    { count: mentorCount },
    { count: pendingCount },
    { count: scheduledCount },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "Student"),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "Mentor"),
    supabase.from("session_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("session_requests").select("*", { count: "exact", head: true }).eq("status", "scheduled"),
  ]);

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell">
        <DashboardHeader profile={profile} title="Admin control room" description="Manage users, mentor assignment, and private session operations." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Students", value: studentCount ?? 0, icon: GraduationCap },
            { label: "Mentors", value: mentorCount ?? 0, icon: Presentation },
            { label: "Pending sessions", value: pendingCount ?? 0, icon: CalendarClock },
            { label: "Scheduled sessions", value: scheduledCount ?? 0, icon: Users },
          ].map(({ label, value, icon: Icon }) => <div key={label} className="card p-5"><Icon className="text-teal-700" /><p className="mt-4 text-xs font-bold uppercase text-slate-500">{label}</p><p className="mt-1 text-3xl font-black">{value}</p></div>)}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/admin/sessions" className="btn-primary">Manage Sessions</Link>
          <Link href="/admin/users" className="btn-secondary">View Users</Link>
          <Link href="/admin/payments" className="btn-secondary">Manage Payments</Link>
          <Link href="/admin/webinars" className="btn-secondary">Manage Webinars</Link>
        </div>
      </div>
    </section>
  );
}
