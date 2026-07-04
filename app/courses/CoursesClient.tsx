"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const filters = [
  ["all", "All"],
  ["interview-prep", "Interview Prep"],
  ["resume-help", "Resume"],
  ["career-clarity", "Career Clarity"],
  ["exam-doubt", "Exam Doubt"],
  ["skill-building", "Build Skills"],
  ["first-job", "First Job"],
  ["competitive-exams", "Competitive Exams"],
  ["business-guidance", "Business"],
] as const;

const courses = [
  {
    slug: "hr-round-decoded",
    title: "HR Round Decoded",
    subtitle: "What TCS, Infosys & Wipro actually score you on",
    mentor: "Priya Nair",
    mentorTitle: "HR Manager · TCS",
    mentorSlug: "priya-nair",
    situation: "interview-prep",
    situationLabel: "Interview Prep",
    type: "Mini course",
    lessons: 5,
    duration: "2.5 hrs",
    price: 799,
    outcomes: [
      "Know exactly what HR evaluates in first 60 seconds",
      "Script your self-introduction for any company",
      "Answer the top 8 HR questions without memorising",
      "Avoid the 5 most common walk-in drive mistakes",
    ],
  },
  {
    slug: "ats-proof-resume",
    title: "ATS-Proof Resume in One Day",
    subtitle: "Get your resume past the bot and into a recruiter's hands",
    mentor: "Aarav Mehta",
    mentorTitle: "Career Mentor",
    mentorSlug: "aarav-mehta",
    situation: "resume-help",
    situationLabel: "Resume",
    type: "Mini course",
    lessons: 4,
    duration: "2 hrs",
    price: 499,
    outcomes: [
      "Build an ATS-ready resume from scratch",
      "Fix the formatting mistakes that get you filtered out",
      "Write bullets that show impact, not just tasks",
      "Tailor your resume for different roles in 10 minutes",
    ],
  },
  {
    slug: "gate-os-dbms",
    title: "GATE CS — OS & DBMS Crash Course",
    subtitle: "The two hardest GATE subjects, explained clearly",
    mentor: "Sneha Patel",
    mentorTitle: "GATE AIR 47 · DRDO Engineer",
    mentorSlug: "sneha-patel",
    situation: "competitive-exams",
    situationLabel: "GATE / CAT / UPSC",
    type: "Mini course",
    lessons: 12,
    duration: "6 hrs",
    price: 1299,
    outcomes: [
      "Clear OS concepts: scheduling, memory, deadlocks",
      "DBMS from ER diagrams to query optimisation",
      "Solve past GATE questions with shortcuts",
      "Last-30-days revision strategy included",
    ],
  },
  {
    slug: "amazon-sde-playbook",
    title: "Amazon & Flipkart SDE Interview Playbook",
    subtitle: "The exact process that gets software engineers shortlisted",
    mentor: "Rohan Iyer",
    mentorTitle: "Technology Mentor",
    mentorSlug: "rohan-iyer",
    situation: "interview-prep",
    situationLabel: "Interview Prep",
    type: "Mini course",
    lessons: 8,
    duration: "4 hrs",
    price: 1499,
    outcomes: [
      "Understand what Amazon's bar-raiser actually looks for",
      "System design basics for SDE1/SDE2 interviews",
      "DSA problem patterns that repeat across top companies",
      "How to handle the rounds you didn't prepare for",
    ],
  },
  {
    slug: "sql-for-data-jobs",
    title: "SQL for Data Jobs — Zero to Job-Ready",
    subtitle: "From SELECT to window functions in 2 weeks",
    mentor: "Kavya Rao",
    mentorTitle: "Academic Educator",
    mentorSlug: "kavya-rao",
    situation: "skill-building",
    situationLabel: "Build Skills",
    type: "Mini course",
    lessons: 10,
    duration: "5 hrs",
    price: 999,
    outcomes: [
      "Write complex SQL queries from scratch",
      "Use window functions and CTEs confidently",
      "Solve analyst interview questions in real time",
      "Build a portfolio query project to show employers",
    ],
  },
  {
    slug: "first-job-survival",
    title: "First Job Survival Guide",
    subtitle: "Navigate your first 90 days without the anxiety",
    mentor: "Meera Shah",
    mentorTitle: "Skill Coach",
    mentorSlug: "meera-shah",
    situation: "first-job",
    situationLabel: "First Job",
    type: "Mini course",
    lessons: 5,
    duration: "2.5 hrs",
    price: 699,
    outcomes: [
      "Set expectations with your manager in week one",
      "Build visibility without being pushy",
      "Understand performance review culture early",
      "Decide if you should stay or switch at 6 months",
    ],
  },
] as const;

