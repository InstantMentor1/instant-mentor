import { CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const outcomes = [
  "A clearer technical learning roadmap",
  "Stronger resumes, portfolios, and project narratives",
  "More focused interview and placement preparation",
  "Better understanding of roles and industry expectations",
  "Practical next steps instead of generic career advice",
  "A trusted professional perspective on difficult decisions",
];

export default function CareerOutcomes() {
  return (
    <section className="section-pad bg-teal-900 text-white" aria-labelledby="career-outcomes-title">
      <div className="container-shell grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-teal-100">Career outcomes</p>
          <h2 id="career-outcomes-title" className="text-3xl font-black tracking-tight sm:text-4xl">
            Turn mentorship into a practical growth plan
          </h2>
          <p className="mt-5 max-w-xl leading-7 text-teal-50">
            Instant Mentor is designed to help students make better-informed decisions and prepare with direction. Mentorship improves readiness; it does not guarantee placement.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {outcomes.map((outcome) => (
            <div key={outcome} className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-5 font-semibold text-teal-50">
              <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-teal-200" aria-hidden="true" />
              {outcome}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
