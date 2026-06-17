import type { AuthProfile } from "@/lib/auth";
import type { AppRole } from "@/lib/auth-shared";

export default function DashboardHeader({
  profile,
  title,
  description,
}: {
  profile: AuthProfile;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 rounded-3xl bg-ink p-6 text-white sm:p-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-teal-100">
          {["Mentor", "Faculty", "Institution"].includes(profile.role)
            ? "Mentor"
            : profile.role === "Student"
              ? "Student"
              : profile.role as AppRole} workspace
        </span>
        <h1 className="mt-2 text-3xl font-black">{title}</h1>
        <p className="mt-2 text-slate-300">{description}</p>
      </div>
    </div>
  );
}
