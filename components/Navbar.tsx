"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Loader2, LogOut, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Find Support" },
  { href: "/mentors", label: "Expert Menus" },
  { href: "/rooms", label: "Rooms" },
  { href: "/for-mentors", label: "For Experts" },
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
          { href: "/services", label: "Find Support" },
          { href: "/bookings", label: "My Bookings" },
          { href: "/rooms", label: "My Rooms" },
          { href: "/messages", label: "Messages" },
          { href: "/payments", label: "Payments" },
          { href: "/profile", label: "Profile" },
        ]
      : profile?.role === "Mentor" || profile?.role === "Faculty" || profile?.role === "Institution"
          ? [
              { href: "/mentor/dashboard", label: "Dashboard" },
              { href: "/mentor/services", label: "My Services" },
              { href: "/mentor/rooms", label: "My Rooms" },
              { href: "/mentor/bookings", label: "Bookings" },
              { href: "/mentor/promo-codes", label: "Promo Codes" },
              { href: "/mentor/earnings", label: "Earnings" },
              { href: "/mentor/verification", label: "Profile & Verification" },
            ]
        : profile?.role === "Admin"
          ? [
              { href: "/admin/dashboard", label: "Admin Dashboard" },
              { href: "/admin/experts", label: "Approve Experts" },
              { href: "/admin/services", label: "Manage Services" },
              { href: "/admin/bookings", label: "Track Bookings" },
              { href: "/admin/commission", label: "Manage Commission" },
              { href: "/admin/disputes", label: "Handle Disputes" },
              { href: "/admin/payments", label: "Payments/Payouts" },
              { href: "/admin/reviews", label: "Monitor Reviews" },
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
            pathname === link.href ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:text-blue-600"
          }`}
        >
          {link.label}
        </Link>
      ))}
      {profile ? (
        <button type="button" onClick={logout} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-blue-600 hover:text-blue-600">
          <LogOut size={15} /> Logout
        </button>
      ) : (
        <>
          <Link href="/login" onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700 hover:text-blue-600">Login</Link>
          <div className="group relative">
            <Link href="/signup" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700">
              Join <ChevronDown size={15} />
            </Link>
            <div className="pointer-events-none absolute right-0 top-full z-20 mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition group-hover:pointer-events-auto group-hover:opacity-100">
              <Link href="/signup" className="block rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600">Join as Student</Link>
              <Link href="/for-mentors" className="block rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600">Join as Expert</Link>
            </div>
          </div>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <nav className="container-shell flex min-h-[76px] items-center justify-between gap-4 py-3" aria-label="Main navigation">
        <Link href={profile ? links[0].href : "/"} aria-label="My Expert Talk home" onClick={() => setOpen(false)}>
          <Image src="/my-expert-talk-logo.png" alt="My Expert Talk Logo" width={1600} height={1600} priority className="h-12 w-auto object-contain" />
        </Link>
        {loading ? (
          <span className="hidden items-center gap-2 text-sm font-semibold text-slate-500 lg:flex"><Loader2 size={16} className="animate-spin" /> Loading</span>
        ) : (
          <div className="hidden items-center gap-5 xl:flex">{navContent}</div>
        )}
        <button type="button" disabled={loading} className="rounded-xl border border-slate-200 p-2 text-slate-900 xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {loading ? <Loader2 size={23} className="animate-spin" /> : open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>
      {open && !loading && (
        <div className="border-t border-slate-200 bg-white px-5 pb-6 pt-3 xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">{navContent}</div>
        </div>
      )}
    </header>
  );
}
