"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Crown,
  Search,
  Star,
  Users,
  Video,
} from "lucide-react";
import type { AppRole } from "@/lib/auth-shared";
import BookingCartButton from "@/components/marketplace/BookingCartButton";

const needs = [
  ["Resume Review", "Fix resume gaps before applying", "resume"],
  ["Interview Prep", "Practice HR and technical rounds", "interview"],
  ["Project Help", "Improve demos, viva, and portfolio", "project"],
  ["Skill Learning", "Learn Excel, AI, SQL, analytics", "skills"],
  ["Subject Doubt", "Clear concepts with expert support", "doubt"],
  ["Career Guidance", "Choose a practical next step", "career"],
] as const;

const under499 = [
  ["Resume Quick Scan", "Aarav Mehta", "20 min", 299],
  ["Self Intro Fix", "Priya Nair", "20 min", 399],
  ["Project Idea Check", "Rohan Iyer", "20 min", 399],
  ["Excel Doubt Slot", "Kavya Rao", "25 min", 499],
] as const;

const blueExperts = [
  ["Aarav Mehta", "Career Mentor", "Resume, LinkedIn, placements", "4.8", "234", "₹299"],
  ["Kavya Rao", "Academic Educator", "Study planning, career clarity", "4.7", "187", "₹499"],
  ["Meera Shah", "Skill Coach", "Communication, confidence", "4.6", "143", "₹399"],
] as const;

const premiumExperts = [
  ["Priya Nair", "HR Manager · TCS", "HR rounds, walk-in drives", "4.9", "286", "₹699"],
  ["Rohan Iyer", "Technology Mentor", "Projects, AI, software interviews", "4.9", "312", "₹999"],
] as const;

const rooms = [
  ["Placement Prep Room", "Priya Nair", "12 seats", "Sat, 6 PM", 499],
  ["SQL Practice Room", "Rohan Iyer", "10 seats", "Sun, 11 AM", 699],
  ["Resume Clinic Room", "Aarav Mehta", "8 seats", "Wed, 7 PM", 499],
] as const;

export function MinimalLandingPage({ dashboardHref, role }: { dashboardHref: string | null; role: AppRole | null }) {
  if (role) return <RoleLanding role={role} dashboardHref={dashboardHref ?? "/"} />;

  return (
    <main className="bg-[#F8FAFC] pb-10 text-[#0F172A]">
      <HeroSearch />
      <Banner />
      <PickNeed />
      <SupportUnder499 />
      <ExpertShelf title="Featured Blue Star Verified Experts" experts={blueExperts} badge="blue" />
      <ExpertShelf title="Golden Star Premium Experts" experts={premiumExperts} badge="gold" />
      <RoomsShelf />
      <HowItWorks />
      <ForExpertsCTA />
    </main>
  );
}

