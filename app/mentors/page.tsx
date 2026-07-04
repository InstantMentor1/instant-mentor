import Link from "next/link";
import PageHero from "@/components/PageHero";
import { BadgeCheck, Search } from "lucide-react";

const mentors = [
  ["Aarav Mehta", "aarav-mehta", "Career Mentor", "Resume, interviews, placements"],
  ["Dr. Kavya Rao", "kavya-rao", "Academic Educator", "Research, exams, study planning"],
  ["Rohan Iyer", "rohan-iyer", "Technology Mentor", "AI, projects, software careers"],
  ["Meera Shah", "meera-shah", "Skill Coach", "Communication, confidence, professional growth"],
] as const;

export default function MentorsPage() {
  return (
    <>
      <PageHero eyebrow="Mentor directory" title="Browse verified mentors." description="Search verified mentors by expertise, role, and availability for talks or services." ctaLabel="Join as Mentor" ctaHref="/for-mentors" />
      <section className="section-pad bg-ivory">
        <div className="container-shell">
          <div className="card mb-7 flex flex-col gap-3 p-4 md:flex-row">
            <label className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-coral" size={18} />
              <input className="form-input bg-white pl-11" placeholder="Search mentors, skills, domains" />
            </label>
            <select className="form-input md:max-w-xs"><option>All expertise</option><option>Career</option><option>Academic</option><option>Technology</option></select>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {mentors.map(([name, slug, role, expertise]) => (
              <article key={name} className="card p-6 transition hover:-translate-y-1 hover:shadow-soft">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-peach text-xl font-black text-coral shadow-sm">{name[0]}</div>
                <h2 className="mt-4 text-xl font-black text-navy">{name}</h2>
                <p className="text-sm font-bold text-coral">{role}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{expertise}</p>
                <p className="mt-4 inline-flex items-center gap-1 rounded-full bg-skysoft px-3 py-1 text-xs font-bold text-academic"><BadgeCheck size={13} /> Verified - Available</p>
                <Link href={`/mentors/${slug}`} className="btn-secondary mt-5 !px-4 !py-2">View Profile</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
