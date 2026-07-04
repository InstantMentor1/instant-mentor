import type { Metadata } from "next";
import PaymentConfirmClient from "./PaymentConfirmClient";

export const metadata: Metadata = {
  title: "Confirm Payment | My Expert Talk",
  description: "Confirm your Calendly slot and understand the temporary payment bridge on My Expert Talk.",
};

export default function PaymentConfirmPage() {
  return <PaymentConfirmClient />;
}
