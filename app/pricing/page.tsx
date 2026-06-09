import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import PricingCards from "@/components/PricingCards";
import SectionHeader from "@/components/SectionHeader";
import SingleSessionBanner from "@/components/SingleSessionBanner";
import { getAuthContext } from "@/lib/auth";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Student Mentorship Pricing",
  description:
    "Compare single-session and monthly mentorship plans for technical guidance, placement preparation, and discounted webinars.",
};

export default async function PricingPage() {
  const { profile } = await getAuthContext();
  return (
    <>
      <PageHero
        eyebrow="Simple pricing"
        title="Ongoing guidance, without the premium price tag."
        description="Choose a monthly plan based on how much direct support you need. Every plan keeps you connected to your learning community."
      />
      <section className="section-pad bg-slate-50">
        <div className="container-shell">
          <SingleSessionBanner />
          <PricingCards role={profile?.role ?? null} />
          <p className="mt-8 text-center text-sm text-slate-500">Payments are currently confirmed manually by the Instant Mentor team.</p>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell max-w-4xl">
          <SectionHeader eyebrow="Questions, answered" title="Frequently asked questions" centered />
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white p-5 open:border-teal-200 open:shadow-soft">
                <summary className="cursor-pointer list-none pr-8 font-extrabold text-ink">{faq.question}</summary>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CTASection role={profile?.role ?? null} />
    </>
  );
}
