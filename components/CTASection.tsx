import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="container-shell pb-16 sm:pb-20 lg:pb-24">
      <div className="overflow-hidden rounded-[2rem] bg-teal-800 px-6 py-14 text-center text-white shadow-2xl shadow-teal-900/20 sm:px-12">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal-100">Early access</p>
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Be among the first to experience Instant Mentor.</h2>
        <p className="mx-auto mt-4 max-w-xl text-teal-50">Join students, faculty, and experts shaping a better way to learn and grow.</p>
        <Link href="/waitlist" className="btn-secondary mt-7 border-white bg-white text-teal-800">
          Get Early Access <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
