"use client";

import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import type { AppRole } from "@/lib/auth-shared";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const situations = [
  ["I have an interview coming up", "interview-prep", "Practice with a hiring manager before the real thing.", "murthy"],
  ["My resume isn't getting shortlisted", "resume-help", "Get your resume seen — and shortlisted.", "kalam"],
  ["I don't know which career path to take", "career-clarity", "Talk to someone who's built a career you admire.", "tata"],
  ["I'm stuck on a concept or exam topic", "exam-doubt", "Instant doubt-clearing from people who've cracked it.", "pichai"],
  ["I want to build real skills fast", "skill-building", "Practical skills from engineers and builders.", "nadella"],
  ["I'm in my first job and lost", "first-job", "Navigate your first job without the guesswork.", "nooyi"],
  ["I want to crack GATE / CAT / UPSC", "competitive-exams", "Strategy and doubt-solving from toppers who've been there.", "bedi"],
  ["I run a small business and need advice", "business-guidance", "Expert business advice without the consultant fee.", "kiyosaki"],
] as const;

const talks = [
  ["Placement Prep Sprint", "placement-prep-sprint", "Priya Nair, HR Manager · TCS", "Career", 2, "7:00 PM"],
  ["AI Tools for Students", "ai-tools-students", "Rohan Iyer, Technology Mentor", "Skills", 4, "6:00 PM"],
  ["Exam Strategy Clinic", "exam-strategy-clinic", "Sneha Patel, GATE AIR 47 · DRDO", "Exam Help", 7, "11:00 AM"],
  ["Project Portfolio Review", "project-portfolio-review", "Arjun Mehta, Product Manager · Flipkart", "Projects", 10, "5:00 PM"],
] as const;

const services = [
  ["Resume Review for Freshers", "resume-review", "Aarav Mehta", "Career Mentor", "Resume", "30 min", "available", "Slots this week"],
  ["Mock Interview for Software Roles", "software-mock-interview", "Rohan Iyer", "Technology Mentor", "Mock Interview", "45 min", "available", "Evening slots"],
  ["Career Roadmap Session", "career-roadmap", "Kavya Rao", "Academic Educator", "Career", "60 min", "available", "Weekend slots"],
  ["Project Review Session", "project-review", "Rohan Iyer", "Technology Mentor", "Project", "45 min", "limited", "2 seats left"],
] as const;

const recordings = [
  ["Resume teardown replay", "Career", "32 min", "bg-electric-500"],
  ["AI study workflow", "AI", "41 min", "bg-violet-500"],
  ["Interview mistakes to avoid", "Placement", "28 min", "bg-green-500"],
  ["Project demo clinic", "Projects", "36 min", "bg-amber-500"],
] as const;

const mentors = [
  ["Aarav Mehta", "aarav-mehta", "Career Mentor", ["Resume", "Placements"]],
  ["Kavya Rao", "kavya-rao", "Academic Educator", ["Career", "Study Planning"]],
  ["Rohan Iyer", "rohan-iyer", "Technology Mentor", ["AI", "Projects"]],
  ["Meera Shah", "meera-shah", "Skill Coach", ["Communication", "Growth"]],
] as const;

const popularServices = [
  ["Career Clarity Session", "career-roadmap", "Choose your next step with a practical roadmap."],
  ["Resume Review", "resume-review", "Get your resume shortlisted-ready before applying."],
  ["LinkedIn Profile Review", "linkedin-profile-optimisation", "Make recruiters understand your strengths fast."],
  ["Mock Interview", "software-mock-interview", "Practice before the real interview pressure."],
  ["Business Analytics Roadmap", "career-roadmap", "Plan tools, projects, and portfolio proof."],
  ["Digital Marketing Roadmap", "career-roadmap", "Know what to learn and how to show results."],
  ["Project Review", "project-review", "Improve your project before demos or interviews."],
  ["Monthly Mentorship", "career-roadmap", "Stay accountable with ongoing expert guidance."],
] as const;

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div data-reveal className={`opacity-0 translate-y-8 transition-all duration-500 ease-out ${className}`}>{children}</div>;
}

