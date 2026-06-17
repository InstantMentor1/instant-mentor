import Link from "next/link";
import PageHero from "@/components/PageHero";
import { marketplaceCategories } from "@/lib/marketplace";

export default function ApplyMentorPage() {
  return (
    <>
      <PageHero
        eyebrow="Mentor application"
        title="Apply to become a verified My Expert Talk mentor."
        description="Create a mentor account, complete your profile, and publish services students can book."
        ctaLabel="Create Mentor Account"
        ctaHref="/signup"
      />
      <section className="section-pad bg-sky-50">
        <div className="container-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div className="card border-blue-100 p-7">
            <h2 className="text-2xl font-black">What My Expert Talk reviews</h2>
            <ul className="mt-5 space-y-3 text-sm font-semibold text-slate-700">
              {[
                "Professional, academic, or teaching experience",
                "LinkedIn, portfolio, publication, or credential proof",
                "Clarity of mentor services and deliverables",
                "Student-friendly communication and availability",
                "Commitment to showing up for accepted bookings",
              ].map((item) => <li key={item} className="rounded-xl bg-sky-50 p-3">{item}</li>)}
            </ul>
          </div>
          <div className="card border-blue-100 p-7">
            <h2 className="text-2xl font-black">Supported mentor areas</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {marketplaceCategories.map((category) => (
                <span key={category} className="rounded-full bg-teal-50 px-3 py-1 text-sm font-bold text-teal-800">{category}</span>
              ))}
            </div>
            <Link href="/signup" className="btn-primary mt-7">Create Mentor Account</Link>
          </div>
        </div>
      </section>
    </>
  );
}
