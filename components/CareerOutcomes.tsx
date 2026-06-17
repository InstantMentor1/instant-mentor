import { BriefcaseBusiness, Code2, Compass, GraduationCap, Presentation, Wrench } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const outcomes = [
  { title: "Land Your First Internship", text: "Turn broad preparation into a role-focused roadmap, stronger applications, and clearer next steps.", icon: BriefcaseBusiness },
  { title: "Crack Campus Placements", text: "Prepare your resume, interview stories, technical fundamentals, and placement strategy with direction.", icon: GraduationCap },
  { title: "Become Industry Ready", text: "Understand how professionals approach tools, teamwork, trade-offs, and real delivery expectations.", icon: Wrench },
  { title: "Build Real Projects", text: "Choose useful project scopes, explain your decisions, and improve the quality of your portfolio narrative.", icon: Code2 },
  { title: "Explore Career Paths", text: "Compare roles and tracks with context before investing months in the wrong learning plan.", icon: Compass },
  { title: "Learn From Professionals", text: "Get practical perspective from people who have worked through the decisions you are facing.", icon: Presentation },
];

export default function CareerOutcomes() {
  return (
    <section className="section-pad bg-teal-900 text-white" aria-labelledby="career-outcomes-title">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Career outcomes"
          title="Prepare for the moments that shape your career"
          description="Mentorship is most valuable when it changes what you do next. These are the transformations My Expert Talk is designed to support, not guaranteed placement claims."
          centered
          inverted
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-white/15 bg-white/10 p-6">
              <Icon size={24} className="text-teal-100" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-teal-50">{text}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-teal-100">Individual outcomes depend on preparation, participation, and market conditions.</p>
      </div>
    </section>
  );
}
