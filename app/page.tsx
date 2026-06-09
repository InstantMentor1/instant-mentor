import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  GraduationCap,
  MessageCircleQuestion,
  Presentation,
  Users,
  X,
} from "lucide-react";
import CampusAmbassadorSection from "@/components/CampusAmbassadorSection";
import CareerOutcomes from "@/components/CareerOutcomes";
import CommunityPreview from "@/components/CommunityPreview";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import MentorShowcase, { type PublicMentor } from "@/components/MentorShowcase";
import MentorVerificationExplainer from "@/components/MentorVerificationExplainer";
import PricingCards from "@/components/PricingCards";
import ReferralSection from "@/components/ReferralSection";
import SectionHeader from "@/components/SectionHeader";
import SuccessStories from "@/components/SuccessStories";
import TrustMetrics, { type MarketplaceMetrics } from "@/components/TrustMetrics";
import UpcomingWebinars, { type PublicWebinar } from "@/components/UpcomingWebinars";
import { technicalTracks } from "@/lib/constants";
import { domains, features } from "@/lib/data";
import { getAuthContext } from "@/lib/auth";
import { dashboardForRole } from "@/lib/auth-shared";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

const problems = [
  "Students struggle to find the right mentor.",
  "Academic doubts remain unresolved outside classrooms.",
  "Career guidance is often expensive or inaccessible.",
  "Students lack exposure to real industry professionals.",
  "Learning platforms focus on content, not continuous guidance.",
];

const steps = [
  "Verify as a student",
  "Choose your domain",
  "Ask doubts or join live sessions",
  "Learn from faculty and industry experts",
  "Grow through mentorship and career guidance",
];

const mentorBenefits = [
  "Host webinars",
  "Clear student doubts",
  "Build personal brand",
  "Earn recurring income",
  "Grow a student community",
  "Share real-world expertise",
];

export const metadata: Metadata = {
  title: "India's Mentorship Platform for Engineering Students",
  description:
    "Get technical support, career guidance, placement preparation, and live webinars from reviewed industry professionals.",
};

