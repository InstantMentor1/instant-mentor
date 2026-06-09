"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, BadgeCheck, BriefcaseBusiness, Linkedin } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

export type PublicMentor = {
  id: string;
  fullName: string;
  organization: string | null;
  roleLabel: string;
  tracks: string[];
  bio: string | null;
  experienceYears: number | null;
  linkedinUrl: string | null;
};

const filters = [
  "All mentors",
  "Software Engineering",
  "Data Analytics",
  "AI/ML",
  "Product Management",
  "Entrepreneurship",
] as const;

const filterKeywords: Record<(typeof filters)[number], string[]> = {
  "All mentors": [],
  "Software Engineering": ["full stack", "software", "cloud", "devops", "cybersecurity", "engineering"],
  "Data Analytics": ["data analytics", "analytics"],
  "AI/ML": ["ai", "machine learning", "ml"],
  "Product Management": ["product"],
  "Entrepreneurship": ["entrepreneur", "startup", "business"],
};

export default function MentorShowcase({ mentors }: { mentors: PublicMentor[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All mentors");
  const filteredMentors = useMemo(() => {
    const keywords = filterKeywords[activeFilter];
    if (keywords.length === 0) return mentors;
    return mentors.filter((mentor) =>
      mentor.tracks.some((track) => keywords.some((keyword) => track.toLowerCase().includes(keyword))),
    );
  }, [activeFilter, mentors]);

  return (
    <section className="section-pad bg-slate-50" aria-labelledby="mentor-showcase-title">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Meet the mentors"
          title="Learn from professionals who understand the work"
          description="Only reviewed mentor profiles appear here. Filter by career area and inspect the professional context behind each profile."
        />

        {mentors.length > 0 ? (
          <>
            <div className="mb-8 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter mentors by expertise">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                    activeFilter === filter
                      ? "border-teal-700 bg-teal-700 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-teal-700"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {filteredMentors.map((mentor) => (
              <article key={mentor.id} className="card flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-800 text-xl font-black text-white" aria-label={`${mentor.fullName} profile placeholder`}>
                    {mentor.fullName.slice(0, 1).toUpperCase()}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                    <BadgeCheck size={14} /> Verified
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-ink">{mentor.fullName}</h3>
                <p className="mt-1 text-sm font-bold text-teal-700">{mentor.roleLabel}</p>
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
                {mentor.linkedinUrl && (
                  <Link
                    href={mentor.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 border-t border-slate-100 pt-4 text-sm font-bold text-teal-700 hover:text-teal-900"
                  >
                    <Linkedin size={16} aria-hidden="true" /> LinkedIn profile <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                )}
              </article>
            ))}
            </div>
            {filteredMentors.length === 0 && (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <h3 className="text-lg font-extrabold text-ink">No verified mentors in this category yet</h3>
                <p className="mt-2 text-sm text-slate-600">Try another filter or apply to bring your expertise to the platform.</p>
              </div>
            )}
          </>
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
