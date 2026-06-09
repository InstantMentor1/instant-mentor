import SectionHeader from "@/components/SectionHeader";
import { faqs } from "@/lib/data";

export default function FAQSection() {
  return (
    <section className="section-pad bg-slate-50" aria-labelledby="homepage-faq-title">
      <div className="container-shell max-w-4xl">
        <SectionHeader
          eyebrow="Questions, answered"
          title="Know what to expect before you start"
          description="Clear answers about mentorship, verification, plans, and available technical tracks."
          centered
        />
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white p-5 open:border-teal-200 open:shadow-soft">
              <summary className="cursor-pointer list-none pr-8 font-extrabold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500">
                {faq.question}
              </summary>
              <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
