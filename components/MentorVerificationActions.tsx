"use client";

import { useRouter } from "next/navigation";

export default function MentorVerificationActions({ mentorId }: { mentorId: string }) {
  const router = useRouter();
  async function update(status: "verified" | "rejected") {
    await fetch("/api/admin/verify-mentor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mentorId, status }),
    });
    router.refresh();
  }
  return <div className="mt-4 flex gap-2"><button onClick={() => update("verified")} className="btn-primary !px-4 !py-2">Verify</button><button onClick={() => update("rejected")} className="btn-secondary !px-4 !py-2">Reject</button></div>;
}
