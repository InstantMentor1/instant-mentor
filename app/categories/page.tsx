import Link from "next/link";
import PageHero from "@/components/PageHero";
import { marketplaceCategories } from "@/lib/marketplace";

export default function CategoriesPage() {
  return (
    <>
      <PageHero eyebrow="Marketplace categories" title="Start with the problem you want to solve." description="Browse services across career, education, technology, business, and institutional needs." />
      <section className="section-pad bg-slate-50">
        <div className="container-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {marketplaceCategories.map((category) => <Link key={category} href={`/services?category=${encodeURIComponent(category)}`} className="card p-6 transition hover:-translate-y-1 hover:border-teal-300"><p className="text-xs font-bold uppercase tracking-wide text-teal-700">Expert services</p><h2 className="mt-3 text-xl font-black">{category}</h2><p className="mt-3 text-sm text-slate-600">Compare available experts, prices, formats, and deliverables.</p><span className="mt-5 inline-block font-bold text-teal-700">Explore category →</span></Link>)}
        </div>
      </section>
    </>
  );
}
