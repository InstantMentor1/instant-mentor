import Link from "next/link";
import { BadgeCheck, Clock3, Star } from "lucide-react";
import { formatDeliveryMode, type ExpertService } from "@/lib/marketplace";

export default function ServiceCard({ service }: { service: ExpertService }) {
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className="border-b border-slate-100 bg-gradient-to-br from-teal-50 to-blue-50 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-teal-800">
            {service.category}
          </span>
          <span className="flex items-center gap-1 text-sm font-bold text-amber-600">
            <Star size={15} fill="currentColor" />
            {service.rating ? service.rating.toFixed(1) : "New"}
          </span>
        </div>
        <h2 className="mt-5 text-xl font-black leading-7 text-ink">{service.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{service.description}</p>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-700 font-black text-white">
            {(service.expert?.full_name ?? "E").slice(0, 1)}
          </span>
          <div>
            <p className="flex items-center gap-1 font-bold text-ink">
              {service.expert?.full_name ?? "Verified Expert"} <BadgeCheck size={16} className="text-teal-600" />
            </p>
            <p className="text-xs text-slate-500">{service.expert?.college_or_company ?? "Industry professional"}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-4 text-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Price</p>
            <p className="mt-1 text-xl font-black text-teal-800">₹{Number(service.price).toLocaleString("en-IN")}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Format</p>
            <p className="mt-1 flex items-center gap-1 font-bold text-ink">
              <Clock3 size={15} /> {service.duration_minutes} min
            </p>
            <p className="mt-1 text-xs text-slate-500">{formatDeliveryMode(service.delivery_mode)}</p>
          </div>
        </div>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">
          <strong className="text-ink">What you get:</strong> {service.deliverables}
        </p>
        <Link href={`/services/${service.id}`} className="btn-primary mt-6 w-full">
          View & Book Service
        </Link>
      </div>
    </article>
  );
}
