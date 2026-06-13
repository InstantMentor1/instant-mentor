import PageHero from "@/components/PageHero";

const programs = [
  "Resume review drives",
  "Mock interview programs",
  "Project review sessions",
  "Career guidance programs",
  "Expert workshops",
  "Academic mentoring",
  "Skill-development support",
  "Founder and industry panels",
];

export default function InstitutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Institution expert access"
        title="Expert access for institutions at scale."
        description="For colleges, institutes, coaching centers, placement cells, and organizations that need reliable access to verified experts."
        ctaLabel="Partner with Instant Mentor"
        ctaHref="mailto:hello.instantmentor@gmail.com?subject=Institution Expert Access"
      />
      <section className="section-pad bg-slate-50">
        <div className="container-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <article key={program} className="card p-6">
              <h2 className="text-xl font-black">{program}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">Structured expert support with agreed scope, scheduling, delivery format, and institution-level coordination.</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
