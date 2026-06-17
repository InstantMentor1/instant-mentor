"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import type { PaymentProductType } from "@/lib/payment-products";

type RazorpaySuccess = {
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
  handler: (response: RazorpaySuccess) => Promise<void>;
  modal: { ondismiss: () => void };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

export default function RazorpayCheckout({
  productType,
  label,
  disabled = false,
  className = "btn-primary w-full",
}: {
  productType: PaymentProductType;
  label: string;
  disabled?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function startPayment() {
    if (loading || disabled) return;
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await loadRazorpayScript();
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_type: productType }),
      });
      const order = await response.json();
      if (!response.ok) throw new Error(order.error ?? "Unable to create payment order.");
      if (!window.Razorpay) throw new Error("Razorpay checkout could not be loaded.");

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "My Expert Talk",
        description: order.productName,
        order_id: order.orderId,
        prefill: order.customer,
        theme: { color: "#087570" },
        handler: async (paymentResponse) => {
          try {
            const verifyResponse = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(paymentResponse),
            });
            const result = await verifyResponse.json();
            if (!verifyResponse.ok) throw new Error(result.error ?? "Payment verification failed.");
            setMessage(result.message);
            router.refresh();
          } catch (verificationError) {
            setError(
              verificationError instanceof Error
                ? verificationError.message
                : "Payment verification failed.",
            );
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setError("Payment was cancelled. No access changes were made.");
          },
        },
      });
      checkout.open();
    } catch (paymentError) {
      setError(paymentError instanceof Error ? paymentError.message : "Unable to start payment.");
      setLoading(false);
    }
  }

  return (
    <>
      <button type="button" onClick={startPayment} disabled={loading || disabled} className={className}>
        {loading && <Loader2 size={16} className="animate-spin" />}
        {label}
      </button>
      {error && (
        <p className="mt-3 flex items-start gap-2 text-sm text-red-700" role="alert">
          <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
        </p>
      )}
      {message && <p className="mt-3 text-sm font-semibold text-teal-700" role="status">{message}</p>}
    </>
  );
}

function loadRazorpayScript() {
  if (window.Razorpay) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Razorpay checkout could not be loaded.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay checkout could not be loaded."));
    document.body.appendChild(script);
  });
}
