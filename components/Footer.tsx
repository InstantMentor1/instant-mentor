import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#140708] text-white">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Image
            src="/assets/mentrix-logo.png"
            alt="Mentrix Logo"
            width={1600}
            height={1600}
            className="mb-5 h-16 w-auto rounded-xl bg-white object-contain"
          />
          <p className="max-w-sm text-sm leading-6 text-slate-300">
            Mentrix is a premium SME marketplace where serious students book
            verified subject-matter experts for outcome-focused guidance.
          </p>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.28em] text-red-100">
            Your Journey, Guided By Greatness
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-teal-100">Explore</h2>
          <div className="flex flex-col gap-3 text-sm text-slate-300">
            <Link href="/smes" className="hover:text-white">Explore SMEs</Link>
            <Link href="/for-smes" className="hover:text-white">For SMEs</Link>
            <Link href="/categories" className="hover:text-white">Categories</Link>
            <Link href="/institutions" className="hover:text-white">Institution Programs</Link>
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-teal-100">Connect</h2>
          <div className="space-y-3 text-sm text-slate-300">
            <p className="flex items-center gap-2"><MapPin size={16} /> Built for student-SME access across India</p>
            <p className="flex items-center gap-2"><Mail size={16} /> support@mentrix.in</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        (c) {new Date().getFullYear()} Mentrix. All rights reserved.
      </div>
    </footer>
  );
}
