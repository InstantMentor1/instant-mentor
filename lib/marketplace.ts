export const marketplaceCategories = [
  "Finance & Accounting",
  "Technology & Engineering",
  "Law & Policy",
  "Healthcare & Medicine",
  "Marketing & Brand",
  "Data Science & AI",
  "Operations & Supply Chain",
  "Entrepreneurship & Strategy",
  "Academic Research",
  "Finance & Commerce",
  "School & Board Guidance",
  "Design & Product",
  "HR & Organisational Behaviour",
  "Economics & Public Policy",
  "Institution Programs",
] as const;

export const deliveryModes = [
  { value: "video_call", label: "Live 1:1" },
  { value: "chat", label: "Office hours / chat" },
  { value: "document_review", label: "Async doc review" },
  { value: "hybrid", label: "Group cohort / hybrid" },
] as const;

export const studentUserTypes = [
  "Undergraduate",
  "Postgraduate",
  "MBA",
  "PhD",
  "Research Scholar",
  "Recent Graduate",
] as const;

export type DeliveryMode = (typeof deliveryModes)[number]["value"];
export type ServiceStatus = "active" | "inactive";
export type BookingStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "scheduled"
  | "completed"
  | "cancelled";

export type ExpertService = {
  id: string;
  expert_id: string;
  title: string;
  category: string;
  description: string;
  target_audience: string;
  deliverables: string;
  requirements: string;
  price: number;
  duration_minutes: number;
  delivery_mode: DeliveryMode;
  availability_notes: string | null;
  max_bookings_per_week: number;
  status: ServiceStatus;
  created_at: string;
  updated_at: string;
  expert?: {
    full_name: string;
    college_or_company: string | null;
    linkedin_or_portfolio: string | null;
    is_verified?: boolean;
    verification_status?: string | null;
  } | null;
  rating?: number | null;
  review_count?: number;
};

export type ServiceBooking = {
  id: string;
  service_id: string;
  user_id: string;
  expert_id: string;
  user_goal: string;
  requirement_details: string;
  preferred_date: string;
  preferred_time: string;
  attachment_link: string | null;
  status: BookingStatus;
  meeting_link: string | null;
  scheduled_at: string | null;
  rejection_reason: string | null;
  price: number;
  payment_status: "pending" | "paid" | "failed" | "refunded";
  platform_commission_percent: number;
  expert_payout_percent: number;
  created_at: string;
  updated_at: string;
  service?: Pick<ExpertService, "title" | "category" | "duration_minutes"> | null;
  user?: { full_name: string; email: string } | null;
  expert?: { full_name: string; email: string } | null;
};

export function formatDeliveryMode(mode: DeliveryMode) {
  return deliveryModes.find((item) => item.value === mode)?.label ?? mode;
}

export function isExpertRole(role: string) {
  return ["Mentor", "Faculty", "Institution"].includes(role);
}

export function calculatePlatformFee(price: number) {
  const amount = Number(price);
  const commissionPercent = amount <= 1000 ? 15 : amount <= 3000 ? 20 : 25;
  const platformFee = Math.round(amount * commissionPercent) / 100;
  const smePayout = Math.max(0, amount - platformFee);
  return { commissionPercent, platformFee, smePayout };
}
