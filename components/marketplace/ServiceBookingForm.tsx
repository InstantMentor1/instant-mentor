"use client";

import Script from "next/script";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const [formData, setFormData] = useState({
    optional_note: "",
    preferred_date: "",
    preferred_time: "",
    attachment_link: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
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
        name: "Instant Mentor",
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
          <p className="mt-1 text-xs text-teal-800">Expert-set price · Existing Razorpay test checkout</p>
        </div>
        {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Preferred date">
            <input required type="date" min={new Date().toISOString().slice(0, 10)} className="form-input" value={formData.preferred_date} onChange={(event) => setFormData((current) => ({ ...current, preferred_date: event.target.value }))} />
          </Field>
          <Field label="Preferred time or slot">
            <input required type="time" className="form-input" value={formData.preferred_time} onChange={(event) => setFormData((current) => ({ ...current, preferred_time: event.target.value }))} />
          </Field>
        </div>
        <Field label="Optional note for the expert">
          <textarea rows={5} className="form-input" value={formData.optional_note} onChange={(event) => setFormData((current) => ({ ...current, optional_note: event.target.value }))} placeholder="Share useful context, your goal, or anything the expert should know before accepting." />
        </Field>
        <Field label="Attachment link (optional)">
          <input type="url" className="form-input" value={formData.attachment_link} onChange={(event) => setFormData((current) => ({ ...current, attachment_link: event.target.value }))} placeholder="Google Drive, portfolio, document, or project link" />
        </Field>
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
