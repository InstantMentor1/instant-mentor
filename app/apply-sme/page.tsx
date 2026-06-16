import Link from "next/link";
import PageHero from "@/components/PageHero";
import { marketplaceCategories } from "@/lib/marketplace";

export default function ApplySmePage() {
  return (
    <>
      <PageHero
        eyebrow="SME partner application"
        title="Apply to become a verified Mentrix SME."
        description="Start with a partner account, then complete your profile and expertise menu from the SME dashboard."
        ctaLabel="Create SME Account"
        ctaHref="/signup"
      />
      <section className="section-pad bg-slate-50">
        <div className="container-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div className="card p-7">
            <h2 className="text-2xl font-black">What Mentrix reviews</h2>
            <ul className="mt-5 space-y-3 text-sm font-semibold text-slate-700">
              {[
                "Professional or academic domain evidence",
                "LinkedIn, portfolio, publication, or credential proof",
                "Clarity of expertise items and deliverables",
                "Student-fit communication and availability",
                "Commitment to showing up for accepted bookings",
              ].map((item) => <li key={item} className="rounded-xl bg-slate-50 p-3">{item}</li>)}
            </ul>
          </div>
          <div className="card p-7">
            <h2 className="text-2xl font-black">Supported SME domains</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {marketplaceCategories.map((category) => (
                <span key={category} className="rounded-full bg-teal-50 px-3 py-1 text-sm font-bold text-teal-800">{category}</span>
              ))}
            </div>
            <Link href="/signup" className="btn-primary mt-7">Create SME Account</Link>
          </div>
        </div>
      </section>
    </>
  );
}
