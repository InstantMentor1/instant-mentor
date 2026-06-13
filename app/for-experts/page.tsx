import Link from "next/link";
import { BadgeCheck, Banknote, CalendarClock, ListChecks, ShieldCheck, Star, type LucideIcon } from "lucide-react";
import PageHero from "@/components/PageHero";

const benefits: Array<{ title: string; text: string; icon: LucideIcon }> = [
  { title: "Create a professional profile", text: "Present your experience, expertise, background, and the outcomes you help users achieve.", icon: BadgeCheck },
  { title: "Build your service menu", text: "List multiple services with clear audiences, deliverables, duration, and format.", icon: ListChecks },
  { title: "Set your own pricing", text: "Price each service based on your expertise, time, scope, and deliverables.", icon: Banknote },
  { title: "Control availability", text: "Set booking limits, availability notes, and decide which requests to accept.", icon: CalendarClock },
  { title: "Build reputation", text: "Completed-booking reviews help strong experts earn trust and repeat demand.", icon: Star },
];

export default function ForExpertsPage() {
  return (
    <>
      <PageHero
        eyebrow="For expert partners"
        title="Turn your expertise into bookable services."
        description="Create your profile, list your services, set your pricing, manage availability, and earn through verified bookings."
        ctaLabel="Apply as Expert"
        ctaHref="/signup"
      />
      <section className="section-pad">
        <div className="container-shell">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ title, text, icon: Icon }) => (
              <article key={title} className="card p-7"><Icon className="text-teal-700" size={28} /><h2 className="mt-5 text-xl font-black">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p></article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-slate-50">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black">How expert service menus work</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">A service can be a resume review, academic guidance session, mock interview, project review, technical mentorship, business consultation, marketing audit, finance guidance, or another clearly scoped expert outcome.</p>
            <p className="mt-5 rounded-2xl bg-teal-50 p-4 font-bold text-teal-900">Platform commission: 20% · Expert payout: 80%</p>
          </div>
          <div className="card p-7">
            <ShieldCheck size={36} className="text-teal-700" />
            <h2 className="mt-4 text-2xl font-black">Verification process</h2>
            <ol className="mt-5 space-y-4">
              {["Create an expert account", "Complete your professional profile", "Submit expertise and identity details", "Get reviewed and verified", "Create and publish your first service"].map((item, index) => (
                <li key={item} className="flex gap-3 font-semibold"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs text-white">{index + 1}</span>{item}</li>
              ))}
            </ol>
            <Link href="/signup" className="btn-primary mt-7 w-full">Apply as Expert</Link>
          </div>
        </div>
      </section>
    </>
  );
}
