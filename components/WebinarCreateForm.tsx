"use client";

import { FormEvent, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { technicalTracks } from "@/lib/constants";

const fieldClass = "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100";

export default function WebinarCreateForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch("/api/webinars/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      formRef.current?.reset();
      setMessage("Webinar announced successfully.");
      router.push(`/webinars/${result.webinar.id}`);
      router.refresh();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to create webinar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={submit} className="card grid gap-4 p-6 sm:grid-cols-2">
      <label className="text-sm font-bold">Title<input className={fieldClass} name="title" required /></label>
      <label className="text-sm font-bold">Technical Track<select className={fieldClass} name="technicalTrack" required defaultValue=""><option value="" disabled>Select track</option>{technicalTracks.map((track) => <option key={track}>{track}</option>)}</select></label>
      <label className="text-sm font-bold sm:col-span-2">Description<textarea className={fieldClass} name="description" required rows={5} /></label>
      <label className="text-sm font-bold">Date and Time<input className={fieldClass} name="scheduledAt" type="datetime-local" required /></label>
      <label className="text-sm font-bold">Price (₹149–₹249)<input className={fieldClass} name="price" type="number" min="149" max="249" required /></label>
      <label className="text-sm font-bold">Duration<input className={fieldClass} value="60 minutes" readOnly /></label>
      <label className="text-sm font-bold">Maximum Participants<input className={fieldClass} name="maxParticipants" type="number" min="1" max="100" defaultValue="100" required /></label>
      <label className="text-sm font-bold">Regular Plan Discount<select className={fieldClass} name="accessType" defaultValue="regular"><option value="regular">Eligible for ₹99</option><option value="premium">Premium only discount</option></select></label>
      <label className="text-sm font-bold sm:col-span-2">Private Meeting Link<input className={fieldClass} name="meetingLink" type="url" placeholder="https://..." required /></label>
      <button disabled={loading} className="btn-primary sm:col-span-2">{loading && <Loader2 size={16} className="animate-spin" />} Create Webinar</button>
      {message && <p className="text-sm font-semibold text-teal-700 sm:col-span-2">{message}</p>}
      {error && <p className="text-sm font-semibold text-red-700 sm:col-span-2">{error}</p>}
    </form>
  );
}
