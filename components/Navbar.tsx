"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpenCheck, ChevronDown, Loader2, LogOut, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/expert-talks", label: "Expert Talks" },
  { href: "/services", label: "Services" },
  { href: "/mentors", label: "Mentors" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { loading, profile, setProfile } = useAuth();
  const [open, setOpen] = useState(false);

  const links =
    profile?.role === "Student"
      ? [
          { href: "/student/dashboard", label: "Dashboard" },
          { href: "/expert-talks", label: "Expert Talks" },
          { href: "/services", label: "Services" },
          { href: "/courses", label: "Courses" },
          { href: "/bookings", label: "My Bookings" },
          { href: "/recordings", label: "Recordings" },
          { href: "/messages", label: "Messages" },
          { href: "/profile", label: "Profile" },
        ]
      : profile?.role === "Mentor" || profile?.role === "Faculty" || profile?.role === "Institution"
        ? [
            { href: "/mentor/dashboard", label: "Dashboard" },
            { href: "/mentor/services", label: "My Services" },
            { href: "/mentor/services/new", label: "Create Service" },
            { href: "/expert-talks", label: "Expert Talks" },
            { href: "/courses", label: "Courses" },
            { href: "/mentor/bookings", label: "Bookings" },
            { href: "/messages", label: "Messages" },
            { href: "/mentor/earnings", label: "Earnings" },
            { href: "/mentor/reviews", label: "Reviews" },
            { href: "/profile", label: "Profile" },
          ]
        : profile?.role === "Admin"
          ? [
              { href: "/admin/dashboard", label: "Admin Dashboard" },
              { href: "/admin/users", label: "Users" },
              { href: "/admin/experts", label: "Experts" },
              { href: "/admin/services", label: "Services" },
              { href: "/courses", label: "Courses" },
              { href: "/expert-talks", label: "Expert Talks" },
              { href: "/events", label: "Events" },
              { href: "/admin/bookings", label: "Bookings" },
              { href: "/admin/payments", label: "Payments" },
              { href: "/admin/categories", label: "Categories" },
            ]
          : publicLinks;

  async function logout() {
    await createSupabaseBrowserClient().auth.signOut();
    setProfile(null);
    setOpen(false);
    router.push("/login");
    router.refresh();
  }

  const navContent = (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setOpen(false)}
          className={`rounded-md px-2 py-1 text-sm font-medium transition-colors ${
            pathname === link.href ? "bg-coral/10 text-coral" : "text-slate-700 hover:text-coral"
          }`}
        >
          {link.label}
        </Link>
      ))}
      {profile ? (
        <button type="button" onClick={logout} className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-coral/40 hover:text-coral">
          <LogOut size={15} /> Logout
        </button>
      ) : (
        <>
          <Link href="/login" onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700 hover:text-coral">Login</Link>
          <div className="group relative">
            <Link href="/signup" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 rounded-full bg-coral px-4 py-1.5 text-sm font-semibold text-white shadow-[0_12px_22px_-16px_rgba(241,90,59,0.9)] transition hover:-translate-y-0.5 hover:bg-[#dc4429]">
              Join <ChevronDown size={15} />
            </Link>
            <div className="pointer-events-none absolute right-0 top-full z-20 mt-3 w-56 rounded-2xl border border-navy/10 bg-white p-2 opacity-0 shadow-soft transition group-hover:pointer-events-auto group-hover:opacity-100">
              <Link href="/signup" className="block rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-peach hover:text-coral">Join as Student</Link>
              <Link href="/for-mentors" className="block rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-peach hover:text-coral">Join as Expert</Link>
            </div>
          </div>
          <Link href="/bookings" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-coral/40 hover:text-coral">
            <BookOpenCheck size={16} /> Bookings
          </Link>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-white/95 shadow-[0_12px_30px_-28px_rgba(11,31,77,0.45)] backdrop-blur-md">
      <nav className="container-shell flex min-h-[76px] items-center justify-between gap-4 py-3" aria-label="Main navigation">
        <Link href={profile ? links[0].href : "/"} aria-label="My Expert Talk home" onClick={() => setOpen(false)}>
          <Image src="/my-expert-talk-logo.png" alt="My Expert Talk Logo" width={1600} height={1600} priority className="h-12 w-auto object-contain" />
        </Link>
        {loading ? (
          <span className="hidden items-center gap-2 text-sm font-semibold text-slate-500 lg:flex"><Loader2 size={16} className="animate-spin" /> Loading</span>
        ) : (
          <div className="hidden items-center gap-5 xl:flex">{navContent}</div>
        )}
        <button type="button" disabled={loading} className="rounded-xl border border-navy/10 p-2 text-navy xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {loading ? <Loader2 size={23} className="animate-spin" /> : open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>
      {open && !loading && (
        <div className="border-t border-navy/10 bg-white px-5 pb-6 pt-3 xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">{navContent}</div>
        </div>
      )}
    </header>
  );
}
