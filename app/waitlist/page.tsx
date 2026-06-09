import { BadgeCheck, BellRing, Sparkles } from "lucide-react";
import WaitlistForm from "@/components/WaitlistForm";

export default function WaitlistPage() {
  return (
    <section className="bg-hero-glow">
      <div className="container-shell section-pad grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-32">
          <span className="eyebrow">Early access</span>
          <h1 className="text-4xl font-black tracking-tight text-ink sm:text-5xl">Help shape the future of student mentorship.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Join our waitlist as a student, mentor, faculty member, or institution. We&apos;ll keep you close as Instant Mentor takes shape.
          </p>
          <div className="mt-8 space-y-4">
            <p className="flex items-center gap-3 font-semibold text-slate-700"><BadgeCheck className="text-teal-700" size={21} /> Priority access to the MVP</p>
            <p className="flex items-center gap-3 font-semibold text-slate-700"><Sparkles className="text-teal-700" size={21} /> A chance to influence what we build</p>
            <p className="flex items-center gap-3 font-semibold text-slate-700"><BellRing className="text-teal-700" size={21} /> Launch updates, without the noise</p>
          </div>
        </div>
        <WaitlistForm />
      </div>
    </section>
  );
}
