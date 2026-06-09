import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import NewSessionForm from "@/components/NewSessionForm";
import { requireAuth } from "@/lib/auth";
import { getActiveSessionSubscription } from "@/lib/subscription-access";

export default async function NewSessionPage() {
  const { supabase, profile } = await requireAuth(["Student"]);
  const [subscription, { data: access }] = await Promise.all([
    getActiveSessionSubscription(profile.user_id),
    supabase.from("user_access").select("early_access_confirmed").maybeSingle(),
  ]);
  const remaining = subscription
    ? subscription.session_credits_total - subscription.session_credits_used
    : 0;

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell max-w-4xl">
        <DashboardHeader profile={profile} title="Request a new session" description="Share enough context so the right mentor can prepare before meeting you." />
        {!subscription ? (
          <div className="card p-8 text-center">
            <p className="font-semibold text-slate-700">
              {access?.early_access_confirmed
                ? "You have confirmed early access. Please choose a session plan to request mentor sessions."
                : "Confirm your early-access interest, then choose a session plan to request mentor sessions."}
            </p>
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
