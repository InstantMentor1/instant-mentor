import { BadgeCheck, Compass, Presentation } from "lucide-react";
import RazorpayCheckout from "@/components/RazorpayCheckout";

export default function EarlyAccessConfirmationCard({
  confirmed = false,
}: {
  confirmed?: boolean;
}) {
  return (
    <article className="card relative flex h-full flex-col border-teal-200 p-6">
      {confirmed && (
        <span className="absolute right-5 top-0 -translate-y-1/2 rounded-full bg-teal-700 px-3 py-1 text-xs font-bold text-white">
          Active
        </span>
      )}
      <span className="eyebrow w-fit">Dashboard exploration</span>
      <h2 className="text-xl font-black text-ink">₹1 Early Access Confirmation</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Pay ₹1 to confirm your interest in Instant Mentor Early Access.
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        This unlocks early-access dashboard exploration for mentors, webinars, and plans. Live mentor sessions are not included.
      </p>
      <ul className="my-5 flex-1 space-y-3 text-sm text-slate-700">
        <li className="flex gap-2"><BadgeCheck size={17} className="shrink-0 text-teal-700" /> Confirm student interest</li>
        <li className="flex gap-2"><Presentation size={17} className="shrink-0 text-teal-700" /> Explore webinars and mentors</li>
        <li className="flex gap-2"><Compass size={17} className="shrink-0 text-teal-700" /> Compare available session plans</li>
      </ul>
      {confirmed ? (
        <p className="rounded-xl bg-teal-50 p-3 text-sm font-semibold text-teal-800">Early Access Confirmation active</p>
      ) : (
        <RazorpayCheckout productType="early_access" label="Confirm Interest for ₹1" />
      )}
    </article>
  );
}
