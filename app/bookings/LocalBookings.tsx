"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type LocalBooking = {
  mentor: string;
  mentorSlug?: string;
  service: string;
  serviceSlug?: string;
  student?: string;
  dateTime: string;
  status: "Upcoming" | "Completed";
};

export default function LocalBookings() {
  const [bookings, setBookings] = useState<LocalBooking[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("met_bookings");
      setBookings(raw ? JSON.parse(raw) : []);
    } catch {
      setBookings([]);
    }
  }, []);

  if (bookings.length === 0) {
    return (
      <div className="card mt-6 p-10 text-center">
        <h2 className="text-xl font-black">No Calendly bookings saved on this device.</h2>
        <p className="mt-2 text-slate-600">Browse expert-created services to choose a slot and start your preparation.</p>
        <Link href="/services" className="btn-primary mt-6">Browse expert services</Link>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-2">
      {bookings.map((booking, index) => (
        <article key={`${booking.mentor}-${booking.service}-${index}`} className="card p-6">
          <div className="flex justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-coral">{booking.mentor}</p>
              <h2 className="mt-2 text-xl font-black">{booking.service}</h2>
            </div>
            <span className="h-fit rounded-full bg-peach px-3 py-1 text-xs font-bold text-coral">{booking.status}</span>
          </div>
          <p className="mt-4 text-sm text-slate-600">Saved from Calendly confirmation on this device.</p>
          <p className="mt-3 text-sm font-bold text-navy">{booking.dateTime}</p>
        </article>
      ))}
    </div>
  );
}
