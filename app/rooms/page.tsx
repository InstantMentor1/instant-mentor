import Link from "next/link";
import { BadgeCheck, CalendarDays, Users, Video } from "lucide-react";

const rooms = [
  ["Placement Prep Room", "Priya Nair", "12 seats", "Saturday, 6:00 PM", "Fixed room price · ₹499"],
  ["SQL Practice Room", "Rohan Iyer", "10 seats", "Sunday, 11:00 AM", "Fixed room price · ₹699"],
  ["Resume Clinic Room", "Aarav Mehta", "8 seats", "Wednesday, 7:00 PM", "Fixed room price · ₹499"],
];

export default function RoomsPage() {
  return (
    <main className="bg-[#F8FAFC] py-12 text-[#0F172A]">
      <div className="container-shell">
        <section className="rounded-3xl border border-[#E2E8F0] bg-white p-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#2563EB]">Expert rooms</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.045em]">Join focused rooms led by verified experts.</h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Rooms are small-group learning spaces where experts set seats, schedule, pricing, resources, and delivery format.
          </p>
        </section>
        <section className="mt-6 grid gap-5 md:grid-cols-3">
          {rooms.map(([name, expert, seats, schedule, price]) => (
            <article key={name} className="rounded-3xl border border-[#E2E8F0] bg-white p-6 transition hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-lg">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2563EB]">
                <Users size={14} /> {seats}
              </span>
              <h2 className="mt-4 text-xl font-black">{name}</h2>
              <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-700">
                {expert} <BadgeCheck size={16} className="text-[#16A34A]" />
              </p>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p className="flex items-center gap-2"><CalendarDays size={16} className="text-[#2563EB]" /> {schedule}</p>
                <p className="flex items-center gap-2"><Video size={16} className="text-[#2563EB]" /> Google Meet delivery</p>
                <p>{price}</p>
              </div>
              <Link href="/signup" className="mt-5 inline-flex w-full justify-center rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-bold text-white hover:bg-[#1D4ED8]">Join Room</Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
