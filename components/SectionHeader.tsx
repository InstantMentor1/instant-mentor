type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  inverted?: boolean;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
  inverted = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && <span className={inverted ? "mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-teal-100" : "eyebrow"}>{eyebrow}</span>}
      <h2 className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${inverted ? "text-white" : "text-ink"}`}>{title}</h2>
      {description && <p className={`mt-4 text-base leading-7 sm:text-lg ${inverted ? "text-teal-50" : "text-slate-600"}`}>{description}</p>}
    </div>
  );
}
