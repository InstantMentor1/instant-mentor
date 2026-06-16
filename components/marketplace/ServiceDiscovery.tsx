"use client";

import Link from "next/link";
import { Search, Store } from "lucide-react";
import { useMemo, useState } from "react";
import ServiceCard from "@/components/marketplace/ServiceCard";
import { marketplaceCategories, type ExpertService } from "@/lib/marketplace";

export default function ServiceDiscovery({
  services,
  initialCategory,
  initialSearch,
}: {
  services: ExpertService[];
  initialCategory?: string;
  initialSearch?: string;
}) {
  const [category, setCategory] = useState(
    marketplaceCategories.includes(initialCategory as (typeof marketplaceCategories)[number])
      ? initialCategory ?? ""
      : "",
  );
  const [search, setSearch] = useState(initialSearch ?? "");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return services.filter((service) => {
      const categoryMatch = !category || service.category === category;
      const searchMatch =
        !query ||
        [
          service.title,
          service.description,
          service.category,
          service.deliverables,
          service.expert?.full_name,
          service.expert?.college_or_company,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));
      return categoryMatch && searchMatch;
    });
  }, [category, search, services]);

  return (
    <section className="bg-slate-50 py-10 sm:py-14">
      <div className="container-shell">
        <div className="card grid gap-4 p-5 md:grid-cols-[1fr_320px]">
          <label className="relative block">
            <span className="sr-only">Search SME expertise</span>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="form-input pl-11"
              placeholder="Search by SME, domain, outcome, or skill"
            />
          </label>
          <label>
            <span className="sr-only">Filter by domain</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="form-input">
              <option value="">All SME domains</option>
              {marketplaceCategories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>

        <div className="mb-7 mt-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-teal-700">
              {category || "All SME expertise"}
            </p>
            <h2 className="mt-1 text-3xl font-black">{filtered.length} expertise items available</h2>
          </div>
          <Link href="/for-smes" className="text-sm font-bold text-teal-700">Create your SME expertise menu -&gt;</Link>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((service) => <ServiceCard key={service.id} service={service} />)}
          </div>
        ) : (
          <div className="card p-10 text-center">
            <Store className="mx-auto text-teal-700" size={36} />
            <h2 className="mt-4 text-2xl font-black">
              {services.length === 0
                ? "No SME expertise items are live yet."
                : "No expertise items match your search."}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              {services.length === 0
                ? "Verified SMEs can create their expertise menu from the SME dashboard."
                : "Try another search term or browse all domains."}
            </p>
            {services.length === 0 ? (
              <Link href="/for-smes" className="btn-primary mt-6">Join as an SME</Link>
            ) : (
              <button type="button" onClick={() => { setCategory(""); setSearch(""); }} className="btn-secondary mt-6">Clear filters</button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