function HeroSearch() {
  return (
    <section className="border-b border-slate-200 bg-white py-8 sm:py-10">
      <div className="container-shell">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-black tracking-[-0.05em] sm:text-6xl">Book expert learning support like choosing from a menu.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Search your need, compare verified expert menus, add services or add-ons, choose a Google Meet slot, apply promo code, pay, and attend.
          </p>
          <div className="mx-auto mt-7 max-w-2xl rounded-3xl border border-slate-200 bg-[#F8FAFC] p-2 shadow-sm">
            <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 text-left">
              <Search size={20} className="shrink-0 text-blue-600" />
              <span className="text-sm font-semibold text-slate-500">Search for resume, interview, project, Excel, career guidance...</span>
            </label>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {["Resume", "Interview", "Project", "Excel", "Career", "Subject Doubt"].map((chip) => (
              <Link key={chip} href={`/services?search=${chip}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 hover:border-blue-600 hover:text-blue-600">
                {chip}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Banner() {
  return (
    <section className="py-5">
      <div className="container-shell">
        <div className="rounded-3xl border border-blue-100 bg-blue-600 px-5 py-5 text-white sm:px-8">
          <p className="text-2xl font-black tracking-[-0.035em]">No full course fees. No confusion. Just expert support.</p>
          <p className="mt-2 text-sm text-blue-50">Menu-priced learning help for the exact thing you need right now.</p>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ title, actionHref, actionLabel }: { title: string; actionHref?: string; actionLabel?: string }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 className="text-2xl font-black tracking-[-0.035em]">{title}</h2>
      {actionHref && <Link href={actionHref} className="text-sm font-black text-blue-600">{actionLabel ?? "View all"} -&gt;</Link>}
    </div>
  );
}

function PickNeed() {
  return (
    <section className="py-5">
      <div className="container-shell">
        <SectionTitle title="Pick your need" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {needs.map(([title, text, slug]) => (
            <Link key={slug} href={`/services?need=${slug}`} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-blue-600">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-lg font-black text-blue-600">{title[0]}</div>
              <h3 className="mt-4 font-black">{title}</h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportUnder499() {
  return (
    <section className="py-5">
      <div className="container-shell">
        <SectionTitle title="Support under ₹499" actionHref="/services" actionLabel="See menus" />
        <div className="flex gap-4 overflow-x-auto pb-2">
          {under499.map(([title, expert, duration, price]) => (
            <article key={title} className="min-w-[245px] rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700">Quick Support</span>
              <h3 className="mt-4 text-lg font-black">{title}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-700">{expert}</p>
              <p className="mt-3 flex items-center gap-2 text-sm text-slate-500"><Clock3 size={15} /> {duration}</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-slate-500"><Video size={15} /> Google Meet</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-xl font-black">₹{price}</p>
                <BookingCartButton price={price} href="/services/resume-review/book" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertShelf({ title, experts, badge }: { title: string; experts: readonly (readonly [string, string, string, string, string, string])[]; badge: "blue" | "gold" }) {
  return (
    <section className="py-5">
      <div className="container-shell">
        <SectionTitle title={title} actionHref="/mentors" actionLabel="Browse menus" />
        <div className="flex gap-4 overflow-x-auto pb-2">
          {experts.map(([name, role, tags, rating, sessions, price]) => (
            <article key={name} className="min-w-[280px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className={badge === "gold" ? "h-20 bg-amber-100" : "h-20 bg-blue-100"} />
              <div className="p-4">
                <div className="-mt-12 grid h-16 w-16 place-items-center rounded-2xl border-4 border-white bg-slate-900 text-xl font-black text-white">{name.split(" ").map((part) => part[0]).join("")}</div>
                <div className="mt-3 flex items-center gap-2">
                  <h3 className="font-black">{name}</h3>
                  {badge === "gold" ? <Crown size={16} className="text-amber-600" /> : <BadgeCheck size={16} className="text-blue-600" />}
                </div>
                <p className="mt-1 text-sm font-semibold text-slate-600">{role}</p>
                <p className="mt-2 text-xs text-slate-500">{tags}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                  <span className="rounded-full bg-slate-50 px-3 py-1"><Star size={12} className="inline text-amber-500" /> {rating}</span>
                  <span className="rounded-full bg-slate-50 px-3 py-1">{sessions} sessions</span>
                  <span className="rounded-full bg-slate-50 px-3 py-1">English, Hindi</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm font-black">Starts {price}</p>
                  <Link href={`/mentors/${name.toLowerCase().replace("dr. ", "").replace(" ", "-")}`} className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-black text-white">View Menu</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoomsShelf() {
  return (
    <section className="py-5">
      <div className="container-shell">
        <SectionTitle title="Expert Rooms" actionHref="/rooms" actionLabel="Explore rooms" />
        <div className="grid gap-4 md:grid-cols-3">
          {rooms.map(([room, expert, seats, schedule, price]) => (
            <article key={room} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600"><Users size={14} /> {seats}</span>
              <h3 className="mt-4 text-xl font-black">{room}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-700">{expert}</p>
              <p className="mt-3 flex items-center gap-2 text-sm text-slate-500"><CalendarDays size={15} /> {schedule}</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="font-black">₹{price}</p>
                <Link href="/rooms" className="rounded-xl border border-blue-600 px-4 py-2 text-xs font-black text-blue-600">Join Room</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = ["Search need", "Choose category", "View expert menu", "Add service", "Choose slot", "Apply promo", "Pay", "Google Meet"];
  return (
    <section className="py-5">
      <div className="container-shell">
        <SectionTitle title="How it works" />
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <p key={step} className="rounded-2xl bg-slate-50 p-4 text-sm font-black"><span className="mr-2 text-blue-600">{index + 1}.</span>{step}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ForExpertsCTA() {
  return (
    <section className="py-5">
      <div className="container-shell">
        <div className="rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-200">For Experts</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.035em]">Create your learning menu once. Receive direct bookings.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Add services, packages, rooms, add-ons, prices, promo codes, and availability. Students book directly and attend through Google Meet.</p>
          <Link href="/for-mentors" className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">Join as Expert</Link>
        </div>
      </div>
    </section>
  );
}

function RoleLanding({ role, dashboardHref }: { role: AppRole; dashboardHref: string }) {
  const isExpert = role === "Mentor" || role === "Faculty" || role === "Institution";
  const title = isExpert ? "Expert menu workspace" : role === "Admin" ? "Admin control room" : "Student booking workspace";
  const links = isExpert
    ? [["Dashboard", dashboardHref], ["My Services", "/mentor/services"], ["My Rooms", "/mentor/rooms"], ["Bookings", "/mentor/bookings"], ["Promo Codes", "/mentor/promo-codes"], ["Earnings", "/mentor/earnings"], ["Profile & Verification", "/mentor/verification"]]
    : role === "Admin"
      ? [["Admin Dashboard", dashboardHref], ["Approve Experts", "/admin/experts"], ["Manage Services", "/admin/services"], ["Track Bookings", "/admin/bookings"]]
      : [["Dashboard", dashboardHref], ["Expert Menus", "/mentors"], ["My Bookings", "/bookings"], ["My Rooms", "/rooms"], ["Messages", "/messages"], ["Payments", "/payments"], ["Profile", "/profile"]];

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-14 text-[#0F172A]">
      <div className="container-shell">
        <section className="rounded-3xl border border-slate-200 bg-white p-8">
          <h1 className="text-4xl font-black tracking-[-0.045em]">{title}</h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            {isExpert ? "Manage your menu, slots, promo codes, direct bookings, and earnings." : "Open expert menus, add services, choose slots, pay, and attend on Google Meet."}
          </p>
        </section>
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map(([label, href]) => (
            <Link key={label} href={href} className="rounded-3xl border border-slate-200 bg-white p-5 font-black transition hover:-translate-y-1 hover:border-blue-600">
              {label}
              <ArrowRight className="mt-5 text-blue-600" size={18} />
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
