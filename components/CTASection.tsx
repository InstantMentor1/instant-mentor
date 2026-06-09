import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AppRole } from "@/lib/auth-shared";
import { dashboardForRole } from "@/lib/auth-shared";

export default function CTASection({ role = null }: { role?: AppRole | null }) {
  const href = role ? dashboardForRole(role) : "/signup";
  const label = role
    ? role === "Admin"
      ? "Open Admin Dashboard"
      : role === "Student"
        ? "Open Student Dashboard"
        : "Open Mentor Dashboard"
    : "Create Student Account";

  return (
    <section className="container-shell pb-16 sm:pb-20 lg:pb-24">
      <div className="overflow-hidden rounded-[2rem] bg-teal-800 px-6 py-14 text-center text-white shadow-2xl shadow-teal-900/20 sm:px-12">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal-100">Start with direction</p>
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Move forward with guidance that fits your goals.</h2>
        <p className="mx-auto mt-4 max-w-xl text-teal-50">Connect with reviewed mentors, request focused support, and build a practical growth plan.</p>
        <Link href={href} className="btn-secondary mt-7 border-white bg-white text-teal-800">
          {label} <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
