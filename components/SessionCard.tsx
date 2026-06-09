import Link from "next/link";
import { CalendarDays, MessageSquare, Video } from "lucide-react";
import { canSeeMeetingLink, type SessionRequest } from "@/lib/sessions";

const badgeColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-800",
  assigned: "bg-indigo-50 text-indigo-800",
  accepted: "bg-blue-50 text-blue-800",
  scheduled: "bg-teal-50 text-teal-800",
  completed: "bg-slate-100 text-slate-700",
  rejected: "bg-red-50 text-red-800",
  cancelled: "bg-slate-100 text-slate-600",
};

export default function SessionCard({ session }: { session: SessionRequest }) {
  return (
    <article className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700">{session.technical_track}</p>
          <h3 className="mt-2 text-lg font-extrabold">{session.title}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${badgeColors[session.status]}`}>
          {session.status}
        </span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{session.description}</p>
      <p className="mt-4 flex items-center gap-2 text-sm text-slate-600">
        <CalendarDays size={16} />
        {session.scheduled_at
          ? new Date(session.scheduled_at).toLocaleString("en-IN")
          : `${session.preferred_date} at ${session.preferred_time}`}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Link href={`/sessions/${session.id}`} className="btn-secondary !px-4 !py-2">View details</Link>
        <Link href={`/messages/${session.id}`} className="btn-secondary !px-4 !py-2">
          <MessageSquare size={15} /> Chat
        </Link>
        {canSeeMeetingLink(session) && (
          <a href={session.meeting_link!} target="_blank" rel="noreferrer" className="btn-primary !px-4 !py-2">
            <Video size={15} /> Join meeting
          </a>
        )}
      </div>
    </article>
  );
}
