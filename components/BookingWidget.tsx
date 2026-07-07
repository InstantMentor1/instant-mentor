"use client";

import { useState } from "react";
import { InlineWidget } from "react-calendly";

interface BookingWidgetProps {
  mentorName: string;
  serviceName: string;
  duration: string;
  deliverable: string;
  calendlyUrl: string | undefined;
  mode?: "inline" | "popup";
}

export function BookingWidget({
  mentorName,
  serviceName,
  duration,
  deliverable,
  calendlyUrl,
  mode = "popup",
}: BookingWidgetProps) {
  const [showCalendly, setShowCalendly] = useState(false);

  if (!calendlyUrl) {
    return (
      <div className="rounded-xl border border-navy/10 bg-ivory p-4 text-center">
        <p className="text-sm font-bold text-navy">Slots opening soon</p>
        <p className="mt-1 text-xs text-slate-500">Join the waitlist - we&apos;ll notify you</p>
        <button type="button" className="mt-3 rounded-full border border-coral/25 px-4 py-2 text-xs font-bold text-coral hover:bg-peach">
          Notify me -&gt;
        </button>
      </div>
    );
  }

  const bookingSummary = (
    <div className="rounded-xl border border-navy/10 bg-ivory p-3">
      <p className="text-xs text-slate-500">You&apos;re booking</p>
      <p className="mt-1 text-sm font-bold text-navy">{serviceName}</p>
      <p className="mt-1 text-xs font-semibold text-coral">
        with {mentorName} · {duration}
      </p>
      <p className="mt-1 text-xs text-slate-500">-&gt; {deliverable}</p>
    </div>
  );

  const widget = (
    <>
      <InlineWidget
        url={calendlyUrl}
        styles={{ height: "650px", minWidth: "280px" }}
        pageSettings={{
          backgroundColor: "0f172a",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "2563eb",
          textColor: "f1f5f9",
        }}
      />
      <p className="mt-3 text-center text-xs text-slate-500">
        After booking, you&apos;ll receive a payment link and calendar invite by email.
      </p>
    </>
  );

  if (mode === "inline") {
    return (
      <div>
        <div className="mb-3">{bookingSummary}</div>
        {widget}
      </div>
    );
  }

  return (
    <div>
      {!showCalendly ? (
        <div className="space-y-3">
          {bookingSummary}
          <button type="button" onClick={() => setShowCalendly(true)} className="btn-primary w-full py-3 text-sm">
            Choose a time slot -&gt;
          </button>
          <p className="text-center text-xs text-slate-500">Fixed menu price · Apply promo code before payment</p>
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => setShowCalendly(false)}
            className="mb-3 flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-coral"
          >
            &larr; Back
          </button>
          {widget}
        </div>
      )}
    </div>
  );
}
