"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ChatBox({ sessionId }: { sessionId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    const form = event.currentTarget;
    const message = String(new FormData(form).get("message") ?? "").trim();
    if (!message) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/messages/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      formRef.current?.reset();
      router.refresh();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to send message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={send} className="mt-5 flex flex-col gap-3 sm:flex-row">
      <input name="message" required maxLength={2000} placeholder="Write a message..." className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100" />
      <button disabled={loading} className="btn-primary">{loading && <Loader2 size={16} className="animate-spin" />} Send</button>
      {error && <p className="text-sm text-red-700 sm:basis-full">{error}</p>}
    </form>
  );
}
