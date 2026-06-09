export type Webinar = {
  id: string;
  mentor_id: string;
  title: string;
  description: string | null;
  technical_track: string;
  scheduled_at: string;
  meeting_link: string | null;
  price: number;
  duration_minutes: number;
  max_participants: number;
  status: "upcoming" | "live" | "completed" | "cancelled";
  access_type: "regular" | "premium";
  created_at: string;
  updated_at: string;
};

export function webinarPriceForPlan(
  planName: string | null | undefined,
  webinar: Pick<Webinar, "price" | "access_type">,
) {
  if (!planName || planName === "Single Session") {
    return { allowed: false, finalPrice: null, message: "Choose a plan to access webinars." };
  }
  if (planName === "Premium Plan") {
    return { allowed: true, finalPrice: 79, message: "Premium Plan webinar price: ₹79" };
  }
  if (planName === "Regular Plan" && webinar.access_type === "regular") {
    return { allowed: true, finalPrice: 99, message: "Regular Plan discount applied: ₹99" };
  }
  return { allowed: true, finalPrice: Number(webinar.price), message: `Webinar price: ₹${webinar.price}` };
}
