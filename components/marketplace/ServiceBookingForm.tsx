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
    learning_context: "",
    preferred_date: "",
    preferred_time: "",
    attachment_link: "",
    promo_code: "",
    add_on_recording: false,
    add_on_notes: false,
    deposit_acknowledged: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const addOnTotal = (formData.add_on_recording ? 199 : 0) + (formData.add_on_notes ? 299 : 0);
  const subtotal = price + addOnTotal;
  const discount = formData.promo_code.trim().toUpperCase() === "MET10" ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = Math.max(99, subtotal - discount);

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
      setError("Please acknowledge the Google Meet booking policy.");
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
        body: JSON.stringify({
          service_id: serviceId,
          institution_program: formData.learning_context,
          ...formData,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to start booking.");

      const checkout = new window.Razorpay({
        key: result.keyId,
        amount: result.amount,
        currency: result.currency,
        name: "My Expert Talk",
        description: result.serviceName,
        order_id: result.orderId,
        prefill: result.customer,
        theme: { color: "#2563eb" },
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
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-bold text-navy">{title}</p>
          <p className="mt-1 text-3xl font-black text-navy">₹{price.toLocaleString("en-IN")}</p>
          <p className="mt-1 text-xs text-navy">Fixed menu price · Google Meet delivery · Promo eligible</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-black">Add-ons</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold">
              <input
                type="checkbox"
                checked={formData.add_on_recording}
                onChange={(event) => setFormData((current) => ({ ...current, add_on_recording: event.target.checked }))}
              />
              <span>Session recording · ₹199</span>
            </label>
            <label className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold">
              <input
                type="checkbox"
                checked={formData.add_on_notes}
                onChange={(event) => setFormData((current) => ({ ...current, add_on_notes: event.target.checked }))}
              />
              <span>Detailed action-plan PDF · ₹299</span>
            </label>
          </div>
        </div>

        <Field label="Promo code">
          <input
            className="form-input"
            value={formData.promo_code}
            onChange={(event) => setFormData((current) => ({ ...current, promo_code: event.target.value.toUpperCase() }))}
            placeholder="Try MET10 for 10% off"
          />
        </Field>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm">
          <h2 className="font-black">Price breakup</h2>
          <div className="mt-3 space-y-2 text-slate-600">
            <p className="flex justify-between"><span>Menu service</span><span>₹{price.toLocaleString("en-IN")}</span></p>
            <p className="flex justify-between"><span>Session recording</span><span>{formData.add_on_recording ? "₹199" : "Not added"}</span></p>
            <p className="flex justify-between"><span>Action-plan PDF</span><span>{formData.add_on_notes ? "₹299" : "Not added"}</span></p>
            <p className="flex justify-between"><span>Promo</span><span>{discount ? `-₹${discount.toLocaleString("en-IN")}` : "Apply if available"}</span></p>
            <p className="flex justify-between border-t border-slate-200 pt-3 text-base font-black text-slate-900"><span>Total</span><span>₹{finalTotal.toLocaleString("en-IN")}</span></p>
          </div>
          <p className="mt-4 text-xs text-slate-500">My Expert Talk fee {fee.commissionPercent}% is included in the checkout calculation. Expert payout is calculated after successful payment.</p>
        </div>

        {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}

        <Field label="What exact outcome do you want from this menu service?">
          <textarea required minLength={50} rows={5} className="form-input" value={formData.specific_goal} onChange={(event) => setFormData((current) => ({ ...current, specific_goal: event.target.value }))} placeholder="Example: I need my project reviewed for assumptions, structure, and presentation before submission." />
        </Field>
        <Field label="What have you already tried?">
          <textarea required minLength={30} rows={4} className="form-input" value={formData.already_tried} onChange={(event) => setFormData((current) => ({ ...current, already_tried: event.target.value }))} placeholder="Share resources, attempts, drafts, blockers, or feedback you already received." />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Learning context">
            <input required className="form-input" value={formData.learning_context} onChange={(event) => setFormData((current) => ({ ...current, learning_context: event.target.value }))} placeholder="School, college, exam prep, career goal, or program" />
          </Field>
          <Field label="Attachment link (optional)">
            <input type="url" className="form-input" value={formData.attachment_link} onChange={(event) => setFormData((current) => ({ ...current, attachment_link: event.target.value }))} placeholder="Drive, portfolio, document, project link" />
          </Field>
          <Field label="Choose Google Meet date">
            <input required type="date" min={new Date().toISOString().slice(0, 10)} className="form-input" value={formData.preferred_date} onChange={(event) => setFormData((current) => ({ ...current, preferred_date: event.target.value }))} />
          </Field>
          <Field label="Choose Google Meet slot">
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
          <span>I understand the booking is delivered on Google Meet and no-shows may affect future booking access.</span>
        </label>
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Opening secure checkout..." : "Confirm Booking"}
        </button>
      </form>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold">{label}</span>{children}</label>;
}
