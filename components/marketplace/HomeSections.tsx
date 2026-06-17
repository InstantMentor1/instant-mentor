import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  GraduationCap,
  LibraryBig,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Search,
  Sparkles,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/marketplace/ServiceCard";
import { type ExpertService } from "@/lib/marketplace";

const quickAccess: Array<{ title: string; text: string; href: string; cta: string; icon: LucideIcon }> = [
  { title: "Expert Talks", text: "Join live expert-led learning sessions across subjects, careers, and skills.", href: "/expert-talks", cta: "Explore talks", icon: Mic2 },
  { title: "Course Offerings", text: "Browse mentor-led services and structured support based on your learning need.", href: "/services", cta: "View services", icon: BookOpen },
  { title: "On-Demand Recordings", text: "Catch up on past talks, webinar-style sessions, resources, and materials.", href: "/recordings", cta: "View recordings", icon: MonitorPlay },
  { title: "Meet Our Mentors", text: "Discover verified mentors, educators, and subject-matter experts.", href: "/mentors", cta: "Meet mentors", icon: Users },
];

const talkCards = [
  ["Career Guidance Talk", "Mentor to be announced", "Fri, 7:00 PM", "Career"],
  ["Exam Preparation Talk", "Academic expert", "Sat, 11:00 AM", "Exams"],
  ["Skill Development Talk", "Industry mentor", "Sun, 5:00 PM", "Skills"],
  ["Business & Startup Talk", "Founder mentor", "Wed, 6:00 PM", "Startup"],
  ["Technology & AI Talk", "AI practitioner", "Thu, 8:00 PM", "Technology"],
  ["Academic Support Talk", "Subject educator", "Mon, 6:30 PM", "Academics"],
] as const;

const eventCards = [
  ["Resume clinic for students", "21 Jun", "6:00 PM", "Career mentor"],
  ["AI tools for learning", "23 Jun", "7:30 PM", "AI educator"],
  ["Exam strategy room", "25 Jun", "5:00 PM", "Academic mentor"],
] as const;

