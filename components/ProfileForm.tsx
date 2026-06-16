"use client";

import { FormEvent, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { AuthProfile } from "@/lib/auth";
import { technicalTracks } from "@/lib/constants";

const fieldClass =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100";

export default function ProfileForm({
  profile,
  selectedTracks,
}: {
  profile: AuthProfile;
  selectedTracks: string[];
}) {
  const router = useRouter();
  const [tracks, setTracks] = useState(selectedTracks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const isMentor = ["Mentor", "Faculty", "Institution"].includes(profile.role);

  function toggleTrack(track: string) {
    setTracks((current) =>
      current.includes(track)
        ? current.filter((item) => item !== track)
        : [...current, track],
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    setSuccess("");

    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.get("fullName"),
          phone: form.get("phone"),
          collegeOrCompany: form.get("collegeOrCompany"),
          linkedinOrPortfolio: form.get("linkedinOrPortfolio"),
          technicalTracks: tracks,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setSuccess(result.message);
      router.refresh();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to update your profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="card grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
      <label className="text-sm font-bold text-slate-700">
        Full Name
        <input name="fullName" required defaultValue={profile.full_name} className={fieldClass} />
      </label>
      <label className="text-sm font-bold text-slate-700">
        Phone
        <input name="phone" required defaultValue={profile.phone ?? ""} className={fieldClass} />
      </label>
      <label className="text-sm font-bold text-slate-700 sm:col-span-2">
        College or Company
        <input name="collegeOrCompany" required defaultValue={profile.college_or_company ?? ""} className={fieldClass} />
      </label>
      <label className="text-sm font-bold text-slate-700 sm:col-span-2">
        LinkedIn or Portfolio {isMentor ? "" : "(optional)"}
        <input
          name="linkedinOrPortfolio"
          type="url"
          required={isMentor}
          defaultValue={profile.linkedin_or_portfolio ?? ""}
          placeholder="https://..."
          className={fieldClass}
        />
      </label>

      <fieldset className="rounded-2xl border border-slate-200 p-5 sm:col-span-2">
        <legend className="px-2 text-sm font-bold text-slate-700">
          {isMentor ? "Expertise Areas" : "Areas of Interest"}
        </legend>
        <p className="mb-4 text-sm text-slate-500">Select one or more relevant areas. Your first selection remains the primary area on your profile.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {technicalTracks.map((track) => (
            <label key={track} className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={tracks.includes(track)}
                onChange={() => toggleTrack(track)}
                className="mt-0.5 h-4 w-4 accent-teal-700"
              />
              {track}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600 sm:col-span-2">
        <strong>Email:</strong> {profile.email}<br />
        <strong>Account type:</strong> {isMentor ? "SME Partner" : profile.role === "Student" ? "Student" : profile.role}
        <p className="mt-1 text-xs">Email and account role cannot be changed here.</p>
      </div>

      {error && <div role="alert" className="flex gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:col-span-2"><AlertCircle size={18} />{error}</div>}
      {success && <div className="flex gap-2 rounded-xl border border-teal-200 bg-teal-50 p-4 text-sm text-teal-800 sm:col-span-2"><CheckCircle2 size={18} />{success}</div>}

      <button disabled={loading || tracks.length === 0} className="btn-primary sm:col-span-2">
        {loading && <Loader2 size={17} className="animate-spin" />}
        Save Profile Changes
      </button>
    </form>
  );
}
