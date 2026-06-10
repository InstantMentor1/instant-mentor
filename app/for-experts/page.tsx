import Link from "next/link";
import { Banknote, CalendarClock, ListChecks, ShieldCheck, Star, type LucideIcon } from "lucide-react";
import PageHero from "@/components/PageHero";

const benefits: Array<{ title: string; text: string; icon: LucideIcon }> = [
  { title: "Package your knowledge", text: "Create clear services with pricing, duration, audience, and deliverables.", icon: ListChecks },
  { title: "Control your availability", text: "Set booking limits and decide which requests fit your expertise.", icon: CalendarClock },
  { title: "Build trusted reputation", text: "Verification and completed-booking reviews help users choose confidently.", icon: Star },
  { title: "Earn from outcomes", text: "Instant Mentor keeps 20% platform commission; experts receive 80%.", icon: Banknote },
];

export default function ForExpertsPage() {
  return (
    <>
      <PageHero eyebrow="For experts" title="Turn your expertise into a trusted service menu." description="Professionals, teachers, trainers, founders, consultants, and industry experts can create bookable services and earn from focused, outcome-driven guidance." ctaLabel="Apply as Expert" ctaHref="/signup" />
      <section className="section-pad">
        <div className="container-shell grid gap-6 md:grid-cols-2">
          {benefits.map(({ title, text, icon: Icon }) => <article key={title} className="card p-7"><Icon className="text-teal-700" size={28} /><h2 className="mt-5 text-xl font-black">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}
        </div>
      </section>
      <section className="section-pad bg-slate-50">
        <div className="container-shell grid gap-10 lg:grid-cols-2 lg:items-center">
          <div><ShieldCheck size={40} className="text-teal-700" /><h2 className="mt-5 text-3xl font-black">Verification protects experts and users.</h2><p className="mt-4 text-lg leading-8 text-slate-600">Profiles are reviewed for professional identity, experience, company or institution association, and service quality before marketplace trust signals are displayed.</p></div>
          <div className="card p-7"><h3 className="text-xl font-black">Expert onboarding</h3><ol className="mt-5 space-y-4">{["Create a professional account", "Complete your profile and expertise", "Get reviewed and verified", "Create your first service menu", "Start receiving booking requests"].map((item, index) => <li key={item} className="flex gap-3 font-semibold"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs text-white">{index + 1}</span>{item}</li>)}</ol><Link href="/signup" className="btn-primary mt-7 w-full">Apply as Expert</Link></div>
        </div>
      </section>
    </>
  );
}
