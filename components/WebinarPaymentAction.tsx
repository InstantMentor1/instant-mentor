"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WebinarPaymentAction({ registrationId }: { registrationId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function confirm() {
    setLoading(true);
    const response = await fetch("/api/admin/webinar-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registrationId }),
    });
    setLoading(false);
    if (response.ok) router.refresh();
  }
  return <button disabled={loading} onClick={confirm} className="btn-primary !px-4 !py-2">{loading ? "Confirming..." : "Mark Paid & Confirm"}</button>;
}
