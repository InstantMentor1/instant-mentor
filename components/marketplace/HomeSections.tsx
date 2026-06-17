import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  LibraryBig,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import type { AppRole } from "@/lib/auth-shared";

const marqueeItems = [
  "Career clarity",
  "Live expert talks",
  "Resume reviews",
  "Academic guidance",
  "Interview prep",
  "Project reviews",
  "Skill roadmaps",
  "Recorded sessions",
  "Verified mentors",
  "Institution programs",
];

const featuredLinks = [
  {
    title: "Expert Talks",
    text: "Live mentor-led sessions for career, exams, academics, and skills.",
    href: "/expert-talks",
    icon: Mic2,
  },
  {
    title: "Mentor Services",
    text: "Book focused 1:1 services with mentor-set pricing and outcomes.",
    href: "/services",
    icon: BookOpen,
  },
  {
    title: "Recordings",
    text: "Catch up on past talks and learning resources anytime.",
    href: "/recordings",
    icon: MonitorPlay,
  },
];

const talkPreview = [
  ["Placement Prep Room", "Today, 7 PM", "Career"],
  ["AI Tools for Students", "Tomorrow, 6 PM", "Skills"],
  ["Exam Strategy Clinic", "Sat, 11 AM", "Academics"],
] as const;

export function MinimalLandingPage({
  dashboardHref,
  role,
}: {
  dashboardHref: string | null;
  role: AppRole | null;
}) {
  const isMentor = role === "Mentor" || role === "Faculty" || role === "Institution";
  const isStudent = role === "Student";

  return (
    <>
      <section className="relative overflow-hidden bg-[#050505] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,.16),transparent_24%),radial-gradient(circle_at_82%_12%,rgba(239,68,68,.18),transparent_22%),linear-gradient(180deg,#050505_0%,#111_60%,#f6f6f2_100%)]" />
        <div className="pointer-events-none absolute -left-20 top-28 h-64 w-64 rounded-[3rem] border border-white/10 bg-white/5 blur-sm rotate-12" />
        <div className="pointer-events-none absolute right-8 top-28 hidden h-40 w-40 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/20 to-white/0 shadow-2xl rotate-12 lg:block" />
        <div className="pointer-events-none absolute bottom-28 right-24 hidden h-28 w-28 rounded-full bg-red-500/20 shadow-[0_30px_80px_rgba(239,68,68,.35)] lg:block" />

        <div className="container-shell relative grid min-h-[78vh] items-center gap-12 py-16 lg:grid-cols-[1fr_.78fr] lg:py-20">
          <div>
            <Image
              src="/my-expert-talk-logo.png"
              alt="My Expert Talk"
              width={1600}
              height={1600}
              priority
              className="mb-9 h-20 w-auto object-contain sm:h-24"
            />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/80 backdrop-blur">
              <Sparkles size={14} /> Your Journey, Guided By Greatness
            </span>
            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[.93] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              Learn from the right expert at the right moment.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              A minimal expert access platform for students and learners:
              explore talks, book mentor services, and revisit recordings
              without digging through a crowded homepage.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={dashboardHref ?? "/expert-talks"} className="rounded-full bg-white px-6 py-3 text-sm font-black text-black shadow-[0_18px_60px_rgba(255,255,255,.24)] transition hover:-translate-y-0.5">
                {dashboardHref ? "Open Dashboard" : "Explore Expert Talks"} <ArrowRight className="ml-2 inline" size={16} />
              </Link>
              {!dashboardHref && (
                <Link href="/signup" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15">
                  Get Started
                </Link>
              )}
              {!dashboardHref && (
                <Link href="/for-mentors" className="rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white/80 transition hover:text-white">
                  Apply as Mentor
                </Link>
              )}
              {isStudent && <Link href="/services" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur">Book Mentor Service</Link>}
              {isMentor && <Link href="/mentor/services/new" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur">Create Service</Link>}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-white/10 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-[0_40px_120px_rgba(0,0,0,.45)] backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-[#f7f4ee] p-5 text-black shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">Live this week</p>
                    <h2 className="mt-1 text-2xl font-black">Pick your next move</h2>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-xl">
                    <GraduationCap />
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  {talkPreview.map(([title, time, tag]) => (
                    <Link key={title} href="/expert-talks" className="flex items-center justify-between rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                      <div>
                        <p className="font-black">{title}</p>
                        <p className="mt-1 text-xs font-bold text-black/50">{time}</p>
                      </div>
                      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-600">{tag}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      <section className="bg-[#f6f6f2] py-14">
        <div className="container-shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">Minimal by design</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-black sm:text-5xl">
              Three clear doors. No clutter.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredLinks.map(({ title, text, href, icon: Icon }) => (
              <Link key={title} href={href} className="group rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,.06)] transition hover:-translate-y-2 hover:shadow-[0_34px_100px_rgba(0,0,0,.12)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white transition group-hover:rotate-6 group-hover:bg-red-600">
                  <Icon />
                </div>
                <h3 className="mt-6 text-2xl font-black text-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/60">{text}</p>
                <span className="mt-6 inline-flex items-center text-sm font-black text-red-600">Open <ArrowRight className="ml-2" size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-shell grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">Separate pages</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-black sm:text-5xl">
              The landing page stays light. Details live where they belong.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-black/60">
              Expert talks, services, recordings, mentors, events, contact,
              and institutions each have their own page so the homepage feels
              premium and easy to scan.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["/mentors", "Meet mentors", Users],
              ["/events", "Upcoming events", CalendarDays],
              ["/recordings", "Watch recordings", LibraryBig],
              ["/contact", "Contact team", MessageCircle],
            ].map(([href, label, Icon]) => (
              <Link key={href as string} href={href as string} className="rounded-3xl border border-black/5 bg-[#f6f6f2] p-5 font-black text-black transition hover:-translate-y-1 hover:bg-black hover:text-white">
                <Icon className="mb-5 text-red-600" />
                {label as string}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#050505] py-14 text-white">
        <div className="container-shell flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">Start focused</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-5xl">
              Find guidance without the noise.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={dashboardHref ?? "/expert-talks"} className="rounded-full bg-white px-6 py-3 text-sm font-black text-black">
              {dashboardHref ? "Open Dashboard" : "Explore Expert Talks"}
            </Link>
            {!dashboardHref && <Link href="/signup" className="rounded-full border border-white/20 px-6 py-3 text-sm font-black">Join Now</Link>}
          </div>
        </div>
      </section>
    </>
  );
}

function MarqueeStrip() {
  const repeated = [...marqueeItems, ...marqueeItems];

  return (
    <div className="overflow-hidden border-y border-black/10 bg-red-600 py-4 text-white">
      <div className="flex w-max animate-[marquee_32s_linear_infinite] gap-6 whitespace-nowrap">
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-6 text-sm font-black uppercase tracking-[0.18em]">
            <Star size={15} fill="currentColor" /> {item}
          </span>
        ))}
      </div>
    </div>
  );
}
