import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { requireAuth } from "@/lib/auth";

export default async function StudentStrikesPage() {
  const { profile } = await requireAuth(["Student"]);
  const strikes = profile.strikes ?? 0;
  const disabled = profile.account_status === "disabled" || strikes >= 3;

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell max-w-3xl">
        <DashboardHeader
          profile={profile}
          title="Booking Access & No-Show Strikes"
          description="Mentrix protects SME time by tracking missed accepted sessions."
        />
        <div className="card p-7">
          <AlertTriangle className={disabled ? "text-red-600" : "text-amber-600"} size={34} />
          <h2 className="mt-4 text-3xl font-black">{strikes} / 3 strikes</h2>
          <p className="mt-3 leading-7 text-slate-600">
            If you miss an accepted session without cancelling in advance, a strike
            may be added. Three no-shows can disable booking access.
          </p>
          {disabled ? (
            <p className="mt-5 rounded-2xl bg-red-50 p-4 font-semibold text-red-800">
              Your booking access is disabled. Contact support@mentrix.in to appeal.
            </p>
          ) : (
            <p className="mt-5 rounded-2xl bg-teal-50 p-4 font-semibold text-teal-900">
              Your booking access is active. Keep showing up on time and cancelling early when needed.
            </p>
          )}
          <Link href="/bookings" className="btn-primary mt-6">View My Bookings</Link>
        </div>
      </div>
    </section>
  );
}
