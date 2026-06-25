import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Clock3,
  GraduationCap,
  MessageSquareText,
  Mic2,
  MonitorPlay,
  PackageCheck,
  Search,
  Sparkles,
  Star,
  Store,
  Users,
} from "lucide-react";
import type { AppRole } from "@/lib/auth-shared";

const chips = ["Career Guidance", "Exam Help", "Resume Review", "Mock Interview", "Project Support", "AI & Tech Skills", "Business Guidance", "Recordings"];
const categories = [
  ["Expert Talks", "Live mentor-led sessions", "/expert-talks", Mic2, "bg-peach"],
  ["Mentor Services", "Book 1:1 help", "/services", Store, "bg-skysoft"],
  ["Resume Review", "Improve shortlisting", "/services?search=resume", BriefcaseBusiness, "bg-white"],
  ["Mock Interview", "Practice with mentors", "/services?search=mock", MessageSquareText, "bg-peach"],
  ["Exam Preparation", "Strategy and support", "/services?search=exam", GraduationCap, "bg-skysoft"],
  ["Project Support", "Review and improve", "/services?search=project", BookOpen, "bg-white"],
  ["Skill Development", "Roadmaps and practice", "/services?search=skills", Sparkles, "bg-peach"],
  ["Career Guidance", "Clarity and planning", "/services?search=career", PackageCheck, "bg-skysoft"],
  ["Recordings", "Learn anytime", "/recordings", MonitorPlay, "bg-white"],
  ["Events", "Upcoming calendar", "/events", CalendarDays, "bg-peach"],
  ["Mentors", "Verified experts", "/mentors", Users, "bg-skysoft"],
  ["Institutions", "Programs at scale", "/contact", Building2, "bg-white"],
] as const;

const talks = [
  { title: "Placement Prep Sprint", mentor: "Career mentor", category: "Career", date: "26 Jun", time: "7:00 PM" },
  { title: "AI Tools for Students", mentor: "AI educator", category: "Skills", date: "28 Jun", time: "6:00 PM" },
  { title: "Exam Strategy Clinic", mentor: "Academic expert", category: "Exam Help", date: "30 Jun", time: "11:00 AM" },
  { title: "Project Portfolio Review", mentor: "Tech mentor", category: "Projects", date: "2 Jul", time: "5:30 PM" },
];

const services = [
  { title: "Resume Review for Freshers", mentor: "Aarav Mehta", role: "Career Mentor", category: "Resume Review", duration: "30 min", availability: "Slots this week" },
  { title: "Mock Interview for Software Roles", mentor: "Rohan Iyer", role: "Tech Mentor", category: "Mock Interview", duration: "45 min", availability: "Evening slots" },
  { title: "Career Roadmap Session", mentor: "Kavya Rao", role: "Academic Mentor", category: "Career Guidance", duration: "60 min", availability: "Weekend" },
  { title: "Project Review Session", mentor: "Meera Shah", role: "Skill Coach", category: "Project Support", duration: "45 min", availability: "2 seats left" },
];

const recordings = [
  ["Resume teardown replay", "Career", "32 min"],
  ["AI study workflow", "AI & Tech", "41 min"],
  ["Interview mistakes to avoid", "Placement", "28 min"],
  ["Project demo clinic", "Projects", "36 min"],
] as const;

const mentors = [
  { name: "Aarav Mehta", role: "Career Mentor", tags: ["Resume", "Placements"] },
  { name: "Kavya Rao", role: "Academic Educator", tags: ["Exams", "Research"] },
  { name: "Rohan Iyer", role: "Technology Mentor", tags: ["AI", "Projects"] },
  { name: "Meera Shah", role: "Skill Coach", tags: ["Communication", "Growth"] },
];

