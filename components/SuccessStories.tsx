import { BookOpenCheck, Compass, Presentation } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const storyTypes = [
  {
    title: "Technical clarity",
    text: "How a focused mentor conversation helped a student understand a difficult concept or choose the right implementation path.",
    icon: BookOpenCheck,
  },
  {
    title: "Placement readiness",
    text: "How structured feedback improved a resume, interview response, portfolio, or preparation strategy.",
    icon: Presentation,
  },
  {
    title: "Career direction",
    text: "How professional context helped a student compare roles, prioritize skills, and build a practical next-step plan.",
    icon: Compass,
  },
];

export default function SuccessStories() {
  return (
    <section className="section-pad" aria-labelledby="success-stories-title">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Student progress"
          title="Real stories, published responsibly"
          description="We are building an evidence library from completed mentorship journeys. Stories will be published only with student consent and without inflated outcome claims."
          centered
        />
        <div className="grid gap-5 md:grid-cols-3">
          {storyTypes.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-3xl border border-slate-200 p-7">
              <span className="inline-flex rounded-2xl bg-teal-50 p-3 text-teal-700" aria-hidden="true">
                <Icon size={24} />
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              <p className="mt-5 border-t border-slate-100 pt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Verified story coming after completed sessions
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
