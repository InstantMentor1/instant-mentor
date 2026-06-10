import type { Metadata } from "next";
import Link from "next/link";
import ServiceCard from "@/components/marketplace/ServiceCard";
import PageHero from "@/components/PageHero";
import { marketplaceCategories } from "@/lib/marketplace";
import { getPublicServices } from "@/lib/marketplace-data";

export const metadata: Metadata = {
  title: "Explore Expert Services | Instant Mentor",
  description: "Compare verified expert services by category, price, duration, format, and expected outcomes.",
};

export default async function ServicesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const selectedCategory = marketplaceCategories.includes(category as (typeof marketplaceCategories)[number]) ? category : undefined;
  const services = await getPublicServices(selectedCategory);

  return (
    <>
      <PageHero
        eyebrow="Expert service marketplace"
        title="Choose the exact help you need."
        description="Compare transparent service menus from verified experts across career, education, technology, business, and industry domains."
      />
      <section className="bg-slate-50 py-10 sm:py-14">
        <div className="container-shell">
          <div className="flex gap-2 overflow-x-auto pb-3" aria-label="Service category filters">
            <Link href="/services" className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${!selectedCategory ? "bg-teal-700 text-white" : "border border-slate-300 bg-white text-slate-600"}`}>All services</Link>
            {marketplaceCategories.map((item) => (
              <Link key={item} href={`/services?category=${encodeURIComponent(item)}`} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${selectedCategory === item ? "bg-teal-700 text-white" : "border border-slate-300 bg-white text-slate-600"}`}>{item}</Link>
            ))}
          </div>
          <div className="mb-7 mt-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-teal-700">{selectedCategory ?? "All categories"}</p>
              <h1 className="mt-1 text-3xl font-black">{services.length} services to explore</h1>
            </div>
            <Link href="/for-experts" className="hidden text-sm font-bold text-teal-700 sm:inline">List your expertise →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => <ServiceCard key={service.id} service={service} />)}
          </div>
          {services.length === 0 && <div className="card p-10 text-center text-slate-600">No active services are listed in this category yet.</div>}
        </div>
      </section>
    </>
  );
}
