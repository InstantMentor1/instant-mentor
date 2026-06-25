import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  GraduationCap,
  Mail,
  Mic2,
  MonitorPlay,
  Search,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import type { AppRole } from "@/lib/auth-shared";

const chips = ["Career Guidance", "Exam Preparation", "Skill Development", "Mentor Services", "Recordings", "Events"];
const marqueeItems = ["Live expert talks", "Resume reviews", "Career clarity", "Academic guidance", "Interview prep", "Project reviews", "Skill roadmaps", "Verified mentors", "Student support"];

const quickCards = [
  { title: "Expert Talks", text: "Join live learning sessions with experts and educators.", href: "/expert-talks", icon: Mic2, tone: "bg-peach" },
  { title: "Mentor Services", text: "Book focused 1:1 guidance with mentor-set pricing.", href: "/services", icon: BookOpen, tone: "bg-skysoft" },
  { title: "Recordings", text: "Access past learning sessions, materials, and resources.", href: "/recordings", icon: MonitorPlay, tone: "bg-white" },
  { title: "Events", text: "Track upcoming learning sessions and expert programs.", href: "/events", icon: CalendarDays, tone: "bg-peach" },
  { title: "Meet Mentors", text: "Explore verified mentors by expertise and availability.", href: "/mentors", icon: Users, tone: "bg-skysoft" },
  { title: "Institution Programs", text: "Bring expert access to students at scale.", href: "/contact", icon: Building2, tone: "bg-white" },
];

const talks = [
  { title: "Placement Prep Room", speaker: "Career mentor", day: "26", month: "Jun", time: "7:00 PM" },
  { title: "AI Tools for Students", speaker: "Skill educator", day: "28", month: "Jun", time: "6:00 PM" },
  { title: "Exam Strategy Clinic", speaker: "Academic expert", day: "30", month: "Jun", time: "11:00 AM" },
];

const services = [
  { title: "Resume Review", mentor: "Career Mentor", category: "Career Guidance", duration: "30 min", availability: "This week" },
  { title: "Mock Interview", mentor: "Industry Mentor", category: "Placement Prep", duration: "45 min", availability: "Evenings" },
  { title: "Project Review", mentor: "Technical Mentor", category: "Skill Development", duration: "45 min", availability: "Weekend" },
];

const mentors = [
  { name: "Aarav Mehta", role: "Career Mentor", tags: ["Resume", "Interviews"], tone: "bg-peach" },
  { name: "Kavya Rao", role: "Academic Educator", tags: ["Exams", "Research"], tone: "bg-skysoft" },
  { name: "Rohan Iyer", role: "Technology Mentor", tags: ["AI", "Projects"], tone: "bg-white" },
];

const recordings = ["Recorded Expert Talks", "Past Learning Sessions", "Skill Resources", "Session Materials"];

