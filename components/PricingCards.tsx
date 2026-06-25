import Link from "next/link";
import { Check } from "lucide-react";
import type { AppRole } from "@/lib/auth-shared";
import { plans } from "@/lib/data";

const studentLabels: Record<string, string> = {
  "Early Access Confirmation": "Confirm Interest for ₹1",
  "Single Session": "Buy Single Session",
  "Launch Offer": "Choose Launch Offer",
  "Regular Plan": "Choose Regular Plan",
  "Premium Plan": "Upgrade to Premium",
};

export default function PricingCards({ role = null }: { role?: AppRole | null }) {
  const isMentor = role === "Mentor" || role === "Faculty" || role === "Institution";

  return (
    <>
      {isMentor && (
        <p className="mb-6 rounded-2xl border border-teal-200 bg-teal-50 p-5 font-semibold text-teal-900">
          Student pricing is not applicable to expert accounts.
        </p>
      )}
      {role === "Admin" && (
        <p className="mb-6 rounded-2xl border border-teal-200 bg-teal-50 p-5 font-semibold text-teal-900">
          Manage plans from Admin Dashboard.
        </p>
      )}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`relative flex flex-col rounded-3xl border p-7 ${
              plan.popular
                ? "border-teal-600 bg-teal-900 text-white shadow-2xl shadow-teal-900/20 lg:-translate-y-3"
                : "border-slate-200 bg-white text-ink shadow-soft"
            }`}
          >
            {plan.popular && (
              <span className="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-white px-3 py-1 text-xs font-bold text-teal-700 shadow">
                Recommended
              </span>
            )}
            <h3 className="text-xl font-extrabold">{plan.name}</h3>
            <p className={`mt-2 text-sm ${plan.popular ? "text-teal-100" : "text-slate-500"}`}>{plan.description}</p>
            <div className="mt-6">
              <span className="text-4xl font-black">{plan.price}</span>
              <span className={plan.popular ? "text-teal-100" : "text-slate-500"}>{plan.suffix}</span>
            </div>
            <ul className="my-7 flex-1 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <span className={`mt-0.5 rounded-full p-0.5 ${plan.popular ? "bg-teal-600" : "bg-teal-50 text-teal-700"}`}>
                    <Check size={14} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            {!role && (
              <Link href="/signup" className={plan.popular ? "btn-secondary border-white bg-white text-teal-800" : "btn-primary"}>
                {studentLabels[plan.name] ?? "Create Student Account"}
              </Link>
            )}
            {role === "Student" && (
              <Link href="/billing" className={plan.popular ? "btn-secondary border-white bg-white text-teal-800" : "btn-primary"}>
                {studentLabels[plan.name]}
              </Link>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
