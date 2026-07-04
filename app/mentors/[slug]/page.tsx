import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, CalendarClock, Tags } from "lucide-react";

const mentors = {
  "aarav-mehta": {
    name: "Aarav Mehta",
    title: "Career Mentor",
    tags: ["Resume", "Interviews", "Placements"],
    bio: "Aarav helps students prepare resumes, self-introductions, and interview answers before campus or walk-in drives. His sessions focus on practical confidence, clarity, and what recruiters actually notice.",
  },
  "kavya-rao": {
    name: "Dr. Kavya Rao",
    title: "Academic Educator",
    tags: ["Research", "Exams", "Study Planning"],
    bio: "Kavya guides students through academic decisions, study planning, and career clarity when they feel scattered. Her mentoring helps learners convert confusion into a focused preparation path.",
  },
  "rohan-iyer": {
    name: "Rohan Iyer",
    title: "Technology Mentor",
    tags: ["AI", "Projects", "Software Careers"],
    bio: "Rohan supports students with technical project reviews, software interview preparation, and domain-readiness guidance. He helps learners explain their work clearly and prepare for real technical conversations.",
  },
  "meera-shah": {
    name: "Meera Shah",
    title: "Skill Coach",
    tags: ["Communication", "Confidence", "Professional Growth"],
    bio: "Meera coaches students on communication, confidence, and professional presence before important opportunities. Her sessions help learners speak with structure and reduce interview hesitation.",
  },
} as const;

export function generateStaticParams() {
  return Object.keys(mentors).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mentor = mentors[slug as keyof typeof mentors];
  return {
    title: mentor ? `${mentor.name} | My Expert Talk` : "Mentor Profile | My Expert Talk",
    description: mentor?.bio ?? "View verified mentor profiles on My Expert Talk.",
    openGraph: {
      title: mentor ? `${mentor.name} | My Expert Talk` : "Mentor Profile | My Expert Talk",
      description: mentor?.bio ?? "View verified mentor profiles on My Expert Talk.",
      siteName: "My Expert Talk",
      images: [{ url: "/my-expert-talk-logo.png", alt: "My Expert Talk" }],
    },
  };
}

export default async function MentorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mentor = mentors[slug as keyof typeof mentors];
  if (!mentor) notFound();

  return (
    <section className="bg-ivory py-12">
      <div className="container-shell">
        <article className="mx-auto max-w-4xl rounded-[2rem] border border-navy/10 bg-white p-6 shadow-soft sm:p-9">
          <Link href="/mentors" className="text-sm font-black text-academic">&larr; All mentors</Link>
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-navy text-2xl font-black text-white">{mentor.name[0]}</div>
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-skysoft px-3 py-1 text-xs font-black text-academic">
                  <BadgeCheck size={14} /> Available for talks and services
                </p>
                <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-navy">{mentor.name}</h1>
                <p className="mt-2 text-lg font-bold text-coral">{mentor.title}</p>
              </div>
            </div>
          </div>
          <p className="mt-8 max-w-3xl text-base leading-8 text-slate-600">{mentor.bio}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-iceblue p-5">
              <Tags className="text-coral" />
              <h2 className="mt-3 font-black text-navy">Expertise</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {mentor.tags.map((tag) => <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">{tag}</span>)}
              </div>
            </div>
            <div className="rounded-2xl bg-iceblue p-5">
              <CalendarClock className="text-coral" />
              <h2 className="mt-3 font-black text-navy">Availability</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Available for talks and services.</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/services" className="btn-primary">Book a service -&gt;</Link>
            <Link href="/expert-talks" className="btn-secondary">See their expert talks -&gt;</Link>
          </div>
        </article>
      </div>
    </section>
  );
}
