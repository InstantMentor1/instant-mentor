import Link from "next/link";
import { ArrowRight, BadgeCheck, FileSearch, UserRoundCheck } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const steps = [
  { title: "Professional identity", text: "Applicants provide a work, faculty, or institutional identity.", icon: UserRoundCheck },
  { title: "Expertise evidence", text: "The team reviews experience, focus areas, and relevant professional links.", icon: FileSearch },
  { title: "Profile review", text: "Only reviewed profiles receive a visible verified status on the platform.", icon: BadgeCheck },
];

export default function MentorVerificationExplainer() {
  return (
    <section className="section-pad bg-slate-50" aria-labelledby="mentor-verification-title">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Mentor verification"
          title="Trust starts before the first conversation"
          description="Verification helps students understand who they are learning from. It is a profile review process, not a guarantee of any specific academic or career outcome."
          centered
        />
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map(({ title, text, icon: Icon }, index) => (
            <li key={title} className="card relative p-7">
              <span className="absolute right-6 top-6 text-4xl font-black text-slate-100" aria-hidden="true">0{index + 1}</span>
              <span className="inline-flex rounded-2xl bg-teal-50 p-3 text-teal-700" aria-hidden="true">
                <Icon size={24} />
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Link href="/signup" className="btn-primary">Apply as Mentor <ArrowRight size={17} /></Link>
        </div>
      </div>
    </section>
  );
}
