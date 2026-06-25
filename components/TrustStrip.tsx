import { BadgeCheck, EyeOff, LockKeyhole, ShieldCheck, UserCheck } from "lucide-react";

const trustPoints = [
  { label: "Reviewed mentor profiles", icon: BadgeCheck },
  { label: "Student and expert accounts", icon: UserCheck },
  { label: "Private session conversations", icon: LockKeyhole },
  { label: "Protected meeting links", icon: EyeOff },
  { label: "Transparent request tracking", icon: ShieldCheck },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-slate-200 bg-white" aria-labelledby="trust-strip-title">
      <div className="container-shell py-7">
        <h2 id="trust-strip-title" className="sr-only">Trust and safety at My Expert Talk</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {trustPoints.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 text-sm font-bold text-slate-700">
              <span className="rounded-xl bg-teal-50 p-2 text-teal-700" aria-hidden="true">
                <Icon size={18} />
              </span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
