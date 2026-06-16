import Link from "next/link";
import { BadgeCheck, Banknote, CalendarClock, ListChecks, ShieldCheck, Star, type LucideIcon } from "lucide-react";
import PageHero from "@/components/PageHero";

const benefits: Array<{ title: string; text: string; icon: LucideIcon }> = [
  { title: "Verified SME profile", text: "Present your domain depth, credentials, background, and the outcomes you help students achieve.", icon: BadgeCheck },
  { title: "Expertise menu", text: "List multiple expertise items with clear student audiences, deliverables, duration, and format.", icon: ListChecks },
  { title: "SME-set pricing", text: "Price each item based on your expertise, time, scope, and deliverables. Minimum price is Rs 500.", icon: Banknote },
  { title: "Serious student filter", text: "Students must share their goal, what they already tried, and acknowledge the non-refundable deposit before booking.", icon: CalendarClock },
  { title: "Reputation compounding", text: "Completed-booking reviews help strong SMEs earn trust and repeat demand.", icon: Star },
];

export default function ForExpertsPage() {
  return (
    <>
      <PageHero
        eyebrow="For SME partners"
        title="Your time is valuable. We make sure every student who reaches you has earned it."
        description="Create your verified SME profile, list your expertise menu, set your own pricing, manage availability, and earn through serious student bookings."
        ctaLabel="Join as an SME"
        ctaHref="/apply-sme"
      />
      <section className="section-pad">
        <div className="container-shell">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ title, text, icon: Icon }) => (
              <article key={title} className="card p-7">
                <Icon className="text-teal-700" size={28} />
                <h2 className="mt-5 text-xl font-black">{title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-slate-50">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black">How SME expertise menus work</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              An expertise item can be a research review, academic guidance,
              finance model review, legal concept clarification, product critique,
              data science roadmap, interview preparation, or another clearly scoped
              domain outcome.
            </p>
            <p className="mt-5 rounded-2xl bg-teal-50 p-4 font-bold text-teal-900">
              Sliding platform commission: 15% up to Rs 1,000, 20% up to Rs 3,000,
              and 25% above Rs 3,000.
            </p>
          </div>
          <div className="card p-7">
            <ShieldCheck size={36} className="text-teal-700" />
            <h2 className="mt-4 text-2xl font-black">Verification process</h2>
            <ol className="mt-5 space-y-4">
              {["Create an SME partner account", "Complete your professional profile", "Submit expertise and identity evidence", "Get reviewed and verified", "Create and publish your first expertise item"].map((item, index) => (
                <li key={item} className="flex gap-3 font-semibold">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs text-white">{index + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
            <Link href="/apply-sme" className="btn-primary mt-7 w-full">Join as an SME</Link>
          </div>
        </div>
      </section>
    </>
  );
}
