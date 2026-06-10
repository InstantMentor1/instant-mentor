export const marketplaceCategories = [
  "Career Support",
  "Resume Review",
  "Mock Interviews",
  "Project Review",
  "Technical Mentorship",
  "Academic Guidance",
  "Business Consultation",
  "Startup Guidance",
  "Digital Marketing",
  "Finance & Commerce",
  "Design & Product",
  "Data, AI & Cloud",
  "Sales, HR & Operations",
  "Institution Programs",
] as const;

export const deliveryModes = [
  { value: "video_call", label: "Video call" },
  { value: "chat", label: "Chat" },
  { value: "document_review", label: "Document review" },
  { value: "hybrid", label: "Hybrid" },
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

export const sampleServices: Array<
  Pick<
    ExpertService,
    "id" | "title" | "category" | "price" | "duration_minutes" | "deliverables" | "delivery_mode"
  > & { expertName: string; expertRole: string }
> = [
  {
    id: "resume-review",
    title: "Resume Review for Freshers",
    category: "Resume Review",
    price: 499,
    duration_minutes: 30,
    deliverables: "ATS feedback, resume correction, and a practical improvement plan.",
    delivery_mode: "document_review",
    expertName: "Verified Career Expert",
    expertRole: "Talent & Career Specialist",
  },
  {
    id: "software-mock-interview",
    title: "Mock Interview for Software Roles",
    category: "Mock Interviews",
    price: 1499,
    duration_minutes: 45,
    deliverables: "Interview simulation, focused feedback, and preparation plan.",
    delivery_mode: "video_call",
    expertName: "Verified Engineering Expert",
    expertRole: "Senior Software Professional",
  },
  {
    id: "career-roadmap",
    title: "Career Roadmap Session",
    category: "Career Support",
    price: 2999,
    duration_minutes: 60,
    deliverables: "Personal roadmap, skill-gap analysis, and clear next steps.",
    delivery_mode: "video_call",
    expertName: "Verified Industry Expert",
    expertRole: "Career Strategy Professional",
  },
  {
    id: "startup-validation",
    title: "Startup Idea Validation",
    category: "Startup Guidance",
    price: 1499,
    duration_minutes: 45,
    deliverables: "Idea review, market feedback, risks, and action points.",
    delivery_mode: "video_call",
    expertName: "Verified Founder",
    expertRole: "Startup Operator",
  },
  {
    id: "project-review",
    title: "Project Review Session",
    category: "Project Review",
    price: 999,
    duration_minutes: 45,
    deliverables: "Project feedback, improvement suggestions, and portfolio tips.",
    delivery_mode: "hybrid",
    expertName: "Verified Technical Expert",
    expertRole: "Product Engineering Professional",
  },
  {
    id: "business-growth",
    title: "Business Growth Consultation",
    category: "Business Consultation",
    price: 4999,
    duration_minutes: 60,
    deliverables: "Growth audit, strategy inputs, and an execution checklist.",
    delivery_mode: "video_call",
    expertName: "Verified Business Expert",
    expertRole: "Growth Consultant",
  },
];

export function formatDeliveryMode(mode: DeliveryMode) {
  return deliveryModes.find((item) => item.value === mode)?.label ?? mode;
}

export function isExpertRole(role: string) {
  return ["Mentor", "Faculty", "Institution"].includes(role);
}
