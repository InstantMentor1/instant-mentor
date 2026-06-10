"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingStatusActions({ id, status, paymentStatus }: { id: string; status: string; paymentStatus: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduledAt, setScheduledAt] = useState("");
  const [meetingLink, setMeetingLink] = useState("");

  async function update(nextStatus: string, extra: Record<string, string> = {}) {
    setLoading(true);
    setError("");
    const response = await fetch("/api/service-bookings/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: nextStatus, ...extra }),
    });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) return setError(result.error ?? "Unable to update booking.");
    setScheduleOpen(false);
    router.refresh();
  }

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        {status === "pending" && <button disabled={loading || paymentStatus !== "paid"} onClick={() => update("accepted")} className="btn-primary !px-4 !py-2 disabled:opacity-50">Accept</button>}
        {["pending", "accepted"].includes(status) && <button disabled={loading} onClick={() => update("rejected", { rejection_reason: "The expert could not accept this request." })} className="btn-secondary !px-4 !py-2">Reject</button>}
        {status === "accepted" && <button disabled={loading} onClick={() => setScheduleOpen(true)} className="btn-secondary !px-4 !py-2">Schedule</button>}
        {status === "scheduled" && <button disabled={loading} onClick={() => update("completed")} className="btn-primary !px-4 !py-2">Mark Completed</button>}
      </div>
      {paymentStatus !== "paid" && status === "pending" && <p className="mt-2 text-xs font-semibold text-amber-700">Waiting for confirmed payment.</p>}
      {scheduleOpen && <div className="mt-4 grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2"><input type="datetime-local" className="form-input" value={scheduledAt} onChange={(event) => setScheduledAt(event.target.value)} /><input type="url" className="form-input" placeholder="Private meeting link" value={meetingLink} onChange={(event) => setMeetingLink(event.target.value)} /><button disabled={!scheduledAt || !meetingLink || loading} onClick={() => update("scheduled", { scheduled_at: scheduledAt, meeting_link: meetingLink })} className="btn-primary sm:col-span-2">Confirm Schedule</button></div>}
      {error && <p className="mt-2 text-xs font-semibold text-red-700">{error}</p>}
    </div>
  );
}
