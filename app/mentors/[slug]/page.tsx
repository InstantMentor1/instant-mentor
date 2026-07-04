import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingWidget } from "@/components/BookingWidget";
import { mentorCalendlyProfiles } from "@/lib/calendly-data";

const courseData = {
  "hr-round-decoded": { title: "HR Round Decoded", lessons: 5, duration: "2.5 hrs", price: 799 },
  "ats-proof-resume": { title: "ATS-Proof Resume in One Day", lessons: 4, duration: "2 hrs", price: 499 },
  "gate-os-dbms": { title: "GATE CS — OS & DBMS Crash Course", lessons: 12, duration: "6 hrs", price: 1299 },
  "sql-for-data-jobs": { title: "SQL for Data Jobs — Zero to Job-Ready", lessons: 10, duration: "5 hrs", price: 999 },
  "amazon-sde-playbook": { title: "Amazon & Flipkart SDE Interview Playbook", lessons: 8, duration: "4 hrs", price: 1499 },
  "first-job-survival": { title: "First Job Survival Guide", lessons: 5, duration: "2.5 hrs", price: 699 },
} as const;

const situationLabels: Record<string, string> = {
  "interview-prep": "Interview Prep",
  "resume-help": "Resume Help",
  "career-clarity": "Career Clarity",
  "exam-doubt": "Exam Doubt",
  "first-job": "First Job",
  "skill-building": "Build Skills",
  "competitive-exams": "Competitive Exams",
};

