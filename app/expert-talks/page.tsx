import Link from "next/link";
import PageHero from "@/components/PageHero";
import { CalendarDays, Mic2, Search } from "lucide-react";

const talks = [
  ["Placement prep - what interviewers actually want", "placement-prep-what-interviewers-want", "Aarav Mehta", "Career", 2, "7:00 PM"],
  ["GATE last-minute strategy clinic", "gate-last-minute-strategy-clinic", "Sneha Patel", "Exams", 4, "11:00 AM"],
  ["Build skills that get you hired in 2025", "build-skills-that-get-you-hired-in-2025", "Arjun Mehta", "Skills", 7, "5:00 PM"],
  ["From idea to first paying customer", "from-idea-to-first-paying-customer", "Aditya Kumar", "Startup", 10, "6:00 PM"],
  ["AI tools every student should know", "ai-tools-every-student-should-know", "Rohan Iyer", "Technology", 12, "8:00 PM"],
  ["CAT verbal - reading comprehension shortcuts", "cat-verbal-reading-comprehension-shortcuts", "Meera Krishnan", "Academics", 14, "6:30 PM"],
] as const;

function futureDate(offsetDays: number) {
  return new Date(Date.now() + offsetDays * 86400000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

export default function ExpertTalksPage() {
  return (
    <>
      <PageHero eyebrow="Expert talks catalogue" title="Register for live expert talks." description="Search upcoming talks by topic, expert, category, and time. Register for the learning session that fits your current need." ctaLabel="Join as Expert" ctaHref="/for-mentors" />
      <section className="section-pad bg-ivory">
        <div className="container-shell">
          <div className="card mb-7 flex flex-col gap-3 p-4 md:flex-row">
            <label className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-coral" size={18} /><input className="form-input bg-ivory pl-11" placeholder="Search career, exam, AI, business..." /></label>
            <select className="form-input md:max-w-xs"><option>All categories</option><option>Career</option><option>Exams</option><option>Skills</option></select>
            <select className="form-input md:max-w-xs"><option>Any date</option><option>This week</option><option>This month</option></select>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {talks.map(([title, slug, speaker, category, offset, time]) => (
              <article key={title} className="card p-6 transition hover:-translate-y-1 hover:shadow-soft">
                <div className="flex items-start justify-between gap-4"><Mic2 className="text-coral" /><span className="rounded-full bg-peach px-3 py-1 text-xs font-black text-coral">{category}</span></div>
                <h2 className="mt-5 text-xl font-black text-navy">{title}</h2>
                <p className="mt-2 text-sm text-slate-600">{speaker}</p>
                <p className="mt-4 flex items-center gap-2 text-sm font-bold text-navy"><CalendarDays size={16} className="text-academic" /> {futureDate(offset)} - {time} - Online</p>
                <Link href={`/expert-talks/${slug}`} className="btn-primary mt-5 !px-4 !py-2">Register</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
