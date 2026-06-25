import PageHero from "@/components/PageHero";

const events = [
  ["Resume clinic for students", "21 Jun", "6:00 PM", "Career mentor"],
  ["AI tools for learning", "23 Jun", "7:30 PM", "AI educator"],
  ["Exam strategy room", "25 Jun", "5:00 PM", "Academic mentor"],
] as const;

export default function EventsPage() {
  return (
    <>
      <PageHero eyebrow="Learning calendar" title="Upcoming expert talks and learning events." description="Browse date-based learning events, register quickly, and keep your learning plan moving." ctaLabel="Explore Expert Talks" ctaHref="/expert-talks" />
      <section className="section-pad bg-ivory">
        <div className="container-shell grid gap-5 md:grid-cols-3">
          {events.map(([title, date, time, speaker]) => <article key={title} className="card flex gap-4 p-6 transition hover:-translate-y-1 hover:shadow-soft"><div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-coral text-white"><span className="text-xl font-black">{date.split(" ")[0]}</span><span className="text-xs font-bold">{date.split(" ")[1]}</span></div><div><h2 className="font-black text-navy">{title}</h2><p className="mt-1 text-sm text-slate-600">{time} - {speaker} - Online</p><button className="mt-3 text-sm font-black text-coral">Register / Learn More</button></div></article>)}
        </div>
      </section>
    </>
  );
}
