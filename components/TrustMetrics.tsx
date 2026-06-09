"use client";

import { useEffect, useRef, useState } from "react";
import { BadgeCheck, Building2, CalendarCheck2, GraduationCap, Users } from "lucide-react";

export type MarketplaceMetrics = {
  studentsMentored: number;
  activeMentors: number;
  sessionsConducted: number;
  institutionsRepresented: number;
  communityMembers: number;
};

const metricDefinitions = [
  { key: "studentsMentored", label: "Students mentored", icon: GraduationCap },
  { key: "activeMentors", label: "Verified mentors", icon: BadgeCheck },
  { key: "sessionsConducted", label: "Sessions conducted", icon: CalendarCheck2 },
  { key: "institutionsRepresented", label: "Institutions represented", icon: Building2 },
  { key: "communityMembers", label: "Community members", icon: Users },
] as const;

export default function TrustMetrics({ metrics }: { metrics: MarketplaceMetrics }) {
  return (
    <section className="border-y border-slate-200 bg-white" aria-labelledby="trust-metrics-title">
      <div className="container-shell py-8 sm:py-10">
        <div className="mb-7 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">Live platform activity</p>
          <h2 id="trust-metrics-title" className="mt-2 text-2xl font-black tracking-tight text-ink">
            Trust built through real participation
          </h2>
        </div>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {metricDefinitions.map(({ key, label, icon: Icon }) => (
            <div key={key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center sm:p-5">
              <Icon className="mx-auto text-teal-700" size={21} aria-hidden="true" />
              <dd className="mt-3 text-3xl font-black tabular-nums text-ink">
                <CountUp value={metrics[key]} label={label} />
              </dd>
              <dt className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">{label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-center text-xs text-slate-500">
          Counts are calculated from current platform records. “Institutions represented” does not imply a formal partnership.
        </p>
      </div>
    </section>
  );
}

function CountUp({ value, label }: { value: number; label: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || value <= 0) {
      setDisplayValue(value);
      return;
    }

    const startedAt = performance.now();
    const duration = 900;

    const update = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(update);
    };

    frameRef.current = requestAnimationFrame(update);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [value]);

  return <span aria-label={`${value} ${label}`}>{new Intl.NumberFormat("en-IN").format(displayValue)}</span>;
}
