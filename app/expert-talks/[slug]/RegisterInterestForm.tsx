"use client";

import { useState } from "react";

export default function RegisterInterestForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-academic/20 bg-skysoft p-4 text-sm font-bold text-navy">
        Interest registered. We&apos;ll notify you when registration opens.
      </div>
    );
  }

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <label className="block">
        <span className="text-sm font-bold text-navy">Email</span>
        <input className="form-input mt-2" type="email" placeholder="you@example.com" required />
      </label>
      <button type="submit" className="btn-primary w-full">Register interest</button>
    </form>
  );
}
