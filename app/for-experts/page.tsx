import Link from "next/link";
import { Banknote, CalendarClock, ListChecks, Mic2, Star, UserRoundCheck, type LucideIcon } from "lucide-react";
import PageHero from "@/components/PageHero";

const benefits: Array<{ title: string; text: string; icon: LucideIcon }> = [
  { title: "Create expert profile", text: "Show your expertise, background, experience, and learner outcomes.", icon: UserRoundCheck },
  { title: "List services", text: "Create services with duration, deliverables, requirements, price, and availability.", icon: ListChecks },
  { title: "Host expert talks", text: "Run live learning sessions and event-style talks for students.", icon: Mic2 },
  { title: "Set availability", text: "Control when learners can book your support.", icon: CalendarClock },
  { title: "Track earnings", text: "Manage paid services, bookings, reviews, and payouts.", icon: Banknote },
  { title: "Build reputation", text: "Verified reviews and recordings help learners trust your guidance.", icon: Star },
];

export default function ForExpertsPage() {
  return (
    <>
      <PageHero
        eyebrow="For experts"
        title="Share your expertise with learners."
        description="Create your profile, list services, host expert talks, upload recordings, manage bookings, and earn through expert-led learning."
        ctaLabel="Join as Expert"
        ctaHref="/signup"
      />
      <section className="section-pad bg-sky-50">
        <div className="container-shell grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ title, text, icon: Icon }) => (
            <article key={title} className="card border-blue-100 p-6">
              <Icon className="text-teal-700" size={28} />
              <h2 className="mt-5 text-xl font-black">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
        <div className="container-shell mt-8">
          <div className="card border-blue-100 p-7 text-center">
            <h2 className="text-2xl font-black">Ready to start as an expert?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">Create your expert account, complete your profile, and publish your first service or expert talk.</p>
            <Link href="/signup" className="btn-primary mt-6">Join as Expert</Link>
          </div>
        </div>
      </section>
    </>
  );
}
