import Link from "next/link";
import { ArrowRight, Share2, Users } from "lucide-react";
import type { AppRole } from "@/lib/auth-shared";
import { dashboardForRole } from "@/lib/auth-shared";

export default function ReferralSection({ role = null }: { role?: AppRole | null }) {
  const href = role ? dashboardForRole(role) : "/signup";
  const label = role ? "Open your dashboard" : "Create Student Account";

  return (
    <section className="section-pad" aria-labelledby="referral-title">
      <div className="container-shell">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft lg:grid lg:grid-cols-[1.15fr_.85fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <span className="eyebrow"><Share2 size={14} className="mr-1" aria-hidden="true" /> Referral program</span>
            <h2 id="referral-title" className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
              Grow with people who take learning seriously
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Invite eligible classmates and early-career professionals to discover mentor support. Any referral benefit and its terms will be shown clearly before you share.
            </p>
            <Link href={href} className="btn-primary mt-7">{label} <ArrowRight size={17} /></Link>
          </div>
          <div className="flex min-h-64 items-center justify-center bg-teal-900 p-10 text-center text-white">
            <div>
              <Users className="mx-auto text-teal-100" size={42} aria-hidden="true" />
              <p className="mt-5 text-xl font-extrabold">Relevant people. Better questions. Stronger learning habits.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
