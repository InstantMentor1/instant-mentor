"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const fieldClass = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100";

export default function MentorSessionActions({ sessionId, status }: { sessionId: string; status: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function update(action: "accept" | "schedule" | "reject", form: HTMLFormElement) {
    setLoading(true);
    setError("");
    const payload = { action, ...Object.fromEntries(new FormData(form).entries()) };
    try {
      const response = await fetch(`/api/sessions/${sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      router.refresh();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Unable to update session.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {status === "assigned" ? (
        <form onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); void update("accept", event.currentTarget); }} className="rounded-2xl border border-teal-200 bg-teal-50 p-5">
          <h3 className="font-extrabold">Accept request</h3>
          <p className="mt-2 text-sm text-slate-600">Confirm this request matches your expertise. You can schedule it after accepting.</p>
          <button disabled={loading} className="btn-primary mt-4">{loading && <Loader2 size={16} className="animate-spin" />} Accept request</button>
        </form>
      ) : (
        <form onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); void update("schedule", event.currentTarget); }} className="rounded-2xl border border-teal-200 bg-teal-50 p-5">
          <h3 className="font-extrabold">Schedule accepted session</h3>
          <input className={`${fieldClass} mt-4`} required name="scheduledAt" type="datetime-local" aria-label="Scheduled date and time" />
          <input className={`${fieldClass} mt-3`} required name="meetingLink" type="url" placeholder="https://meet.google.com/..." aria-label="Meeting link" />
          <button disabled={loading} className="btn-primary mt-4">{loading && <Loader2 size={16} className="animate-spin" />} Schedule session</button>
        </form>
      )}
      <form onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); void update("reject", event.currentTarget); }} className="rounded-2xl border border-red-200 bg-red-50 p-5">
        <h3 className="font-extrabold">Reject request</h3>
        <textarea className={`${fieldClass} mt-4`} required name="rejectionReason" rows={3} placeholder="Explain why this request cannot be accepted" />
        <button disabled={loading} className="btn-secondary mt-4 border-red-300 text-red-800">Reject session</button>
      </form>
      {error && <p className="text-sm font-semibold text-red-700 lg:col-span-2">{error}</p>}
    </div>
  );
}
