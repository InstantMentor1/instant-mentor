import Link from "next/link";
import { BadgeCheck, Banknote, CalendarClock, Layers3 } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import SessionCard from "@/components/SessionCard";
import { requireAuth } from "@/lib/auth";
import type { SessionRequest } from "@/lib/sessions";

export default async function MentorDashboard() {
  const { supabase, profile } = await requireAuth(["Mentor", "Faculty", "Institution"]);
  const [{ data: sessionsData }, { data: mentorProfile }, { data: earnings }, { count: webinarCount }, { count: registrationCount }] = await Promise.all([
    supabase.from("session_requests").select("*").order("created_at", { ascending: false }),
    supabase.from("mentor_profiles").select("*").eq("user_id", profile.user_id).maybeSingle(),
    supabase.from("mentor_earnings").select("mentor_payout,status"),
    supabase.from("webinars").select("*", { count: "exact", head: true }).eq("mentor_id", profile.user_id),
    supabase.from("webinar_registrations").select("*,webinars!inner(mentor_id)", { count: "exact", head: true }).eq("webinars.mentor_id", profile.user_id),
  ]);
  const sessions = (sessionsData ?? []) as SessionRequest[];
  const pending = sessions.filter((session) => ["pending", "assigned"].includes(session.status));
  const upcoming = sessions.filter((session) => ["accepted", "scheduled"].includes(session.status));
  const totalEarnings = (earnings ?? []).reduce((total, item) => total + Number(item.mentor_payout), 0);

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell">
        <DashboardHeader profile={profile} title="Mentor workspace" description="Review assigned requests, create webinars, and support students securely." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Expertise", value: mentorProfile?.expertise_areas?.join(", ") || profile.technical_track || "Not set", icon: Layers3 },
            { label: "Verification", value: mentorProfile?.verification_status || "pending", icon: BadgeCheck },
            { label: "Webinars", value: `${webinarCount ?? 0} · ${registrationCount ?? 0} registrations`, icon: CalendarClock },
            { label: "Earnings", value: `₹${totalEarnings.toFixed(0)}`, icon: Banknote },
          ].map(({ label, value, icon: Icon }) => <div key={label} className="card p-5"><Icon className="text-teal-700" /><p className="mt-4 text-xs font-bold uppercase text-slate-500">{label}</p><p className="mt-1 text-lg font-black capitalize">{value}</p></div>)}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/webinars/create" className="btn-primary">Create Webinar</Link>
          <Link href="/webinars" className="btn-secondary">My Webinars</Link>
          <Link href="/mentor/earnings" className="btn-secondary">Webinar Earnings</Link>
          <Link href="/profile" className="btn-secondary">Profile</Link>
        </div>
        <h2 className="mt-8 text-2xl font-black">Assigned sessions</h2>
        {sessions.length === 0 ? <div className="card mt-6 p-10 text-center text-slate-600">No sessions have been assigned to you yet.</div> : (
          <div className="mt-6 grid gap-5 lg:grid-cols-2">{[...upcoming, ...pending, ...sessions.filter((session) => ![...upcoming, ...pending].some((item) => item.id === session.id))].map((session) => <SessionCard key={session.id} session={session} />)}</div>
        )}
      </div>
    </section>
  );
}
