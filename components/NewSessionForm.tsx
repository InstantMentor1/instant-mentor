"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";
import { sessionTypes, technicalTracks } from "@/lib/constants";

const fieldClass = "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100";

export default function NewSessionForm({ defaultTrack }: { defaultTrack?: string | null }) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sessionId, setSessionId] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setSuccess(result.warning ? `${result.message} ${result.warning}` : result.message);
      setSessionId(result.session.id);
      formRef.current?.reset();
      router.refresh();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to create session.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={submit} className="card grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
      <label className="text-sm font-bold text-slate-700">
        Technical Track
        <select name="technicalTrack" required defaultValue={defaultTrack ?? ""} className={fieldClass}>
          <option value="" disabled>Select track</option>
          {technicalTracks.map((track) => <option key={track}>{track}</option>)}
        </select>
      </label>
      <label className="text-sm font-bold text-slate-700">
        Session Type
        <select name="sessionType" required defaultValue="" className={fieldClass}>
          <option value="" disabled>Select type</option>
          {sessionTypes.map((type) => <option key={type}>{type}</option>)}
        </select>
      </label>
      <label className="text-sm font-bold text-slate-700 sm:col-span-2">
        Topic
        <input name="title" required maxLength={160} className={fieldClass} />
      </label>
      <label className="text-sm font-bold text-slate-700 sm:col-span-2">
        What do you need help with?
        <textarea name="description" required rows={5} maxLength={3000} className={fieldClass} />
      </label>
      <label className="text-sm font-bold text-slate-700">
        Preferred Date
        <input name="preferredDate" type="date" required className={fieldClass} />
      </label>
      <label className="text-sm font-bold text-slate-700">
        Preferred Time
        <input name="preferredTime" type="time" required className={fieldClass} />
      </label>
      <label className="text-sm font-bold text-slate-700 sm:col-span-2">
        Attachment Link (optional)
        <input name="attachmentLink" type="url" placeholder="https://..." className={fieldClass} />
      </label>
      {error && <div className="flex gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:col-span-2"><AlertCircle size={18} />{error}</div>}
      {success && <div className="rounded-xl border border-teal-200 bg-teal-50 p-4 text-sm text-teal-800 sm:col-span-2">{success}{sessionId && <> <a className="font-bold underline" href={`/sessions/${sessionId}`}>View request</a></>}</div>}
      <button disabled={loading} className="btn-primary sm:col-span-2">
        {loading && <Loader2 size={17} className="animate-spin" />} Submit Session Request
      </button>
    </form>
  );
}
