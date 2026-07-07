import Link from "next/link";
import PageHero from "@/components/PageHero";
import { marketplaceCategories } from "@/lib/marketplace";

export default function ApplyMentorPage() {
  return (
    <>
      <PageHero
        eyebrow="Expert application"
        title="Apply to become a verified My Expert Talk expert."
        description="Create an expert account, complete your profile, and publish services students can book."
        ctaLabel="Create Expert Account"
        ctaHref="/signup"
      />
      <section className="section-pad bg-ivory">
        <div className="container-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div className="card p-7">
            <h2 className="text-2xl font-black">What My Expert Talk reviews</h2>
            <ul className="mt-5 space-y-3 text-sm font-semibold text-slate-700">
              {[
                "Professional, academic, or teaching experience",
                "LinkedIn, portfolio, publication, or credential proof",
                "Clarity of expert services and deliverables",
                "Student-friendly communication and availability",
                "Commitment to showing up for accepted bookings",
              ].map((item) => <li key={item} className="rounded-xl bg-ivory p-3">{item}</li>)}
            </ul>
          </div>
          <div className="card p-7">
            <h2 className="text-2xl font-black">Supported expert areas</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {marketplaceCategories.map((category) => (
                <span key={category} className="rounded-full bg-skysoft px-3 py-1 text-sm font-bold text-navy">{category}</span>
              ))}
            </div>
            <Link href="/signup" className="btn-primary mt-7">Create Expert Account</Link>
          </div>
        </div>
      </section>
    </>
  );
}
