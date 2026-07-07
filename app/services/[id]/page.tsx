import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, Check, Clock3, Star } from "lucide-react";
import { BookingWidget } from "@/components/BookingWidget";
import { formatDeliveryMode } from "@/lib/marketplace";
import { mentorCalendlyProfiles, serviceMentorMap } from "@/lib/calendly-data";
import { getPublicService } from "@/lib/marketplace-data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const service = await getPublicService(id);
  const title = service ? `${service.title} | My Expert Talk` : "Find Expert Help | My Expert Talk";
  const description = service
    ? `${service.title} with expert-set pricing on My Expert Talk.`
    : "Browse expert-created services for interview prep, exam guidance, resume review, career clarity, skill learning, rooms, micro-courses, and mentorship plans.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "My Expert Talk",
      images: [{ url: "/my-expert-talk-logo.png", alt: "My Expert Talk" }],
    },
  };
}

export default async function ServiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getPublicService(id);
  if (!service) notFound();
  const mentorsForService = serviceMentorMap[id] ?? [];
  return (
    <section className="bg-ivory py-10 sm:py-14">
      <div className="container-shell grid gap-7 lg:grid-cols-[1fr_360px]">
        <article className="card p-6 sm:p-9">
          <Link href="/services" className="mb-6 inline-flex text-sm font-black text-academic">&larr; All services</Link>
          <span className="rounded-full bg-skysoft px-3 py-1 text-xs font-bold text-navy">{service.category}</span>
          <h1 className="mt-5 text-4xl font-black tracking-tight">{service.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{service.description}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Info title="Who this is for" text={service.target_audience} />
            <Info title="What you will get" text={service.deliverables} />
            <Info title="Requirements before booking" text={service.requirements} />
            <Info title="Availability" text={service.availability_notes ?? "Availability is confirmed after your request."} />
          </div>
          <div className="mt-8 rounded-2xl bg-ivory p-5">
            <h2 className="font-black">Verified reviews</h2>
            <p className="mt-2 text-sm text-slate-600">{service.review_count ? `${service.review_count} verified booking reviews.` : "This expert service is new. Verified reviews will appear after completed bookings."}</p>
          </div>
          <div id="book-session" className="mt-8 rounded-2xl border border-navy/10 bg-white p-5 shadow-soft">
            <h2 className="text-2xl font-black text-navy">Book a session</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Pick an expert and choose your slot. Payment link sent after you confirm.</p>
            <div className="mt-5 space-y-3">
              {mentorsForService.map((item) => {
                const mentor = mentorCalendlyProfiles[item.mentorSlug];
                return (
                  <details key={`${item.mentorSlug}-${item.serviceKey}`} className="group rounded-xl border border-navy/10 bg-ivory p-4">
                    <summary className="list-none cursor-pointer">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-black text-navy">Book with {mentor.name}</p>
                          <p className="mt-0.5 text-xs text-slate-500">{mentor.title} · {item.duration}</p>
                        </div>
                        <span className="text-sm font-bold text-coral group-open:hidden">Book -&gt;</span>
                        <span className="hidden text-sm font-bold text-slate-500 group-open:block">Close ↑</span>
                      </div>
                    </summary>
                    <div className="pt-4">
                      <BookingWidget
                        mentorName={mentor.name}
                        serviceName={item.serviceName}
                        duration={item.duration}
                        deliverable={item.deliverable}
                        calendlyUrl={mentor.calendlyUrls[item.serviceKey]}
                        mode="popup"
                      />
                    </div>
                  </details>
                );
              })}
              {mentorsForService.length === 0 && (
                <BookingWidget
                  mentorName={service.expert?.full_name ?? "Verified Expert"}
                  serviceName={service.title}
                  duration={`${service.duration_minutes} min`}
                  deliverable={service.deliverables}
                  calendlyUrl={undefined}
                />
              )}
            </div>
          </div>
        </article>
        <aside className="h-fit lg:sticky lg:top-28">
          <div className="card p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-slate-400">Expert-set price</p>
            <p className="mt-2 text-3xl font-black text-navy">Price set by expert</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Experts decide their own pricing, format, deliverables, and availability.</p>
            <div className="mt-5 space-y-3 border-y border-slate-100 py-5 text-sm font-semibold">
              <p className="flex items-center gap-2"><Clock3 size={17} className="text-coral" /> {service.duration_minutes} minutes</p>
              <p className="flex items-center gap-2"><Check size={17} className="text-coral" /> {formatDeliveryMode(service.delivery_mode)}</p>
              <p className="flex items-center gap-2"><Star size={17} className="text-amber-500" /> {service.rating ? `${service.rating.toFixed(1)} rating` : "New expert service"}</p>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-coral font-black text-white">{(service.expert?.full_name ?? "M")[0]}</span>
              <div>
                <p className="flex items-center gap-1 font-black">{service.expert?.full_name ?? "Verified Expert"} <BadgeCheck size={16} className="text-academic" /></p>
                <p className="text-xs text-slate-500">{service.expert?.college_or_company ?? "Expert on My Expert Talk"}</p>
              </div>
            </div>
            <Link href="#book-session" className="btn-primary mt-6 w-full">
              Choose a slot -&gt;
            </Link>
            <p className="mt-3 text-center text-xs leading-5 text-slate-500">Your booking intent is shared privately with the expert after you request the service.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl border border-slate-200 p-5"><h2 className="font-black">{title}</h2><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">{text}</p></div>;
}
