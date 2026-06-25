import PageHero from "@/components/PageHero";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the My Expert Talk team."
        description="For student support, expert onboarding, partnerships, or platform help, send us a message."
        ctaLabel="Join"
        ctaHref="/signup"
      />
      <section className="section-pad bg-white">
        <div className="container-shell max-w-3xl">
          <form className="card grid gap-5 border-blue-100 p-6 sm:grid-cols-2">
            <input className="form-input" placeholder="Full name" aria-label="Full name" />
            <input className="form-input" type="email" placeholder="Email" aria-label="Email" />
            <input className="form-input sm:col-span-2" placeholder="Subject" aria-label="Subject" />
            <textarea className="form-input sm:col-span-2" rows={5} placeholder="How can we help?" aria-label="Message" />
            <button type="button" className="btn-primary sm:col-span-2">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
}
