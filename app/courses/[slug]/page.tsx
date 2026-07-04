import Link from "next/link";
import { notFound } from "next/navigation";

const courses = {
  "hr-round-decoded": {
    title: "HR Round Decoded",
    subtitle: "What TCS, Infosys & Wipro actually score you on",
    mentor: "Priya Nair",
    mentorSlug: "priya-nair",
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
  "ats-proof-resume": {
    title: "ATS-Proof Resume in One Day",
    subtitle: "Get your resume past the bot and into a recruiter's hands",
    mentor: "Aarav Mehta",
    mentorSlug: "aarav-mehta",
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
  "gate-os-dbms": {
    title: "GATE CS — OS & DBMS Crash Course",
    subtitle: "The two hardest GATE subjects, explained clearly",
    mentor: "Sneha Patel",
    mentorSlug: "sneha-patel",
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
  "amazon-sde-playbook": {
    title: "Amazon & Flipkart SDE Interview Playbook",
    subtitle: "The exact process that gets software engineers shortlisted",
    mentor: "Rohan Iyer",
    mentorSlug: "rohan-iyer",
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
  "sql-for-data-jobs": {
    title: "SQL for Data Jobs — Zero to Job-Ready",
    subtitle: "From SELECT to window functions in 2 weeks",
    mentor: "Kavya Rao",
    mentorSlug: "kavya-rao",
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
  "first-job-survival": {
    title: "First Job Survival Guide",
    subtitle: "Navigate your first 90 days without the anxiety",
    mentor: "Meera Shah",
    mentorSlug: "meera-shah",
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
} as const;

export function generateStaticParams() {
  return Object.keys(courses).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses[slug as keyof typeof courses];
  return {
    title: course ? `${course.title} | My Expert Talk` : "Course | My Expert Talk",
    description: course?.subtitle ?? "View mentor-created courses on My Expert Talk.",
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses[slug as keyof typeof courses];
  if (!course) notFound();

  return (
    <main className="bg-navy-950 py-12 text-slate-100">
      <div className="container-shell">
        <Link href="/courses" className="text-sm font-semibold text-electric-300 hover:text-electric-200">&larr; All courses</Link>
        <section className="mt-6 rounded-3xl border border-electric-500/15 bg-navy-800 p-6 lg:p-9">
          <span className="rounded-full bg-electric-500/15 px-3 py-1 text-sm font-semibold text-electric-300">Mini course</span>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-slate-100">{course.title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-300">{course.subtitle}</p>
          <Link href={`/mentors/${course.mentorSlug}`} className="mt-5 inline-flex text-sm font-semibold text-electric-300 hover:text-electric-200">
            Created by {course.mentor} -&gt;
          </Link>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-electric-500/10 bg-navy-900 p-4">
              <p className="text-xs text-slate-500">Lessons</p>
              <p className="mt-1 text-xl font-bold">{course.lessons}</p>
            </div>
            <div className="rounded-2xl border border-electric-500/10 bg-navy-900 p-4">
              <p className="text-xs text-slate-500">Duration</p>
              <p className="mt-1 text-xl font-bold">{course.duration}</p>
            </div>
            <div className="rounded-2xl border border-electric-500/10 bg-navy-900 p-4">
              <p className="text-xs text-slate-500">Price</p>
              <p className="mt-1 text-xl font-bold">₹{course.price.toLocaleString("en-IN")}</p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">What you will learn</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {course.outcomes.map((outcome) => (
                <p key={outcome} className="rounded-xl border border-electric-500/10 bg-navy-900 p-4 text-sm text-slate-300">✓ {outcome}</p>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary justify-center">Buy now -&gt;</Link>
            <Link href={`/mentors/${course.mentorSlug}`} className="btn-secondary justify-center">Book mentor live -&gt;</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
