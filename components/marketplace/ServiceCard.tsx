import Link from "next/link";
import { BadgeCheck, Clock3, Star } from "lucide-react";
import { formatDeliveryMode, type ExpertService } from "@/lib/marketplace";

export default function ServiceCard({ service }: { service: ExpertService }) {
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className="border-b border-navy/10 bg-gradient-to-br from-skysoft to-peach p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-navy">
            {service.category}
          </span>
          <span className="flex items-center gap-1 text-sm font-bold text-amber-600">
            <Star size={15} fill="currentColor" />
            {service.rating ? service.rating.toFixed(1) : "New"}
          </span>
        </div>
        <h2 className="mt-5 text-xl font-black leading-7 text-navy">{service.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{service.description}</p>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral font-black text-white">
            {(service.expert?.full_name ?? "M").slice(0, 1)}
          </span>
          <div>
            <p className="flex items-center gap-1 font-bold text-navy">
              {service.expert?.full_name ?? "Verified Expert"} <BadgeCheck size={16} className="text-academic" />
            </p>
            <p className="text-xs text-slate-500">{service.expert?.college_or_company ?? "Educator / Subject expert"}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-ivory p-4 text-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Expert-set price</p>
            <p className="mt-1 text-lg font-black text-navy">Set by expert</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Format</p>
            <p className="mt-1 flex items-center gap-1 font-bold text-navy">
              <Clock3 size={15} /> {service.duration_minutes} min
            </p>
            <p className="mt-1 text-xs text-slate-500">{formatDeliveryMode(service.delivery_mode)}</p>
          </div>
        </div>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">
          <strong className="text-navy">What students get:</strong> {service.deliverables}
        </p>
        <p className="mt-3 text-xs font-semibold text-slate-500">
          Availability: {service.availability_notes ?? "Confirmed with the expert after booking request"}
        </p>
        <Link href={`/services/${service.id}`} className="btn-primary mt-6 w-full">
          Book Now -&gt;
        </Link>
      </div>
    </article>
  );
}
