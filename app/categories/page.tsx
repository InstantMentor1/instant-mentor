import Link from "next/link";
import PageHero from "@/components/PageHero";
import { marketplaceCategories } from "@/lib/marketplace";

export default function CategoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Learning categories"
        title="Find verified mentors by learning area."
        description="Browse expert-created services for career support, academics, interviews, skills, business, finance, design, and technology."
      />
      <section className="section-pad bg-slate-50">
        <div className="container-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {marketplaceCategories.map((category) => (
            <Link key={category} href={`/services?category=${encodeURIComponent(category)}`} className="card p-6 transition hover:-translate-y-1 hover:border-teal-300">
              <p className="text-xs font-bold uppercase tracking-wide text-teal-700">Mentor-created services</p>
              <h2 className="mt-3 text-xl font-black">{category}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">Compare experts, outcomes, expert-set prices, availability, and delivery formats.</p>
              <span className="mt-5 inline-block font-bold text-teal-700">Explore domain -&gt;</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
