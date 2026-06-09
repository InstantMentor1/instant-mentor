import { BriefcaseBusiness, Check, Compass, GraduationCap, MessageCircleQuestion, Presentation, Users } from "lucide-react";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { redirect } from "next/navigation";
import { getAuthContext } from "@/lib/auth";

const benefits = [
  { title: "Ask subject doubts", text: "Get unstuck with relevant answers from faculty, mentors, and knowledgeable peers.", icon: MessageCircleQuestion },
  { title: "Attend live webinars", text: "Explore practical topics and ask questions in interactive sessions.", icon: Presentation },
  { title: "Learn from verified mentors", text: "Connect with credible experts who understand your academic and career goals.", icon: GraduationCap },
  { title: "Join domain communities", text: "Learn alongside students focused on the same subjects and industries.", icon: Users },
  { title: "Get career guidance", text: "Build a clearer path through mentor input, roadmaps, and informed decisions.", icon: Compass },
  { title: "Prepare for internships and jobs", text: "Strengthen your resume, interview readiness, and professional confidence.", icon: BriefcaseBusiness },
];

export default async function StudentsPage() {
  const { profile } = await getAuthContext();
  if (profile && ["Mentor", "Faculty"].includes(profile.role)) redirect("/mentor/dashboard");
  return (
    <>
      <PageHero
        eyebrow="For students"
        title="Get expert help whenever you feel stuck."
        description="Your degree gives you a curriculum. Instant Mentor gives you the people, answers, and guidance to move through it with confidence."
        ctaLabel="Join as a Student"
      />
      <section className="section-pad bg-slate-50">
        <div className="container-shell">
          <SectionHeader eyebrow="Built around your growth" title="The support ambitious students deserve" centered />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ title, text, icon: Icon }) => (
              <article key={title} className="card p-7">
                <span className="inline-flex rounded-2xl bg-teal-50 p-3 text-teal-700"><Icon size={26} /></span>
                <h2 className="mt-5 text-xl font-extrabold">{title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow">One monthly pass</span>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Less searching. More learning.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">Bring academic support, career direction, and a motivated student community into one trusted space.</p>
          </div>
          <div className="rounded-3xl bg-teal-900 p-7 text-white">
            {["Answers when you need them", "Human guidance beyond content", "Exposure to real professionals", "A community that grows with you"].map((item) => (
              <p key={item} className="flex items-center gap-3 border-b border-white/10 py-4 font-semibold last:border-0">
                <Check size={18} className="text-teal-100" /> {item}
              </p>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
