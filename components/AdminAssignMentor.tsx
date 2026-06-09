"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminAssignMentor({
  sessionId,
  mentors,
}: {
  sessionId: string;
  mentors: { user_id: string; full_name: string; technical_track: string | null }[];
}) {
  const router = useRouter();
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const mentorId = String(new FormData(event.currentTarget).get("mentorId") ?? "");
    const response = await fetch(`/api/sessions/${sessionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "assign", mentorId }),
    });
    const result = await response.json();
    if (!response.ok) return setError(result.error);
    setError("");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-4 flex flex-col gap-3 sm:flex-row">
      <select required name="mentorId" defaultValue="" className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm">
        <option value="" disabled>Assign a mentor</option>
        {mentors.map((mentor) => (
          <option key={mentor.user_id} value={mentor.user_id}>
            {mentor.full_name}{mentor.technical_track ? ` - ${mentor.technical_track}` : ""}
          </option>
        ))}
      </select>
      <button className="btn-primary !px-4 !py-2">Assign</button>
      {error && <p className="text-sm text-red-700">{error}</p>}
    </form>
  );
}
