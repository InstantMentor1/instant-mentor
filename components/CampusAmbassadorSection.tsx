import Link from "next/link";
import { ArrowRight, Award, BadgeCheck, Gift, Megaphone, Network } from "lucide-react";

const benefits = [
  { title: "Leadership Experience", text: "Represent a student-focused product and coordinate useful campus activity.", icon: Megaphone },
  { title: "Networking", text: "Build relationships with motivated students, mentors, and the My Expert Talk team.", icon: Network },
  { title: "Referral Rewards", text: "Access rewards when a published ambassador campaign is active.", icon: Gift },
  { title: "Certificates", text: "Receive recognition after completing verified ambassador contributions.", icon: Award },
  { title: "Founder Access", text: "Share campus feedback directly with the founding team during selected reviews.", icon: BadgeCheck },
];

export default function CampusAmbassadorSection() {
  const emailHref =
    "mailto:hello.instantmentor@gmail.com?subject=Instant%20Mentor%20Campus%20Ambassador%20Interest";

  return (
    <section className="section-pad bg-slate-50" aria-labelledby="campus-ambassador-title">
      <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <span className="eyebrow">Campus ambassadors</span>
          <h2 id="campus-ambassador-title" className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
            Bring practical mentorship to your campus
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Help students discover verified mentors, focused Expert Talks, and better career conversations. Ambassador responsibilities and benefits are shared transparently during selection.
          </p>
          <Link href={emailHref} className="btn-primary mt-7">
            Become a Campus Ambassador <ArrowRight size={17} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map(({ title, text, icon: Icon }) => (
            <article key={title} className={`card p-6 ${title === "Founder Access" ? "sm:col-span-2" : ""}`}>
              <span className="inline-flex rounded-2xl bg-teal-50 p-3 text-teal-700" aria-hidden="true">
                <Icon size={24} />
              </span>
              <h3 className="mt-4 font-extrabold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
