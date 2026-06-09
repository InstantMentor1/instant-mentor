import RazorpayCheckout from "@/components/RazorpayCheckout";
import type { PaymentProductType } from "@/lib/payment-products";

const labels: Record<string, string> = {
  "Single Session": "Buy Single Session",
  "Launch Offer": "Choose Launch Offer",
  "Regular Plan": "Choose Regular Plan",
  "Premium Plan": "Upgrade to Premium",
};

const productTypes: Record<string, PaymentProductType> = {
  "Single Session": "single_session",
  "Launch Offer": "launch_offer",
  "Regular Plan": "regular_plan",
  "Premium Plan": "premium_plan",
};

export default function PlanSelector({
  planName,
  disabled = false,
}: {
  planName: string;
  disabled?: boolean;
}) {
  const productType = productTypes[planName];
  if (!productType) return null;

  return (
    <RazorpayCheckout
      productType={productType}
      label={disabled ? "Confirm ₹1 Interest First" : labels[planName] ?? "Select Plan"}
      disabled={disabled}
    />
  );
}
