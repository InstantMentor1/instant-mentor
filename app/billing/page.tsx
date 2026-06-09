import DashboardHeader from "@/components/DashboardHeader";
import EarlyAccessConfirmationCard from "@/components/EarlyAccessConfirmationCard";
import PlanSelector from "@/components/PlanSelector";
import { requireAuth } from "@/lib/auth";

const planOrder = ["Single Session", "Launch Offer", "Regular Plan", "Premium Plan"];
const planDescriptions: Record<string, string> = {
  "Single Session": "Best for: Trying Instant Mentor once",
  "Launch Offer": "Best for early users. Minimum 6-month purchase.",
  "Regular Plan": "Best for: Consistent monthly mentor access",
  "Premium Plan": "Best for: Career-focused students",
};

export default async function BillingPage() {
  const { supabase, profile } = await requireAuth(["Student"]);
  const [{ data: plans }, { data: subscription }, { data: access }] = await Promise.all([
    supabase.from("plans").select("*").eq("is_active", true),
    supabase.from("user_subscriptions").select("*,plans(name)").eq("status", "active").order("created_at", { ascending: false }).limit(1).maybeSingle(),
    supabase.from("user_access").select("*").maybeSingle(),
  ]);
  const orderedPlans = [...(plans ?? [])].sort((a, b) => planOrder.indexOf(a.name) - planOrder.indexOf(b.name));
  const earlyAccessConfirmed = Boolean(access?.early_access_confirmed || subscription);

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell">
        <DashboardHeader profile={profile} title="Plans and billing" description="Razorpay Standard Checkout runs in test mode. Access changes only after server-side payment verification." />
        {subscription && (
          <div className="mb-6 rounded-2xl border border-teal-200 bg-teal-50 p-5">
            <strong>Active:</strong> {subscription.plans?.name} · {subscription.session_credits_total - subscription.session_credits_used} credits remaining
          </div>
        )}
        {!earlyAccessConfirmed && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold text-amber-900">
            Confirm your interest with ₹1 before purchasing a mentor session plan. The ₹1 confirmation does not include session credits.
          </div>
        )}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          <EarlyAccessConfirmationCard confirmed={earlyAccessConfirmed} />
          {orderedPlans.map((plan) => {
            const recommended = plan.name === "Launch Offer";
            return (
              <article key={plan.id} className={`card relative flex flex-col p-6 ${recommended ? "border-teal-600 bg-teal-900 text-white" : ""}`}>
                {recommended && (
                  <span className="absolute right-5 top-0 -translate-y-1/2 rounded-full bg-white px-3 py-1 text-xs font-bold text-teal-700 shadow">
                    Recommended
                  </span>
                )}
                <h2 className="text-xl font-black">{plan.name}</h2>
                <p className={`mt-2 text-sm ${recommended ? "text-teal-100" : "text-slate-500"}`}>{planDescriptions[plan.name]}</p>
                <p className={`mt-3 text-3xl font-black ${recommended ? "text-white" : "text-teal-700"}`}>₹{plan.price}</p>
                <p className={`text-sm ${recommended ? "text-teal-100" : "text-slate-500"}`}>{plan.billing_period === "monthly" ? "/month" : "/session"}</p>
                {recommended && <p className="mt-2 text-sm font-bold text-teal-100">Billed as ₹1,794 for 6 months</p>}
                <ul className={`my-5 flex-1 space-y-2 text-sm ${recommended ? "text-teal-50" : "text-slate-600"}`}>
                  {plan.features.map((feature: string) => <li key={feature}>• {feature}</li>)}
                </ul>
                <PlanSelector planName={plan.name} disabled={!earlyAccessConfirmed} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
