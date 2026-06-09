export const paymentProductTypes = [
  "early_access",
  "single_session",
  "launch_offer",
  "regular_plan",
  "premium_plan",
] as const;

export type PaymentProductType = (typeof paymentProductTypes)[number];

export type PaymentProduct = {
  type: PaymentProductType;
  name: string;
  amountPaise: number;
  planName: string | null;
  credits: number;
  durationMonths: number | null;
};

export const paymentProducts: Record<PaymentProductType, PaymentProduct> = {
  early_access: {
    type: "early_access",
    name: "Early Access Interest Confirmation",
    amountPaise: 100,
    planName: null,
    credits: 0,
    durationMonths: null,
  },
  single_session: {
    type: "single_session",
    name: "Single Session",
    amountPaise: 6900,
    planName: "Single Session",
    credits: 1,
    durationMonths: null,
  },
  launch_offer: {
    type: "launch_offer",
    name: "Launch Offer",
    amountPaise: 179400,
    planName: "Launch Offer",
    credits: 5,
    durationMonths: 6,
  },
  regular_plan: {
    type: "regular_plan",
    name: "Regular Plan",
    amountPaise: 39900,
    planName: "Regular Plan",
    credits: 5,
    durationMonths: 1,
  },
  premium_plan: {
    type: "premium_plan",
    name: "Premium Plan",
    amountPaise: 99900,
    planName: "Premium Plan",
    credits: 10,
    durationMonths: 1,
  },
};

export function isPaymentProductType(value: unknown): value is PaymentProductType {
  return typeof value === "string" && paymentProductTypes.includes(value as PaymentProductType);
}
