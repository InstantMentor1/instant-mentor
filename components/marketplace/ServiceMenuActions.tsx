"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ServiceMenuActions({ id, status }: { id: string; status: "active" | "inactive" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function updateStatus() {
    setLoading(true);
    setError("");
    const response = await fetch("/api/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: status === "active" ? "inactive" : "active" }),
    });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) return setError(result.error ?? "Unable to update service.");
    router.refresh();
  }

  async function remove() {
    if (!window.confirm("Delete this service? Services with bookings can only be disabled.")) return;
    setLoading(true);
    setError("");
    const response = await fetch(`/api/services?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) return setError(result.error ?? "Unable to delete service.");
    router.refresh();
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button type="button" disabled={loading} onClick={updateStatus} className="btn-secondary !px-4 !py-2">{status === "active" ? "Disable" : "Activate"}</button>
        <button type="button" disabled={loading} onClick={remove} className="rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-50">Delete</button>
      </div>
      {error && <p className="mt-2 text-xs font-semibold text-red-700">{error}</p>}
    </div>
  );
}
