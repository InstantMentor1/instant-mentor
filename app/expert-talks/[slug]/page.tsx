import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock3, Mic2 } from "lucide-react";
import RegisterInterestForm from "./RegisterInterestForm";

const talks = {
  "placement-prep-sprint": {
    title: "Placement Prep Sprint",
    mentor: "Priya Nair, HR Manager · TCS",
    category: "Career",
    offset: 2,
    time: "7:00 PM",
    description: "A practical live session on placement preparation, interview expectations, and the mistakes students should avoid before speaking to recruiters.",
  },
  "ai-tools-students": {
    title: "AI Tools for Students",
    mentor: "Rohan Iyer, Technology Mentor",
    category: "Skills",
    offset: 4,
    time: "6:00 PM",
    description: "Learn how students can use AI tools for study planning, projects, interview preparation, and faster learning without losing fundamentals.",
  },
  "exam-strategy-clinic": {
    title: "Exam Strategy Clinic",
    mentor: "Sneha Patel, GATE AIR 47 · DRDO",
    category: "Exam Help",
    offset: 7,
    time: "11:00 AM",
    description: "A focused clinic on revision planning, mock analysis, weak-area prioritisation, and staying calm when the exam timeline is tight.",
  },
  "project-portfolio-review": {
    title: "Project Portfolio Review",
    mentor: "Arjun Mehta, Product Manager · Flipkart",
    category: "Projects",
    offset: 10,
    time: "5:00 PM",
    description: "Understand how to present projects for interviews, portfolios, and career switches with clearer outcomes and stronger storytelling.",
  },
  "placement-prep-what-interviewers-want": {
    title: "Placement prep - what interviewers actually want",
    mentor: "Aarav Mehta",
    category: "Career",
    offset: 2,
    time: "7:00 PM",
    description: "A practical live session on placement preparation, interview expectations, and the mistakes students should avoid before speaking to recruiters.",
  },
  "gate-last-minute-strategy-clinic": {
    title: "GATE last-minute strategy clinic",
    mentor: "Sneha Patel",
    category: "Exams",
    offset: 4,
    time: "11:00 AM",
    description: "A focused clinic on revision planning, mock analysis, weak-area prioritisation, and staying calm when the exam timeline is tight.",
  },
  "build-skills-that-get-you-hired-in-2025": {
    title: "Build skills that get you hired in 2025",
    mentor: "Arjun Mehta",
    category: "Skills",
    offset: 7,
    time: "5:00 PM",
    description: "Learn which skills create hiring signals, how to build a practical portfolio, and how to avoid wasting time on shallow course completion.",
  },
  "from-idea-to-first-paying-customer": {
    title: "From idea to first paying customer",
    mentor: "Aditya Kumar",
    category: "Startup",
    offset: 10,
    time: "6:00 PM",
    description: "A founder-focused talk on validating an idea, finding first users, and moving from vague interest to a paying customer conversation.",
  },
  "ai-tools-every-student-should-know": {
    title: "AI tools every student should know",
    mentor: "Rohan Iyer",
    category: "Technology",
    offset: 12,
    time: "8:00 PM",
    description: "Learn how students can use AI tools for study planning, projects, interview preparation, and faster learning without losing fundamentals.",
  },
  "cat-verbal-reading-comprehension-shortcuts": {
    title: "CAT verbal - reading comprehension shortcuts",
    mentor: "Meera Krishnan",
    category: "Academics",
    offset: 14,
    time: "6:30 PM",
    description: "A compact session on CAT verbal strategy, reading comprehension shortcuts, and how to approach passages under time pressure.",
  },
} as const;

function futureDate(offsetDays: number) {
  return new Date(Date.now() + offsetDays * 86400000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function generateStaticParams() {
  return Object.keys(talks).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const talk = talks[slug as keyof typeof talks];
  return {
    title: talk ? `${talk.title} | My Expert Talk` : "Expert Talk | My Expert Talk",
    description: talk?.description ?? "Register for expert talks on My Expert Talk.",
    openGraph: {
      title: talk ? `${talk.title} | My Expert Talk` : "Expert Talk | My Expert Talk",
      description: talk?.description ?? "Register for expert talks on My Expert Talk.",
      siteName: "My Expert Talk",
      images: [{ url: "/my-expert-talk-logo.png", alt: "My Expert Talk" }],
    },
  };
}

export default async function ExpertTalkDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const talk = talks[slug as keyof typeof talks];
  if (!talk) notFound();

  return (
    <section className="bg-ivory py-12">
      <div className="container-shell grid gap-6 lg:grid-cols-[1fr_360px]">
        <article className="rounded-[2rem] border border-navy/10 bg-white p-6 shadow-soft sm:p-9">
          <p className="inline-flex items-center gap-2 rounded-full bg-peach px-3 py-1 text-xs font-black text-coral">
            <Mic2 size={14} /> {talk.category}
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-navy sm:text-5xl">{talk.title}</h1>
          <p className="mt-4 text-lg font-bold text-coral">{talk.mentor}</p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{talk.description}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-iceblue p-5">
              <CalendarDays className="text-academic" />
              <p className="mt-3 font-black text-navy">{futureDate(talk.offset)}</p>
              <p className="mt-1 text-sm text-slate-600">Upcoming live expert talk</p>
            </div>
            <div className="rounded-2xl bg-iceblue p-5">
              <Clock3 className="text-academic" />
              <p className="mt-3 font-black text-navy">{talk.time} - Online</p>
              <p className="mt-1 text-sm text-slate-600">Register interest to get notified.</p>
            </div>
          </div>
          <Link href="/expert-talks" className="mt-8 inline-flex text-sm font-black text-academic">Back to expert talks</Link>
        </article>
        <aside className="h-fit rounded-[2rem] border border-navy/10 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black text-navy">Register interest</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">This is a mock registration for now. It confirms interest without collecting payment.</p>
          <div className="mt-5">
            <RegisterInterestForm />
          </div>
        </aside>
      </div>
    </section>
  );
}
