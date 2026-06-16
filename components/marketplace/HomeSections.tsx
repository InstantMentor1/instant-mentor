import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  Check,
  GraduationCap,
  ListChecks,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  UserRoundCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/marketplace/ServiceCard";
import { marketplaceCategories, type ExpertService } from "@/lib/marketplace";

const curatedMoments = [
  "Career clarity",
  "Project review",
  "Research help",
  "Mock interview",
  "Finance doubts",
  "Startup advice",
  "Law & policy",
  "AI roadmap",
];

const trustStats = [
  ["Verified SMEs", "Reviewed profiles before discovery"],
  ["Clear menus", "Scope, price, duration, deliverables"],
  ["Student intent", "Goal and context required"],
  ["Protected time", "No-show rules for serious bookings"],
] as const;

export function ExpertMarketplaceHeroSection({
  dashboardHref,
}: {
  dashboardHref: string | null;
}) {
  return (
    <section className="relative overflow-hidden bg-[#fff7f7]">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-red-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-6 h-72 w-72 rounded-full bg-black/5 blur-3xl" />
      <div className="container-shell relative grid min-h-[620px] items-center gap-10 py-12 lg:grid-cols-[1.05fr_.95fr] lg:py-16">
        <div>
          <span className="eyebrow border-red-200 bg-white text-red-700">
            <Sparkles size={14} className="mr-1" /> Mentrix
          </span>
          <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
            Your Journey, Guided By Greatness.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
            Discover verified Subject Matter Experts, compare their expertise
            menus, and book focused guidance for the exact academic, career, or
            professional moment you are in.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href={dashboardHref ?? "/smes"} className="btn-primary">
              {dashboardHref ? "Open Dashboard" : "Explore Mentors"} <ArrowRight size={17} />
            </Link>
            <Link href="/for-smes" className="btn-secondary">Become an SME</Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {curatedMoments.slice(0, 6).map((moment) => (
              <Link key={moment} href={`/smes?search=${encodeURIComponent(moment)}`} className="rounded-full border border-red-100 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:border-red-300 hover:text-red-700">
                {moment}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-4 -top-4 h-28 w-28 rounded-3xl bg-red-600" />
          <div className="card relative overflow-hidden border-red-100 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-red-700">Live discovery</p>
                <h2 className="mt-2 text-2xl font-black">Pick a path. Book the right expert.</h2>
              </div>
              <Image src="/assets/mentrix-logo.png" alt="Mentrix" width={1600} height={1600} className="h-16 w-auto rounded-2xl object-contain" />
            </div>
            <div className="mt-6 grid gap-3">
              {[
                ["01", "Find the moment", "Internship, exams, project, research, startup, switch."],
                ["02", "Compare expertise menus", "Price, duration, proof, deliverables, availability."],
                ["03", "Book with intent", "Students share goals before the SME accepts."],
              ].map(([step, title, text]) => (
                <div key={step} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-lg font-black text-red-700">{step}</span>
                    <div>
                      <h3 className="font-black">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-[#140708] p-4 text-white">
              <p className="flex items-center gap-2 text-sm font-black"><Star size={16} className="text-red-300" /> Premium but accessible expert access</p>
              <p className="mt-1 text-xs leading-5 text-red-50">SMEs set prices. Mentrix protects quality, trust, and booking seriousness.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-y border-red-100 bg-white">
        <div className="container-shell grid gap-3 py-4 text-sm font-bold text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
          {trustStats.map(([title, text]) => (
            <div key={title} className="flex gap-2">
              <ShieldCheck size={17} className="mt-0.5 shrink-0 text-red-700" />
              <span><span className="text-ink">{title}</span><span className="block text-xs font-semibold text-slate-500">{text}</span></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExpertDiscoveryProblemSection() {
  const cards = [
    ["For students", "Guidance appears exactly when decisions feel messy: exams, internships, projects, research, interviews, or career moves."],
    ["For SMEs", "Your knowledge becomes a curated menu, not a low-value chat queue. Students arrive with context and intent."],
    ["For institutions", "Bring trusted experts into cohorts, placement cells, project reviews, and skill programs without rebuilding the network."],
  ] as const;

  return (
    <section className="section-pad bg-white">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Why Mentrix"
          title="A premium discovery layer for serious guidance moments."
          description="Inspired by modern city-discovery products: visual, curated, fast to browse, and built around trust."
          centered
        />
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map(([title, text], index) => (
            <article key={title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-sm font-black text-red-700">{index + 1}</span>
              <h2 className="mt-4 text-xl font-black">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExpertServiceMarketplaceSolutionSection() {
  return (
    <section className="section-pad bg-[#140708] text-white">
      <div className="container-shell grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow border-white/10 bg-white/10 text-red-100">The model</p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Swipe the old idea away. Mentrix is not a doubt dump.</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-red-50 sm:text-base">
            SMEs publish clear expertise items. Students browse, compare, pay,
            and book with context. The platform becomes a marketplace of guided
            outcomes, not a queue of random questions.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Curated discovery", "Browse by life moment, domain, and outcome."],
            ["Expertise menus", "Each SME lists what they offer and what students get."],
            ["Red-carpet trust", "Verification, pricing clarity, booking intent, no-show safety."],
            ["Premium feel", "Serious SMEs can charge for real value."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-red-50">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const studentSteps = ["Discover", "Compare", "Book", "Prepare", "Get guided"];
const smeSteps = ["Apply", "Verify", "Create menu", "Accept bookings", "Earn"];

export function ExpertMarketplaceHowItWorksSection() {
  const groups: Array<{ title: string; steps: string[]; icon: LucideIcon }> = [
    { title: "Student journey", steps: studentSteps, icon: Search },
    { title: "SME journey", steps: smeSteps, icon: UserRoundCheck },
  ];
  return (
    <section className="section-pad bg-[#fff7f7]">
      <div className="container-shell">
        <SectionHeader eyebrow="How it works" title="Five steps. No clutter." centered />
        <div className="grid gap-5 lg:grid-cols-2">
          {groups.map(({ title, steps, icon: Icon }) => (
            <article key={title} className="card border-red-100 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="rounded-2xl bg-red-50 p-3 text-red-700"><Icon size={24} /></span>
                <h3 className="text-xl font-black">{title}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {steps.map((step, index) => (
                  <span key={step} className="rounded-full border border-red-100 bg-white px-4 py-2 text-sm font-bold text-slate-700">
                    {index + 1}. {step}
                  </span>
                ))}
              </div>
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
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="Featured"
            title="Curated expertise menus."
            description="A District-like browse layer for mentorship: premium cards, clear prices, and focused outcomes."
          />
          <Link href="/smes" className="btn-secondary shrink-0">View all <ArrowRight size={16} /></Link>
        </div>
        {services.length > 0 ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.slice(0, 3).map((service) => <ServiceCard key={service.id} service={service} />)}
          </div>
        ) : (
          <div className="card mt-6 grid gap-4 border-red-100 p-6 text-center sm:p-8">
            <Store className="mx-auto text-red-700" size={32} />
            <h3 className="text-xl font-black">SME menus are opening soon.</h3>
            <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-600">
              Verified SMEs can create their expertise menu from the SME dashboard.
              Published items will appear here with SME-set pricing and availability.
            </p>
            <Link href="/for-smes" className="btn-primary mx-auto">Become an SME</Link>
          </div>
        )}
      </div>
    </section>
  );
}

const categoryIcons = [BriefcaseBusiness, Users, GraduationCap, Building2, ListChecks, BookOpenCheck];

export function ExpertMarketplaceCategoriesSection() {
  return (
    <section className="section-pad bg-[#fff7f7]">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Explore"
          title="Guidance categories built around student moments."
          description="The experience should feel quick to scan: like opening a city guide, but for your academic and career journey."
        />
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {marketplaceCategories.slice(0, 12).map((category, index) => {
            const Icon = categoryIcons[index % categoryIcons.length];
            return (
              <Link key={category} href={`/smes?category=${encodeURIComponent(category)}`} className="rounded-3xl border border-red-100 bg-white p-4 transition hover:-translate-y-1 hover:border-red-300 hover:shadow-soft">
                <Icon className="text-red-700" size={22} />
                <h3 className="mt-3 font-extrabold">{category}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">Find SMEs, compare outcomes, and book with intent.</p>
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
    "Verified SME profile",
    "Up to 10 active expertise items",
    "SME-set pricing above Rs 500",
    "High-intent student bookings",
    "Earnings and reviews",
    "No-show protection",
  ];
  return (
    <section className="section-pad bg-white">
      <div className="container-shell grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-2xl bg-red-50 p-3 text-red-700"><Banknote size={26} /></span>
          <h2 className="mt-4 text-2xl font-black sm:text-3xl">A better stage for great subject experts.</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Build your profile, package your knowledge, set your value, and meet
            students who already know why they need you.
          </p>
          <Link href="/for-smes" className="btn-primary mt-5">Become an SME</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div key={benefit} className="card flex items-center gap-3 border-red-100 p-4 text-sm font-bold">
              <Check className="text-red-700" size={17} />{benefit}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyInstantMentorIsDifferentSection() {
  const columns = [
    { title: "Courses", items: ["Recorded", "Generic", "No personal context"], dark: false },
    { title: "Doubt apps", items: ["Low intent", "Cheap-first", "Random questions"], dark: false },
    { title: "Mentrix", items: ["Verified SMEs", "Curated menus", "Guided greatness"], dark: true },
  ];
  return (
    <section className="section-pad bg-[#fff7f7]">
      <div className="container-shell">
        <SectionHeader eyebrow="Positioning" title="Not a course. Not a doubt app. A guided marketplace." centered />
        <div className="grid overflow-hidden rounded-3xl border border-red-100 bg-white lg:grid-cols-3">
          {columns.map((column) => (
            <article key={column.title} className={column.dark ? "bg-[#140708] p-6 text-white" : "bg-white p-6"}>
              <h3 className="text-lg font-black">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.items.map((item) => <li key={item} className="flex gap-2 text-sm font-semibold"><Check size={16} className={column.dark ? "text-red-200" : "text-red-700"} />{item}</li>)}
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
    <section className="section-pad bg-white">
      <div className="container-shell">
        <div className="rounded-3xl border border-red-100 bg-[#140708] p-6 text-white sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <Building2 size={30} className="text-red-200" />
            <h2 className="mt-4 text-2xl font-black sm:text-3xl">Bring great guidance to your institution.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-red-50 sm:text-base">
              Run SME-led project reviews, interview rooms, research clinics,
              skill sessions, and placement programs.
            </p>
          </div>
          <Link href="/institutions" className="btn-primary mt-5 lg:mt-0">Partner with Mentrix</Link>
        </div>
      </div>
    </section>
  );
}

export function ExpertMarketplaceCTASection() {
  return (
    <section className="bg-[#bd0005] py-12 text-white sm:py-14">
      <div className="container-shell text-center">
        <BadgeCheck className="mx-auto text-red-100" size={32} />
        <h2 className="mt-4 text-3xl font-black sm:text-4xl">Your Journey, Guided By Greatness.</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-red-50 sm:text-base">
          Find the right SME, book the exact expertise item, and move forward with confidence.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/smes" className="btn-secondary border-white bg-white text-red-700">Explore Mentors</Link>
          <Link href="/for-smes" className="btn-secondary border-white/30 bg-transparent text-white hover:bg-white hover:text-red-700">Become an SME</Link>
        </div>
      </div>
    </section>
  );
}
