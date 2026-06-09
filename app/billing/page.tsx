import DashboardHeader from "@/components/DashboardHeader";
import PlanSelector from "@/components/PlanSelector";
import { requireAuth } from "@/lib/auth";

const planOrder = ["Single Session", "Launch Offer", "Regular Plan", "Premium Plan"];
const planDescriptions: Record<string, string> = {
  "Single Session": "Best for: Trying Instant Mentor once",
  "Launch Offer": "Minimum 6-month purchase. Total ₹1,794 for 6 months. Best for: Early students starting with mentor support",
  "Regular Plan": "Best for: Consistent monthly mentor access",
  "Premium Plan": "Best for: Career-focused students",
};

export default async function BillingPage() {
  const { supabase, profile } = await requireAuth(["Student"]);
  const [{ data: plans }, { data: subscription }] = await Promise.all([
    supabase.from("plans").select("*").eq("is_active", true),
    supabase.from("user_subscriptions").select("*,plans(name)").eq("status", "active").order("created_at", { ascending: false }).limit(1).maybeSingle(),
  ]);
  const orderedPlans = [...(plans ?? [])].sort((a, b) => planOrder.indexOf(a.name) - planOrder.indexOf(b.name));

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell">
        <DashboardHeader profile={profile} title="Plans and billing" description="Select a plan. Payments are confirmed manually during early access." />
        {subscription && <div className="mb-6 rounded-2xl border border-teal-200 bg-teal-50 p-5"><strong>Active:</strong> {subscription.plans?.name} · {subscription.session_credits_total - subscription.session_credits_used} credits remaining</div>}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {orderedPlans.map((plan) => (
            <article key={plan.id} className={`card relative flex flex-col p-6 ${plan.name === "Regular Plan" ? "border-teal-600" : ""}`}>
              {plan.name === "Regular Plan" && <span className="absolute right-5 top-0 -translate-y-1/2 rounded-full bg-teal-700 px-3 py-1 text-xs font-bold text-white">Recommended</span>}
              <h2 className="text-xl font-black">{plan.name}</h2>
              <p className="mt-2 text-sm text-slate-500">{planDescriptions[plan.name]}</p>
              <p className="mt-3 text-3xl font-black text-teal-700">₹{plan.price}</p>
              <p className="text-sm text-slate-500">{plan.billing_period === "monthly" ? "/month" : "/session"}</p>
              <ul className="my-5 flex-1 space-y-2 text-sm text-slate-600">{plan.features.map((feature: string) => <li key={feature}>• {feature}</li>)}</ul>
              <PlanSelector planId={plan.id} planName={plan.name} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
