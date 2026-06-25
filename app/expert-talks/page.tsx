import PageHero from "@/components/PageHero";
import { CalendarDays, Mic2, Search } from "lucide-react";

const talks = [
  ["Career Guidance Talk", "Career mentor", "Career", "Fri, 7:00 PM"],
  ["Exam Preparation Talk", "Academic expert", "Exams", "Sat, 11:00 AM"],
  ["Skill Development Talk", "Industry mentor", "Skills", "Sun, 5:00 PM"],
  ["Business & Startup Talk", "Founder mentor", "Startup", "Wed, 6:00 PM"],
  ["Technology & AI Talk", "AI practitioner", "Technology", "Thu, 8:00 PM"],
  ["Academic Support Talk", "Subject educator", "Academics", "Mon, 6:30 PM"],
] as const;

export default function ExpertTalksPage() {
  return (
    <>
      <PageHero eyebrow="Expert talks catalogue" title="Register for live expert talks." description="Search upcoming talks by topic, mentor, category, and time. Register for the learning session that fits your current need." ctaLabel="Join as Mentor" ctaHref="/for-mentors" />
      <section className="section-pad bg-ivory">
        <div className="container-shell">
          <div className="card mb-7 flex flex-col gap-3 p-4 md:flex-row">
            <label className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-coral" size={18} /><input className="form-input bg-ivory pl-11" placeholder="Search career, exam, AI, business..." /></label>
            <select className="form-input md:max-w-xs"><option>All categories</option><option>Career</option><option>Exams</option><option>Skills</option></select>
            <select className="form-input md:max-w-xs"><option>Any date</option><option>This week</option><option>This month</option></select>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {talks.map(([title, speaker, category, time], index) => (
              <article key={title} className="card p-6 transition hover:-translate-y-1 hover:shadow-soft">
                <div className="flex items-start justify-between gap-4"><Mic2 className="text-coral" /><span className="rounded-full bg-peach px-3 py-1 text-xs font-black text-coral">{category}</span></div>
                <h2 className="mt-5 text-xl font-black text-navy">{title}</h2>
                <p className="mt-2 text-sm text-slate-600">{speaker}</p>
                <p className="mt-4 flex items-center gap-2 text-sm font-bold text-navy"><CalendarDays size={16} className="text-academic" /> {time} - Online</p>
                <button className="btn-primary mt-5 !px-4 !py-2">Register</button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
