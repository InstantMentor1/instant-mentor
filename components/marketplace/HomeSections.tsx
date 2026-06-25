import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Search,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import type { AppRole } from "@/lib/auth-shared";

const chips = ["Career Guidance", "Exam Preparation", "Skill Development", "Expert Services", "Recordings", "Events"];
const marqueeItems = ["Live expert talks", "Resume reviews", "Career clarity", "Academic guidance", "Interview prep", "Project reviews", "Skill roadmaps", "Verified experts", "Student support"];

const quickCards = [
  { title: "Expert Talks", text: "Join live learning rooms with verified experts.", href: "/expert-talks", icon: Mic2, tone: "from-red-50 to-orange-50" },
  { title: "Expert Services", text: "Book outcome-focused 1:1 guidance.", href: "/services", icon: BookOpen, tone: "from-sky-50 to-blue-50" },
  { title: "Recordings", text: "Revisit useful sessions and resources.", href: "/recordings", icon: MonitorPlay, tone: "from-amber-50 to-white" },
  { title: "Events", text: "Track upcoming sessions and learning events.", href: "/events", icon: CalendarDays, tone: "from-rose-50 to-white" },
  { title: "Experts", text: "Explore educators, mentors, and specialists.", href: "/mentors", icon: Users, tone: "from-indigo-50 to-sky-50" },
  { title: "Contact", text: "Get student support or expert onboarding help.", href: "/contact", icon: MessageCircle, tone: "from-slate-50 to-white" },
];

const talks = [
  { title: "Placement Prep Room", expert: "Career expert", day: "26", month: "Jun", time: "7:00 PM", category: "Career" },
  { title: "AI Tools for Students", expert: "Skill expert", day: "28", month: "Jun", time: "6:00 PM", category: "Skills" },
  { title: "Exam Strategy Clinic", expert: "Academic expert", day: "30", month: "Jun", time: "11:00 AM", category: "Exams" },
];

const experts = [
  ["Aarav", "Career Expert", "Resume â€¢ Interviews"],
  ["Kavya", "Academic Expert", "Exams â€¢ Research"],
  ["Rohan", "Tech Expert", "AI â€¢ Projects"],
] as const;

