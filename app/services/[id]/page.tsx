import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, Check, Clock3, Star } from "lucide-react";
import { getAuthContext } from "@/lib/auth";
import { formatDeliveryMode } from "@/lib/marketplace";
import { getPublicService } from "@/lib/marketplace-data";

export default async function ServiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [service, auth] = await Promise.all([getPublicService(id), getAuthContext()]);
  if (!service) notFound();
  const bookingHref = !auth.user
    ? `/login?next=/services/${id}/book`
    : auth.profile?.role === "Student"
      ? `/services/${id}/book`
      : auth.profile?.role === "Admin"
        ? "/admin/dashboard"
        : "/mentor/dashboard";

  return (
    <section className="bg-slate-50 py-10 sm:py-14">
      <div className="container-shell grid gap-7 lg:grid-cols-[1fr_360px]">
        <article className="card p-6 sm:p-9">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800">{service.category}</span>
          <h1 className="mt-5 text-4xl font-black tracking-tight">{service.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{service.description}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Info title="Who this is for" text={service.target_audience} />
            <Info title="What you will get" text={service.deliverables} />
            <Info title="Requirements before booking" text={service.requirements} />
            <Info title="Availability" text={service.availability_notes ?? "Availability is confirmed after your request."} />
          </div>
          <div className="mt-8 rounded-2xl bg-slate-50 p-5">
            <h2 className="font-black">Reviews</h2>
            <p className="mt-2 text-sm text-slate-600">{service.review_count ? `${service.review_count} verified booking reviews.` : "This service is new. Verified reviews will appear after completed bookings."}</p>
          </div>
        </article>
        <aside className="h-fit lg:sticky lg:top-28">
          <div className="card p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-slate-400">Expert-set price</p>
            <p className="mt-2 text-4xl font-black text-teal-800">₹{Number(service.price).toLocaleString("en-IN")}</p>
            <div className="mt-5 space-y-3 border-y border-slate-100 py-5 text-sm font-semibold">
              <p className="flex items-center gap-2"><Clock3 size={17} className="text-teal-700" /> {service.duration_minutes} minutes</p>
              <p className="flex items-center gap-2"><Check size={17} className="text-teal-700" /> {formatDeliveryMode(service.delivery_mode)}</p>
              <p className="flex items-center gap-2"><Star size={17} className="text-amber-500" /> {service.rating ? `${service.rating.toFixed(1)} rating` : "New service"}</p>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-700 font-black text-white">{(service.expert?.full_name ?? "E")[0]}</span>
              <div>
                <p className="flex items-center gap-1 font-black">{service.expert?.full_name ?? "Verified Expert"} <BadgeCheck size={16} className="text-teal-600" /></p>
                <p className="text-xs text-slate-500">{service.expert?.college_or_company ?? "Industry professional"}</p>
              </div>
            </div>
            <Link href={bookingHref} className="btn-primary mt-6 w-full">
              Book Service
            </Link>
            <p className="mt-3 text-center text-xs leading-5 text-slate-500">Your requirements are shared privately with the expert after booking.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl border border-slate-200 p-5"><h2 className="font-black">{title}</h2><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">{text}</p></div>;
}
