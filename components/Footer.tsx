import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

const quickLinks = [
  ["Home", "/"],
  ["Expert Talks", "/expert-talks"],
  ["Services", "/services"],
  ["Recordings", "/recordings"],
  ["Experts", "/mentors"],
  ["Events", "/events"],
  ["Contact", "/contact"],
] as const;

const joinLinks = [
  ["Join as Student", "/signup"],
  ["Join as Expert", "/for-mentors"],
] as const;

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/my-expert-talk-logo.png"
            alt="My Expert Talk Logo"
            width={1600}
            height={1600}
            className="mb-5 h-16 w-auto rounded-xl bg-white object-contain"
          />
          <p className="max-w-sm text-sm leading-6 text-slate-300">
            My Expert Talk is an education and expert-service platform for
            students, experts, and subject-matter mentors.
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-sky-100">Quick Links</h2>
          <div className="flex flex-col gap-3 text-sm text-slate-300">
            {quickLinks.map(([label, href]) => <Link key={href} href={href} className="hover:text-white">{label}</Link>)}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-sky-100">Join</h2>
          <div className="flex flex-col gap-3 text-sm text-slate-300">
            {joinLinks.map(([label, href]) => <Link key={href} href={href} className="hover:text-white">{label}</Link>)}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-sky-100">Connect</h2>
          <div className="space-y-3 text-sm text-slate-300">
            <p className="flex items-center gap-2"><MapPin size={16} /> Built for learners across India</p>
            <p className="flex items-center gap-2"><Mail size={16} /> support@myexperttalk.com</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        (c) {new Date().getFullYear()} My Expert Talk. All rights reserved.
      </div>
    </footer>
  );
}
