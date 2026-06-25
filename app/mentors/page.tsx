import PageHero from "@/components/PageHero";
import { BadgeCheck } from "lucide-react";

const mentors = [
  ["Aarav Mehta", "Career Expert", "Resume, interviews, placements"],
  ["Dr. Kavya Rao", "Academic Expert", "Research, exams, study planning"],
  ["Rohan Iyer", "Technology Expert", "AI, projects, software careers"],
  ["Meera Shah", "Skill Coach", "Communication, confidence, professional growth"],
] as const;

export default function MentorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Experts"
        title="Meet experts and subject-matter mentors."
        description="Discover verified experts available for expert talks, services, recordings, and learner support."
        ctaLabel="Join as Expert"
        ctaHref="/for-mentors"
      />
      <section className="section-pad bg-sky-50">
        <div className="container-shell grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {mentors.map(([name, role, expertise]) => (
            <article key={name} className="card border-blue-100 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-black text-teal-700 shadow-sm">{name[0]}</div>
              <h2 className="mt-4 text-xl font-black">{name}</h2>
              <p className="text-sm font-bold text-teal-700">{role}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{expertise}</p>
              <p className="mt-4 inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700"><BadgeCheck size={13} /> Verified expert</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
