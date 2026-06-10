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
  { href: "/services", label: "Explore Services" },
  { href: "/for-experts", label: "For Experts" },
  { href: "/categories", label: "Categories" },
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
          { href: "/services", label: "Explore Services" },
          { href: "/bookings", label: "My Bookings" },
          { href: "/messages", label: "Messages" },
          { href: "/profile", label: "Profile" },
        ]
      : profile?.role === "Mentor" || profile?.role === "Faculty" || profile?.role === "Institution"
        ? [
            { href: "/mentor/dashboard", label: "Dashboard" },
            { href: "/mentor/services", label: "My Service Menu" },
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
          className={`text-sm font-semibold transition hover:text-teal-700 ${
            pathname === link.href ? "text-teal-700" : "text-slate-600"
          }`}
        >
          {link.label}
        </Link>
      ))}
      {profile ? (
        <button type="button" onClick={logout} className="btn-secondary !px-4 !py-2.5">
          <LogOut size={15} /> Logout
        </button>
      ) : (
        <>
          <Link href="/login" onClick={() => setOpen(false)} className="text-sm font-semibold text-slate-600 hover:text-teal-700">Login</Link>
          <Link href="/signup" onClick={() => setOpen(false)} className="btn-primary !px-5 !py-2.5">Get Started</Link>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav className="container-shell flex h-20 items-center justify-between" aria-label="Main navigation">
        <Link href={profile ? links[0].href : "/"} aria-label="Instant Mentor home" onClick={() => setOpen(false)}>
          <Image src="/assets/instant-mentor-logo.png" alt="Instant Mentor Logo" width={693} height={513} priority className="h-14 w-auto object-contain" />
        </Link>

        {loading ? (
          <span className="hidden items-center gap-2 text-sm font-semibold text-slate-400 lg:flex"><Loader2 size={16} className="animate-spin" /> Loading</span>
        ) : (
          <div className="hidden items-center gap-7 lg:flex">{navContent}</div>
        )}

        <button type="button" disabled={loading} className="rounded-xl border border-slate-200 p-2 text-ink lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {loading ? <Loader2 size={23} className="animate-spin" /> : open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {open && !loading && (
        <div className="border-t border-slate-100 bg-white px-5 pb-6 pt-3 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">{navContent}</div>
        </div>
      )}
    </header>
  );
}
