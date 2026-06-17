import PageHero from "@/components/PageHero";
import { CalendarDays, Mic2 } from "lucide-react";

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
      <PageHero
        eyebrow="Expert talks"
        title="Talk with experts across subjects, careers, and skills."
        description="Explore live and upcoming expert-led learning sessions for students and lifelong learners."
        ctaLabel="Join as Mentor"
        ctaHref="/for-mentors"
      />
      <section className="section-pad bg-sky-50">
        <div className="container-shell grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {talks.map(([title, speaker, category, time]) => (
            <article key={title} className="card border-blue-100 p-6">
              <Mic2 className="text-orange-500" />
              <span className="mt-4 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">{category}</span>
              <h2 className="mt-4 text-xl font-black">{title}</h2>
              <p className="mt-2 text-sm text-slate-600">{speaker}</p>
              <p className="mt-4 flex items-center gap-2 text-sm font-bold"><CalendarDays size={16} className="text-teal-700" /> {time} · Live / Online</p>
              <button className="btn-secondary mt-5 !px-4 !py-2">View Details</button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
