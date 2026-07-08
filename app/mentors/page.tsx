import Link from "next/link";
import { BadgeCheck, Crown, Search, Star } from "lucide-react";

const experts = [
  ["Aarav Mehta", "aarav-mehta", "Career Mentor", "Resume, LinkedIn, placements", "4.8", "234", "₹299", "Blue"],
  ["Priya Nair", "priya-nair", "HR Manager · TCS", "HR rounds, walk-in drives", "4.9", "286", "₹699", "Gold"],
  ["Rohan Iyer", "rohan-iyer", "Technology Mentor", "Projects, AI, software interviews", "4.9", "312", "₹999", "Gold"],
  ["Kavya Rao", "kavya-rao", "Academic Educator", "Study planning, career clarity", "4.7", "187", "₹499", "Blue"],
  ["Meera Shah", "meera-shah", "Skill Coach", "Communication, confidence", "4.6", "143", "₹399", "Blue"],
] as const;

export default function MentorsPage() {
  return (
    <main className="bg-[#F8FAFC] py-10 text-[#0F172A]">
      <div className="container-shell">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">Expert Menus</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.045em]">Choose an expert menu and book support.</h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            Compare expert menus by badge, expertise, rating, sessions completed, starting price, availability, and language.
          </p>
          <label className="mt-6 flex max-w-2xl items-center gap-3 rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 py-4">
            <Search size={19} className="text-blue-600" />
            <span className="text-sm font-semibold text-slate-500">Search experts, skills, domains, languages...</span>
          </label>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {experts.map(([name, slug, role, expertise, rating, sessions, price, badge]) => (
            <article key={slug} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className={badge === "Gold" ? "h-24 bg-amber-100" : "h-24 bg-blue-100"} />
              <div className="p-5">
                <div className="-mt-14 grid h-20 w-20 place-items-center rounded-3xl border-4 border-white bg-slate-900 text-2xl font-black text-white">
                  {name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-black">{name}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-600">{role}</p>
                  </div>
                  {badge === "Gold" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700"><Crown size={14} /> Premium</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600"><BadgeCheck size={14} /> Verified</span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{expertise}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                  <span className="rounded-full bg-slate-50 px-3 py-1"><Star size={12} className="inline text-amber-500" /> {rating}</span>
                  <span className="rounded-full bg-slate-50 px-3 py-1">{sessions} sessions</span>
                  <span className="rounded-full bg-slate-50 px-3 py-1">English, Hindi</span>
                  <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">Slots this week</span>
                </div>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <p className="text-sm font-black">Starts {price}</p>
                  <Link href={`/mentors/${slug}`} className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white hover:bg-blue-700">View Menu</Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