export function MinimalLandingPage({ dashboardHref, role }: { dashboardHref: string | null; role: AppRole | null }) {
  const isExpert = role === "Mentor" || role === "Faculty" || role === "Institution";
  const isStudent = role === "Student";

  return (
    <>
      <section className="relative overflow-hidden bg-hero-glow py-12 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-coral/15 blur-3xl" />
        <div className="pointer-events-none absolute left-8 top-44 hidden h-24 w-24 rotate-12 rounded-[2rem] bg-white shadow-soft lg:block" />
        <div className="container-shell relative grid gap-10 lg:grid-cols-[1fr_.86fr] lg:items-center">
          <div>
            <Image src="/my-expert-talk-logo.png" alt="My Expert Talk" width={1600} height={1600} priority className="mb-8 h-20 w-auto object-contain sm:h-24" />
            <span className="inline-flex items-center gap-2 rounded-full border border-coral/20 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-coral shadow-sm">
              <Sparkles size={14} /> Your Journey, Guided By Greatness
            </span>
            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[.98] tracking-[-0.055em] text-navy sm:text-7xl lg:text-8xl">
              Learn directly from experts, mentors, and educators.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
              Join expert talks, book mentor services, access recordings, and get guidance for academics, career, skills, and growth.
            </p>
            <form action="/services" className="mt-7 flex max-w-2xl flex-col gap-3 rounded-[1.5rem] border border-navy/10 bg-white p-2 shadow-soft sm:flex-row">
              <label className="relative flex-1">
                <span className="sr-only">Search learning topic</span>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input name="search" className="form-input border-0 bg-skysoft pl-11 focus:ring-0" placeholder="What do you want to learn or discuss?" />
              </label>
              <button className="btn-primary" type="submit">Search</button>
            </form>
            <div className="mt-4 flex max-w-3xl flex-wrap gap-2">
              {chips.map((chip) => (
                <Link key={chip} href="/services" className="rounded-full border border-navy/10 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:-translate-y-0.5 hover:border-coral/30 hover:text-coral">
                  {chip}
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={dashboardHref ?? "/expert-talks"} className="btn-primary">
                {dashboardHref ? "Open Dashboard" : "Explore Expert Talks"} <ArrowRight size={17} />
              </Link>
              {!dashboardHref && <Link href="/for-mentors" className="btn-secondary">Join as Mentor</Link>}
              {isStudent && <Link href="/services" className="btn-secondary">Book Mentor Service</Link>}
              {isExpert && <Link href="/mentor/services/new" className="btn-secondary">Create Service</Link>}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rounded-[2.2rem] bg-gradient-to-br from-coral/15 via-white to-academic/15" />
            <div className="relative rounded-[2rem] border border-white bg-white p-5 shadow-soft">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Live Expert Talks", "3 this week", Mic2],
                  ["Mentor Services", "1:1 guidance", BookOpen],
                  ["Recorded Sessions", "Learn anytime", MonitorPlay],
                  ["Upcoming Events", "Calendar view", CalendarDays],
                ].map(([title, text, Icon]) => (
                  <div key={title as string} className="rounded-3xl border border-navy/10 bg-gradient-to-br from-white to-skysoft p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                    <Icon className="text-coral" />
                    <p className="mt-4 font-black text-navy">{title as string}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{text as string}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-3xl bg-navy p-5 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-navy"><GraduationCap /></div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-100">Student path</p>
                    <p className="font-black">Find your next mentor in minutes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />
      <QuickAccessSection />
      <AboutSection />
      <ExpertTalksPreview />
      <MentorServicesPreview />
      <RecordingsPreview />
      <MentorsPreview />
      <EventsPreview />
      <JoinPaths dashboardHref={dashboardHref} />
      <InstitutionProgramsSection />
      <NewsletterSection />
    </>
  );
}

function QuickAccessSection() {
  return (
    <section className="bg-white py-14">
      <div className="container-shell">
        <SectionTitle eyebrow="Quick access" title="Choose where you want to begin." />
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {quickCards.map(({ title, text, href, icon: Icon, tone }) => (
            <Link key={title} href={href} className={`group rounded-[2rem] border border-navy/10 ${tone} p-6 shadow-sm transition hover:-translate-y-1 hover:border-coral/30 hover:shadow-soft`}>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-coral shadow-sm transition group-hover:rotate-3"><Icon /></div>
              <h3 className="mt-6 text-2xl font-black text-navy">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
              <span className="mt-5 inline-flex items-center text-sm font-black text-coral">Open <ArrowRight className="ml-2" size={16} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="bg-ivory py-14">
      <div className="container-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-coral">About My Expert Talk</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-navy sm:text-5xl">A premium learning hub for talks, services, and guided growth.</h2>
        </div>
        <p className="text-base leading-8 text-slate-700">
          My Expert Talk brings students, mentors, educators, institutions, and subject-matter experts into one clean platform. Attend expert talks, book mentor services, revisit recordings, and keep your learning journey moving with verified guidance.
        </p>
      </div>
    </section>
  );
}

function ExpertTalksPreview() {
  return (
    <section className="bg-skysoft py-14">
      <div className="container-shell">
        <SectionTitle eyebrow="Expert talks" title="Live learning sessions that feel easy to join." />
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {talks.map((talk) => (
            <article key={talk.title} className="rounded-[2rem] border border-navy/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-2xl bg-coral px-4 py-3 text-center text-white">
                  <p className="text-2xl font-black leading-none">{talk.day}</p>
                  <p className="text-xs font-black uppercase">{talk.month}</p>
                </div>
                <span className="rounded-full bg-peach px-3 py-1 text-xs font-black text-coral">Online</span>
              </div>
              <h3 className="mt-5 text-xl font-black text-navy">{talk.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{talk.speaker} - {talk.time}</p>
              <Link href="/expert-talks" className="btn-secondary mt-5 !px-4 !py-2">View Details</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MentorServicesPreview() {
  return (
    <section className="bg-white py-14">
      <div className="container-shell">
        <SectionTitle eyebrow="Mentor services" title="Book guidance with clear outcomes." />
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="card p-6 transition hover:-translate-y-1 hover:shadow-soft">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-academic">{service.category}</p>
              <h3 className="mt-3 text-2xl font-black text-navy">{service.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{service.mentor}</p>
              <div className="mt-5 space-y-2 text-sm text-slate-600">
                <p><strong className="text-navy">Duration:</strong> {service.duration}</p>
                <p><strong className="text-navy">Price:</strong> Price set by mentor</p>
                <p><strong className="text-navy">Availability:</strong> {service.availability}</p>
              </div>
              <Link href="/services" className="btn-primary mt-6 !px-4 !py-2">Book Service</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecordingsPreview() {
  return (
    <section className="bg-ivory py-14">
      <div className="container-shell">
        <SectionTitle eyebrow="Recordings" title="Useful learning stays available." />
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recordings.map((title) => (
            <article key={title} className="rounded-[2rem] border border-navy/10 bg-white p-6 shadow-sm">
              <MonitorPlay className="text-academic" />
              <h3 className="mt-5 text-xl font-black text-navy">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Curated learning content will appear here as sessions are published.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MentorsPreview() {
  return (
    <section className="bg-white py-14">
      <div className="container-shell">
        <SectionTitle eyebrow="Meet mentors" title="Premium mentor cards, built for student trust." />
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {mentors.map((mentor) => (
            <article key={mentor.name} className={`rounded-[2rem] border border-navy/10 ${mentor.tone} p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft`}>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl font-black text-coral shadow-sm">{mentor.name.charAt(0)}</div>
              <div className="mt-5 flex items-center gap-2">
                <h3 className="text-2xl font-black text-navy">{mentor.name}</h3>
                <span className="rounded-full bg-white px-2 py-1 text-[10px] font-black text-academic">Verified</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-slate-600">{mentor.role}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {mentor.tags.map((tag) => <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">{tag}</span>)}
              </div>
              <p className="mt-4 text-sm text-slate-600">Available for talks and mentor services.</p>
              <Link href="/mentors" className="btn-secondary mt-5 !px-4 !py-2">View Profile</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsPreview() {
  return (
    <section className="bg-skysoft py-14">
      <div className="container-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-coral">Events</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-navy sm:text-5xl">A clean learning calendar for what is coming next.</h2>
        </div>
        <div className="grid gap-4">
          {talks.map((talk) => (
            <Link key={talk.title} href="/events" className="flex items-center justify-between gap-4 rounded-3xl border border-navy/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
              <div>
                <p className="text-xs font-black uppercase text-coral">{talk.month} {talk.day} - {talk.time}</p>
                <h3 className="mt-1 text-lg font-black text-navy">{talk.title}</h3>
                <p className="text-sm text-slate-600">{talk.speaker} - Online</p>
              </div>
              <span className="hidden rounded-full bg-coral px-4 py-2 text-sm font-black text-white sm:inline-flex">Register</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinPaths({ dashboardHref }: { dashboardHref: string | null }) {
  return (
    <section className="bg-white py-14">
      <div className="container-shell">
        <SectionTitle eyebrow="Join My Expert Talk" title="Separate paths for students, mentors, and institutions." />
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          <PathCard title="Join as Student" text="Explore talks, recordings, mentor services, bookings, and messages." href={dashboardHref ?? "/signup"} />
          <PathCard title="Join as Mentor" text="Create services, host expert talks, manage bookings, and grow your reputation." href="/for-mentors" />
          <PathCard title="Join as Institution" text="Bring expert talks, mentor services, and learning programs to your learners." href="/contact" />
        </div>
      </div>
    </section>
  );
}

function InstitutionProgramsSection() {
  return (
    <section className="bg-ivory py-14">
      <div className="container-shell rounded-[2rem] border border-navy/10 bg-white p-8 shadow-soft lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-coral">Institution programs</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-navy">Expert-led programs for colleges, schools, and learning communities.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">Run expert talks, placement sessions, academic guidance, recording access, and mentor service drives for your students.</p>
          </div>
          <Link href="/contact" className="btn-primary justify-self-start lg:justify-self-end">Contact Us <ArrowRight size={17} /></Link>
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="bg-navy py-14 text-white">
      <div className="container-shell grid gap-6 md:grid-cols-[1fr_.8fr] md:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-100">Stay informed</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.045em]">Get updates on talks, recordings, and mentor openings.</h2>
        </div>
        <form action="/contact" className="flex flex-col gap-3 rounded-3xl bg-white p-2 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Email address</span>
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input className="form-input border-0 bg-skysoft pl-11 focus:ring-0" placeholder="Enter your email" type="email" />
          </label>
          <button className="btn-primary" type="submit">Notify Me</button>
        </form>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-coral">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-navy sm:text-5xl">{title}</h2>
    </div>
  );
}

function PathCard({ title, text, href }: { title: string; text: string; href: string }) {
  return (
    <Link href={href} className="rounded-[2rem] border border-navy/10 bg-gradient-to-br from-white to-skysoft p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <Star className="text-coral" />
      <h3 className="mt-5 text-2xl font-black text-navy">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
      <span className="mt-5 inline-flex items-center text-sm font-black text-coral">Continue <ArrowRight className="ml-2" size={16} /></span>
    </Link>
  );
}

function MarqueeStrip() {
  const repeated = [...marqueeItems, ...marqueeItems];
  return (
    <div className="overflow-hidden border-y border-coral/20 bg-coral py-3 text-white">
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