export function ExpertMarketplaceHeroSection({
  dashboardHref,
}: {
  dashboardHref: string | null;
}) {
  return (
    <section className="relative overflow-hidden bg-hero-glow">
      <div className="pointer-events-none absolute right-0 top-16 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="container-shell relative grid min-h-[620px] items-center gap-10 py-12 lg:grid-cols-[1.05fr_.95fr] lg:py-16">
        <div>
          <Image src="/my-expert-talk-logo.png" alt="My Expert Talk" width={900} height={900} className="mb-6 h-20 w-auto rounded-2xl bg-white object-contain shadow-soft" priority />
          <span className="eyebrow">
            <Sparkles size={14} className="mr-1" /> Education + expert connection platform
          </span>
          <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-[-0.04em] text-ink sm:text-6xl">
            Learn directly from experts, mentors, and educators.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
            Join live expert talks, explore mentor-led services, access
            recordings, and book guidance sessions designed for students and
            lifelong learners.
          </p>
          <form action="/expert-talks" className="mt-7 flex max-w-2xl flex-col gap-3 rounded-3xl border border-blue-100 bg-white p-3 shadow-soft sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">Search learning topic</span>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input name="search" className="form-input border-0 bg-slate-50 pl-11 focus:ring-0" placeholder="What do you want to learn or discuss?" />
            </label>
            <button className="btn-primary" type="submit">Search</button>
          </form>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={dashboardHref ?? "/expert-talks"} className="btn-primary">
              {dashboardHref ? "Open Dashboard" : "Explore Expert Talks"} <ArrowRight size={17} />
            </Link>
            <Link href="/for-mentors" className="btn-secondary">Join as Mentor</Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
            {["Verified mentors", "Live expert talks", "Student-friendly learning", "Recorded sessions", "Bookable services"].map((item) => (
              <span key={item} className="rounded-full border border-blue-100 bg-white px-3 py-2"><Check size={13} className="mr-1 inline text-teal-700" />{item}</span>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="card relative overflow-hidden border-blue-100 bg-white p-6">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-100" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">Today on My Expert Talk</p>
                <h2 className="mt-2 text-2xl font-black">Learning moments made simple.</h2>
              </div>
              <GraduationCap className="text-orange-500" size={38} />
            </div>
            <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
              {quickAccess.map(({ title, icon: Icon }) => (
                <Link key={title} href="/expert-talks" className="rounded-2xl border border-blue-100 bg-sky-50 p-4 transition hover:-translate-y-1 hover:bg-white hover:shadow-soft">
                  <Icon className="text-teal-700" size={22} />
                  <p className="mt-3 font-black">{title}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Live", "Expert talks"],
              ["1:1", "Mentor services"],
              ["Anytime", "Recordings"],
            ].map(([label, text]) => (
              <div key={label} className="rounded-3xl border border-blue-100 bg-white p-5 text-center shadow-sm">
                <p className="text-2xl font-black text-teal-700">{label}</p>
                <p className="mt-1 text-xs font-bold text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExpertDiscoveryProblemSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Quick access"
          title="Everything learners need in one bright platform."
          description="Move from curiosity to guidance quickly: live talks, mentor services, recordings, and verified expert profiles."
          centered
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {quickAccess.map(({ title, text, href, cta, icon: Icon }) => (
            <Link key={title} href={href} className="card group border-blue-100 p-6 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg">
              <span className="inline-flex rounded-2xl bg-sky-50 p-3 text-teal-700 group-hover:bg-orange-50 group-hover:text-orange-600"><Icon size={24} /></span>
              <h2 className="mt-5 text-xl font-black">{title}</h2>
              <p className="mt-2 min-h-16 text-sm leading-6 text-slate-600">{text}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-teal-700">{cta} <ArrowRight size={15} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExpertServiceMarketplaceSolutionSection() {
  return (
    <section className="section-pad bg-sky-50">
      <div className="container-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <span className="eyebrow">About My Expert Talk</span>
          <h2 className="text-3xl font-black sm:text-4xl">Built for learners who want real expert guidance.</h2>
          <p className="mt-4 text-base leading-8 text-slate-700">
            My Expert Talk brings students, educators, mentors, and professionals
            together through live sessions, expert-led services, recorded
            learning resources, and personalized guidance.
          </p>
          <Link href="/services" className="btn-primary mt-6">Book Mentor Service</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {["Academic support", "Career guidance", "Skill development", "Expert recordings"].map((item) => (
            <div key={item} className="card border-blue-100 p-5">
              <BadgeCheck className="text-orange-500" />
              <h3 className="mt-4 font-black">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Student-friendly learning with verified mentors and practical next steps.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExpertMarketplaceHowItWorksSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-shell">
        <SectionHeader eyebrow="Expert talks" title="Talk with experts across subjects, careers, and skills." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {talkCards.map(([topic, mentor, time, category]) => (
            <article key={topic} className="card border-blue-100 p-5 transition hover:-translate-y-1 hover:shadow-soft">
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">{category}</span>
              <h3 className="mt-4 text-xl font-black">{topic}</h3>
              <p className="mt-2 text-sm text-slate-600">{mentor}</p>
              <p className="mt-4 flex items-center gap-2 text-sm font-bold text-slate-700"><CalendarDays size={16} className="text-teal-700" /> {time} · Live / Online</p>
              <Link href="/expert-talks" className="btn-secondary mt-5 !px-4 !py-2">View Details</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExpertServiceMenuSection({ services }: { services: ExpertService[] }) {
  return (
    <section className="section-pad bg-sky-50">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="Mentor services"
            title="Book mentor services based on your learning need."
            description="Mentors and experts list services, set availability, and define what students receive from each session."
          />
          <Link href="/services" className="btn-secondary shrink-0">View services <ArrowRight size={16} /></Link>
        </div>
        {services.length > 0 ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.slice(0, 3).map((service) => <ServiceCard key={service.id} service={service} />)}
          </div>
        ) : (
          <div className="card mt-6 grid gap-4 border-blue-100 p-8 text-center">
            <BriefcaseBusiness className="mx-auto text-teal-700" size={34} />
            <h3 className="text-xl font-black">Mentor services are opening soon.</h3>
            <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-600">Verified mentors can publish services with mentor-set pricing, duration, and availability.</p>
            <Link href="/for-mentors" className="btn-primary mx-auto">Join as Mentor</Link>
          </div>
        )}
      </div>
    </section>
  );
}

export function ExpertMarketplaceCategoriesSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Learning library"
          title="Learn anytime with recorded expert sessions."
          description="Recorded talks, past learning sessions, resources, and materials will be available here."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {["Recorded talks", "Past expert talks", "Session materials"].map((item) => (
            <Link key={item} href="/recordings" className="card border-blue-100 p-6 transition hover:-translate-y-1 hover:shadow-soft">
              <MonitorPlay className="text-orange-500" />
              <h3 className="mt-4 text-xl font-black">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Access learning resources and revisit expert guidance on your own time.</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExpertPartnerSection() {
  const mentors = [
    ["Aarav Mehta", "Career Mentor", "Resume, interviews, placements"],
    ["Dr. Kavya Rao", "Academic Expert", "Research, exams, study planning"],
    ["Rohan Iyer", "Technology Mentor", "AI, projects, software careers"],
  ] as const;
  return (
    <section className="section-pad bg-sky-50">
      <div className="container-shell">
        <SectionHeader eyebrow="Mentors" title="Meet mentors and subject-matter experts." />
        <div className="grid gap-5 md:grid-cols-3">
          {mentors.map(([name, role, expertise]) => (
            <article key={name} className="card border-blue-100 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-black text-teal-700 shadow-sm">{name[0]}</div>
              <h3 className="mt-4 text-xl font-black">{name}</h3>
              <p className="text-sm font-bold text-teal-700">{role}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{expertise}</p>
              <p className="mt-4 inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700"><Star size={13} /> Verified mentor</p>
              <Link href="/mentors" className="btn-secondary mt-5 w-full !py-2">View Profile</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyInstantMentorIsDifferentSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-shell">
        <SectionHeader eyebrow="Upcoming events" title="Upcoming expert talks and learning events." />
        <div className="grid gap-4 md:grid-cols-3">
          {eventCards.map(([title, date, time, speaker]) => (
            <article key={title} className="card flex gap-4 border-blue-100 p-5">
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-teal-700 text-white">
                <span className="text-xl font-black">{date.split(" ")[0]}</span>
                <span className="text-xs font-bold">{date.split(" ")[1]}</span>
              </div>
              <div>
                <h3 className="font-black">{title}</h3>
                <p className="mt-1 text-sm text-slate-600">{time} · {speaker}</p>
                <Link href="/events" className="mt-3 inline-block text-sm font-black text-teal-700">Register / Learn More</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InstitutionExpertAccessSection() {
  return (
    <section className="section-pad bg-sky-50">
      <div className="container-shell grid gap-6 lg:grid-cols-2">
        <div className="card border-blue-100 p-7">
          <Users className="text-teal-700" size={32} />
          <h2 className="mt-4 text-2xl font-black">Share your expertise with learners.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">Create your profile, list services, host expert talks, upload recordings, manage bookings, and earn through expert-led learning.</p>
          <div className="mt-5 grid gap-2 text-sm font-bold text-slate-700 sm:grid-cols-2">
            {["Create mentor profile", "List services", "Host expert talks", "Set availability", "Manage bookings", "Track earnings"].map((item) => <span key={item} className="rounded-xl bg-sky-50 p-3">{item}</span>)}
          </div>
          <Link href="/for-mentors" className="btn-primary mt-6">Join as Mentor</Link>
        </div>
        <div className="card border-blue-100 p-7">
          <LibraryBig className="text-orange-500" size={32} />
          <h2 className="mt-4 text-2xl font-black">Learning programs for institutions.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">Schools, colleges, coaching centers, and training institutes can use My Expert Talk for expert sessions, mentor programs, recordings, and student development activities.</p>
          <Link href="/institutions" className="btn-secondary mt-6">Partner with Us</Link>
        </div>
      </div>
    </section>
  );
}

export function ExpertMarketplaceCTASection() {
  return (
    <section className="bg-teal-700 py-12 text-white sm:py-14">
      <div className="container-shell grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <MessageCircle className="text-orange-200" size={32} />
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">Stay informed about upcoming expert talks.</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-sky-50">Get updates when new talks, recordings, mentors, and learning sessions go live.</p>
        </div>
        <form className="grid gap-3 rounded-3xl bg-white p-4 sm:grid-cols-3">
          <input className="form-input bg-slate-50" placeholder="First name" aria-label="First name" />
          <input className="form-input bg-slate-50" placeholder="Last name" aria-label="Last name" />
          <input className="form-input bg-slate-50" type="email" placeholder="Email" aria-label="Email" />
          <button className="btn-primary sm:col-span-3" type="button">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
