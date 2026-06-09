"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

const labels: Record<string, string> = {
  "Single Session": "Buy Single Session",
  "Launch Offer": "Choose Launch Offer",
  "Regular Plan": "Choose Regular Plan",
  "Premium Plan": "Upgrade to Premium",
};

export default function PlanSelector({ planId, planName }: { planId: string; planName: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function selectPlan() {
    if (loading) return;
    setLoading(true);
    const response = await fetch("/api/billing/select-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId }),
    });
    const result = await response.json();
    setMessage(result.message ?? result.error);
    setLoading(false);
  }

  return (
    <>
      <button onClick={selectPlan} disabled={loading} className="btn-primary w-full">
        {loading && <Loader2 size={16} className="animate-spin" />} {labels[planName] ?? "Select Plan"}
      </button>
      {message && <p className="mt-3 text-sm text-slate-600">{message}</p>}
    </>
  );
}
