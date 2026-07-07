import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

const quickLinks = [
  ["Home", "/"],
  ["Find Experts", "/mentors"],
  ["Expert Services", "/services"],
  ["For Experts", "/for-mentors"],
  ["Rooms / Courses", "/rooms-courses"],
  ["Contact", "/contact"],
] as const;

const joinLinks = [
  ["Join as Student", "/signup"],
  ["Join as Expert", "/for-mentors"],
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-white text-ink">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/my-expert-talk-logo.png"
            alt="My Expert Talk Logo"
            width={1600}
            height={1600}
            className="mb-2 h-12 w-auto rounded-xl bg-white object-contain"
          />
          <p className="max-w-xs text-sm leading-6 text-slate-400">
            My Expert Talk is an expert-led learning support marketplace where students discover and book independent experts for services, rooms, micro-courses, and mentorship plans.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy">Quick Links</h2>
          <div className="flex flex-col gap-3 text-sm text-slate-400">
            {quickLinks.map(([label, href]) => <Link key={href} href={href} className="transition hover:text-coral">{label}</Link>)}
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy">Join</h2>
          <div className="flex flex-col gap-3 text-sm text-slate-400">
            {joinLinks.map(([label, href]) => <Link key={href} href={href} className="transition hover:text-coral">{label}</Link>)}
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy">Connect</h2>
          <div className="space-y-3 text-sm text-slate-400">
            <p className="flex items-center gap-2"><MapPin size={16} /> Built for learners across India</p>
            <p className="flex items-center gap-2 text-coral"><Mail size={16} /> support@myexperttalk.com</p>
          </div>
        </div>
      </div>
      <div className="border-t border-navy/10 py-5 text-center text-xs text-slate-500">
        (c) {new Date().getFullYear()} My Expert Talk. All rights reserved.
      </div>
    </footer>
  );
}
