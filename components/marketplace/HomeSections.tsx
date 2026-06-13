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
            <Store size={14} className="mr-1" /> Subject-matter expert marketplace
          </span>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.04] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
            Book verified experts for the exact service you need.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Instant Mentor connects users with verified subject-matter experts who create their own service menus across career, education, skills, business, and industry domains. Browse profiles, compare services, check availability, and book outcome-focused support.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={dashboardHref ?? "/services"} className="btn-primary">
              {dashboardHref ? "Open Dashboard" : "Explore Expert Services"} <ArrowRight size={17} />
            </Link>
            <Link href="/for-experts" className="btn-secondary">Apply as Expert</Link>
          </div>
          <p className="mt-6 font-semibold text-slate-600">
            Discover experts. Compare services. Book with confidence.
          </p>
        </div>

        <div className="card relative overflow-hidden p-7 sm:p-9">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-teal-700 via-teal-500 to-mentorblue" />
          <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
            Expert-created service menu
          </p>
          <h2 className="mt-3 text-2xl font-black">Know what you receive before you book.</h2>
          <div className="mt-7 space-y-3">
            {[
              ["Service outcome", "Defined by the expert"],
              ["Pricing", "Set by the expert"],
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
          {["Verified experts", "Expert-created services", "Expert-set pricing", "Availability-based booking", "Outcome-focused support"].map((item) => (
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
    "People do not know which expert to trust.",
    "Students and professionals often depend on random advice.",
    "Experts lack a structured way to package and sell services.",
    "Users want clear outcomes before paying.",
    "Institutions and businesses need reliable expert access.",
    "Existing platforms focus on content, courses, or doubts instead of service booking.",
  ];
  return (
    <section className="section-pad bg-slate-50">
      <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <SectionHeader
          eyebrow="The discovery problem"
          title="Finding the right expert is harder than finding information."
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
            A marketplace where experts list services and users book what they need.
          </h2>
        </div>
        <div className="mt-7 space-y-5 text-lg leading-8 text-teal-50 lg:mt-0">
          <p>
            Verified experts create professional profiles and service menus. Users compare price, duration, deliverables, availability, and reviews before choosing.
          </p>
          <p className="rounded-2xl bg-white/10 p-5 font-semibold">
            Instead of users posting doubts and waiting for a solution, experts create clear service offerings in advance. Users simply discover, compare, and book.
          </p>
        </div>
      </div>
    </section>
  );
}

const userSteps = [
  "Choose a category",
  "Browse expert profiles and services",
  "Compare outcome, price, duration, and availability",
  "Book a session or request the service",
  "Share optional notes or attachments",
  "Attend the session or receive the service",
  "Track booking status",
  "Leave a review",
];

const expertSteps = [
  "Apply as an expert",
  "Get verified",
  "Create a professional profile",
  "Add services to your service menu",
  "Set pricing, duration, deliverables, and availability",
  "Accept and manage bookings",
  "Deliver the service",
  "Track earnings and reviews",
];

export function ExpertMarketplaceHowItWorksSection() {
  const groups: Array<{ title: string; steps: string[]; icon: LucideIcon }> = [
    { title: "For users", steps: userSteps, icon: Search },
    { title: "For experts", steps: expertSteps, icon: UserRoundCheck },
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
            eyebrow="Expert service menus"
            title="Every expert creates their own service menu."
            description="Experts choose what they offer, set the price, define the duration, describe the deliverables, and share their availability."
          />
          <Link href="/services" className="btn-secondary shrink-0">Explore all services <ArrowRight size={16} /></Link>
        </div>
        {services.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => <ServiceCard key={service.id} service={service} />)}
          </div>
        ) : (
          <div className="card mt-10 p-10 text-center">
            <Store className="mx-auto text-teal-700" size={36} />
            <h3 className="mt-4 text-2xl font-black">No expert services are live yet.</h3>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Verified experts can create their service menu from the expert dashboard. Published services will appear here with expert-set pricing and availability.
            </p>
            <Link href="/for-experts" className="btn-primary mt-6">Apply as Expert</Link>
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
          eyebrow="Marketplace categories"
          title="Expert services across work, education, skills, and business"
          description="Explore expert-created services, expert-set prices, availability, formats, and deliverables."
        />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {marketplaceCategories.map((category, index) => {
            const Icon = categoryIcons[index % categoryIcons.length];
            return (
              <Link key={category} href={`/services?category=${encodeURIComponent(category)}`} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-soft">
                <Icon className="text-teal-700" />
                <h3 className="mt-5 font-extrabold">{category}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Compare services, pricing, availability, and outcomes.</p>
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
    "Create a professional profile",
    "List multiple services",
    "Set your own pricing",
    "Define duration and deliverables",
    "Control availability",
    "Accept or reject bookings",
    "Track earnings",
    "Build reviews and reputation",
  ];
  return (
    <section className="section-pad">
      <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <Banknote size={40} className="text-teal-700" />
          <h2 className="mt-5 text-3xl font-black sm:text-4xl">Experts earn by packaging their knowledge into services.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Instant Mentor gives expert partners a dashboard to create services, define pricing, manage bookings, communicate with users, and track earnings. Experts are not forced into platform-fixed low pricing.
          </p>
          <p className="mt-5 rounded-2xl bg-teal-50 p-4 font-bold text-teal-900">Platform commission: 20% · Expert payout: 80%</p>
          <Link href="/for-experts" className="btn-primary mt-6">Apply as Expert</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit) => <div key={benefit} className="card flex items-center gap-3 p-5 font-bold"><Check className="text-teal-700" size={18} />{benefit}</div>)}
        </div>
      </div>
    </section>
  );
}

export function WhyInstantMentorIsDifferentSection() {
  const columns = [
    { title: "Course platforms", items: ["Recorded content", "Same content for everyone", "No personalized expert access"], dark: false },
    { title: "Doubt-solving platforms", items: ["Narrow academic focus", "Low perceived value", "User posts the problem first"], dark: false },
    { title: "Instant Mentor", items: ["Expert-created profiles", "Expert-created service menus", "Expert-set pricing", "Availability-based booking", "Outcome-focused services"], dark: true },
  ];
  return (
    <section className="section-pad bg-slate-50">
      <div className="container-shell">
        <SectionHeader eyebrow="Why Instant Mentor" title="Not a course platform. Not a doubt app. A service marketplace for expert access." centered />
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
        <h2 className="mt-5 text-3xl font-black sm:text-4xl">Expert access for institutions at scale.</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Colleges, institutes, coaching centers, placement cells, and organizations can run resume review drives, mock interviews, project reviews, career programs, expert workshops, academic mentoring, and skill-development support.
        </p>
        <Link href="/institutions" className="btn-primary mt-7">Partner with Instant Mentor</Link>
      </div>
    </section>
  );
}

export function ExpertMarketplaceCTASection() {
  return (
    <section className="section-pad bg-ink text-white">
      <div className="container-shell text-center">
        <BadgeCheck className="mx-auto text-teal-200" size={38} />
        <h2 className="mt-5 text-4xl font-black">Ready to find the right expert?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          Explore expert-created services across career, academics, skills, business, and industry guidance.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/services" className="btn-primary">Explore Expert Services</Link>
          <Link href="/for-experts" className="btn-secondary">Apply as Expert</Link>
        </div>
      </div>
    </section>
  );
}
