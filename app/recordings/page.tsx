import PageHero from "@/components/PageHero";
import { FileText, MonitorPlay, Presentation } from "lucide-react";

const recordings = [
  ["Recorded talks", "Replay past expert-led learning sessions.", MonitorPlay],
  ["Past webinars", "Access structured sessions from mentors and educators.", Presentation],
  ["Learning resources", "Download notes, materials, and session references.", FileText],
] as const;

export default function RecordingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Recordings"
        title="Learn anytime with recorded expert sessions."
        description="Recorded talks, past webinars, session materials, and learning resources will appear here."
        ctaLabel="Explore Expert Talks"
        ctaHref="/expert-talks"
      />
      <section className="section-pad bg-white">
        <div className="container-shell grid gap-5 md:grid-cols-3">
          {recordings.map(([title, text, Icon]) => (
            <article key={title} className="card p-6">
              <Icon className="text-coral" />
              <h2 className="mt-4 text-xl font-black">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
