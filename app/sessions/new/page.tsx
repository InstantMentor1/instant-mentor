import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import NewSessionForm from "@/components/NewSessionForm";
import { requireAuth } from "@/lib/auth";

export default async function NewSessionPage() {
  const { supabase, profile } = await requireAuth(["Student"]);
  const { data: subscription } = await supabase
    .from("user_subscriptions")
    .select("session_credits_total,session_credits_used")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  const remaining = subscription
    ? subscription.session_credits_total - subscription.session_credits_used
    : 0;

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell max-w-4xl">
        <DashboardHeader profile={profile} title="Request a new session" description="Share enough context so the right mentor can prepare before meeting you." />
        {!subscription ? (
          <div className="card p-8 text-center">
            <p className="font-semibold text-slate-700">Choose a plan to unlock session requests.</p>
            <Link href="/billing" className="btn-primary mt-5">Choose a Plan</Link>
          </div>
        ) : remaining <= 0 ? (
          <div className="card p-8 text-center">
            <p className="font-semibold text-slate-700">You have used all session credits. Upgrade your plan or buy a single session.</p>
            <Link href="/billing" className="btn-primary mt-5">View Plans</Link>
          </div>
        ) : (
          <NewSessionForm defaultTrack={profile.technical_track} />
        )}
      </div>
    </section>
  );
}
