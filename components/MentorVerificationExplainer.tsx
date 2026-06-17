import Link from "next/link";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, FileSearch, Linkedin, MessageSquareMore } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const steps = [
  { title: "LinkedIn Evidence", text: "Professional profile links are reviewed when supplied by the applicant.", icon: Linkedin },
  { title: "Experience Reviewed", text: "The team reviews stated experience and whether it supports the chosen expertise areas.", icon: FileSearch },
  { title: "Organization Reviewed", text: "Company, faculty, or institutional context is checked as part of profile review.", icon: BriefcaseBusiness },
  { title: "Profile Approved", text: "Only reviewed profiles receive a visible verified badge on My Expert Talk.", icon: BadgeCheck },
  { title: "Community Feedback", text: "Session feedback can inform ongoing quality review once verified session evidence exists.", icon: MessageSquareMore },
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
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
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
