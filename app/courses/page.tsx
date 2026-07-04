import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarClock, CheckCircle2, GraduationCap, Layers3, Users } from "lucide-react";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Expert Courses",
  description:
    "Explore mentor-created mini courses and monthly learning tracks for interviews, placements, career readiness, and technical domains.",
};

const courseTypes = [
  {
    title: "Interview Confidence Sprint",
    type: "Mini course",
    duration: "7-10 days",
    description: "Practice self-introduction, HR answers, do's and don'ts, and common walk-in drive mistakes.",
    outcomes: ["Clear intro pitch", "HR answer practice", "Confidence checklist"],
  },
  {
    title: "Placement Readiness Track",
    type: "Monthly program",
    duration: "Monthly",
    description: "A guided prep track covering resume, communication, mock interviews, and weekly mentor checkpoints.",
    outcomes: ["Resume improvement", "Mock interview loop", "Weekly guidance"],
  },
  {
    title: "Tech Domain Starter Course",
    type: "Mini course",
    duration: "2 weeks",
    description: "Learn what a domain expects before you spend heavily on a long course or enter interviews unprepared.",
    outcomes: ["Domain map", "Project direction", "Interview basics"],
  },
  {
    title: "Career Switch Foundation",
    type: "Monthly program",
    duration: "Monthly",
    description: "For learners moving into data, AI, product, marketing, finance, or business roles with mentor-led structure.",
    outcomes: ["Skill roadmap", "Portfolio plan", "Monthly reviews"],
  },
] as const;

const differences = [
  ["1:1 Mentor Services", "Short, outcome-specific bookings like resume review, mock interview, HR practice, or project review."],
  ["Expert Courses", "Structured mini courses or monthly programs created by mentors and teachers for deeper preparation."],
  ["Expert Talks", "Live topic sessions where students can learn from industry experts before deciding what support they need."],
] as const;

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Expert courses"
        title="Mini courses and monthly tracks for students who want to be ready."
        description="Teachers, mentors, and industry experts can package structured learning without replacing 1:1 services. Use courses for deeper preparation, and services for personal practice."
        ctaLabel="Explore Mentor Services"
        ctaHref="/services"
      />
      <section className="bg-white py-12">
        <div className="container-shell">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Course marketplace</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-navy sm:text-5xl">Learn before the opportunity arrives.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                These examples show the course layer: mentor-created, teacher-led, and separate from direct 1:1 bookings.
              </p>
            </div>
            <Link href="/for-mentors" className="btn-secondary">
              Create a Course <ArrowRight size={17} />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {courseTypes.map((course) => (
              <article key={course.title} className="rounded-[1.7rem] border border-navy/10 bg-iceblue p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-academic shadow-sm">
                    <BookOpen />
                  </span>
                  <span className="rounded-full bg-peach px-3 py-1 text-xs font-black text-coral">{course.type}</span>
                </div>
                <h3 className="mt-5 text-xl font-black text-navy">{course.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{course.description}</p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-black text-navy">
                  <CalendarClock size={14} className="text-coral" /> {course.duration}
                </p>
                <div className="mt-4 space-y-2">
                  {course.outcomes.map((outcome) => (
                    <p key={outcome} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <CheckCircle2 size={14} className="text-academic" /> {outcome}
                    </p>
                  ))}
                </div>
                <p className="mt-5 rounded-2xl bg-white p-3 text-xs font-bold text-slate-600">Pricing is set by the teacher or mentor.</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-iceblue py-12">
        <div className="container-shell">
          <div className="rounded-[2rem] border border-navy/10 bg-white p-6 shadow-soft lg:p-8">
            <p className="eyebrow">Clear separation</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-navy">Courses do not overlap mentor services.</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {differences.map(([title, text], index) => {
                const Icon = index === 0 ? Users : index === 1 ? Layers3 : GraduationCap;
                return (
                  <div key={title} className="rounded-2xl border border-navy/10 bg-iceblue p-5">
                    <Icon className="text-coral" />
                    <h3 className="mt-4 font-black text-navy">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