export function MinimalLandingPage({
  dashboardHref,
  role,
}: {
  dashboardHref: string | null;
  role: AppRole | null;
}) {
  const isExpert = role === "Mentor" || role === "Faculty" || role === "Institution";
  const isStudent = role === "Student";

  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff_0%,#eef7ff_58%,#fff8f3_100%)] py-12 sm:py-16">
        <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-red-200/35 blur-3xl" />
        <div className="pointer-events-none absolute left-6 top-40 hidden h-24 w-24 rotate-12 rounded-[2rem] bg-white shadow-soft lg:block" />
        <div className="container-shell relative grid gap-10 lg:grid-cols-[1fr_.82fr] lg:items-center">
          <div>
            <Image src="/my-expert-talk-logo.png" alt="My Expert Talk" width={1600} height={1600} priority className="mb-8 h-20 w-auto object-contain sm:h-24" />
            <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-600 shadow-sm">
              <Sparkles size={14} /> Your Journey, Guided By Greatness
            </span>
            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[.96] tracking-[-0.055em] text-slate-950 sm:text-7xl lg:text-8xl">
              Learn directly from experts, mentors, and educators.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-650 sm:text-lg">
              Join expert talks, book expert services, access recordings, and get guidance for academics, career, skills, and growth.
            </p>
            <form action="/services" className="mt-7 flex max-w-2xl flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-2 shadow-soft sm:flex-row">
              <label className="relative flex-1">
                <span className="sr-only">Search learning topic</span>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input name="search" className="form-input border-0 bg-slate-50 pl-11 focus:ring-0" placeholder="What do you want to learn or discuss?" />
              </label>
              <button className="btn-primary bg-red-600 hover:bg-red-700" type="submit">Search</button>
            </form>
            <div className="mt-4 flex max-w-3xl flex-wrap gap-2">
              {chips.map((chip) => <Link key={chip} href="/services" className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:-translate-y-0.5 hover:border-red-200 hover:text-red-600">{chip}</Link>)}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={dashboardHref ?? "/expert-talks"} className="btn-primary bg-slate-950 hover:bg-black">
                {dashboardHref ? "Open Dashboard" : "Explore Expert Talks"} <ArrowRight size={17} />
              </Link>
              {!dashboardHref && <Link href="/for-mentors" className="btn-secondary">Join as Expert</Link>}
              {isStudent && <Link href="/services" className="btn-secondary">Book Expert Service</Link>}
              {isExpert && <Link href="/mentor/services/new" className="btn-secondary">Create Service</Link>}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-red-100 via-white to-sky-100" />
            <div className="relative rounded-[2rem] border border-white bg-white/90 p-5 shadow-soft">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Live Expert Talks", "3 this week", Mic2],
                  ["Book Expert Services", "1:1 guidance", BookOpen],
                  ["Recorded Sessions", "Learn anytime", MonitorPlay],
                  ["Upcoming Events", "Calendar view", CalendarDays],
                ].map(([title, text, Icon]) => (
                  <div key={title as string} className="rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-sky-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                    <Icon className="text-red-600" />
                    <p className="mt-4 font-black text-slate-950">{title as string}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{text as string}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-3xl bg-slate-950 p-5 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950"><GraduationCap /></div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-red-200">Student path</p>
                    <p className="font-black">Find your next expert in minutes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      <section className="bg-white py-14">
        <div className="container-shell">
          <SectionTitle eyebrow="Quick access" title="Everything important gets its own clean page." />
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {quickCards.map(({ title, text, href, icon: Icon, tone }) => (
              <Link key={title} href={href} className={`group rounded-[2rem] border border-slate-200 bg-gradient-to-br ${tone} p-6 shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-soft`}>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-red-600 shadow-sm transition group-hover:rotate-3"><Icon /></div>
                <h3 className="mt-6 text-2xl font-black text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
                <span className="mt-5 inline-flex items-center text-sm font-black text-red-600">Open <ArrowRight className="ml-2" size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-50 py-14">
        <div className="container-shell">
          <SectionTitle eyebrow="Expert talks" title="Live learning sessions that feel easy to join." />
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {talks.map((talk) => (
              <article key={talk.title} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-2xl bg-red-600 px-4 py-3 text-center text-white">
                    <p className="text-2xl font-black leading-none">{talk.day}</p>
                    <p className="text-xs font-black uppercase">{talk.month}</p>
                  </div>
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-600">{talk.category}</span>
                </div>
                <h3 className="mt-5 text-xl font-black text-slate-950">{talk.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{talk.expert} â€¢ Online â€¢ {talk.time}</p>
                <Link href="/expert-talks" className="btn-secondary mt-5 !px-4 !py-2">View Details</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">Students + Experts</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">Two clear paths. No extra tabs.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">Students discover talks, recordings, and expert services. Experts create services, host talks, and manage bookings.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <PathCard title="Join as Student" text="Explore expert talks, book services, and manage your learning journey." href="/signup" />
            <PathCard title="Join as Expert" text="Create services, host expert talks, and guide students with your expertise." href="/for-mentors" />
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white">
        <div className="container-shell flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">Start focused</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-5xl">Find guidance without the noise.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={dashboardHref ?? "/expert-talks"} className="rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950">{dashboardHref ? "Open Dashboard" : "Explore Expert Talks"}</Link>
            {!dashboardHref && <Link href="/signup" className="rounded-full border border-white/20 px-6 py-3 text-sm font-black">Join Now</Link>}
          </div>
        </div>
      </section>
    </>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">{title}</h2>
    </div>
  );
}

function PathCard({ title, text, href }: { title: string; text: string; href: string }) {
  return (
    <Link href={href} className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-sky-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <Star className="text-red-600" />
      <h3 className="mt-5 text-2xl font-black text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
      <span className="mt-5 inline-flex items-center text-sm font-black text-red-600">Continue <ArrowRight className="ml-2" size={16} /></span>
    </Link>
  );
}

function MarqueeStrip() {
  const repeated = [...marqueeItems, ...marqueeItems];
  return (
    <div className="overflow-hidden border-y border-red-100 bg-red-600 py-3 text-white">
      <div className="flex w-max animate-[marquee_36s_linear_infinite] gap-6 whitespace-nowrap">
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-6 text-xs font-black uppercase tracking-[0.18em]">
            <Star size={13} fill="currentColor" /> {item}
          </span>
        ))}
      </div>
    </div>
  );
}
