import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, Clock3, Crown, Languages, Star, Users, Video } from "lucide-react";
import { BookingWidget } from "@/components/BookingWidget";
import BookingCartButton from "@/components/marketplace/BookingCartButton";
import { mentorCalendlyProfiles } from "@/lib/calendly-data";

type MenuService = {
  name: string;
  duration: string;
  deliverable: string;
  slug: string;
  price: number;
  section: "Quick Support" | "Deep Support" | "Packages" | "Rooms" | "Add-ons";
};

type MentorMenu = {
  name: string;
  title: string;
  credential: string;
  bio: string;
  tags: string[];
  rating: number;
  sessions: number;
  isOnline: boolean;
  nextSlot?: string;
  languages: string[];
  calendlyUrls: Record<string, string>;
  services: MenuService[];
  reviews: Array<{ initials: string; text: string; rating: number; date: string }>;
};

const mentorData: Record<string, MentorMenu> = {
  "priya-nair": {
    name: "Priya Nair",
    title: "HR Manager",
    credential: "HR Manager · TCS · 9 years campus hiring experience",
    bio: "Priya helps students prepare for HR rounds, walk-in drives, self-introduction, and confidence gaps with practical hiring-side feedback.",
    tags: ["HR Round", "Walk-in Drives", "Campus Hiring"],
    rating: 4.9,
    sessions: 286,
    isOnline: true,
    languages: ["English", "Hindi"],
    calendlyUrls: mentorCalendlyProfiles["priya-nair"].calendlyUrls,
    services: [
      { name: "Self Introduction Clinic", duration: "30 min", deliverable: "Personal intro script + correction notes", slug: "career-roadmap", price: 699, section: "Quick Support" },
      { name: "HR Round Practice", duration: "45 min", deliverable: "Question-by-question feedback + confidence checklist", slug: "software-mock-interview", price: 1299, section: "Deep Support" },
      { name: "Walk-in Drive Prep Pack", duration: "75 min", deliverable: "HR practice + resume talking points + do/don't checklist", slug: "software-mock-interview", price: 1999, section: "Packages" },
      { name: "HR Interview Practice Room", duration: "Weekly room", deliverable: "Small-group HR practice with live corrections", slug: "career-roadmap", price: 499, section: "Rooms" },
      { name: "Post-session answer notes", duration: "Add-on", deliverable: "Written do's and don'ts after your session", slug: "career-roadmap", price: 199, section: "Add-ons" },
    ],
    reviews: [
      { initials: "SN", text: "Priya showed me why my HR answers sounded memorised. The next interview felt much more natural.", rating: 5, date: "Jun 2026" },
      { initials: "JB", text: "Very practical for walk-in drives. She explained what HR actually scores.", rating: 5, date: "May 2026" },
    ],
  },
  "aarav-mehta": {
    name: "Aarav Mehta",
    title: "Career Mentor",
    credential: "Ex-campus recruiter · 6 years hiring at top firms",
    bio: "Aarav helps students build shortlisted-ready resumes, LinkedIn profiles, and placement preparation plans.",
    tags: ["Resume", "Interviews", "Placements"],
    rating: 4.8,
    sessions: 234,
    isOnline: true,
    languages: ["English", "Hindi"],
    calendlyUrls: mentorCalendlyProfiles["aarav-mehta"].calendlyUrls,
    services: [
      { name: "Resume Review for Freshers", duration: "30 min", deliverable: "Annotated PDF + 3 priority fixes", slug: "resume-review", price: 499, section: "Quick Support" },
      { name: "LinkedIn Optimisation", duration: "30 min", deliverable: "Headline + summary suggestions + recruiter positioning", slug: "resume-review", price: 499, section: "Quick Support" },
      { name: "Mock HR Interview", duration: "45 min", deliverable: "Recorded feedback + score sheet", slug: "software-mock-interview", price: 1299, section: "Deep Support" },
      { name: "Placement Readiness Pack", duration: "90 min", deliverable: "Resume + mock interview + improvement roadmap", slug: "software-mock-interview", price: 2499, section: "Packages" },
      { name: "Resume Clinic Room", duration: "Weekly room", deliverable: "Group review with shortlisted resume examples", slug: "resume-review", price: 499, section: "Rooms" },
      { name: "ATS checklist add-on", duration: "Add-on", deliverable: "ATS checklist and priority fix list", slug: "resume-review", price: 199, section: "Add-ons" },
    ],
    reviews: [
      { initials: "RK", text: "Got shortlisted after implementing Aarav's resume suggestions.", rating: 5, date: "Jun 2026" },
      { initials: "SP", text: "The mock interview felt more real than my campus drive.", rating: 5, date: "May 2026" },
    ],
  },
  "kavya-rao": {
    name: "Kavya Rao",
    title: "Academic Educator",
    credential: "M.Ed · 8 years study planning and career guidance",
    bio: "Kavya maps realistic study, career, MBA, and skill plans for students who feel stuck between options.",
    tags: ["Career", "Study Planning", "MBA Prep"],
    rating: 4.7,
    sessions: 187,
    isOnline: false,
    nextSlot: "Tomorrow 10:00 AM",
    languages: ["English", "Kannada"],
    calendlyUrls: mentorCalendlyProfiles["kavya-rao"].calendlyUrls,
    services: [
      { name: "Career Roadmap Session", duration: "60 min", deliverable: "90-day action plan PDF", slug: "career-roadmap", price: 1999, section: "Deep Support" },
      { name: "MBA Decision Session", duration: "45 min", deliverable: "College shortlist + timeline", slug: "career-roadmap", price: 1499, section: "Deep Support" },
      { name: "30-Day Accountability Plan", duration: "4 weeks", deliverable: "Weekly check-ins + learning plan + progress notes", slug: "career-roadmap", price: 3999, section: "Packages" },
      { name: "Career Clarity Room", duration: "Weekend room", deliverable: "Small-group clarity discussion and action plan", slug: "career-roadmap", price: 499, section: "Rooms" },
      { name: "Roadmap PDF add-on", duration: "Add-on", deliverable: "Clean roadmap PDF after the session", slug: "career-roadmap", price: 299, section: "Add-ons" },
    ],
    reviews: [
      { initials: "VT", text: "60 minutes with Kavya gave me a clear 3-month plan.", rating: 5, date: "Jun 2026" },
    ],
  },
  "sneha-patel": {
    name: "Sneha Patel",
    title: "GATE Mentor",
    credential: "GATE AIR 47 · DRDO Engineer",
    bio: "Sneha helps aspirants turn scattered exam prep into a sharp revision and doubt-solving plan.",
    tags: ["GATE", "OS", "DBMS", "Exam Strategy"],
    rating: 4.9,
    sessions: 221,
    isOnline: false,
    nextSlot: "Friday 7:00 PM",
    languages: ["English", "Hindi"],
    calendlyUrls: {},
    services: [
      { name: "OS & DBMS Doubt Clinic", duration: "45 min", deliverable: "Solved doubts + topic notes", slug: "project-review", price: 699, section: "Quick Support" },
      { name: "GATE Mock Test Analysis", duration: "60 min", deliverable: "Weak-area map + 14-day revision plan", slug: "career-roadmap", price: 1499, section: "Deep Support" },
      { name: "Last 30-Day Exam Sprint", duration: "4 weeks", deliverable: "Weekly strategy + doubt review + revision tracker", slug: "career-roadmap", price: 4999, section: "Packages" },
      { name: "Daily Doubt Room", duration: "Weekday room", deliverable: "Topic-wise doubt support with peer questions", slug: "project-review", price: 399, section: "Rooms" },
      { name: "Formula notes add-on", duration: "Add-on", deliverable: "Revision notes for the discussed topic", slug: "project-review", price: 199, section: "Add-ons" },
    ],
    reviews: [
      { initials: "MR", text: "Her mock analysis made my mistakes obvious.", rating: 5, date: "Jun 2026" },
    ],
  },
  "rohan-iyer": {
    name: "Rohan Iyer",
    title: "Technology Mentor",
    credential: "Software Engineer · 7 years in product companies",
    bio: "Rohan helps students improve projects, prepare for technical interviews, and explain their work clearly.",
    tags: ["AI", "Projects", "Software Interviews"],
    rating: 4.9,
    sessions: 312,
    isOnline: true,
    languages: ["English", "Hindi"],
    calendlyUrls: mentorCalendlyProfiles["rohan-iyer"].calendlyUrls,
    services: [
      { name: "Project Review Session", duration: "45 min", deliverable: "Improvement notes + presentation tips", slug: "project-review", price: 999, section: "Quick Support" },
      { name: "Mock Interview for Software Roles", duration: "45 min", deliverable: "Performance breakdown + weak areas", slug: "software-mock-interview", price: 1499, section: "Deep Support" },
      { name: "System Design Starter Pack", duration: "90 min", deliverable: "Concept map + practice plan + resources", slug: "software-mock-interview", price: 2499, section: "Packages" },
      { name: "Project Review Room", duration: "Sunday room", deliverable: "Group project critique and portfolio improvement tips", slug: "project-review", price: 699, section: "Rooms" },
      { name: "GitHub README add-on", duration: "Add-on", deliverable: "README outline and project presentation checklist", slug: "project-review", price: 299, section: "Add-ons" },
    ],
    reviews: [
      { initials: "DK", text: "Rohan asked the exact questions I got asked in my actual interview.", rating: 5, date: "Jun 2026" },
      { initials: "NS", text: "He explained system design in a way that finally made sense.", rating: 5, date: "May 2026" },
    ],
  },
  "meera-shah": {
    name: "Meera Shah",
    title: "Skill Coach",
    credential: "Communication & soft skills trainer · 5 years corporate L&D",
    bio: "Meera helps students present better in interviews, first jobs, client calls, and workplace situations.",
    tags: ["Communication", "Growth", "Workplace"],
    rating: 4.6,
    sessions: 143,
    isOnline: false,
    nextSlot: "Saturday 3:00 PM",
    languages: ["English", "Hindi"],
    calendlyUrls: mentorCalendlyProfiles["meera-shah"].calendlyUrls,
    services: [
      { name: "Communication for Interviews", duration: "45 min", deliverable: "Personalised phrase guide + practice feedback", slug: "career-roadmap", price: 999, section: "Quick Support" },
      { name: "Workplace Confidence Session", duration: "45 min", deliverable: "Scenario scripts + confidence checklist", slug: "career-roadmap", price: 1199, section: "Deep Support" },
      { name: "First Job Confidence Pack", duration: "3 sessions", deliverable: "Roleplay + feedback + workplace scripts", slug: "career-roadmap", price: 2999, section: "Packages" },
      { name: "Communication Practice Room", duration: "Weekly room", deliverable: "Small-group speaking practice and feedback", slug: "career-roadmap", price: 499, section: "Rooms" },
      { name: "Practice script add-on", duration: "Add-on", deliverable: "Personalised answer scripts for repeated practice", slug: "career-roadmap", price: 199, section: "Add-ons" },
    ],
    reviews: [
      { initials: "AK", text: "I had a structure I could actually use under pressure.", rating: 5, date: "May 2026" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(mentorData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const mentor = mentorData[slug];
  return {
    title: mentor ? `${mentor.name} Menu | My Expert Talk` : "Expert Menu | My Expert Talk",
    description: mentor?.bio ?? "View verified expert menu profiles on My Expert Talk.",
  };
}

export default async function MentorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mentor = mentorData[slug];
  if (!mentor) notFound();

  const initials = mentor.name.split(" ").map((part) => part[0]).join("").slice(0, 2);
  const isPremium = mentor.rating >= 4.9 && mentor.sessions >= 250;
  const startingPrice = Math.min(...mentor.services.map((service) => service.price));
  const menuSections = ["Quick Support", "Deep Support", "Packages", "Rooms", "Add-ons"] as const;

  return (
    <main className="bg-[#F8FAFC] py-12 text-[#0F172A]">
      <div className="container-shell">
        <Link href="/mentors" className="text-sm font-semibold text-blue-600 hover:text-blue-700">&larr; All expert menus</Link>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.38fr_0.62fr]">
          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 lg:sticky lg:top-28">
            <div className="flex items-center gap-4">
              <div className="relative grid h-[72px] w-[72px] place-items-center rounded-full bg-blue-600 text-[28px] font-bold text-white">
                {initials}
                <span className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white ${mentor.isOnline ? "animate-pulse bg-green-400" : "bg-slate-500"}`} />
              </div>
              <div>
                <p className={mentor.isOnline ? "text-sm font-semibold text-green-600" : "text-sm font-semibold text-slate-500"}>
                  {mentor.isOnline ? "Online now" : `Next slot: ${mentor.nextSlot ?? "Soon"}`}
                </p>
                <p className="mt-1 text-sm font-black text-slate-900">Starting from ₹{startingPrice.toLocaleString("en-IN")}</p>
              </div>
            </div>
            <h1 className="mt-4 text-2xl font-black">{mentor.name}</h1>
            <p className="mt-1 text-base font-bold text-blue-600">{mentor.title}</p>
            <p className="mt-1 text-sm italic text-slate-500">{mentor.credential}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600"><BadgeCheck size={14} /> Blue Star Verified</span>
              {isPremium && <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700"><Crown size={14} /> Golden Star Premium</span>}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-semibold text-slate-700">
              <span className="rounded-2xl border border-slate-200 bg-slate-50 p-3"><Star size={15} className="mb-1 text-amber-500" /> {mentor.rating} rating</span>
              <span className="rounded-2xl border border-slate-200 bg-slate-50 p-3">{mentor.sessions} sessions</span>
              <span className="rounded-2xl border border-slate-200 bg-slate-50 p-3"><Languages size={15} className="mb-1 text-blue-600" /> {mentor.languages.join(", ")}</span>
              <span className="rounded-2xl border border-slate-200 bg-slate-50 p-3">Low cancellation</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {mentor.tags.map((tag) => <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">{tag}</span>)}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{mentor.bio}</p>
            <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-xs font-semibold leading-5 text-slate-500">
              For complex requirements, you can request a custom quote after checking the expert menu.
            </p>
          </aside>

          <section>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">Expert menu</p>
              <h2 className="mt-2 text-3xl font-black">{mentor.name}&apos;s learning menu</h2>
              <p className="mt-2 text-sm text-slate-600">Need → Expert Menu → Service/Add-ons → Slot → Promo Code → Pay → Google Meet.</p>
            </div>
            <div className="mt-5 space-y-6">
              {menuSections.map((section) => {
                const sectionServices = mentor.services.filter((service) => service.section === section);
                if (!sectionServices.length) return null;
                return (
                  <div key={section}>
                    <h3 className="mb-3 text-xl font-black">{section}</h3>
                    <div className="space-y-3">
                      {sectionServices.map((service) => (
                        <details key={service.name} className="group rounded-2xl border border-slate-200 bg-white p-4">
                          <summary className="list-none cursor-pointer">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-base font-black">{service.name}</p>
                                <p className="mt-1 text-sm text-slate-500">{service.deliverable}</p>
                                <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1"><Clock3 size={13} /> {service.duration}</span>
                                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1"><Video size={13} /> Google Meet</span>
                                  <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-600">Promo eligible</span>
                                  <span className="rounded-full bg-slate-50 px-3 py-1">Recording optional</span>
                                </div>
                              </div>
                              <div className="text-right">
                                  <p className="mb-2 text-lg font-black">₹{service.price.toLocaleString("en-IN")}</p>
                                  <div className="group-open:hidden">
                                    <BookingCartButton price={service.price} href={`/services/${service.slug}/book`} />
                                  </div>
                                <span className="mt-2 hidden text-xs font-bold text-slate-500 group-open:block">Choose slot</span>
                              </div>
                            </div>
                          </summary>
                          <div className="pt-4">
                            <BookingWidget
                              mentorName={mentor.name}
                              serviceName={service.name}
                              duration={service.duration}
                              deliverable={service.deliverable}
                              calendlyUrl={mentor.calendlyUrls?.[service.slug]}
                              mode="popup"
                            />
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                );
              })}

              <div>
                <h3 className="mb-3 text-xl font-black">Rooms</h3>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="font-black">{mentor.tags[0]} Practice Room</p>
                  <p className="mt-1 text-sm text-slate-600">Small-group Google Meet room with resources, chat, and follow-up notes.</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1"><Users size={13} /> 8 seats</span>
                    <span className="rounded-full bg-slate-50 px-3 py-1">Weekly</span>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-600">₹499</span>
                  </div>
                  <Link href="/rooms" className="mt-4 inline-flex rounded-xl border border-blue-600 px-4 py-2 text-sm font-bold text-blue-600">Join Room</Link>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xl font-black">Add-ons</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {["Session recording", "Detailed action-plan PDF"].map((addon, index) => (
                    <div key={addon} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="font-black">{addon}</p>
                      <p className="mt-1 text-sm text-slate-600">Add after choosing a service.</p>
                      <p className="mt-3 font-black">₹{index === 0 ? "199" : "299"}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xl font-black">Reviews</h3>
                <div className="grid gap-3">
                  {mentor.reviews.map((review) => (
                    <article key={`${review.initials}-${review.date}`} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-sm text-amber-500">{"★".repeat(review.rating)}</p>
                      <p className="mt-2 text-sm italic text-slate-700">"{review.text}"</p>
                      <p className="mt-2 text-xs text-slate-500">{review.initials} · {review.date}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
