import { BadgeIndianRupee, CircleUserRound, MessageCircleQuestion, Presentation, Radio, Users } from "lucide-react";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { redirect } from "next/navigation";
import { getAuthContext } from "@/lib/auth";
import { dashboardForRole } from "@/lib/auth-shared";

const benefits = [
  { title: "Create an expert profile", text: "Showcase your credentials, experience, domains, and teaching strengths.", icon: CircleUserRound },
  { title: "Conduct live sessions", text: "Guide students through focused, interactive learning experiences.", icon: Radio },
  { title: "Clear student doubts", text: "Make a direct impact with timely, high-quality answers.", icon: MessageCircleQuestion },
  { title: "Host webinars", text: "Package your expertise into sessions students genuinely value.", icon: Presentation },
  { title: "Earn recurring income", text: "Build dependable earnings through sessions, support, and revenue sharing.", icon: BadgeIndianRupee },
  { title: "Build your community", text: "Grow a trusted audience around your knowledge and professional voice.", icon: Users },
];

export const metadata: Metadata = {
  title: "Become an Instant Mentor",
  description:
    "Apply to mentor engineering students, host paid webinars, share professional expertise, and build meaningful student impact.",
};

export default async function MentorsPage() {
  const { profile } = await getAuthContext();
  if (profile?.role === "Admin") redirect("/admin/dashboard");
  const dashboardHref = profile ? dashboardForRole(profile.role) : "/signup";
  const dashboardLabel = profile?.role === "Student" ? "Open Student Dashboard" : "Open Mentor Dashboard";
  return (
    <>
      <PageHero
        eyebrow="For faculty and experts"
        title="Turn your knowledge into impact and income."
        description="Help motivated students solve real problems, make better career decisions, and learn from experience that only you can share."
        ctaLabel={profile ? dashboardLabel : "Apply as Mentor"}
        ctaHref={dashboardHref}
      />
      <section className="section-pad bg-slate-50">
        <div className="container-shell">
          <SectionHeader eyebrow="Share what you know" title="A better way to mentor at scale" centered />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ title, text, icon: Icon }) => (
              <article key={title} className="card p-7">
                <span className="inline-flex rounded-2xl bg-teal-50 p-3 text-teal-700"><Icon size={26} /></span>
                <h2 className="mt-5 text-xl font-extrabold">{title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell">
          <div className="rounded-[2rem] bg-ink p-8 text-white sm:p-12 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-sm font-bold uppercase tracking-[0.16em] text-teal-100">Who can mentor?</span>
              <h2 className="mt-4 text-3xl font-black tracking-tight">Faculty, professionals, freelancers, consultants, and career mentors.</h2>
              <p className="mt-4 leading-7 text-slate-300">If you have credible expertise and a genuine interest in helping students progress, we want to hear from you.</p>
            </div>
            <div className="mt-8 rounded-3xl bg-white/10 px-7 py-6 lg:ml-10 lg:mt-0">
              <p className="text-4xl font-black text-teal-100">Your expertise</p>
              <p className="mt-1 text-lg text-slate-300">can change a student&apos;s direction.</p>
            </div>
          </div>
        </div>
      </section>
      <CTASection role={profile?.role ?? null} />
    </>
  );
}
