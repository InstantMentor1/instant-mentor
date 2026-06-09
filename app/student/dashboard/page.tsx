import Link from "next/link";
import { BookOpenCheck, CalendarClock, CheckCircle2, Coins } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import RazorpayCheckout from "@/components/RazorpayCheckout";
import SessionCard from "@/components/SessionCard";
import { requireAuth } from "@/lib/auth";
import type { SessionRequest } from "@/lib/sessions";

export default async function StudentDashboard() {
  const { supabase, profile } = await requireAuth(["Student"]);
  const [{ data }, { data: subscription }, { count: webinarCount }, { data: access }] = await Promise.all([
    supabase.from("session_requests").select("*").order("created_at", { ascending: false }),
    supabase.from("user_subscriptions").select("*,plans(name)").eq("status", "active").order("created_at", { ascending: false }).limit(1).maybeSingle(),
    supabase.from("webinars").select("*", { count: "exact", head: true }).eq("status", "upcoming"),
    supabase.from("user_access").select("*").maybeSingle(),
  ]);
  const sessions = (data ?? []) as SessionRequest[];
  const pending = sessions.filter((session) => session.status === "pending");
  const upcoming = sessions.filter((session) => ["accepted", "scheduled"].includes(session.status));
  const completed = sessions.filter((session) => session.status === "completed");
  const totalCredits = subscription?.session_credits_total ?? 0;
  const usedCredits = subscription?.session_credits_used ?? 0;
  const remainingCredits = Math.max(totalCredits - usedCredits, 0);
  const earlyAccessConfirmed = Boolean(access?.early_access_confirmed || subscription);

  if (!earlyAccessConfirmed) {
    return (
      <section className="bg-slate-50 py-10">
        <div className="container-shell">
          <DashboardHeader profile={profile} title={`Welcome, ${profile.full_name}`} description="Confirm your interest before exploring the early-access student dashboard." />
          <div className="card mx-auto max-w-2xl p-8 text-center">
            <h2 className="text-2xl font-black text-ink">Confirm your interest with ₹1 to unlock early-access dashboard exploration.</h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
              This confirmation unlocks dashboard exploration, mentors, webinars, and plans. It does not include a live mentor session or session credit.
            </p>
            <div className="mx-auto mt-6 max-w-sm">
              <RazorpayCheckout productType="early_access" label="Confirm Interest for ₹1" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell">
        <DashboardHeader profile={profile} title={`Welcome, ${profile.full_name}`} description="Manage your technical mentorship sessions and private conversations." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Technical tracks", value: profile.technical_tracks?.length ? profile.technical_tracks.join(", ") : profile.technical_track ?? "Not selected", icon: BookOpenCheck },
            { label: "Session credits", value: subscription ? `${remainingCredits} remaining` : "No active plan", icon: Coins },
            { label: "Pending", value: String(pending.length), icon: CalendarClock },
            { label: "Completed", value: String(completed.length), icon: CheckCircle2 },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="card p-5"><Icon className="text-teal-700" /><p className="mt-4 text-xs font-bold uppercase text-slate-500">{label}</p><p className="mt-1 text-xl font-black">{value}</p></div>
          ))}
        </div>
        {subscription && (
          <div className="mt-5 rounded-2xl border border-teal-200 bg-teal-50 p-5 text-sm font-semibold text-teal-900">
            Total credits: {totalCredits} · Used: {usedCredits} · Remaining: {remainingCredits}
          </div>
        )}
        {!subscription && (
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="font-semibold text-amber-900">Your Early Access Confirmation is active. Choose a plan to start requesting mentor sessions.</p>
            <Link href="/billing" className="btn-primary mt-4">Choose a Plan</Link>
          </div>
        )}
        {subscription && remainingCredits === 0 && (
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 font-semibold text-amber-900">
            You have used all session credits. Upgrade your plan or buy a single session.
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/billing" className="btn-secondary">Plans & Billing</Link>
          <Link href="/mentors" className="btn-secondary">Explore Mentors</Link>
          <Link href="/webinars" className="btn-secondary">Webinars ({webinarCount ?? 0})</Link>
          <Link href="/career-support" className="btn-secondary">Career Support</Link>
          <Link href="/profile" className="btn-secondary">Profile</Link>
        </div>
        <div className="mt-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black">Your sessions</h2>
          {remainingCredits > 0 ? (
            <Link href="/sessions/new" className="btn-primary">Request New Session</Link>
          ) : (
            <Link href="/billing" className="btn-primary">{subscription ? "Buy More Credits" : "Choose a Plan"}</Link>
          )}
        </div>
        {sessions.length === 0 ? (
          <div className="card mt-6 p-10 text-center text-slate-600">No session requests yet. Start with a focused doubt, project, or career question.</div>
        ) : (
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {[...upcoming, ...pending, ...completed, ...sessions.filter((session) => ![...upcoming, ...pending, ...completed].some((item) => item.id === session.id))].map((session) => <SessionCard key={session.id} session={session} />)}
          </div>
        )}
      </div>
    </section>
  );
}