export function MinimalLandingPage({ dashboardHref, role }: { dashboardHref: string | null; role: AppRole | null }) {
  useScrollReveal();
  if (role) return <RoleLanding role={role} dashboardHref={dashboardHref ?? "/"} />;

  return (
    <div className="bg-ivory text-ink">
      <PublicHero />
      <PopularServicesSection />
      <HowItWorksSection />
      <FeaturedExpertsSection />
      <TrustSection />
      <FinalCTASection />
    </div>
  );
}

function PublicHero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#FFF8F0_0%,#FFFFFF_48%,#EAF3FF_100%)] py-16 sm:py-24">
      <div className="absolute -right-20 top-16 h-72 w-72 rounded-full bg-coral/10 blur-3xl" />
      <div className="absolute -left-16 bottom-8 h-64 w-64 rounded-full bg-electric-500/10 blur-3xl" />
      <div className="container-shell relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-coral/20 bg-peach px-3 py-1 text-sm font-bold text-coral">Verified expert sessions for serious learners</span>
            <h1 className="mt-6 text-4xl font-black tracking-[-0.05em] text-navy sm:text-6xl">
              Book verified experts before your next big step.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
              Book verified experts for career clarity, resume review, interview prep, skill learning, and mentorship.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/mentors" className="btn-primary">Find an Expert <ArrowRight size={18} /></Link>
              <Link href="/for-mentors" className="btn-secondary">Join as Expert <ArrowRight size={18} /></Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold text-slate-600">
              {["Student-first", "Verified mentors", "Mentor-set pricing"].map((item) => (
                <span key={item} className="rounded-full border border-navy/10 bg-white px-3 py-1">✓ {item}</span>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="rounded-[2rem] border border-navy/10 bg-white p-5 shadow-soft">
            <div className="rounded-[1.5rem] bg-navy p-5 text-white">
              <p className="text-sm font-semibold text-coral">Your next prep board</p>
              <h2 className="mt-2 text-2xl font-black">Walk-in drive in 7 days?</h2>
              <div className="mt-5 grid gap-3">
                {["HR round practice", "ATS resume course", "Mock interview slot"].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm font-semibold">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PopularServicesSection() {
  return (
    <section className="bg-white py-14">
      <div className="container-shell">
        <Reveal>
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-black tracking-[-0.04em] text-navy">Popular services</h2>
            <p className="mt-3 text-slate-600">Start with one focused session. No course overload, no confusing menus.</p>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularServices.map(([title, slug, text]) => (
            <Reveal key={title}>
              <Link href={`/services/${slug}`} className="group block h-full rounded-3xl border border-navy/10 bg-ivory p-5 shadow-soft transition hover:-translate-y-1 hover:border-coral/40 hover:bg-white">
                <h3 className="text-lg font-black text-navy">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                <span className="mt-5 inline-flex items-center text-sm font-bold text-coral">View service <ArrowRight className="ml-1 transition group-hover:translate-x-1" size={16} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="bg-ivory py-14">
      <div className="container-shell">
        <Reveal>
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black tracking-[-0.04em] text-navy">How it works</h2>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {["Choose service", "Book slot", "Attend session"].map((step, index) => (
            <Reveal key={step}>
              <div className="rounded-3xl border border-navy/10 bg-white p-6 text-center shadow-soft">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-coral text-lg font-black text-white">{index + 1}</span>
                <h3 className="mt-4 text-xl font-black text-navy">{step}</h3>
                <p className="mt-2 text-sm text-slate-600">{index === 0 ? "Pick the exact help you need." : index === 1 ? "Choose an available expert time." : "Join the call and get clear next steps."}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedExpertsSection() {
  return (
    <section className="bg-white py-14">
      <div className="container-shell">
        <Reveal>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-navy">Featured experts</h2>
              <p className="mt-3 text-slate-600">Verified mentors across career, academic, technology, and skill growth.</p>
            </div>
            <Link href="/mentors" className="font-bold text-coral">View all experts -&gt;</Link>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {mentors.map(([name, slug, title, tags]) => (
            <Reveal key={slug}>
              <Link href={`/mentors/${slug}`} className="block h-full rounded-3xl border border-navy/10 bg-ivory p-5 shadow-soft transition hover:-translate-y-1 hover:border-coral/40 hover:bg-white">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-coral text-lg font-black text-white">{name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div>
                <h3 className="mt-4 text-lg font-black text-navy">{name}</h3>
                <p className="mt-1 text-sm font-bold text-coral">{title}</p>
                <div className="mt-3 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full bg-white px-2 py-1 text-xs font-bold text-slate-600">{tag}</span>)}</div>
                <p className="mt-4 text-sm font-bold text-coral">Book session -&gt;</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const items = ["Verified experts", "Secure booking", "Affordable premium sessions", "Session notes / roadmap after session", "Refund or reschedule policy"];
  return (
    <section className="bg-ivory py-14">
      <div className="container-shell">
        <Reveal>
          <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft">
            <h2 className="text-3xl font-black tracking-[-0.04em] text-navy">Built for trust before payment.</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {items.map((item) => <p key={item} className="rounded-2xl bg-ivory p-4 text-sm font-bold text-slate-700">✓ {item}</p>)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="bg-white py-14">
      <div className="container-shell">
        <Reveal>
          <div className="rounded-3xl bg-navy p-8 text-center text-white shadow-soft">
            <h2 className="text-3xl font-black tracking-[-0.04em]">Start with one expert session today.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-200">Choose a service, pick a slot, and walk into your next opportunity with a clearer plan.</p>
            <Link href="/mentors" className="mt-6 inline-flex rounded-xl bg-coral px-5 py-3 text-sm font-bold text-white hover:bg-[#dc4429]">Find an Expert -&gt;</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RoleLanding({ role, dashboardHref }: { role: AppRole; dashboardHref: string }) {
  const isExpert = role === "Mentor" || role === "Faculty" || role === "Institution";
  const title = isExpert ? "Expert Studio" : role === "Admin" ? "Admin Control Center" : "Student Learning Space";
  const description = isExpert
    ? "Manage services, course ideas, expert talks, bookings, messages, and earnings from one focused expert interface."
    : role === "Admin"
      ? "Review users, experts, services, bookings, and platform operations."
      : "Explore talks, book mentor services, continue courses, and track your learning journey without expert-only tools in the way.";
  const links = isExpert
    ? [
        ["Dashboard", dashboardHref],
        ["My Services", "/mentor/services"],
        ["Bookings", "/mentor/bookings"],
        ["Availability", "/mentor/availability"],
        ["Students", "/mentor/students"],
        ["Earnings", "/mentor/earnings"],
        ["Profile & Verification", "/mentor/verification"],
      ]
    : role === "Admin"
      ? [
          ["Admin Dashboard", dashboardHref],
          ["Users", "/admin/users"],
          ["Services", "/admin/services"],
          ["Bookings", "/admin/bookings"],
        ]
      : [
          ["Dashboard", dashboardHref],
          ["Find Experts", "/mentors"],
          ["My Bookings", "/bookings"],
          ["My Roadmap", "/roadmap"],
          ["Messages", "/messages"],
          ["Payments", "/payments"],
          ["Profile", "/profile"],
        ];

  return (
    <div className="bg-ivory text-ink">
      <section className="bg-[linear-gradient(135deg,#FFF8F0_0%,#FFFFFF_54%,#EAF3FF_100%)] py-16">
        <div className="container-shell">
          <Reveal>
            <span className="inline-flex rounded-full border border-coral/20 bg-peach px-3 py-1 text-sm font-bold text-coral">{isExpert ? "Expert login" : role === "Admin" ? "Admin login" : "Student login"}</span>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] text-navy sm:text-6xl">{title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">{description}</p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {links.map(([label, href]) => (
              <Reveal key={label}>
                <Link href={href} className="block rounded-3xl border border-navy/10 bg-white p-5 font-black text-navy shadow-soft hover:-translate-y-1 hover:border-coral/40">
                  {label}
                  <ArrowRight className="mt-5 text-coral" size={18} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Hero({ primaryHref, role }: { primaryHref: string; role: AppRole | null }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-navy-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.16),transparent_34%)]" />
      <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_1px_1px,rgba(37,99,235,0.16)_1px,transparent_0)] [background-size:48px_48px]" />
      <div className="absolute left-10 top-24 h-72 w-72 animate-pulse rounded-full bg-electric-500/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-80 w-80 animate-pulse rounded-full bg-electric-300/10 blur-3xl [animation-delay:1s]" />
      <div className="container-shell relative grid items-center gap-10 py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-electric-500/20 px-3 py-1 text-sm font-semibold text-electric-300">India&apos;s expert learning platform</span>
            <h1 className="mt-6 text-5xl font-bold tracking-tight text-chalk sm:text-6xl lg:text-7xl">
              <span className="block">Get interview-ready.</span>
              <span className="block">Get exam-clear.</span>
              <span className="block">Get <span className="text-electric-400">career-certain.</span></span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">Connect with verified industry experts who&apos;ve been exactly where you are. Book a session, join a live talk, or watch expert recordings — all in one place.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={primaryHref} className="rounded-xl bg-electric-500 px-6 py-3 font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition hover:-translate-y-1 hover:bg-electric-400">Find help for my situation <ArrowRight className="inline" size={18} /></Link>
              <Link href="/expert-talks" className="rounded-xl border border-electric-300 px-6 py-3 font-semibold text-electric-300 transition hover:-translate-y-1 hover:bg-electric-500/10">See live expert talks <ArrowRight className="inline" size={18} /></Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Verified experts", "Mentor-set pricing", "Free first session"].map((chip) => <span key={chip} className="rounded-full border border-electric-500/20 bg-navy-800 px-3 py-1 text-sm text-slate-300">✓ {chip}</span>)}
            </div>
            {role && <p className="mt-5 text-sm text-slate-400">You&apos;re signed in. Use the dashboard link above to continue.</p>}
          </div>
        </Reveal>
        <Reveal className="relative hidden min-h-[420px] lg:block">
          <StudentHeroCharacter />
        </Reveal>
      </div>
    </section>
  );
}

function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return <div className="mb-10 text-center"><h2 className="text-3xl font-bold tracking-tight text-chalk sm:text-5xl">{title}</h2>{sub && <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300">{sub}</p>}</div>;
}

function SituationSection() {
  return <section className="bg-navy-900 py-24"><div className="container-shell"><Reveal><SectionTitle title="What's your situation right now?" sub="Pick where you are — we'll connect you with the right expert." /></Reveal><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{situations.map(([title, slug, text, variant]) => <Reveal key={slug}><Link href={`/services?situation=${slug}`} className="group block h-full cursor-pointer rounded-2xl border border-electric-500/20 bg-navy-800 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-electric-500/60 hover:bg-navy-700 hover:shadow-lg hover:shadow-electric-500/10"><MiniCharacter variant={variant} /><h3 className="mt-4 text-lg font-semibold text-chalk">{title}</h3><p className="mt-2 text-sm text-slate-400">{text}</p><span className="mt-5 inline-flex text-sm font-semibold text-electric-300">Get help <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" size={16} /></span></Link></Reveal>)}</div></div></section>;
}

function TalksSection() {
  return <section className="bg-navy-950 py-24"><div className="container-shell"><Reveal><SectionTitle title="Live expert talks" /></Reveal><div className="flex gap-5 overflow-x-auto pb-3 lg:grid lg:grid-cols-4 lg:overflow-visible">{talks.map(([title, slug, mentor, category, offset, time]) => { const date = formatDate(addDays(offset)); return <Reveal key={slug} className="min-w-[260px]"><article className="h-full rounded-2xl border border-electric-500/20 bg-navy-800 transition-all hover:-translate-y-1 hover:border-electric-500/60"><div className="flex items-start justify-between p-4"><div className="rounded-xl bg-electric-500 px-3 py-2 text-center text-white"><p className="text-xl font-bold leading-none">{date.split(" ")[0]}</p><p className="text-xs font-semibold uppercase">{date.split(" ")[1]}</p></div><span className="rounded-full bg-electric-500/20 px-3 py-1 text-xs font-semibold text-electric-300">{category}</span></div><h3 className="px-4 text-base font-semibold text-chalk">{title}</h3><p className="mt-2 px-4 text-sm text-slate-400">{mentor}</p><p className="px-4 pb-4 pt-2 text-sm text-slate-500">{time} · Online</p><Link href={`/expert-talks/${slug}`} className="mx-4 mb-4 flex justify-center rounded-lg bg-electric-500 px-4 py-2 font-semibold text-white shadow-[0_0_16px_rgba(37,99,235,0.35)] hover:bg-electric-400">Register -&gt;</Link></article></Reveal>; })}</div></div></section>;
}

function ServicesSection() {
  return <section className="bg-navy-900 py-24"><div className="container-shell"><Reveal><SectionTitle title="Book mentor services" /></Reveal><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{services.map(([title, slug, mentor, mentorTitle, category, duration, status, availability]) => <Reveal key={slug}><article className="h-full rounded-2xl border border-electric-500/20 bg-navy-800 p-5 transition-all hover:-translate-y-1 hover:border-electric-500/60 hover:bg-navy-700"><span className="rounded-full bg-electric-500/20 px-3 py-1 text-xs font-semibold text-electric-300">{category}</span><h3 className="mt-3 text-base font-semibold text-chalk">{title}</h3><p className="mt-2 text-sm font-medium text-electric-300">{mentor}</p><p className="text-xs text-slate-400">{mentorTitle}</p><div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400"><span>{duration}</span><span className={`rounded-full px-2 py-1 ${status === "limited" ? "bg-amber-500/20 text-amber-300" : "bg-green-500/20 text-green-300"}`}>{availability}</span></div><p className="mt-3 text-xs italic text-slate-500">Price set by mentor</p><Link href={`/services/${slug}`} className="mt-4 flex w-full justify-center rounded-lg bg-electric-500 px-4 py-2 font-semibold text-white hover:bg-electric-400">Book Now -&gt;</Link></article></Reveal>)}</div></div></section>;
}

function RecordingsSection() {
  return <section className="bg-navy-950 py-24"><div className="container-shell"><Reveal><SectionTitle title="Learn anytime with recordings" /></Reveal><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{recordings.map(([title, category, duration, color]) => <Reveal key={title}><article className="overflow-hidden rounded-2xl border border-electric-500/20 bg-navy-800 transition-all hover:-translate-y-1 hover:border-electric-500/60 hover:bg-navy-700"><div className={`h-12 ${color}`} /><h3 className="p-4 pb-1 text-sm font-semibold text-chalk">{title}</h3><p className="px-4 pb-4 text-xs text-slate-400">{category} · {duration}</p><Link href="/recordings" className="block px-4 pb-4 text-sm font-semibold text-electric-300 hover:underline">Watch -&gt;</Link></article></Reveal>)}</div></div></section>;
}

function MentorsSection() {
  return <section className="bg-navy-900 py-24"><div className="container-shell"><Reveal><SectionTitle title="Top mentors and educators" /></Reveal><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{mentors.map(([name, slug, title, tags]) => <Reveal key={slug}><article className="group rounded-2xl border border-electric-500/20 bg-navy-800 p-5 transition-all hover:-translate-y-1 hover:border-electric-500/60 hover:bg-navy-700"><div className="relative grid h-14 w-14 place-items-center rounded-full bg-electric-500/20 text-xl font-bold text-electric-300"><span>{name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><span className="absolute right-0 top-0 h-3 w-3 animate-pulse rounded-full bg-green-400" /></div><h3 className="mt-4 text-base font-semibold text-chalk">{name}</h3><p className="mt-1 text-sm text-slate-400">{title}</p><div className="mt-3 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full bg-electric-500/20 px-2 py-0.5 text-xs text-electric-300">{tag}</span>)}</div><p className="mt-3 text-xs text-green-400">Verified ✓</p><p className="mt-1 translate-y-2 text-xs text-green-300 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">Available now -&gt;</p><Link href={`/mentors/${slug}`} className="mt-4 inline-flex text-sm font-semibold text-electric-300 hover:text-electric-400">View Profile -&gt;</Link></article></Reveal>)}</div></div></section>;
}

function MentorCTA() {
  return <section className="relative overflow-hidden bg-navy-900 py-24"><div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.13),transparent_35%)]" /><div className="container-shell relative grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center"><Reveal><div><h2 className="text-3xl font-bold tracking-tight text-chalk sm:text-5xl">Share your expertise. Earn from it.</h2><p className="mt-4 max-w-2xl text-slate-300">Create your mentor profile, list services, host live talks, upload recordings, and earn — on your terms.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{["Create service listings", "Set your own pricing", "Manage your availability", "Host expert talks", "Track your earnings"].map((item) => <p key={item} className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-electric-300" /> {item}</p>)}</div><Link href="/for-mentors" className="mt-8 inline-flex rounded-xl bg-electric-500 px-6 py-3 font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-electric-400">Join as Mentor -&gt;</Link></div></Reveal><Reveal><MentorCharacter /></Reveal></div></section>;
}

function InstitutionsSection() {
  return <section className="bg-navy-950 py-24"><div className="container-shell"><Reveal><div className="rounded-3xl border border-electric-500/20 bg-navy-800 p-8 text-center"><Sparkles className="mx-auto text-electric-300" /><h2 className="mt-4 text-3xl font-bold text-chalk">Expert access for institutions</h2><p className="mx-auto mt-3 max-w-2xl text-slate-300">Run placement prep, resume clinics, expert talks, and guided learning programs for your students.</p><Link href="/contact" className="mt-6 inline-flex rounded-xl border border-electric-300 px-6 py-3 font-semibold text-electric-300 hover:bg-electric-500/10">Partner with us -&gt;</Link></div></Reveal></div></section>;
}

function StudentHeroCharacter() {
  return <svg viewBox="0 0 300 360" className="absolute bottom-0 right-0 w-[330px] animate-bounce drop-shadow-2xl [animation-duration:3s]" role="img" aria-label="Confident student with laptop"><defs><filter id="heroShadow"><feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#2563EB" floodOpacity="0.28" /></filter></defs><g filter="url(#heroShadow)"><ellipse cx="150" cy="328" rx="82" ry="18" fill="#2563EB" opacity="0.18"/><rect x="90" y="162" width="122" height="132" rx="34" fill="#2563EB"/><rect x="110" y="178" width="80" height="62" rx="12" fill="#BFDBFE"/><circle cx="150" cy="98" r="68" fill="#D4956A"/><path d="M82 86c10-52 55-76 103-54 28 13 43 38 42 65-24-18-49-21-79-17-28 4-45 1-66 6z" fill="#1a1a1a"/><circle cx="126" cy="100" r="11" fill="#111827"/><circle cx="174" cy="100" r="11" fill="#111827"/><circle cx="130" cy="96" r="3" fill="#fff"/><circle cx="178" cy="96" r="3" fill="#fff"/><ellipse cx="150" cy="124" rx="23" ry="13" fill="#C68642" opacity="0.35"/><path d="M128 139c14 12 32 12 46 0" fill="none" stroke="#7c2d12" strokeWidth="5" strokeLinecap="round"/><rect x="52" y="184" width="58" height="88" rx="20" fill="#0e2260"/><rect x="96" y="218" width="112" height="62" rx="10" fill="#0a1845"/><rect x="106" y="228" width="92" height="40" rx="6" fill="#60A5FA"/></g></svg>;
}

function MentorCharacter() {
  return <svg viewBox="0 0 300 360" className="mx-auto w-[270px] animate-bounce [animation-duration:3s]" role="img" aria-label="Mentor with laptop"><defs><filter id="mentorShadow"><feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#2563EB" floodOpacity="0.24" /></filter></defs><g filter="url(#mentorShadow)"><ellipse cx="150" cy="330" rx="86" ry="18" fill="#2563EB" opacity="0.18"/><rect x="96" y="160" width="108" height="125" rx="28" fill="#3B82F6"/><circle cx="150" cy="92" r="62" fill="#C68642"/><path d="M93 78c12-42 76-58 112-18 8 9 11 23 9 36-37-22-72-22-121-18z" fill="#1a1a1a"/><circle cx="128" cy="96" r="10" fill="#111827"/><circle cx="172" cy="96" r="10" fill="#111827"/><circle cx="132" cy="92" r="3" fill="#fff"/><circle cx="176" cy="92" r="3" fill="#fff"/><path d="M130 128c13 10 29 10 42 0" fill="none" stroke="#7c2d12" strokeWidth="5" strokeLinecap="round"/><rect x="82" y="224" width="136" height="70" rx="10" fill="#0a1845"/><path d="M105 260l24-20 20 12 28-34" fill="none" stroke="#60A5FA" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/><rect x="210" y="178" width="32" height="44" rx="10" fill="#F8FAFC"/></g></svg>;
}

function MiniCharacter({ variant }: { variant: string }) {
  const config: Record<string, { skin: string; hair: string; shirt: string; glasses?: boolean; prop: string }> = {
    murthy: { skin: "#D4956A", hair: "#888", shirt: "#60A5FA", glasses: true, prop: "briefcase" },
    kalam: { skin: "#8D5524", hair: "#888", shirt: "#F8FAFC", glasses: true, prop: "paper" },
    tata: { skin: "#D4956A", hair: "#c0c0c0", shirt: "#0e2260", prop: "sign" },
    pichai: { skin: "#C68642", hair: "#1a1a1a", shirt: "#2563EB", prop: "bulb" },
    nadella: { skin: "#C68642", hair: "#1a1a1a", shirt: "#3B82F6", prop: "code" },
    nooyi: { skin: "#8D5524", hair: "#1a1a1a", shirt: "#0e2260", prop: "chai" },
    bedi: { skin: "#C68642", hair: "#4a4a4a", shirt: "#64748b", prop: "book" },
    kiyosaki: { skin: "#F1C27D", hair: "#c0c0c0", shirt: "#4a4a4a", prop: "coins" },
  };
  const c = config[variant] ?? config.murthy;
  return <svg viewBox="0 0 120 140" className="h-20 w-20 transition-transform duration-200 group-hover:scale-110" role="img" aria-hidden="true"><defs><filter id={`shadow-${variant}`}><feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#2563EB" floodOpacity="0.2" /></filter></defs><g filter={`url(#shadow-${variant})`}><rect x="34" y="76" width="52" height="48" rx="16" fill={c.shirt}/><circle cx="60" cy="45" r="31" fill={c.skin}/><path d="M30 38c7-25 39-35 62-14 6 6 8 14 7 22-21-13-43-13-69-8z" fill={c.hair}/><circle cx="49" cy="48" r="6" fill="#111827"/><circle cx="72" cy="48" r="6" fill="#111827"/><circle cx="51" cy="46" r="2" fill="#fff"/><circle cx="74" cy="46" r="2" fill="#fff"/>{c.glasses && <><circle cx="49" cy="48" r="10" fill="none" stroke="#0f172a" strokeWidth="2"/><circle cx="72" cy="48" r="10" fill="none" stroke="#0f172a" strokeWidth="2"/><rect x="59" y="47" width="3" height="2" fill="#0f172a"/></>}<path d="M49 62c8 6 16 6 24 0" fill="none" stroke="#7c2d12" strokeWidth="3" strokeLinecap="round"/><Accessory prop={c.prop} /></g></svg>;
}

function Accessory({ prop }: { prop: string }) {
  if (prop === "briefcase") return <rect x="78" y="88" width="26" height="18" rx="4" fill="#0f172a"/>;
  if (prop === "paper") return <rect x="79" y="86" width="22" height="26" rx="3" fill="#F8FAFC"/>;
  if (prop === "sign") return <path d="M86 82h22l-8 8 8 8H86z" fill="#60A5FA"/>;
  if (prop === "bulb") return <circle cx="92" cy="22" r="9" fill="#FBBF24"/>;
  if (prop === "code") return <rect x="78" y="88" width="30" height="20" rx="4" fill="#020818"/>;
  if (prop === "chai") return <rect x="80" y="88" width="18" height="18" rx="5" fill="#F8FAFC"/>;
  if (prop === "book") return <rect x="77" y="82" width="28" height="30" rx="4" fill="#F8FAFC"/>;
  return <><circle cx="88" cy="90" r="5" fill="#FBBF24"/><circle cx="101" cy="102" r="5" fill="#FBBF24"/></>;
}
