"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  MessageSquareQuote,
  Search,
  ShieldCheck,
  Star,
  Users,
  Video,
} from "lucide-react";
import type { AppRole } from "@/lib/auth-shared";

const needs = [
  ["Resume", "Get your resume reviewed before applying.", "Resume Review"],
  ["Interview", "Practice answers, HR rounds, and mock interviews.", "Mock Interview"],
  ["Project Help", "Improve projects for college, portfolio, or interviews.", "Project Review"],
  ["Skill Learning", "Build job-ready skills with expert support.", "Skill Roadmap"],
  ["Subject Doubt", "Clear concepts with verified subject experts.", "Doubt Support"],
  ["Career Guidance", "Choose the right next step with confidence.", "Career Clarity"],
] as const;

const discoveryPaths = [
  ["Browse by need", "Start with what you are stuck with and see matching expert-created services."],
  ["Send a requirement", "Describe your problem and receive custom quotes from suitable experts."],
  ["Join an expert room", "Learn with a small group room led by a verified expert."],
] as const;

const services = [
  ["Resume Shortlist Review", "Aarav Mehta", "45 min", "Career"],
  ["HR Interview Practice", "Priya Nair", "60 min", "Interview"],
  ["Business Analytics Roadmap", "Kavya Rao", "60 min", "Skill"],
  ["Final-Year Project Review", "Rohan Iyer", "45 min", "Project"],
] as const;

const rooms = [
  ["Placement Prep Room", "Priya Nair", "12 seats", "Sat, 6 PM"],
  ["SQL Practice Room", "Rohan Iyer", "10 seats", "Sun, 11 AM"],
  ["Resume Clinic Room", "Aarav Mehta", "8 seats", "Wed, 7 PM"],
] as const;

const experts = [
  ["Aarav Mehta", "Resume & Career Mentor", "Resume, LinkedIn, placement prep"],
  ["Priya Nair", "HR Interview Expert", "HR round, walk-in drives, confidence"],
  ["Rohan Iyer", "Technology Mentor", "Projects, AI tools, technical prep"],
] as const;