export function MinimalLandingPage({ dashboardHref, role }: { dashboardHref: string | null; role: AppRole | null }) {
  const isExpert = role === "Mentor" || role === "Faculty" || role === "Institution";
  const isStudent = role === "Student";

  return (
    <>
      <section className="bg-ivory pb-8 pt-8 sm:pb-10 sm:pt-12">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <div className="rounded-[2rem] border border-navy/10 bg-white p-6 shadow-soft sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <Image src="/my-expert-talk-logo.png" alt="My Expert Talk" width={1600} height={1600} priority className="h-14 w-auto object-contain" />
              <span className="rounded-full bg-peach px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-coral">Quick learning store</span>
            </div>
            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-navy sm:text-7xl">
              Order expert learning support in minutes.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
              Browse expert talks, mentor services, recordings, and learning events created by verified mentors and educators. Choose what you need, check availability, and book.
            </p>
            <form action="/services" className="mt-7 flex flex-col gap-3 rounded-[1.4rem] border border-navy/10 bg-ivory p-2 sm:flex-row">
              <label className="relative flex-1">
                <span className="sr-only">Search learning store</span>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-coral" size={19} />
                <input name="search" className="form-input border-0 bg-white pl-12 focus:ring-0" placeholder="Search for resume review, exam help, career guidance, AI skills, project review..." />
              </label>
              <button className="btn-primary" type="submit">Start Exploring</button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              {chips.map((chip) => <Link key={chip} href={`/services?search=${encodeURIComponent(chip)}`} className="rounded-full border border-navy/10 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:-translate-y-0.5 hover:border-coral/30 hover:text-coral">{chip}</Link>)}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={dashboardHref ?? "/services"} className="btn-primary">{dashboardHref ? "Open Dashboard" : "Start Exploring"}<ArrowRight size={17} /></Link>
              {!dashboardHref && <Link href="/for-mentors" className="btn-secondary">Join as Mentor</Link>}
              {isStudent && <Link href="/bookings" className="btn-secondary">My Bookings</Link>}
              {isExpert && <Link href="/mentor/services/new" className="btn-secondary">Create Listing</Link>}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-navy/10 bg-navy p-6 text-white shadow-soft">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-100">Fast checkout idea</p>
              <h2 className="mt-3 text-3xl font-black">Services are products. Availability is stock.</h2>
              <p className="mt-3 text-sm leading-6 text-blue-100">Pick a listing, share context, book the slot, and track fulfilment from your dashboard.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[["Live", "Expert Talks", Mic2], ["Book", "Mentor Services", Store], ["Watch", "Recordings", MonitorPlay], ["Join", "Events", CalendarDays]].map(([verb, title, Icon]) => (
                <Link href={title === "Mentor Services" ? "/services" : title === "Expert Talks" ? "/expert-talks" : `/${String(title).toLowerCase()}`} key={String(title)} className="rounded-[1.6rem] border border-navy/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                  <Icon className="text-coral" />
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-slate-400">{String(verb)}</p>
                  <p className="text-lg font-black text-navy">{String(title)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />
      <StoreCategoryShelfSection />
      <ExpertTalksShelfSection />
      <MentorServicesStoreShelf />
      <RecordingsStoreShelf />
      <MentorsStoreShelf />
      <EventsStoreShelf />
      <QuickBookingFlowSection />
      <MentorPartnerStoreSection />
      <InstitutionProgramsStoreSection />
    </>
  );
}

function ShelfHeader({ eyebrow, title, href }: { eyebrow: string; title: string; href?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-coral">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-black tracking-[-0.035em] text-navy sm:text-4xl">{title}</h2>
      </div>
      {href && <Link href={href} className="hidden text-sm font-black text-coral sm:inline-flex">View all -&gt;</Link>}
    </div>
  );
}

function StoreCategoryShelfSection() {
  return (
    <section className="bg-ivory py-8 sm:py-10">
      <div className="container-shell">
        <ShelfHeader eyebrow="Shop by learning need" title="Fast shelves for every learning moment." />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map(([title, text, href, Icon, tone]) => (
            <Link key={title} href={href} className={`rounded-[1.4rem] border border-navy/10 ${tone} p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-soft`}>
              <Icon className="text-coral" size={24} />
              <h3 className="mt-4 text-sm font-black text-navy sm:text-base">{title}</h3>
              <p className="mt-1 text-xs leading-5 text-slate-600">{text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertTalksShelfSection() {
  return <Shelf title="Live expert talks" eyebrow="Register now" href="/expert-talks">{talks.map((talk) => <TalkCard key={talk.title} {...talk} />)}</Shelf>;
}

function MentorServicesStoreShelf() {
  return <Shelf title="Book mentor services" eyebrow="Popular listings" href="/services">{services.map((service) => <ServicePreviewCard key={service.title} {...service} />)}</Shelf>;
}

function RecordingsStoreShelf() {
  return <Shelf title="Learn anytime with recordings" eyebrow="Learning library" href="/recordings">{recordings.map(([title, topic, duration]) => <RecordingCard key={title} title={title} topic={topic} duration={duration} />)}</Shelf>;
}

function MentorsStoreShelf() {
  return <Shelf title="Top mentors and educators" eyebrow="Verified supply" href="/mentors">{mentors.map((mentor) => <MentorCard key={mentor.name} {...mentor} />)}</Shelf>;
}

function EventsStoreShelf() {
  return <Shelf title="Upcoming learning events" eyebrow="Calendar shelf" href="/events">{talks.map((talk) => <TalkCard key={`event-${talk.title}`} {...talk} cta="Register" />)}</Shelf>;
}

function Shelf({ eyebrow, title, href, children }: { eyebrow: string; title: string; href: string; children: React.ReactNode }) {
  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="container-shell">
        <ShelfHeader eyebrow={eyebrow} title={title} href={href} />
        <div className="flex gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </div>
      </div>
    </section>
  );
}

function TalkCard({ title, mentor, category, date, time, cta = "Register" }: { title: string; mentor: string; category: string; date: string; time: string; cta?: string }) {
  return (
    <article className="min-w-[250px] rounded-[1.6rem] border border-navy/10 bg-ivory p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft sm:min-w-[290px]">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-2xl bg-coral px-3 py-2 text-center text-white"><p className="text-lg font-black">{date.split(' ')[0]}</p><p className="text-[10px] font-black uppercase">{date.split(' ')[1]}</p></div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-coral">{category}</span>
      </div>
      <h3 className="mt-5 text-xl font-black text-navy">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{mentor}</p>
      <p className="mt-4 flex items-center gap-2 text-sm font-bold text-navy"><Clock3 size={15} className="text-academic" /> {time} - Online</p>
      <Link href="/expert-talks" className="btn-primary mt-5 !px-4 !py-2">{cta}</Link>
    </article>
  );
}

function ServicePreviewCard({ title, mentor, role, category, duration, availability }: { title: string; mentor: string; role: string; category: string; duration: string; availability: string }) {
  return (
    <article className="min-w-[270px] rounded-[1.6rem] border border-navy/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft sm:min-w-[320px]">
      <span className="rounded-full bg-skysoft px-3 py-1 text-xs font-black text-academic">{category}</span>
      <h3 className="mt-4 text-xl font-black text-navy">{title}</h3>
      <p className="mt-2 text-sm font-bold text-slate-700">{mentor}</p>
      <p className="text-xs text-slate-500">{role}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-ivory p-4 text-xs font-bold text-slate-600">
        <p>{duration}</p><p>{availability}</p><p className="col-span-2 text-navy">Price set by mentor</p>
      </div>
      <Link href="/services" className="btn-primary mt-5 w-full !py-2.5">Book Now</Link>
    </article>
  );
}

function RecordingCard({ title, topic, duration }: { title: string; topic: string; duration: string }) {
  return (
    <article className="min-w-[230px] rounded-[1.6rem] border border-navy/10 bg-skysoft p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft sm:min-w-[280px]">
      <MonitorPlay className="text-academic" />
      <h3 className="mt-4 text-xl font-black text-navy">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{topic} - {duration}</p>
      <Link href="/recordings" className="mt-5 inline-flex text-sm font-black text-coral">View Recording -&gt;</Link>
    </article>
  );
}

function MentorCard({ name, role, tags }: { name: string; role: string; tags: string[] }) {
  return (
    <article className="min-w-[230px] rounded-[1.6rem] border border-navy/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft sm:min-w-[280px]">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-peach text-xl font-black text-coral">{name[0]}</div>
      <h3 className="mt-4 text-xl font-black text-navy">{name}</h3>
      <p className="text-sm font-bold text-coral">{role}</p>
      <div className="mt-3 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full bg-ivory px-3 py-1 text-xs font-bold text-slate-600">{tag}</span>)}</div>
      <p className="mt-4 text-xs font-bold text-academic">Verified - Available for talks/services</p>
      <Link href="/mentors" className="btn-secondary mt-5 !px-4 !py-2">View Profile</Link>
    </article>
  );
}

function QuickBookingFlowSection() {
  const steps = ["Search or choose a category", "Pick a mentor service or expert talk", "Check price and availability", "Book or register", "Share notes", "Attend or watch"];
  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <ShelfHeader eyebrow="How ordering works" title="Book learning support like ordering online." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">{steps.map((step, index) => <div key={step} className="rounded-2xl border border-navy/10 bg-white p-4 shadow-sm"><p className="text-xs font-black text-coral">0{index + 1}</p><p className="mt-2 text-sm font-black text-navy">{step}</p></div>)}</div>
      </div>
    </section>
  );
}

function MentorPartnerStoreSection() {
  return (
    <section className="bg-white py-10">
      <div className="container-shell rounded-[2rem] border border-navy/10 bg-navy p-8 text-white shadow-soft">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-100">Mentor store partner</p>
        <div className="mt-3 grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
          <div><h2 className="text-4xl font-black tracking-[-0.04em]">Create your expert learning store.</h2><p className="mt-4 text-sm leading-7 text-blue-100">Mentors and educators can create profiles, list services, set prices, manage availability, host expert talks, upload recordings, and earn through bookings.</p></div>
          <div className="grid gap-3 sm:grid-cols-2">{["Create listings", "Set pricing", "Manage availability", "Host talks", "Track earnings"].map((item) => <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm font-black">{item}</div>)}<Link href="/for-mentors" className="rounded-2xl bg-coral p-4 text-center text-sm font-black text-white">Join as Mentor</Link></div>
        </div>
      </div>
    </section>
  );
}

function InstitutionProgramsStoreSection() {
  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <ShelfHeader eyebrow="Institutions" title="Learning programs for institutions." href="/contact" />
        <div className="grid gap-4 md:grid-cols-5">{["Expert talk series", "Placement support", "Exam support", "Project review camps", "Skill programs"].map((item) => <Link href="/contact" key={item} className="rounded-2xl border border-navy/10 bg-white p-5 font-black text-navy shadow-sm transition hover:-translate-y-1 hover:shadow-soft">{item}</Link>)}</div>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  const repeated = ["Search fast", "Book mentors", "Join expert talks", "Watch recordings", "Register events", "Track bookings", "Learn smarter", "Mentor-set pricing"];
  return <div className="overflow-hidden border-y border-coral/20 bg-coral py-3 text-white"><div className="flex w-max animate-[marquee_32s_linear_infinite] gap-6 whitespace-nowrap">{[...repeated, ...repeated].map((item, index) => <span key={`${item}-${index}`} className="inline-flex items-center gap-6 text-xs font-black uppercase tracking-[0.18em]"><Star size={13} fill="currentColor" /> {item}</span>)}</div></div>;
}
