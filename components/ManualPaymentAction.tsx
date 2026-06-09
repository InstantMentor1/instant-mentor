"use client";

import { useRouter } from "next/navigation";

export default function ManualPaymentAction({ paymentId }: { paymentId: string }) {
  const router = useRouter();
  async function markPaid() {
    const reference = window.prompt("Payment reference (optional)") ?? "";
    const response = await fetch("/api/admin/manual-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId, paymentReference: reference }),
    });
    if (response.ok) router.refresh();
  }
  return <button onClick={markPaid} className="btn-primary !px-4 !py-2">Mark paid</button>;
}
