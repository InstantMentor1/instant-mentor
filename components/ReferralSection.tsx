import Link from "next/link";
import { ArrowRight, Crown, Gift, Share2, UserPlus } from "lucide-react";
import type { AppRole } from "@/lib/auth-shared";
import { dashboardForRole } from "@/lib/auth-shared";

export default function ReferralSection({ role = null }: { role?: AppRole | null }) {
  const href = role ? dashboardForRole(role) : "/signup";
  const label = role ? "Open your dashboard" : "Create Student Account";
  const steps = [
    { title: "Refer Friends", text: "Invite eligible students and early-career professionals.", icon: UserPlus },
    { title: "Earn Rewards", text: "See the exact reward terms before joining an active campaign.", icon: Gift },
    { title: "Unlock Benefits", text: "Eligible campaigns may include plan or webinar benefits.", icon: Crown },
  ];

  return (
    <section className="section-pad" aria-labelledby="referral-title">
      <div className="container-shell">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft lg:grid lg:grid-cols-[1.15fr_.85fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <span className="eyebrow"><Share2 size={14} className="mr-1" aria-hidden="true" /> Referral program</span>
            <h2 id="referral-title" className="text-3xl font-black tracking-tight text-ink sm:text-4xl">Share mentorship. Grow together.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Invite eligible classmates and early-career professionals to discover mentor support. Any referral benefit and its terms will be shown clearly before you share.
            </p>
            <Link href={href} className="btn-primary mt-7">{label} <ArrowRight size={17} /></Link>
          </div>
          <div className="grid gap-4 bg-teal-900 p-7 text-white sm:p-10">
            {steps.map(({ title, text, icon: Icon }, index) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-teal-800" aria-hidden="true">
                  <Icon size={19} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-100">Step {index + 1}</p>
                  <h3 className="font-extrabold">{title}</h3>
                  <p className="mt-1 text-sm text-teal-50">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
