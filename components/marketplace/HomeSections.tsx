import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  Building2,
  Check,
  GraduationCap,
  ListChecks,
  Search,
  Store,
  UserRoundCheck,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/marketplace/ServiceCard";
import { marketplaceCategories, type ExpertService } from "@/lib/marketplace";

export function ExpertMarketplaceHeroSection({
  dashboardHref,
}: {
  dashboardHref: string | null;
}) {
  return (
    <section className="overflow-hidden bg-hero-glow">
      <div className="container-shell grid min-h-[620px] items-center gap-12 py-16 lg:grid-cols-[1.08fr_.92fr]">
        <div>
          <span className="eyebrow">
            <Store size={14} className="mr-1" /> Premium student-SME marketplace
          </span>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.04] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
            Real expertise. Booked by serious students only.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Mentrix connects verified Subject Matter Experts with students who
            mean business. Browse SME profiles, pick exactly what you need, and
            book a focused domain knowledge session.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={dashboardHref ?? "/smes"} className="btn-primary">
              {dashboardHref ? "Open Dashboard" : "Explore SME Profiles"} <ArrowRight size={17} />
            </Link>
            <Link href="/for-smes" className="btn-secondary">Join as an SME</Link>
          </div>
          <p className="mt-6 font-semibold text-slate-600">
            Verified SMEs. Transparent pricing. Students who show up.
          </p>
        </div>

        <div className="card relative overflow-hidden p-7 sm:p-9">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-teal-700 via-teal-500 to-mentorblue" />
          <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
            SME expertise menu
          </p>
          <h2 className="mt-3 text-2xl font-black">Know what you receive before you book.</h2>
          <div className="mt-7 space-y-3">
            {[
              ["Expertise outcome", "Defined by the SME"],
              ["Pricing", "Set by the SME"],
              ["Availability", "Shared before booking"],
              ["Deliverables", "Clear and specific"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4">
                <span className="font-bold text-slate-600">{label}</span>
                <span className="text-right font-black text-teal-800">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-y border-slate-200 bg-white">
        <div className="container-shell grid gap-3 py-5 text-sm font-bold text-slate-600 sm:grid-cols-2 lg:grid-cols-5">
          {["Verified SMEs only", "Expertise menu model", "Students who show up", "Transparent pricing", "Outcome-focused support"].map((item) => (
            <span key={item} className="flex items-center justify-center gap-2">
              <Check size={16} className="text-teal-700" /> {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExpertDiscoveryProblemSection() {
  const pains = [
    "Students do not know which SME to trust.",
    "Serious learners often depend on random advice.",
    "SMEs have deep knowledge but no student-ready way to package it.",
    "Students want clear outcomes before paying.",
    "Institutions need reliable access to verified SME support.",
    "Existing platforms focus on content or low-value doubts instead of booked expertise.",
  ];
  return (
    <section className="section-pad bg-slate-50">
      <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <SectionHeader
          eyebrow="The trust problem"
          title="Finding the right SME is harder than finding information."
          description="Search results can provide information, but they rarely make expertise, scope, availability, outcomes, and price easy to compare."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {pains.map((pain) => (
            <div key={pain} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700">
              <X size={18} className="mt-0.5 shrink-0 text-slate-400" /> {pain}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExpertServiceMarketplaceSolutionSection() {
  return (
    <section className="section-pad">
      <div className="container-shell rounded-[2rem] bg-teal-900 px-6 py-12 text-white sm:px-12 lg:grid lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-14">
        <div>
          <Store size={42} className="text-teal-100" />
          <h2 className="mt-5 text-3xl font-black sm:text-4xl">
            A marketplace where SMEs list expertise and students book what they need.
          </h2>
        </div>
        <div className="mt-7 space-y-5 text-lg leading-8 text-teal-50 lg:mt-0">
          <p>
            Verified SMEs create professional profiles and expertise menus.
            Students compare price, duration, deliverables, availability, and
            reviews before choosing.
          </p>
          <p className="rounded-2xl bg-white/10 p-5 font-semibold">
            Instead of students posting doubts and waiting for a solution, SMEs
            create clear expertise offerings in advance. Students simply
            discover, compare, and book.
          </p>
        </div>
      </div>
    </section>
  );
}

const studentSteps = [
  "Choose a domain",
  "Browse SME profiles and expertise items",
  "Compare outcome, price, duration, and availability",
  "Book a session based on availability",
  "Share your goal, context, and attachments",
  "Attend the session or receive the reviewed deliverable",
  "Track booking status",
  "Leave a review",
];

const smeSteps = [
  "Apply as an SME",
  "Get verified",
  "Create a professional profile",
  "Add expertise items to your menu",
  "Set pricing, duration, deliverables, and availability",
  "Accept and manage serious bookings",
  "Deliver the expertise session",
  "Track earnings and reviews",
];

export function ExpertMarketplaceHowItWorksSection() {
  const groups: Array<{ title: string; steps: string[]; icon: LucideIcon }> = [
    { title: "For students", steps: studentSteps, icon: Search },
    { title: "For SMEs", steps: smeSteps, icon: UserRoundCheck },
  ];
  return (
    <section className="section-pad bg-slate-50">
      <div className="container-shell">
        <SectionHeader eyebrow="How it works" title="A clear path from discovery to delivery" centered />
        <div className="grid gap-6 lg:grid-cols-2">
          {groups.map(({ title, steps, icon: Icon }) => (
            <article key={title} className="card p-6 sm:p-8">
              <Icon className="text-teal-700" size={30} />
              <h3 className="mt-4 text-2xl font-black">{title}</h3>
              <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-3 rounded-xl bg-slate-50 p-3 text-sm font-semibold">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs text-white">{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExpertServiceMenuSection({ services }: { services: ExpertService[] }) {
  return (
    <section className="section-pad bg-white">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="SME expertise menus"
            title="Every SME creates their own expertise menu."
            description="SMEs choose what they offer, set the price, define the duration, describe the deliverables, and share their availability."
          />
          <Link href="/smes" className="btn-secondary shrink-0">Explore SME profiles <ArrowRight size={16} /></Link>
        </div>
        {services.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => <ServiceCard key={service.id} service={service} />)}
          </div>
        ) : (
          <div className="card mt-10 p-10 text-center">
            <Store className="mx-auto text-teal-700" size={36} />
            <h3 className="mt-4 text-2xl font-black">No SME expertise items are live yet.</h3>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Verified SMEs can create their expertise menu from the SME dashboard.
              Published items will appear here with SME-set pricing and availability.
            </p>
            <Link href="/for-smes" className="btn-primary mt-6">Join as an SME</Link>
          </div>
        )}
      </div>
    </section>
  );
}

const categoryIcons = [BriefcaseBusiness, Users, GraduationCap, Building2, ListChecks];

export function ExpertMarketplaceCategoriesSection() {
  return (
    <section className="section-pad bg-slate-50">
      <div className="container-shell">
        <SectionHeader
          eyebrow="SME domains"
          title="SME domains for serious student questions"
          description="Explore SME-created expertise, SME-set prices, availability, formats, and deliverables."
        />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {marketplaceCategories.map((category, index) => {
            const Icon = categoryIcons[index % categoryIcons.length];
            return (
              <Link key={category} href={`/smes?category=${encodeURIComponent(category)}`} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-soft">
                <Icon className="text-teal-700" />
                <h3 className="mt-5 font-extrabold">{category}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Compare SMEs, pricing, availability, and outcomes.</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ExpertPartnerSection() {
  const benefits = [
    "Create a professional SME profile",
    "List multiple expertise items",
    "Set your own pricing",
    "Define duration and deliverables",
    "Control availability",
    "Accept or reject serious bookings",
    "Track earnings",
    "Build reviews and reputation",
  ];
  return (
    <section className="section-pad">
      <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <Banknote size={40} className="text-teal-700" />
          <h2 className="mt-5 text-3xl font-black sm:text-4xl">SMEs earn by packaging their knowledge into expertise items.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Mentrix gives SME partners a dashboard to create expertise items,
            define pricing, manage bookings, communicate with students, and
            track earnings. SMEs are not forced into platform-fixed low pricing.
          </p>
          <p className="mt-5 rounded-2xl bg-teal-50 p-4 font-bold text-teal-900">
            Sliding platform commission: 15%-25% based on price tier.
          </p>
          <Link href="/for-smes" className="btn-primary mt-6">Join as an SME</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div key={benefit} className="card flex items-center gap-3 p-5 font-bold">
              <Check className="text-teal-700" size={18} />{benefit}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyInstantMentorIsDifferentSection() {
  const columns = [
    { title: "Course platforms", items: ["Recorded content", "Same content for everyone", "No personalized SME access"], dark: false },
    { title: "Doubt-solving platforms", items: ["Narrow academic focus", "Low perceived value", "Student posts the problem first"], dark: false },
    { title: "Mentrix", items: ["Verified SME profiles", "SME-created expertise menus", "SME-set pricing", "Availability-based booking", "Outcome-focused sessions"], dark: true },
  ];
  return (
    <section className="section-pad bg-slate-50">
      <div className="container-shell">
        <SectionHeader eyebrow="Why Mentrix" title="Not a course platform. Not a doubt app. A premium marketplace for SME access." centered />
        <div className="grid overflow-hidden rounded-3xl border border-slate-200 lg:grid-cols-3">
          {columns.map((column) => (
            <article key={column.title} className={column.dark ? "bg-teal-900 p-7 text-white" : "bg-white p-7"}>
              <h3 className="text-xl font-black">{column.title}</h3>
              <ul className="mt-6 space-y-4">
                {column.items.map((item) => <li key={item} className="flex gap-3 text-sm font-semibold"><Check size={17} className={column.dark ? "text-teal-100" : "text-teal-700"} />{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InstitutionExpertAccessSection() {
  return (
    <section className="section-pad">
      <div className="container-shell rounded-[2rem] border border-teal-100 bg-gradient-to-br from-teal-50 to-blue-50 p-7 sm:p-12">
        <Building2 size={38} className="text-teal-700" />
        <h2 className="mt-5 text-3xl font-black sm:text-4xl">SME access for institutions at scale.</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Colleges, institutes, coaching centers, and placement cells can run
          SME-led resume drives, mock interviews, project reviews, career
          programs, academic mentoring, and skill-development support.
        </p>
        <Link href="/institutions" className="btn-primary mt-7">Partner with Mentrix</Link>
      </div>
    </section>
  );
}

export function ExpertMarketplaceCTASection() {
  return (
    <section className="section-pad bg-ink text-white">
      <div className="container-shell text-center">
        <BadgeCheck className="mx-auto text-teal-200" size={38} />
        <h2 className="mt-5 text-4xl font-black">Ready to find the right SME?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          Explore SME-created expertise across career, academics, skills,
          business, and industry guidance.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/smes" className="btn-primary">Explore SME Profiles</Link>
          <Link href="/for-smes" className="btn-secondary">Join as an SME</Link>
        </div>
      </div>
    </section>
  );
}
