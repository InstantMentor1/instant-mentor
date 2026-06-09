import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Image
            src="/assets/instant-mentor-logo.png"
            alt="Instant Mentor Logo"
            width={693}
            height={513}
            className="mb-5 h-16 w-auto rounded-lg bg-white object-contain"
          />
          <p className="max-w-sm text-sm leading-6 text-slate-300">
            India&apos;s verified student mentorship and doubt-clearing platform.
            Ask doubts, get mentored, and grow your career.
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-teal-100">Explore</h2>
          <div className="flex flex-col gap-3 text-sm text-slate-300">
            <Link href="/students" className="hover:text-white">For Students</Link>
            <Link href="/mentors" className="hover:text-white">For Mentors</Link>
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/signup" className="hover:text-white">Create Student Account</Link>
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-teal-100">Connect</h2>
          <div className="space-y-3 text-sm text-slate-300">
            <p className="flex items-center gap-2"><MapPin size={16} /> Built for students across India</p>
            <p className="flex items-center gap-2"><Mail size={16} /> hello.instantmentor@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Instant Mentor. All rights reserved.
      </div>
    </footer>
  );
}