const mentorData: Record<string, {
  name: string;
  title: string;
  credential: string;
  bio: string;
  tags: string[];
  rating: number;
  sessions: number;
  isOnline: boolean;
  nextSlot?: string;
  calendlyUrls: Record<string, string>;
  situations: string[];
  services: Array<{ name: string; duration: string; deliverable: string; slug: string }>;
  courses: Array<keyof typeof courseData>;
  reviews: Array<{ initials: string; text: string; rating: number; date: string }>;
}> = {
  "priya-nair": {
    name: "Priya Nair",
    title: "HR Manager",
    credential: "HR Manager · TCS · 9 years campus hiring experience",
    bio: "Priya has screened thousands of freshers during walk-in drives and campus hiring rounds. She helps students understand what HR notices quickly, how to structure answers, and how to avoid the mistakes that silently reduce interview scores.",
    tags: ["HR Round", "Walk-in Drives", "Campus Hiring"],
    rating: 4.9,
    sessions: 286,
    isOnline: true,
    calendlyUrls: mentorCalendlyProfiles["priya-nair"].calendlyUrls,
    situations: ["interview-prep", "career-clarity"],
    services: [
      { name: "HR Round Practice", duration: "45 min", deliverable: "Question-by-question feedback + confidence checklist", slug: "software-mock-interview" },
      { name: "Self Introduction Clinic", duration: "30 min", deliverable: "Personal intro script + correction notes", slug: "career-roadmap" },
    ],
    courses: ["hr-round-decoded"],
    reviews: [
      { initials: "SN", text: "Priya showed me why my HR answers sounded memorised. The next interview felt much more natural.", rating: 5, date: "Jun 2026" },
      { initials: "JB", text: "Very practical for walk-in drives. She explained what HR actually scores.", rating: 5, date: "May 2026" },
    ],
  },
  "aarav-mehta": {
    name: "Aarav Mehta",
    title: "Career Mentor",
    credential: "Ex-campus recruiter · 6 years hiring at top firms",
    bio: "Aarav has helped 200+ students land their first jobs at TCS, Infosys, Wipro, and mid-sized startups. His sessions focus on what actually gets you shortlisted — not generic advice, but the specific things recruiters flag in the first 30 seconds of a resume or interview.",
    tags: ["Resume", "Interviews", "Placements"],
    rating: 4.8,
    sessions: 234,
    isOnline: true,
    calendlyUrls: mentorCalendlyProfiles["aarav-mehta"].calendlyUrls,
    situations: ["interview-prep", "resume-help"],
    services: [
      { name: "Resume Review for Freshers", duration: "30 min", deliverable: "Annotated PDF + 3 priority fixes", slug: "resume-review" },
      { name: "Mock HR Interview", duration: "45 min", deliverable: "Recorded feedback + score sheet", slug: "software-mock-interview" },
      { name: "LinkedIn Optimisation", duration: "30 min", deliverable: "Rewritten headline + summary", slug: "resume-review" },
    ],
    courses: ["ats-proof-resume"],
    reviews: [
      { initials: "RK", text: "Got shortlisted at TCS 3 days after implementing Aarav's resume suggestions. Worth every rupee.", rating: 5, date: "Jun 2026" },
      { initials: "SP", text: "The mock interview felt more real than the actual campus drive. I knew what was coming.", rating: 5, date: "May 2026" },
      { initials: "AM", text: "Very specific feedback — not just be confident but exactly what to change.", rating: 4, date: "May 2026" },
    ],
  },
  "kavya-rao": {
    name: "Kavya Rao",
    title: "Academic Educator",
    credential: "M.Ed, 8 years study planning and career guidance",
    bio: "Kavya specialises in helping students who feel lost between their degree and their career. She maps out realistic paths based on what students actually have — not what they wish they had — and builds plans around real deadlines.",
    tags: ["Career", "Study Planning", "MBA Prep"],
    rating: 4.7,
    sessions: 187,
    isOnline: false,
    nextSlot: "Tomorrow 10:00 AM",
    calendlyUrls: mentorCalendlyProfiles["kavya-rao"].calendlyUrls,
    situations: ["career-clarity", "first-job"],
    services: [
      { name: "Career Roadmap Session", duration: "60 min", deliverable: "90-day action plan PDF", slug: "career-roadmap" },
      { name: "MBA Decision Session", duration: "45 min", deliverable: "College shortlist + timeline", slug: "career-roadmap" },
    ],
    courses: ["sql-for-data-jobs"],
    reviews: [
      { initials: "VT", text: "I had no idea what I wanted to do after graduation. 60 minutes with Kavya gave me a clear 3-month plan.", rating: 5, date: "Jun 2026" },
      { initials: "LP", text: "She didn't just suggest options — she helped me rule out the ones that weren't right for me.", rating: 5, date: "Apr 2026" },
    ],
  },
  "sneha-patel": {
    name: "Sneha Patel",
    title: "GATE Mentor",
    credential: "GATE AIR 47 · DRDO Engineer",
    bio: "Sneha helps aspirants turn scattered preparation into a sharp exam plan. Her sessions focus on concept clarity, mock analysis, revision discipline, and the exact topics that create score jumps in the final months.",
    tags: ["GATE", "OS", "DBMS", "Exam Strategy"],
    rating: 4.9,
    sessions: 221,
    isOnline: false,
    nextSlot: "Friday 7:00 PM",
    calendlyUrls: {},
    situations: ["competitive-exams", "exam-doubt"],
    services: [
      { name: "GATE Mock Test Analysis", duration: "60 min", deliverable: "Weak-area map + 14-day revision plan", slug: "career-roadmap" },
      { name: "OS & DBMS Doubt Clinic", duration: "45 min", deliverable: "Solved doubts + topic notes", slug: "project-review" },
    ],
    courses: ["gate-os-dbms"],
    reviews: [
      { initials: "MR", text: "Her mock analysis made my mistakes obvious. I stopped wasting time on low-impact chapters.", rating: 5, date: "Jun 2026" },
      { initials: "TA", text: "OS finally clicked for me after Sneha explained scheduling with examples.", rating: 5, date: "May 2026" },
    ],
  },
  "rohan-iyer": {
    name: "Rohan Iyer",
    title: "Technology Mentor",
    credential: "Software Engineer · 7 years in product companies",
    bio: "Rohan has interviewed candidates at multiple product companies and now helps students understand what the hiring bar actually looks like. He focuses on DSA patterns, system design basics, and the communication skills that separate shortlisted from rejected candidates.",
    tags: ["AI", "Projects", "Software Interviews"],
    rating: 4.9,
    sessions: 312,
    isOnline: true,
    calendlyUrls: mentorCalendlyProfiles["rohan-iyer"].calendlyUrls,
    situations: ["interview-prep", "skill-building"],
    services: [
      { name: "Mock Interview for Software Roles", duration: "45 min", deliverable: "Performance breakdown + weak areas", slug: "software-mock-interview" },
      { name: "Project Review Session", duration: "45 min", deliverable: "Improvement notes + presentation tips", slug: "project-review" },
      { name: "System Design Intro", duration: "60 min", deliverable: "Concept map + resource list", slug: "software-mock-interview" },
    ],
    courses: ["amazon-sde-playbook"],
    reviews: [
      { initials: "DK", text: "Rohan asked the exact questions I got asked in my actual Flipkart interview. Uncanny.", rating: 5, date: "Jun 2026" },
      { initials: "NS", text: "He explained system design in a way that finally made sense — not just theory.", rating: 5, date: "May 2026" },
      { initials: "PG", text: "Best mock interview I've had. Very honest feedback.", rating: 4, date: "Apr 2026" },
    ],
  },
  "meera-shah": {
    name: "Meera Shah",
    title: "Skill Coach",
    credential: "Communication & soft skills trainer · 5 years corporate L&D",
    bio: "Meera helps students who have the knowledge but struggle to present it — in interviews, in their first job, or in front of clients. Her sessions are practical: she drills the specific situations students face and helps them respond with clarity and confidence.",
    tags: ["Communication", "Growth", "Workplace"],
    rating: 4.6,
    sessions: 143,
    isOnline: false,
    nextSlot: "Saturday 3:00 PM",
    calendlyUrls: mentorCalendlyProfiles["meera-shah"].calendlyUrls,
    situations: ["first-job", "career-clarity"],
    services: [
      { name: "Communication for Interviews", duration: "45 min", deliverable: "Personalised word bank + phrase guide", slug: "career-roadmap" },
      { name: "Workplace Confidence Session", duration: "45 min", deliverable: "Scenario scripts + confidence checklist", slug: "career-roadmap" },
    ],
    courses: ["first-job-survival"],
    reviews: [
      { initials: "AK", text: "I used to go blank in interviews. After Meera's session I had a structure I could actually use under pressure.", rating: 5, date: "May 2026" },
      { initials: "SC", text: "She role-played 4 different scenarios with me. Real practice, not theory.", rating: 4, date: "Apr 2026" },
    ],
  },
} as const;