export function MinimalLandingPage({ dashboardHref, role }: { dashboardHref: string | null; role: AppRole | null }) {
  if (role) return <RoleLanding role={role} dashboardHref={dashboardHref ?? "/"} />;

  return (
    <main className="bg-[#F8FAFC] text-[#0F172A]">
      <Hero />
      <BrowseByNeed />
      <DiscoveryPaths />
      <PopularServices />
      <ExpertRooms />
      <TrustSection />
      <ForExpertsCTA />
      <Footer />
    </main>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#0F172A] sm:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-base leading-7 text-slate-600">{text}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section className="border-b border-[#E2E8F0] bg-white py-16 sm:py-20">
      <div className="container-shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 text-sm font-semibold text-slate-700">
            <ShieldCheck size={15} className="text-[#16A34A]" /> Verified expert-led support
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-[-0.055em] text-[#0F172A] sm:text-6xl">
            Find expert support for what you&apos;re stuck with
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Choose a need, compare verified experts, request custom quotes, book Google Meet sessions, join rooms, and pay securely. Experts create the services and set their own pricing.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/services" className="btn-primary">Find Support <ArrowRight size={18} /></Link>
            <Link href="/for-mentors" className="btn-secondary">Join as Expert</Link>
          </div>
          <div className="mt-8 max-w-2xl rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
            <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm text-slate-500">
              <Search size={18} className="text-[#2563EB]" />
              Search resume review, HR interview, project help, subject doubt...
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] border border-[#E2E8F0] bg-[#F8FAFC] p-5">
          <div className="rounded-[1.5rem] border border-[#E2E8F0] bg-white p-5">
            <p className="text-sm font-bold text-[#2563EB]">Matching support</p>
            <h2 className="mt-2 text-2xl font-black text-[#0F172A]">Interview in 7 days?</h2>
            <div className="mt-5 space-y-3">
              {[
                ["HR Round Practice", "Custom quote by expert"],
                ["Resume Shortlist Review", "Google Meet delivery"],
                ["Walk-in Drive Prep Room", "8 seats available"],
              ].map(([title, meta]) => (
                <div key={title} className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-black text-[#0F172A]">{title}</p>
                      <p className="mt-1 text-sm text-slate-500">{meta}</p>
                    </div>
                    <BadgeCheck className="shrink-0 text-[#16A34A]" size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrowseByNeed() {
  return (
    <section className="py-14">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Browse by need"
          title="Start with the problem, not the category"
          text="Students choose what they need help with. The platform then surfaces relevant expert-created services, experts, and rooms."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {needs.map(([title, text, tag]) => (
            <Link key={title} href={`/services?need=${encodeURIComponent(title)}`} className="group rounded-3xl border border-[#E2E8F0] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-lg">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#2563EB]">{tag}</p>
              <h3 className="mt-3 text-xl font-black text-[#0F172A]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              <span className="mt-5 inline-flex items-center text-sm font-bold text-[#2563EB]">Find support <ArrowRight className="ml-1 transition group-hover:translate-x-1" size={16} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function DiscoveryPaths() {
  return (
    <section className="border-y border-[#E2E8F0] bg-white py-14">
      <div className="container-shell">
        <SectionHeading eyebrow="Three discovery paths" title="Choose the path that fits your urgency" />
        <div className="grid gap-4 md:grid-cols-3">
          {discoveryPaths.map(([title, text], index) => (
            <article key={title} className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#2563EB] text-sm font-black text-white">{index + 1}</span>
              <h3 className="mt-4 text-xl font-black text-[#0F172A]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, expert, duration, category }: { title: string; expert: string; duration: string; category: string }) {
  return (
    <article className="rounded-3xl border border-[#E2E8F0] bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2563EB]">{category}</span>
        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#16A34A]"><BadgeCheck size={14} /> Verified</span>
      </div>
      <h3 className="mt-4 text-lg font-black text-[#0F172A]">{title}</h3>
      <p className="mt-1 text-sm font-semibold text-slate-700">{expert}</p>
      <div className="mt-4 grid gap-2 text-sm text-slate-600">
        <p className="flex items-center gap-2"><Video size={16} className="text-[#2563EB]" /> Google Meet delivery</p>
        <p className="flex items-center gap-2"><Clock3 size={16} className="text-[#2563EB]" /> {duration}</p>
        <p className="flex items-center gap-2"><MessageSquareQuote size={16} className="text-[#2563EB]" /> Custom quote by expert</p>
      </div>
      <Link href="/requirements/new" className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1D4ED8]">
        Request Quote
      </Link>
    </article>
  );
}

function PopularServices() {
  return (
    <section className="py-14">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Expert-created services"
          title="Popular support students request before important moments"
          text="These cards show the marketplace format. Experts control pricing, promo codes, availability, and quote responses."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map(([title, expert, duration, category]) => (
            <ServiceCard key={title} title={title} expert={expert} duration={duration} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertRooms() {
  return (
    <section className="border-y border-[#E2E8F0] bg-white py-14">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Expert rooms"
          title="Small group rooms for focused learning support"
          text="Experts can run paid rooms with seat limits, schedules, resources, and Google Meet delivery."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {rooms.map(([room, expert, seats, schedule]) => (
            <article key={room} className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#16A34A]"><Users size={14} /> {seats}</span>
              <h3 className="mt-4 text-xl font-black text-[#0F172A]">{room}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-700">{expert}</p>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p className="flex items-center gap-2"><CalendarDays size={16} className="text-[#2563EB]" /> {schedule}</p>
                <p>Price set by expert</p>
              </div>
              <Link href="/rooms" className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-[#2563EB] bg-white px-4 py-3 text-sm font-bold text-[#2563EB] transition hover:bg-blue-50">
                Join Room
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const items = [
    "Verified experts",
    "Expert-created services",
    "Custom quotes and promo codes",
    "Google Meet delivery",
    "Secure payments and payouts",
    "Reviews and dispute support",
  ];
  return (
    <section className="py-14">
      <div className="container-shell">
        <div className="rounded-3xl border border-[#E2E8F0] bg-white p-8">
          <SectionHeading eyebrow="Trust layer" title="The platform enables trust, booking, delivery, and payouts" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <p key={item} className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm font-bold text-slate-700">
                <CheckCircle2 size={18} className="text-[#16A34A]" /> {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ForExpertsCTA() {
  return (
    <section className="pb-14">
      <div className="container-shell">
        <div className="grid gap-8 rounded-3xl border border-[#E2E8F0] bg-[#0F172A] p-8 text-white lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-200">For experts</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em]">Create services. Set your price. Guide serious students.</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-300">
              Experts can create services and rooms, set pricing, generate promo codes, respond with custom quotes, manage bookings, and track earnings.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            {["My Services", "My Rooms", "Quotes", "Promo Codes", "Earnings"].map((item) => (
              <p key={item} className="mb-3 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#0F172A] last:mb-0">{item}</p>
            ))}
            <Link href="/for-mentors" className="mt-5 inline-flex w-full justify-center rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-bold text-white hover:bg-[#1D4ED8]">Apply as Expert</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white py-10">
      <div className="container-shell flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="text-lg font-black text-[#0F172A]">My Expert Talk</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
            A minimal learning-support marketplace where students discover experts, request quotes, book sessions, join rooms, and review outcomes.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-600">
          <Link href="/services" className="hover:text-[#2563EB]">Find Support</Link>
          <Link href="/mentors" className="hover:text-[#2563EB]">Experts</Link>
          <Link href="/rooms" className="hover:text-[#2563EB]">Rooms</Link>
          <Link href="/for-mentors" className="hover:text-[#2563EB]">For Experts</Link>
        </div>
      </div>
    </footer>
  );
}

function RoleLanding({ role, dashboardHref }: { role: AppRole; dashboardHref: string }) {
  const isExpert = role === "Mentor" || role === "Faculty" || role === "Institution";
  const title = isExpert ? "Expert workspace" : role === "Admin" ? "Admin control room" : "Student support workspace";
  const description = isExpert
    ? "Manage services, rooms, quotes, bookings, promo codes, earnings, and verification from a focused workspace."
    : role === "Admin"
      ? "Approve experts, manage services, track bookings, commission, disputes, payments, payouts, and reviews."
      : "Find support, track bookings, join rooms, message experts, manage payments, and update your profile.";
  const links = isExpert
    ? [
        ["Dashboard", dashboardHref],
        ["My Services", "/mentor/services"],
        ["My Rooms", "/mentor/rooms"],
        ["Quotes", "/mentor/quotes"],
        ["Bookings", "/mentor/bookings"],
        ["Promo Codes", "/mentor/promo-codes"],
        ["Earnings", "/mentor/earnings"],
        ["Profile & Verification", "/mentor/verification"],
      ]
    : role === "Admin"
      ? [
          ["Admin Dashboard", dashboardHref],
          ["Approve Experts", "/admin/experts"],
          ["Manage Services", "/admin/services"],
          ["Track Bookings", "/admin/bookings"],
          ["Manage Commission", "/admin/commission"],
          ["Handle Disputes", "/admin/disputes"],
        ]
      : [
          ["Dashboard", dashboardHref],
          ["Find Support", "/services"],
          ["My Bookings", "/bookings"],
          ["My Rooms", "/rooms"],
          ["Messages", "/messages"],
          ["Payments", "/payments"],
          ["Profile", "/profile"],
        ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-14 text-[#0F172A]">
      <div className="container-shell">
        <section className="rounded-3xl border border-[#E2E8F0] bg-white p-8">
          <span className="inline-flex rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 text-sm font-bold text-[#2563EB]">
            {isExpert ? "Expert login" : role === "Admin" ? "Admin login" : "Student login"}
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.045em] sm:text-5xl">{title}</h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">{description}</p>
        </section>
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map(([label, href]) => (
            <Link key={label} href={href} className="rounded-3xl border border-[#E2E8F0] bg-white p-5 font-black text-[#0F172A] transition hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-lg">
              {label}
              <ArrowRight className="mt-5 text-[#2563EB]" size={18} />
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
