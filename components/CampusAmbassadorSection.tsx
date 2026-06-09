import Link from "next/link";
import { ArrowRight, Megaphone, Network, Presentation } from "lucide-react";

const responsibilities = [
  { title: "Build awareness", icon: Megaphone },
  { title: "Connect student communities", icon: Network },
  { title: "Support campus sessions", icon: Presentation },
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
            Help students discover verified mentors, focused webinars, and better career conversations. Ambassador responsibilities and benefits are shared transparently during selection.
          </p>
          <Link href={emailHref} className="btn-primary mt-7">
            Register your interest <ArrowRight size={17} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {responsibilities.map(({ title, icon: Icon }) => (
            <article key={title} className="card p-6 text-center">
              <span className="mx-auto inline-flex rounded-2xl bg-teal-50 p-3 text-teal-700" aria-hidden="true">
                <Icon size={24} />
              </span>
              <h3 className="mt-4 font-extrabold text-ink">{title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
