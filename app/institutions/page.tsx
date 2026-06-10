import PageHero from "@/components/PageHero";

const programs = ["Resume review drives", "Mock interview programs", "Expert webinars", "Project review camps", "Career mentorship sessions", "Founder and industry AMAs"];

export default function InstitutionsPage() {
  return (
    <>
      <PageHero eyebrow="Institution programs" title="Expert access for colleges, institutes, and placement teams." description="Build focused programs using verified experts across career readiness, technical projects, business, and industry exposure." ctaLabel="Request Institution Program" ctaHref="mailto:hello.instantmentor@gmail.com?subject=Institution Program Request" />
      <section className="section-pad bg-slate-50">
        <div className="container-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => <article key={program} className="card p-6"><h2 className="text-xl font-black">{program}</h2><p className="mt-3 text-sm leading-6 text-slate-600">Curated expert support with clear scope, scheduling, deliverables, and institution-level coordination.</p></article>)}
        </div>
      </section>
    </>
  );
}