export default async function Home() {
  const { profile } = await getAuthContext();
  const dashboardHref = profile ? dashboardForRole(profile.role) : null;
  const { mentors, webinars, metrics } = await getMarketplacePreview();
  const webinarHref = profile ? "/webinars" : "/signup";

  return (
    <>
      <section className="overflow-hidden bg-hero-glow">
        <div className="container-shell grid min-h-[680px] items-center gap-12 py-16 lg:grid-cols-[1.1fr_.9fr] lg:py-20">
          <div>
            <span className="eyebrow"><BadgeCheck size={14} className="mr-1" /> Mentorship that moves you forward</span>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.06] tracking-[-0.04em] text-ink sm:text-6xl lg:text-7xl">
              India&apos;s mentorship platform for <span className="text-teal-700">engineering students.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Instant Mentor connects technical students and career aspirants with experienced industry professionals for doubt-solving, webinars, career guidance, resume support, and structured growth pathways.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {dashboardHref ? (
                <Link href={dashboardHref} className="btn-primary">Open {profile?.role === "Admin" ? "Admin " : ""}Dashboard <ArrowRight size={17} /></Link>
              ) : (
                <>
                  <Link href="/signup" className="btn-primary">Create Student Account <ArrowRight size={17} /></Link>
                  <Link href="/signup" className="btn-secondary">Apply as Mentor</Link>
                </>
              )}
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-500">
              <CheckCircle2 size={17} className="text-teal-600" /> Built for verified students across India.
            </p>
            {!dashboardHref && (
              <Link href="/pricing" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-900">
                Pay ₹1 to confirm early-access interest <ArrowRight size={15} />
              </Link>
            )}
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -left-6 top-14 h-32 w-32 rounded-full bg-teal-100 blur-2xl" />
            <div className="absolute -right-5 bottom-10 h-36 w-36 rounded-full bg-slate-200 blur-2xl" />
            <div className="card relative overflow-hidden p-8 sm:p-10">
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-teal-700 via-teal-500 to-mentorblue" />
              <Image
                src="/assets/instant-mentor-logo.png"
                alt="Instant Mentor Logo"
                width={693}
                height={513}
                className="mx-auto h-auto w-full max-w-sm object-contain"
                priority
              />
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-100 pt-6 text-center">
                <div><MessageCircleQuestion className="mx-auto text-teal-700" /><p className="mt-2 text-xs font-bold">Ask</p></div>
                <div><GraduationCap className="mx-auto text-teal-700" /><p className="mt-2 text-xs font-bold">Learn</p></div>
                <div><Users className="mx-auto text-teal-700" /><p className="mt-2 text-xs font-bold">Grow</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustMetrics metrics={metrics} />

      <section className="section-pad bg-slate-50">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-2">
          <SectionHeader
            eyebrow="The challenge"
            title="Students need more than recorded courses."
            description="Content is everywhere. Timely answers, trusted guidance, and human support are much harder to find."
          />
          <div className="space-y-3">
            {problems.map((problem) => (
              <div key={problem} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                <span className="mt-0.5 rounded-full bg-slate-100 p-1 text-slate-500"><X size={15} /></span>
                <p className="font-semibold text-slate-700">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell">
          <div className="rounded-[2rem] bg-teal-900 px-6 py-12 text-white sm:px-12 lg:grid lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14">
            <div>
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.18em] text-teal-100">The solution</span>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">One platform for doubts, mentorship, and career growth.</h2>
            </div>
            <p className="mt-6 text-lg leading-8 text-teal-50 lg:mt-0">
              Instant Mentor gives students monthly access to faculty, mentors, live sessions, and career-focused communities through an affordable subscription pass.
            </p>
          </div>
        </div>
      </section>

      <MentorShowcase mentors={mentors} />

      <section className="section-pad bg-slate-50">
        <div className="container-shell">
          <SectionHeader eyebrow="Simple by design" title="How Instant Mentor works" centered />
          <div className="grid gap-4 md:grid-cols-5">
            {steps.map((step, index) => (
              <article key={step} className="relative rounded-2xl border border-slate-200 bg-white p-5">
                <span className="mb-8 flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-sm font-black text-white">{index + 1}</span>
                <h3 className="font-bold leading-6 text-ink">{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CommunityPreview tracks={technicalTracks} />

      <UpcomingWebinars webinars={webinars} ctaHref={webinarHref} />

      <CareerOutcomes />

      <SuccessStories />

      <section className="section-pad">
        <div className="container-shell">
          <SectionHeader eyebrow="Everything in one membership" title="Support for every step of the journey" centered />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ title, text, icon: Icon }) => (
              <article key={title} className="group rounded-3xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-soft">
                <span className="mb-5 inline-flex rounded-2xl bg-teal-50 p-3 text-teal-700 transition group-hover:bg-teal-700 group-hover:text-white"><Icon size={24} /></span>
                <h3 className="font-extrabold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-slate-50">
        <div className="container-shell">
          <SectionHeader eyebrow="Learn what matters" title="Start focused. Expand across domains." description="Discover expert help and student communities across high-demand academic and career areas." />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {domains.map(({ name, icon: Icon }) => (
              <article key={name} className="rounded-2xl border border-slate-200 bg-white p-5">
                <Icon size={23} className="text-teal-700" />
                <h3 className="mt-5 font-bold text-ink">{name}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MentorVerificationExplainer />

      <section className="section-pad">
        <div className="container-shell">
          <SectionHeader eyebrow="The difference" title="Not another course platform." centered />
          <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-slate-200 md:grid-cols-2">
            <div className="bg-slate-50 p-7 sm:p-9">
              <h3 className="text-xl font-extrabold text-slate-600">Traditional course platforms</h3>
              <ul className="mt-6 space-y-4 text-slate-600">
                {["Mostly recorded content", "Limited doubt support", "No continuous mentorship", "Weak career connection"].map((item) => (
                  <li key={item} className="flex gap-3"><X size={18} className="mt-0.5 shrink-0 text-slate-400" /> {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-teal-800 p-7 text-white sm:p-9">
              <h3 className="text-xl font-extrabold">Instant Mentor</h3>
              <ul className="mt-6 space-y-4 text-teal-50">
                {["Live doubt-clearing", "Verified student ecosystem", "Faculty + industry expert access", "Affordable monthly subscription", "Academic + career support together"].map((item) => (
                  <li key={item} className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0" /> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-slate-50">
        <div className="container-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <span className="mb-5 inline-flex rounded-3xl bg-teal-700 p-5 text-white"><Presentation size={38} /></span>
            <SectionHeader
              eyebrow="For mentors"
              title="Faculty and experts can earn by helping students."
              description="Turn your experience into visible impact, a trusted personal brand, and recurring income."
            />
            <Link href="/mentors" className="btn-primary">Explore mentoring <ArrowRight size={17} /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {mentorBenefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 font-bold">
                <span className="rounded-full bg-teal-50 p-1 text-teal-700"><Check size={16} /></span>{benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell">
          <SectionHeader eyebrow="Simple monthly access" title="Choose the support that fits your goals" centered />
          <PricingCards role={profile?.role ?? null} />
          <p className="mt-8 text-center text-sm text-slate-500">Razorpay checkout is introduced in test mode. The ₹1 confirmation does not include mentor sessions.</p>
        </div>
      </section>

      <ReferralSection role={profile?.role ?? null} />
      <CampusAmbassadorSection />
      <FAQSection />
      <CTASection role={profile?.role ?? null} />
    </>
  );
}

async function getMarketplacePreview(): Promise<{
  mentors: PublicMentor[];
  webinars: PublicWebinar[];
  metrics: MarketplaceMetrics;
}> {
  try {
    const admin = createSupabaseAdminClient();
    const [
      { data: mentorRows, error: mentorError },
      { data: webinarRows, error: webinarError },
      { data: completedSessions, count: completedSessionCount, error: sessionMetricsError },
      { data: platformProfiles, count: communityMemberCount, error: platformProfilesError },
      { count: verifiedMentorCount, error: verifiedMentorCountError },
    ] =
      await Promise.all([
        admin
          .from("mentor_profiles")
          .select("user_id,bio,verification_status,expertise_areas,expertise,experience_years")
          .eq("verification_status", "verified")
          .limit(4),
        admin
          .from("webinars")
          .select("id,mentor_id,title,technical_track,scheduled_at,price,duration_minutes,max_participants")
          .eq("status", "upcoming")
          .gte("scheduled_at", new Date().toISOString())
          .order("scheduled_at", { ascending: true })
          .limit(3),
        admin
          .from("session_requests")
          .select("student_id", { count: "exact" })
          .eq("status", "completed"),
        admin
          .from("profiles")
          .select("user_id,role,college_or_company", { count: "exact" }),
        admin
          .from("mentor_profiles")
          .select("*", { count: "exact", head: true })
          .eq("verification_status", "verified"),
      ]);

    if (mentorError) console.error("Unable to load public mentor preview", mentorError);
    if (webinarError) console.error("Unable to load public webinar preview", webinarError);
    if (sessionMetricsError) console.error("Unable to load completed session metrics", sessionMetricsError);
    if (platformProfilesError) console.error("Unable to load platform profile metrics", platformProfilesError);
    if (verifiedMentorCountError) console.error("Unable to load verified mentor metrics", verifiedMentorCountError);

    const userIds = Array.from(
      new Set([
        ...(mentorRows ?? []).map((mentor) => mentor.user_id),
        ...(webinarRows ?? []).map((webinar) => webinar.mentor_id),
      ]),
    );

    const { data: profiles, error: profileError } = userIds.length
      ? await admin
          .from("profiles")
          .select("user_id,full_name,role,college_or_company,technical_track,technical_tracks,linkedin_or_portfolio")
          .in("user_id", userIds)
      : { data: [], error: null };

    if (profileError) console.error("Unable to load public marketplace profiles", profileError);

    const profileByUserId = new Map((profiles ?? []).map((item) => [item.user_id, item]));
    const mentors: PublicMentor[] = (mentorRows ?? [])
      .map((mentor) => {
        const mentorProfile = profileByUserId.get(mentor.user_id);
        if (!mentorProfile) return null;
        const tracks =
          mentorProfile.technical_tracks?.length > 0
            ? mentorProfile.technical_tracks
            : mentor.expertise?.length > 0
              ? mentor.expertise
              : mentor.expertise_areas?.length > 0
                ? mentor.expertise_areas
                : mentorProfile.technical_track
                  ? [mentorProfile.technical_track]
                  : [];

        return {
          id: mentor.user_id,
          fullName: mentorProfile.full_name,
          organization: mentorProfile.college_or_company,
          roleLabel: mentorProfile.role === "Faculty" ? "Faculty Mentor" : "Industry Mentor",
          tracks,
          bio: mentor.bio,
          experienceYears: mentor.experience_years,
          linkedinUrl: mentorProfile.linkedin_or_portfolio?.includes("linkedin.com")
            ? mentorProfile.linkedin_or_portfolio
            : null,
        };
      })
      .filter((mentor): mentor is PublicMentor => mentor !== null);

    const webinarIds = (webinarRows ?? []).map((webinar) => webinar.id);
    const { data: registrations, error: registrationError } = webinarIds.length
      ? await admin
          .from("webinar_registrations")
          .select("webinar_id")
          .in("webinar_id", webinarIds)
          .neq("payment_status", "cancelled")
      : { data: [], error: null };

    if (registrationError) console.error("Unable to load webinar capacity metrics", registrationError);

    const registrationsByWebinar = new Map<string, number>();
    for (const registration of registrations ?? []) {
      registrationsByWebinar.set(
        registration.webinar_id,
        (registrationsByWebinar.get(registration.webinar_id) ?? 0) + 1,
      );
    }

    const webinars: PublicWebinar[] = (webinarRows ?? []).map((webinar) => ({
      id: webinar.id,
      title: webinar.title,
      track: webinar.technical_track,
      scheduledAt: webinar.scheduled_at,
      price: Number(webinar.price),
      durationMinutes: webinar.duration_minutes,
      maxParticipants: webinar.max_participants,
      seatsLeft: Math.max(
        webinar.max_participants - (registrationsByWebinar.get(webinar.id) ?? 0),
        0,
      ),
      mentorName: profileByUserId.get(webinar.mentor_id)?.full_name ?? "Instant Mentor professional",
    }));

    const studentInstitutions = new Set(
      (platformProfiles ?? [])
        .filter((item) => item.role === "Student" && item.college_or_company?.trim())
        .map((item) => item.college_or_company.trim().toLowerCase()),
    );
    const metrics: MarketplaceMetrics = {
      studentsMentored: new Set((completedSessions ?? []).map((session) => session.student_id)).size,
      activeMentors: verifiedMentorCount ?? 0,
      sessionsConducted: completedSessionCount ?? 0,
      institutionsRepresented: studentInstitutions.size,
      communityMembers: communityMemberCount ?? 0,
    };

    return { mentors, webinars, metrics };
  } catch (error) {
    console.error("Unable to load homepage marketplace preview", error);
    return {
      mentors: [],
      webinars: [],
      metrics: {
        studentsMentored: 0,
        activeMentors: 0,
        sessionsConducted: 0,
        institutionsRepresented: 0,
        communityMembers: 0,
      },
    };
  }
}
