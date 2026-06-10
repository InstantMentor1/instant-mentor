import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  Building2,
  Check,
  ClipboardCheck,
  Clock3,
  GraduationCap,
  HandCoins,
  Lightbulb,
  ListChecks,
  Search,
  ShieldCheck,
  Star,
  Store,
  UserRoundCheck,
  Users,
  Video,
  X,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/marketplace/ServiceCard";
import { marketplaceCategories, type ExpertService } from "@/lib/marketplace";

const userSteps = [
  "Choose what you need help with",
  "Browse expert service menus",
  "Compare price, duration, expertise, and outcomes",
  "Book and pay upfront",
  "Share requirements before the session",
  "Attend the session",
  "Get guidance, notes, or an action plan",
  "Leave a review",
];

const expertSteps = [
  "Apply as an expert",
  "Get verified",
  "Create your service menu",
  "Set your own price and duration",
  "Accept bookings",
  "Deliver sessions",
  "Earn payouts",
  "Build reputation through reviews",
];

export function MarketplaceHeroSection({ dashboardHref }: { dashboardHref: string | null }) {
  return (
    <section className="overflow-hidden bg-hero-glow">
      <div className="container-shell grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-[1.08fr_.92fr]">
        <div>
          <span className="eyebrow"><Store size={14} className="mr-1" /> Expert service marketplace</span>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.04] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
            Find the right expert for the exact problem you want to solve.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Instant Mentor helps students, job seekers, professionals, founders, and business owners book verified experts for career, education, skills, academic, and business guidance.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={dashboardHref ?? "/services"} className="btn-primary">
              {dashboardHref ? "Open Dashboard" : "Explore Expert Services"} <ArrowRight size={17} />
            </Link>
            <Link href="/for-experts" className="btn-secondary">Apply as Expert</Link>
          </div>
          <p className="mt-6 font-semibold text-slate-600">
            Verified experts. Transparent pricing. Outcome-focused sessions.
          </p>
        </div>
        <div className="card relative overflow-hidden p-7 sm:p-9">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-teal-700 via-teal-500 to-mentorblue" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">Expert menu</p>
              <h2 className="mt-2 text-2xl font-black">Choose the outcome you need</h2>
            </div>
            <Search className="text-teal-700" size={30} />
          </div>
          <div className="mt-7 space-y-3">
            {[
              ["Resume Review", "30 min", "₹499"],
              ["Mock Interview", "45 min", "₹1,499"],
              ["Career Roadmap", "60 min", "₹2,999"],
              ["Business Consultation", "60 min", "₹4,999"],
            ].map(([title, duration, price]) => (
              <div key={title} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <p className="font-extrabold">{title}</p>
                  <p className="mt-1 text-xs text-slate-500">{duration} · Outcome-focused</p>
                </div>
                <span className="font-black text-teal-800">{price}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 text-center text-xs font-bold text-slate-600 sm:grid-cols-3">
            <span className="rounded-xl bg-teal-50 p-3"><ShieldCheck className="mx-auto mb-1 text-teal-700" /> Verified</span>
            <span className="rounded-xl bg-blue-50 p-3"><Banknote className="mx-auto mb-1 text-mentorblue" /> Clear pricing</span>
            <span className="col-span-2 rounded-xl bg-slate-50 p-3 sm:col-span-1"><ListChecks className="mx-auto mb-1 text-teal-700" /> Deliverables</span>
          </div>
        </div>
      </div>
      <div className="border-y border-slate-200 bg-white">
        <div className="container-shell grid gap-3 py-5 text-sm font-bold text-slate-600 sm:grid-cols-3 lg:grid-cols-5">
          {["Verified experts", "Transparent pricing", "Bookable services", "Secure payments", "Outcome-focused guidance"].map((item) => (
            <span key={item} className="flex items-center justify-center gap-2"><Check size={16} className="text-teal-700" /> {item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExpertAccessProblemSection() {
  const pains = [
    "Students do not know who to ask for career or project guidance.",
    "Job seekers need resume reviews and mock interviews from real professionals.",
    "Working professionals need expert advice to switch or grow careers.",
    "Founders and small businesses need practical business guidance.",
    "Experts want to earn from their knowledge but lack a trusted marketplace.",
  ];
  return (
    <section className="section-pad bg-slate-50">
      <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <SectionHeader eyebrow="The access problem" title="People need expert help, but finding the right expert is difficult." description="Search results and generic courses rarely tell you who can solve your exact problem, what you will receive, or what it will cost." />
        <div className="space-y-3">
          {pains.map((pain) => <div key={pain} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-slate-700"><X size={18} className="mt-0.5 shrink-0 text-slate-400" />{pain}</div>)}
        </div>
      </div>
    </section>
  );
}

export function ServiceMenuMarketplaceSection() {
  return (
    <section className="section-pad">
      <div className="container-shell rounded-[2rem] bg-teal-900 px-6 py-12 text-white sm:px-12 lg:grid lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-14">
        <div>
          <Store size={42} className="text-teal-100" />
          <h2 className="mt-5 text-3xl font-black sm:text-4xl">A service menu marketplace for expert guidance.</h2>
        </div>
        <div className="mt-7 space-y-5 text-lg leading-8 text-teal-50 lg:mt-0">
          <p>Experts create their own service menu with a title, category, price, duration, deliverables, and availability. Users compare experts and book the exact outcome they need.</p>
          <p className="rounded-2xl bg-white/10 p-5 font-semibold">Just like people browse menus before ordering, Instant Mentor lets users browse expert-service menus before booking guidance.</p>
        </div>
      </div>
    </section>
  );
}

export function MarketplaceHowItWorksSection() {
  const audiences: Array<{ title: string; steps: string[]; icon: LucideIcon }> = [
    { title: "For users", steps: userSteps, icon: Search },
    { title: "For experts", steps: expertSteps, icon: UserRoundCheck },
  ];
  return (
    <section className="section-pad bg-slate-50">
      <div className="container-shell">
        <SectionHeader eyebrow="Simple by design" title="How the marketplace works" description="Clear expectations for users and experts before a booking is created." centered />
        <div className="grid gap-6 lg:grid-cols-2">
          {audiences.map(({ title, steps, icon: Icon }) => (
            <article key={title} className="card p-6 sm:p-8">
              <Icon className="text-teal-700" size={30} />
              <h3 className="mt-4 text-2xl font-black">{title}</h3>
              <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                {steps.map((step, index) => <li key={step} className="flex gap-3 rounded-xl bg-slate-50 p-3 text-sm font-semibold"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs text-white">{index + 1}</span>{step}</li>)}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const categoryIcons = [BriefcaseBusiness, ClipboardCheck, Video, Lightbulb, GraduationCap, Building2];

export function MarketplaceCategoriesGrid() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <SectionHeader eyebrow="Browse by need" title="Expert services across career, education, skills, and business" description="Start with the problem you want to solve, then compare service menus from relevant experts." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {marketplaceCategories.map((category, index) => {
            const Icon = categoryIcons[index % categoryIcons.length];
            return <Link key={category} href={`/services?category=${encodeURIComponent(category)}`} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-soft"><Icon className="text-teal-700" /><h3 className="mt-5 font-extrabold">{category}</h3><span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-teal-700">Explore <ArrowRight size={13} /></span></Link>;
          })}
        </div>
      </div>
    </section>
  );
}

export function FeaturedExpertServicesSection({ services }: { services: ExpertService[] }) {
  return (
    <section className="section-pad bg-slate-50">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeader eyebrow="Featured menus" title="Book a service, not a vague promise" description="Every listing shows the price, duration, format, expert, and expected deliverables before you book." />
          <Link href="/services" className="btn-secondary shrink-0">Explore all services <ArrowRight size={16} /></Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => <ServiceCard key={service.id} service={service} />)}
        </div>
      </div>
    </section>
  );
}

export function ExpertEarningsSection() {
  const benefits = ["Set your own service price", "Define session duration", "Add clear deliverables", "Control availability", "Accept or reject bookings", "Track earnings"];
  return (
    <section className="section-pad">
      <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-3xl bg-teal-700 p-5 text-white"><HandCoins size={38} /></span>
          <h2 className="mt-6 text-3xl font-black sm:text-4xl">Experts earn by packaging their knowledge into services.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">Experts are not forced into fixed low pricing. They decide what to offer, what users receive, how long it takes, and what the service costs.</p>
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

export function MarketplaceDifferenceSection() {
  const columns = [
    { title: "Traditional course platforms", items: ["Mostly recorded content", "No personalized help", "Limited accountability", "Same content for everyone"], dark: false },
    { title: "Cheap doubt-solving apps", items: ["Low perceived value", "Limited expert motivation", "Narrow academic focus", "Hard to attract premium professionals"], dark: false },
    { title: "Instant Mentor", items: ["Expert-created service menus", "Transparent pricing", "Multiple categories", "Outcome-focused sessions", "Experts control pricing"], dark: true },
  ];
  return (
    <section className="section-pad bg-slate-50">
      <div className="container-shell">
        <SectionHeader eyebrow="The difference" title="Not a course platform. Not a cheap doubt app." centered />
        <div className="grid overflow-hidden rounded-3xl border border-slate-200 lg:grid-cols-3">
          {columns.map((column) => <article key={column.title} className={column.dark ? "bg-teal-900 p-7 text-white" : "bg-white p-7"}><h3 className="text-xl font-black">{column.title}</h3><ul className="mt-6 space-y-4">{column.items.map((item) => <li key={item} className="flex gap-3 text-sm font-semibold"><Check size={17} className={column.dark ? "text-teal-100" : "text-teal-700"} />{item}</li>)}</ul></article>)}
        </div>
      </div>
    </section>
  );
}

export function InstitutionProgramsSection() {
  return (
    <section className="section-pad">
      <div className="container-shell rounded-[2rem] border border-teal-100 bg-gradient-to-br from-teal-50 to-blue-50 p-7 sm:p-12">
        <div className="max-w-3xl">
          <Building2 size={38} className="text-teal-700" />
          <h2 className="mt-5 text-3xl font-black sm:text-4xl">For institutions that want expert access at scale.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">Colleges, training institutes, coaching centers, and placement cells can run resume review drives, mock interview programs, expert webinars, project review camps, and career mentorship sessions.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/institutions" className="btn-primary">Partner with Instant Mentor</Link>
            <a href="mailto:hello.instantmentor@gmail.com?subject=Institution Program Request" className="btn-secondary">Request Institution Program</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MarketplaceCTASection() {
  return (
    <section className="section-pad bg-ink text-white">
      <div className="container-shell text-center">
        <BadgeCheck className="mx-auto text-teal-200" size={38} />
        <h2 className="mt-5 text-4xl font-black">Ready to book the right expert?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">Explore expert services across career, education, skills, business, and industry guidance.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/services" className="btn-primary">Explore Expert Services</Link>
          <Link href="/for-experts" className="btn-secondary">Apply as Expert</Link>
        </div>
      </div>
    </section>
  );
}
