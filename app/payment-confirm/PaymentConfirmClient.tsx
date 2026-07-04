"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

const mentorLabels: Record<string, string> = {
  "aarav-mehta": "Aarav Mehta",
  "kavya-rao": "Kavya Rao",
  "rohan-iyer": "Rohan Iyer",
  "meera-shah": "Meera Shah",
  "priya-nair": "Priya Nair",
};

const serviceLabels: Record<string, string> = {
  "resume-review": "Resume Review for Freshers",
  "software-mock-interview": "Mock Interview for Software Roles",
  "career-roadmap": "Career Roadmap Session",
  "project-review": "Project Review Session",
};

export default function PaymentConfirmClient() {
  const params = useSearchParams();
  const mentorSlug = params.get("mentor") ?? "";
  const serviceSlug = params.get("service") ?? "";
  const student = params.get("student") ?? "there";
  const mentor = mentorLabels[mentorSlug] ?? "your mentor";
  const service = serviceLabels[serviceSlug] ?? "your selected session";

  const booking = useMemo(
    () => ({
      mentor,
      mentorSlug,
      service,
      serviceSlug,
      student,
      dateTime: "Calendly slot selected",
      status: "Upcoming" as const,
    }),
    [mentor, mentorSlug, service, serviceSlug, student],
  );

  useEffect(() => {
    try {
      const existing = JSON.parse(localStorage.getItem("met_bookings") ?? "[]") as typeof booking[];
      const alreadySaved = existing.some((item) => item.mentor === booking.mentor && item.service === booking.service && item.student === booking.student);
      if (!alreadySaved) {
        localStorage.setItem("met_bookings", JSON.stringify([booking, ...existing].slice(0, 20)));
      }
      localStorage.setItem("bookingConfirmed", "1");
    } catch {
      localStorage.setItem("bookingConfirmed", "1");
    }
  }, [booking]);

  return (
    <main className="bg-ivory py-12">
      <div className="container-shell">
        <section className="mx-auto max-w-2xl rounded-3xl border border-navy/10 bg-white p-8 text-center shadow-soft">
          <span className="rounded-full bg-peach px-3 py-1 text-sm font-bold text-coral">Slot confirmed</span>
          <h1 className="mt-5 text-3xl font-black tracking-[-0.04em] text-navy">Your slot is confirmed with {mentor}.</h1>
          <p className="mt-4 text-slate-600">
            Complete payment to lock it in. For now, the mentor will send a payment link by WhatsApp or email within 2 hours.
          </p>
          <div className="mt-6 rounded-2xl bg-ivory p-5 text-left text-sm text-slate-700">
            <p><strong>Student:</strong> {student}</p>
            <p className="mt-2"><strong>Session:</strong> {service}</p>
            <p className="mt-2"><strong>Mentor:</strong> {mentor}</p>
          </div>
          <button type="button" disabled className="mt-6 w-full rounded-xl bg-slate-200 px-5 py-3 text-sm font-bold text-slate-500">
            Payment integration coming soon - mentor will send a payment link
          </button>
          <Link href="/bookings" className="btn-primary mt-4 w-full">Got it -&gt;</Link>
        </section>
      </div>
    </main>
  );
}
