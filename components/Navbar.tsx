"use client";

import Image from "next/image";
import Link from "next/link";
import { Loader2, LogOut, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/expert-talks", label: "Expert Talks" },
  { href: "/services", label: "Services" },
  { href: "/recordings", label: "Recordings" },
  { href: "/mentors", label: "Experts" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
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
            { href: "/events", label: "Events" },
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
          className={`text-sm font-semibold transition hover:text-white ${
            pathname === link.href ? "text-white" : "text-white/62"
          }`}
        >
          {link.label}
        </Link>
      ))}
      {profile ? (
        <button type="button" onClick={logout} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-black text-white transition hover:bg-white hover:text-black">
          <LogOut size={15} /> Logout
        </button>
      ) : (
        <>
          <Link href="/login" onClick={() => setOpen(false)} className="text-sm font-semibold text-white/70 hover:text-white">Login</Link>
          <Link href="/signup" onClick={() => setOpen(false)} className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-black transition hover:-translate-y-0.5">Join</Link>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/92 backdrop-blur-xl">
      <nav className="container-shell flex min-h-[72px] items-center justify-between py-3" aria-label="Main navigation">
        <Link href={profile ? links[0].href : "/"} aria-label="My Expert Talk home" onClick={() => setOpen(false)}>
          <Image src="/my-expert-talk-logo.png" alt="My Expert Talk Logo" width={1600} height={1600} priority className="h-12 w-auto object-contain" />
        </Link>
        {loading ? (
          <span className="hidden items-center gap-2 text-sm font-semibold text-white/50 lg:flex"><Loader2 size={16} className="animate-spin" /> Loading</span>
        ) : (
          <div className="hidden items-center gap-6 xl:flex">{navContent}</div>
        )}
        <button type="button" disabled={loading} className="rounded-xl border border-white/15 p-2 text-white xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {loading ? <Loader2 size={23} className="animate-spin" /> : open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>
      {open && !loading && (
        <div className="border-t border-white/10 bg-black px-5 pb-6 pt-3 xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">{navContent}</div>
        </div>
      )}
    </header>
  );
}
