"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WebinarRegisterButton({ webinarId }: { webinarId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  async function register() {
    if (loading) return;
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/webinars/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ webinarId }),
    });
    const result = await response.json();
    setMessage(response.ok ? `${result.message}. Payment status: pending.` : result.error);
    if (response.ok) router.refresh();
    setLoading(false);
  }
  return <div><button onClick={register} disabled={loading} className="btn-primary !px-4 !py-2">{loading && <Loader2 size={15} className="animate-spin" />} Join Webinar</button>{message && <p className="mt-2 text-sm font-semibold text-slate-600">{message}</p>}</div>;
}
