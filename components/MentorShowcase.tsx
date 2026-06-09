import Link from "next/link";
import { ArrowRight, BadgeCheck, BriefcaseBusiness } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

export type PublicMentor = {
  id: string;
  fullName: string;
  organization: string | null;
  tracks: string[];
  bio: string | null;
  experienceYears: number | null;
};

export default function MentorShowcase({ mentors }: { mentors: PublicMentor[] }) {
  return (
    <section className="section-pad bg-slate-50" aria-labelledby="mentor-showcase-title">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Meet the mentors"
            title="Guidance from professionals who understand the work"
            description="Mentor profiles appear here only after their experience and expertise have been reviewed by the Instant Mentor team."
          />
          <Link href="/mentors" className="btn-secondary shrink-0">
            Explore mentoring <ArrowRight size={17} />
          </Link>
        </div>

        {mentors.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {mentors.map((mentor) => (
              <article key={mentor.id} className="card flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-800 text-lg font-black text-white" aria-hidden="true">
                    {mentor.fullName.slice(0, 1).toUpperCase()}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                    <BadgeCheck size={14} /> Verified
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-ink">{mentor.fullName}</h3>
                {mentor.organization && (
                  <p className="mt-2 flex items-start gap-2 text-sm text-slate-600">
                    <BriefcaseBusiness size={16} className="mt-0.5 shrink-0 text-teal-700" aria-hidden="true" />
                    {mentor.organization}
                  </p>
                )}
                {mentor.experienceYears !== null && (
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    {mentor.experienceYears}+ years of experience
                  </p>
                )}
                {mentor.bio && <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{mentor.bio}</p>}
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {mentor.tracks.slice(0, 3).map((track) => (
                    <span key={track} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {track}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-teal-200 bg-white p-8 text-center">
            <BadgeCheck className="mx-auto text-teal-700" size={30} aria-hidden="true" />
            <h3 className="mt-4 text-xl font-extrabold text-ink">Verified profiles are being reviewed</h3>
            <p className="mx-auto mt-2 max-w-2xl text-slate-600">
              Mentor profiles will appear here as professionals complete verification. Applications are open for experienced industry practitioners and faculty.
            </p>
            <Link href="/signup" className="btn-primary mt-6">Apply as Mentor</Link>
          </div>
        )}
      </div>
    </section>
  );
}
