import Link from "next/link";
import { ArrowRight } from "lucide-react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  ctaLabel = "Create Student Account",
  ctaHref = "/signup",
}: PageHeroProps) {
  return (
    <section className="overflow-hidden bg-hero-glow">
      <div className="container-shell section-pad text-center">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">{description}</p>
        <Link href={ctaHref} className="btn-primary mt-8">
          {ctaLabel} <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
