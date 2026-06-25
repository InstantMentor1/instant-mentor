import PageHero from "@/components/PageHero";
import { FileText, MonitorPlay, Presentation, Search } from "lucide-react";

const recordings = [
  ["Recorded Expert Talks", "Replay past expert-led learning sessions.", MonitorPlay],
  ["Past Learning Sessions", "Access structured sessions from mentors and educators.", Presentation],
  ["Skill Resources", "Download notes, materials, and session references.", FileText],
  ["Session Materials", "Browse useful handouts and follow-up resources.", FileText],
] as const;

export default function RecordingsPage() {
  return (
    <>
      <PageHero eyebrow="Learning library" title="Learn anytime with recordings." description="Search recorded expert talks, past learning sessions, skill resources, and session materials." ctaLabel="Explore Expert Talks" ctaHref="/expert-talks" />
      <section className="section-pad bg-white">
        <div className="container-shell">
          <div className="card mb-7 flex flex-col gap-3 p-4 md:flex-row"><label className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-coral" size={18} /><input className="form-input bg-ivory pl-11" placeholder="Search recordings by topic" /></label><select className="form-input md:max-w-xs"><option>All topics</option><option>Career</option><option>Skills</option><option>Exams</option></select></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recordings.map(([title, text, Icon]) => <article key={title} className="card p-6 transition hover:-translate-y-1 hover:shadow-soft"><Icon className="text-coral" /><h2 className="mt-4 text-xl font-black text-navy">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p><button className="mt-5 text-sm font-black text-coral">View Recording -&gt;</button></article>)}
          </div>
        </div>
      </section>
    </>
  );
}
