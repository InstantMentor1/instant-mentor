"use client";

import Link from "next/link";
import { SlidersHorizontal, Search, Store } from "lucide-react";
import { useMemo, useState } from "react";
import ServiceCard from "@/components/marketplace/ServiceCard";
import { marketplaceCategories, type ExpertService } from "@/lib/marketplace";

const quickFilters = ["Resume", "Mock", "Career", "Exam", "Project", "AI", "Interview"];

export default function ServiceDiscovery({ services, initialCategory, initialSearch }: { services: ExpertService[]; initialCategory?: string; initialSearch?: string }) {
  const [category, setCategory] = useState(marketplaceCategories.includes(initialCategory as (typeof marketplaceCategories)[number]) ? initialCategory ?? "" : "");
  const [search, setSearch] = useState(initialSearch ?? "");
  const [sort, setSort] = useState("availability");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = services.filter((service) => {
      const categoryMatch = !category || service.category === category;
      const searchMatch = !query || [service.title, service.description, service.category, service.deliverables, service.expert?.full_name, service.expert?.college_or_company].filter(Boolean).some((value) => String(value).toLowerCase().includes(query));
      return categoryMatch && searchMatch;
    });
    return [...result].sort((a, b) => {
      if (sort === "duration") return Number(a.duration_minutes) - Number(b.duration_minutes);
      if (sort === "rating") return Number(b.rating ?? 0) - Number(a.rating ?? 0);
      if (sort === "price") return Number(a.price) - Number(b.price);
      return String(b.availability_notes ?? "").localeCompare(String(a.availability_notes ?? ""));
    });
  }, [category, search, services, sort]);

  return (
    <section className="bg-ivory py-8 sm:py-10">
      <div className="container-shell">
        <div className="rounded-[2rem] border border-navy/10 bg-white p-4 shadow-soft lg:p-5">
          <div className="grid gap-3 lg:grid-cols-[1fr_220px_220px]">
            <label className="relative block">
              <span className="sr-only">Search expert-created services</span>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-coral" size={19} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} className="form-input bg-ivory pl-11" placeholder="Search resume review, exam help, project support..." />
            </label>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="form-input bg-ivory" aria-label="Filter by category">
              <option value="">All categories</option>
              {marketplaceCategories.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="form-input bg-ivory" aria-label="Sort services">
              <option value="availability">Sort: Availability</option>
              <option value="duration">Sort: Duration</option>
              <option value="rating">Sort: Mentor rating</option>
              <option value="price">Sort: Price range</option>
            </select>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {quickFilters.map((filter) => <button key={filter} type="button" onClick={() => setSearch(filter)} className="rounded-full border border-navy/10 bg-ivory px-3 py-2 text-xs font-black text-navy transition hover:border-coral/30 hover:text-coral">{filter}</button>)}
            <button type="button" onClick={() => { setCategory(""); setSearch(""); }} className="rounded-full border border-coral/20 bg-peach px-3 py-2 text-xs font-black text-coral">Clear</button>
          </div>
        </div>

        <div className="mb-6 mt-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-coral"><SlidersHorizontal size={16} /> {category || "Expert-led learning support"}</p>
            <h2 className="mt-1 text-3xl font-black tracking-[-0.035em] text-navy">Expert-created services - browse and book</h2>
            <p className="mt-1 text-sm text-slate-600">Experts set the price, duration, promo offers, delivery method, and deliverables. You choose based on need and availability.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/mentors" className="text-sm font-black text-academic">Find experts -&gt;</Link>
            <Link href="/for-mentors" className="text-sm font-black text-coral">Join as expert -&gt;</Link>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((service) => <ServiceCard key={service.id} service={service} />)}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-navy/20 bg-white p-10 text-center shadow-sm">
            <Store className="mx-auto text-coral" size={40} />
            <h2 className="mt-4 text-2xl font-black text-navy">{services.length === 0 ? "Expert services are being prepared." : "No services match your search."}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">{services.length === 0 ? "Example services appear here until verified experts publish their live listings." : "Try another keyword, category, or sort option."}</p>
            {services.length === 0 ? <Link href="/for-mentors" className="btn-primary mt-6">Join as Expert</Link> : <button type="button" onClick={() => { setCategory(""); setSearch(""); }} className="btn-secondary mt-6">Clear filters</button>}
          </div>
        )}
      </div>
    </section>
  );
}
