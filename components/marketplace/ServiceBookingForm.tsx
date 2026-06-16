"use client";

import Script from "next/script";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { calculatePlatformFee } from "@/lib/marketplace";

type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (response: RazorpayResponse) => Promise<void>;
  modal: { ondismiss: () => void };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

export default function ServiceBookingForm({
  serviceId,
  title,
  price,
}: {
  serviceId: string;
  title: string;
  price: number;
}) {
  const router = useRouter();
  const fee = calculatePlatformFee(price);
  const [formData, setFormData] = useState({
    specific_goal: "",
    already_tried: "",
    institution_program: "",
    preferred_date: "",
    preferred_time: "",
    attachment_link: "",
    deposit_acknowledged: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    if (formData.specific_goal.trim().length < 50) {
      setError("Please explain your specific goal in at least 50 characters.");
      return;
    }
    if (formData.already_tried.trim().length < 30) {
      setError("Please share what you already tried in at least 30 characters.");
      return;
    }
    if (!formData.deposit_acknowledged) {
      setError("Please acknowledge the booking deposit and no-show policy.");
      return;
    }
    if (!window.Razorpay) {
      setError("Secure checkout is still loading. Please try again.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/service-bookings/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service_id: serviceId, ...formData }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to start booking.");

      const checkout = new window.Razorpay({
        key: result.keyId,
        amount: result.amount,
        currency: result.currency,
        name: "Mentrix",
        description: result.serviceName,
        order_id: result.orderId,
        prefill: result.customer,
        theme: { color: "#087570" },
        handler: async (payment: RazorpayResponse) => {
          const verification = await fetch("/api/service-bookings/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ booking_id: result.bookingId, ...payment }),
          });
          const verificationResult = await verification.json();
          if (!verification.ok) {
            setLoading(false);
            setError(verificationResult.error ?? "Payment verification failed.");
            return;
          }
          router.push("/bookings?success=1");
          router.refresh();
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setError("Payment was cancelled. Your booking has not been confirmed.");
          },
        },
      });
      checkout.open();
    } catch (submissionError) {
      setLoading(false);
      setError(submissionError instanceof Error ? submissionError.message : "Unable to start booking.");
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
        <div className="rounded-2xl bg-teal-50 p-5">
          <p className="text-sm font-bold text-teal-800">{title}</p>
          <p className="mt-1 text-3xl font-black text-teal-900">₹{price.toLocaleString("en-IN")}</p>
          <p className="mt-1 text-xs text-teal-800">
            SME-set price · Mentrix commission {fee.commissionPercent}% · Estimated SME payout ₹{fee.smePayout.toLocaleString("en-IN")}
          </p>
        </div>
        {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}
        <Field label="What exact outcome do you want from this SME?">
          <textarea required minLength={50} rows={5} className="form-input" value={formData.specific_goal} onChange={(event) => setFormData((current) => ({ ...current, specific_goal: event.target.value }))} placeholder="Example: I need my finance project reviewed for assumptions, structure, and presentation before submission." />
        </Field>
        <Field label="What have you already tried?">
          <textarea required minLength={30} rows={4} className="form-input" value={formData.already_tried} onChange={(event) => setFormData((current) => ({ ...current, already_tried: event.target.value }))} placeholder="Share resources, attempts, drafts, blockers, or feedback you already received." />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Institution / program">
            <input required className="form-input" value={formData.institution_program} onChange={(event) => setFormData((current) => ({ ...current, institution_program: event.target.value }))} placeholder="College, school, MBA, PhD, or program" />
          </Field>
          <Field label="Attachment link (optional)">
            <input type="url" className="form-input" value={formData.attachment_link} onChange={(event) => setFormData((current) => ({ ...current, attachment_link: event.target.value }))} placeholder="Drive, portfolio, document, project link" />
          </Field>
          <Field label="Preferred date">
            <input required type="date" min={new Date().toISOString().slice(0, 10)} className="form-input" value={formData.preferred_date} onChange={(event) => setFormData((current) => ({ ...current, preferred_date: event.target.value }))} />
          </Field>
          <Field label="Preferred time or slot">
            <input required type="time" className="form-input" value={formData.preferred_time} onChange={(event) => setFormData((current) => ({ ...current, preferred_time: event.target.value }))} />
          </Field>
        </div>
        <label className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
          <input
            type="checkbox"
            className="mt-1"
            checked={formData.deposit_acknowledged}
            onChange={(event) => setFormData((current) => ({ ...current, deposit_acknowledged: event.target.checked }))}
          />
          <span>
            I understand the booking deposit is non-refundable if I miss the accepted session without cancelling in advance. Three no-shows can disable my booking access.
          </span>
        </label>
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Opening secure checkout..." : `Continue with ₹${price.toLocaleString("en-IN")} booking`}
        </button>
      </form>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold">{label}</span>{children}</label>;
}