export function generateStaticParams() {
  return Object.keys(mentorData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mentor = mentorData[slug as keyof typeof mentorData];
  return {
    title: mentor ? `${mentor.name} | My Expert Talk` : "Mentor Profile | My Expert Talk",
    description: mentor?.bio ?? "View verified mentor profiles on My Expert Talk.",
    openGraph: {
      title: mentor ? `${mentor.name} | My Expert Talk` : "Mentor Profile | My Expert Talk",
      description: mentor?.bio ?? "View verified mentor profiles on My Expert Talk.",
      siteName: "My Expert Talk",
      images: [{ url: "/my-expert-talk-logo.png", alt: "My Expert Talk" }],
    },
  };
}

export default async function MentorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mentor = mentorData[slug as keyof typeof mentorData];
  if (!mentor) notFound();

  const initials = mentor.name.split(" ").map((part) => part[0]).join("").slice(0, 2);

  return (
    <main className="bg-ivory py-12 text-ink">
      <div className="container-shell">
        <Link href="/mentors" className="text-sm font-semibold text-coral hover:text-[#dc4429]">&larr; All mentors</Link>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.4fr_0.6fr]">
          <aside className="rounded-3xl border border-navy/10 bg-white p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="relative grid h-[72px] w-[72px] place-items-center rounded-full bg-gradient-to-br from-[#1d4ed8] to-[#7c3aed] text-[28px] font-bold text-white">
                {initials}
                <span className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white ${mentor.isOnline ? "animate-pulse bg-green-400" : "bg-slate-500"}`} />
              </div>
              <div>
                <p className={mentor.isOnline ? "text-sm font-semibold text-green-300" : "text-sm font-semibold text-slate-400"}>
                  {mentor.isOnline ? "Online now" : `Next slot: ${"nextSlot" in mentor ? mentor.nextSlot : "Soon"}`}
                </p>
              </div>
            </div>
            <h1 className="mt-4 text-2xl font-black text-navy">{mentor.name}</h1>
            <p className="mt-1 text-base font-bold text-coral">{mentor.title}</p>
            <p className="mt-1 text-sm italic text-slate-400">{mentor.credential}</p>
            <div className="mt-4 flex gap-6 text-sm font-semibold text-slate-700">
              <span>⭐ {mentor.rating}</span>
              <span>· {mentor.sessions} sessions</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {mentor.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-peach px-3 py-1 text-xs font-bold text-coral">{tag}</span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">{mentor.bio}</p>
            <p className="mb-2 mt-4 text-xs text-slate-500">Helps with:</p>
            <div className="flex flex-wrap gap-2">
              {mentor.situations.map((situation) => (
                <span key={situation} className="rounded-full border border-navy/10 bg-ivory px-3 py-1 text-xs text-slate-700">
                  {situationLabels[situation] ?? situation}
                </span>
              ))}
            </div>
          </aside>

          <section>
            <div>
              <h2 className="text-2xl font-black text-navy">Services by {mentor.name}</h2>
              <div className="mt-4 space-y-3">
                {mentor.services.map((service) => (
                  <details key={service.name} className="group rounded-xl border border-navy/10 bg-white p-4 shadow-soft">
                    <summary className="list-none cursor-pointer">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-black text-navy">{service.name}</p>
                          <p className="mt-0.5 text-xs text-slate-500">{service.duration} · -&gt; {service.deliverable}</p>
                        </div>
                        <span className="text-sm font-bold text-coral group-open:hidden">Book -&gt;</span>
                        <span className="hidden text-sm font-bold text-slate-500 group-open:block">Close ↑</span>
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

            <div className="mt-8">
              <h2 className="text-2xl font-black text-navy">Courses by {mentor.name}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {mentor.courses.map((courseSlug) => {
                  const course = courseData[courseSlug as keyof typeof courseData];
                  return (
                    <article key={courseSlug} className="rounded-xl border border-navy/10 bg-white p-4 shadow-soft">
                      <h3 className="text-sm font-black text-navy">{course.title}</h3>
                      <p className="mt-2 text-xs text-slate-400">{course.lessons} lessons · {course.duration} · ₹{course.price.toLocaleString("en-IN")}</p>
                      <Link href={`/courses/${courseSlug}`} className="mt-3 inline-flex text-xs font-bold text-coral hover:text-[#dc4429]">Buy course -&gt;</Link>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-black text-navy">What students say</h2>
              <div className="mt-4 grid gap-3">
                {mentor.reviews.map((review) => (
                  <article key={`${review.initials}-${review.date}`} className="rounded-xl border border-navy/10 bg-white p-4 shadow-soft">
                    <p className="text-sm text-amber-400">{"⭐".repeat(review.rating)}</p>
                    <p className="mt-2 text-sm italic text-slate-700">"{review.text}"</p>
                    <p className="mt-2 text-xs text-slate-500">{review.initials} · {review.date}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