const situationColors: Record<string, string> = {
  "interview-prep": "bg-[#2563eb]",
  "resume-help": "bg-[#7c3aed]",
  "competitive-exams": "bg-[#dc2626]",
  "skill-building": "bg-[#059669]",
  "first-job": "bg-[#d97706]",
  "career-clarity": "bg-[#0891b2]",
};

export default function CoursesClient() {
  const [activeFilter, setActiveFilter] = useState("all");
  const visibleCourses = useMemo(
    () => courses.filter((course) => activeFilter === "all" || course.situation === activeFilter),
    [activeFilter],
  );

  return (
    <main className="bg-navy-950 text-chalk">
      <section className="relative overflow-hidden bg-navy-900 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(37,99,235,0.16),transparent_32%)]" />
        <div className="container-shell relative">
          <Link href="/" className="text-sm font-semibold text-electric-300 hover:text-electric-200">&larr; Back home</Link>
          <div className="mt-8 max-w-4xl">
            <span className="rounded-full border border-electric-500/20 bg-electric-500/10 px-3 py-1 text-sm font-semibold text-electric-300">Mentor-created courses</span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-100 sm:text-6xl">Courses by verified mentors — buy once, learn at your pace.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Every course creator is bookable for a live session. Stuck after a lesson? Ask them directly.</p>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-12">
        <div className="container-shell">
          <div className="flex flex-wrap gap-3">
            {filters.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setActiveFilter(value)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 ${
                  activeFilter === value
                    ? "border-electric-500 bg-electric-500 text-white shadow-[0_0_16px_rgba(37,99,235,0.35)]"
                    : "border-electric-500/20 bg-navy-800 text-slate-400 hover:border-electric-500/50 hover:text-electric-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleCourses.map((course) => (
              <article key={course.slug} className="overflow-hidden rounded-2xl border border-electric-500/15 bg-navy-800 transition-all hover:-translate-y-1 hover:border-electric-500/40 hover:bg-navy-700">
                <div className={`h-2 ${situationColors[course.situation] ?? "bg-electric-500"}`} />
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-electric-500/15 px-3 py-1 text-xs font-semibold text-electric-300">{course.situationLabel}</span>
                    <span className="rounded-full border border-electric-500/20 px-3 py-1 text-xs font-semibold text-slate-300">{course.type}</span>
                  </div>
                  <h2 className="mt-3 text-base font-semibold text-slate-100">{course.title}</h2>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{course.subtitle}</p>
                  <Link href={`/mentors/${course.mentorSlug}`} className="mt-4 flex items-center gap-3 rounded-xl border border-electric-500/10 bg-navy-900/70 p-3 hover:border-electric-500/30">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-electric-500/20 text-xs font-bold text-electric-300">{course.mentor.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
                    <span>
                      <span className="block text-sm font-medium text-electric-300">{course.mentor}</span>
                      <span className="block text-xs text-slate-500">{course.mentorTitle}</span>
                    </span>
                  </Link>
                  <p className="mt-3 text-xs text-slate-500">{course.lessons} lessons · {course.duration}</p>
                  <div className="mt-3 space-y-2">
                    {course.outcomes.slice(0, 2).map((outcome) => (
                      <p key={outcome} className="text-xs leading-5 text-slate-400">✓ {outcome}</p>
                    ))}
                  </div>
                  <p className="mt-4 text-xl font-bold text-slate-100">₹{course.price.toLocaleString("en-IN")}</p>
                  <p className="text-xs text-slate-500">one-time · yours forever</p>
                  <div className="mt-3 flex flex-col gap-2">
                    <Link href={`/courses/${course.slug}`} className="btn-primary w-full justify-center text-center">Buy now -&gt;</Link>
                    <Link href={`/mentors/${course.mentorSlug}`} className="text-center text-xs font-semibold text-electric-300 hover:text-electric-200">
                      or book {course.mentor} for a live session -&gt;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
