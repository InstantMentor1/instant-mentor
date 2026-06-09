import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Presentation, Users } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

export type PublicWebinar = {
  id: string;
  title: string;
  track: string;
  scheduledAt: string;
  price: number;
  durationMinutes: number;
  maxParticipants: number;
  mentorName: string;
};

export default function UpcomingWebinars({
  webinars,
  ctaHref,
}: {
  webinars: PublicWebinar[];
  ctaHref: string;
}) {
  const eventSchema = webinars.map((webinar) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: webinar.title,
    startDate: webinar.scheduledAt,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "VirtualLocation", url: "https://instant-mentor.vercel.app/webinars" },
    organizer: { "@type": "Organization", name: "Instant Mentor", url: "https://instant-mentor.vercel.app" },
    performer: { "@type": "Person", name: webinar.mentorName },
    offers: {
      "@type": "Offer",
      price: webinar.price,
      priceCurrency: "INR",
      url: `https://instant-mentor.vercel.app/webinars/${webinar.id}`,
      availability: "https://schema.org/InStock",
    },
  }));

  return (
    <section className="section-pad" aria-labelledby="upcoming-webinars-title">
      {eventSchema.map((schema, index) => (
        <script
          key={webinars[index].id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Live learning"
            title="Upcoming mentor-led webinars"
            description="Join focused 60-minute sessions led by mentors. Webinar access is paid, with plan-based pricing available to eligible students."
          />
          <Link href={ctaHref} className="btn-secondary shrink-0">
            View webinars <ArrowRight size={17} />
          </Link>
        </div>

        {webinars.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {webinars.map((webinar) => (
              <article key={webinar.id} className="card flex h-full flex-col overflow-hidden">
                <div className="bg-teal-900 p-6 text-white">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-100">
                    <Presentation size={16} aria-hidden="true" /> {webinar.track}
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold">{webinar.title}</h3>
                  <p className="mt-2 text-sm text-teal-100">With {webinar.mentorName}</p>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <dl className="space-y-3 text-sm text-slate-600">
                    <div className="flex items-center gap-3">
                      <CalendarDays size={17} className="text-teal-700" aria-hidden="true" />
                      <dt className="sr-only">Date and time</dt>
                      <dd><time dateTime={webinar.scheduledAt}>{formatWebinarDate(webinar.scheduledAt)}</time></dd>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock3 size={17} className="text-teal-700" aria-hidden="true" />
                      <dt className="sr-only">Duration</dt>
                      <dd>{webinar.durationMinutes} minutes</dd>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users size={17} className="text-teal-700" aria-hidden="true" />
                      <dt className="sr-only">Capacity</dt>
                      <dd>Up to {webinar.maxParticipants} participants</dd>
                    </div>
                  </dl>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                    <div>
                      <p className="text-xs font-semibold text-slate-500">Mentor-set price</p>
                      <p className="text-2xl font-black text-ink">₹{webinar.price}</p>
                    </div>
                    <Link href={`/webinars/${webinar.id}`} className="btn-primary !px-5 !py-3">View details</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <Presentation className="mx-auto text-teal-700" size={30} aria-hidden="true" />
            <h3 className="mt-4 text-xl font-extrabold text-ink">No public webinars are scheduled right now</h3>
            <p className="mx-auto mt-2 max-w-xl text-slate-600">
              New mentor-led webinars will appear here when they are announced. Create an account to access the webinar hub.
            </p>
            <Link href={ctaHref} className="btn-primary mt-6">Open Webinar Hub</Link>
          </div>
        )}
      </div>
    </section>
  );
}

function formatWebinarDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}
