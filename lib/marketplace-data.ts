import "server-only";
import type { ExpertService } from "@/lib/marketplace";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

const mockServices: Record<string, ExpertService> = {
  "resume-review": {
    id: "resume-review",
    expert_id: "mock-priya-nair",
    title: "Resume Review for Freshers",
    category: "Resume Review",
    description: "Get your resume reviewed for clarity, shortlist readiness, and interview positioning before applying or attending walk-in drives.",
    target_audience: "Students, freshers, and placement aspirants preparing for campus or walk-in opportunities.",
    deliverables: "Resume feedback, improvement checklist, profile-positioning suggestions, and next-step guidance.",
    requirements: "Share your current resume and target role before booking.",
    price: 0,
    duration_minutes: 30,
    delivery_mode: "document_review",
    availability_notes: "Available today",
    max_bookings_per_week: 8,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    expert: { full_name: "Priya Nair", college_or_company: "HR Manager - TCS", linkedin_or_portfolio: null },
    rating: null,
    review_count: 0,
  },
  "software-mock-interview": {
    id: "software-mock-interview",
    expert_id: "mock-rahul-sharma",
    title: "Mock Interview for Software Roles",
    category: "Mock Interview",
    description: "Practice a realistic software interview with feedback on answers, confidence, structure, and technical clarity.",
    target_audience: "Students and freshers preparing for software engineering, data, or technology interviews.",
    deliverables: "Interview simulation, feedback notes, improvement areas, and practice roadmap.",
    requirements: "Share your resume, target role, and topics you want covered.",
    price: 0,
    duration_minutes: 45,
    delivery_mode: "video_call",
    availability_notes: "Evening slots",
    max_bookings_per_week: 6,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    expert: { full_name: "Rahul Sharma", college_or_company: "Senior Data Scientist - Amazon", linkedin_or_portfolio: null },
    rating: null,
    review_count: 0,
  },
  "career-roadmap": {
    id: "career-roadmap",
    expert_id: "mock-arjun-mehta",
    title: "Career Roadmap Session",
    category: "Career Guidance",
    description: "Clarify your next career move with a mentor-led roadmap across skills, projects, interviews, and role expectations.",
    target_audience: "Students, freshers, and early professionals who need career clarity before investing time or money.",
    deliverables: "Career roadmap, skill gap notes, recommended next actions, and role-fit guidance.",
    requirements: "Share your current stage, target roles, and biggest confusion.",
    price: 0,
    duration_minutes: 60,
    delivery_mode: "video_call",
    availability_notes: "Weekend",
    max_bookings_per_week: 5,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    expert: { full_name: "Arjun Mehta", college_or_company: "Product Manager - Flipkart", linkedin_or_portfolio: null },
    rating: null,
    review_count: 0,
  },
  "startup-validation": {
    id: "startup-validation",
    expert_id: "mock-arjun-mehta",
    title: "Startup Idea Validation",
    category: "Business & Startup",
    description: "Validate your startup or business idea with practical feedback on users, positioning, market risk, and next steps.",
    target_audience: "Student founders, early founders, SME owners, and builders testing a new idea.",
    deliverables: "Idea review, risk notes, validation checklist, and practical action points.",
    requirements: "Share your idea summary, target customer, and current progress.",
    price: 0,
    duration_minutes: 45,
    delivery_mode: "video_call",
    availability_notes: "Confirmed after request",
    max_bookings_per_week: 5,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    expert: { full_name: "Arjun Mehta", college_or_company: "Product Manager - Flipkart", linkedin_or_portfolio: null },
    rating: null,
    review_count: 0,
  },
  "project-review": {
    id: "project-review",
    expert_id: "mock-sneha-patel",
    title: "Project Review Session",
    category: "Project Support",
    description: "Review your academic, portfolio, or technical project before interviews, demos, or submissions.",
    target_audience: "Students preparing for placements, portfolios, viva, or project-based interviews.",
    deliverables: "Project feedback, improvement suggestions, presentation points, and portfolio tips.",
    requirements: "Share your project link, summary, and what you want reviewed.",
    price: 0,
    duration_minutes: 45,
    delivery_mode: "hybrid",
    availability_notes: "2 slots left",
    max_bookings_per_week: 6,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    expert: { full_name: "Sneha Patel", college_or_company: "GATE AIR 47, Engineer - DRDO", linkedin_or_portfolio: null },
    rating: null,
    review_count: 0,
  },
  "business-growth": {
    id: "business-growth",
    expert_id: "mock-arjun-mehta",
    title: "Business Growth Consultation",
    category: "Business & Startup",
    description: "Get practical guidance for improving operations, positioning, sales, or growth for a small business or early venture.",
    target_audience: "SME owners, student founders, and early operators looking for practical expert direction.",
    deliverables: "Growth audit, strategy inputs, execution checklist, and next-step priorities.",
    requirements: "Share your business context, current challenge, and growth goal.",
    price: 0,
    duration_minutes: 60,
    delivery_mode: "video_call",
    availability_notes: "Confirmed after request",
    max_bookings_per_week: 4,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    expert: { full_name: "Arjun Mehta", college_or_company: "Product Manager - Flipkart", linkedin_or_portfolio: null },
    rating: null,
    review_count: 0,
  },
};

export const demoServices: ExpertService[] = [
  {
    id: "resume-review",
    expert_id: "demo-aarav-mehta",
    title: "Resume Review for Freshers",
    category: "Resume",
    description: "Get your resume reviewed before applications, walk-in drives, or placement interviews.",
    target_audience: "Freshers and students preparing for interviews.",
    deliverables: "Resume feedback, shortlist-readiness suggestions, and improvement checklist.",
    requirements: "Share your current resume and target role.",
    price: 0,
    duration_minutes: 30,
    delivery_mode: "document_review",
    availability_notes: "Slots this week",
    max_bookings_per_week: 8,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    expert: { full_name: "Aarav Mehta", college_or_company: "Career Mentor", linkedin_or_portfolio: null },
    rating: null,
    review_count: 0,
  },
  {
    id: "software-mock-interview",
    expert_id: "demo-rohan-iyer",
    title: "Mock Interview for Software Roles",
    category: "Mock Interview",
    description: "Practice a realistic software interview and get feedback on your answers, confidence, and technical clarity.",
    target_audience: "Students preparing for software and technical interviews.",
    deliverables: "Mock interview, feedback notes, and preparation direction.",
    requirements: "Share your resume and target role.",
    price: 0,
    duration_minutes: 45,
    delivery_mode: "video_call",
    availability_notes: "Evening slots",
    max_bookings_per_week: 6,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    expert: { full_name: "Rohan Iyer", college_or_company: "Technology Mentor", linkedin_or_portfolio: null },
    rating: null,
    review_count: 0,
  },
  {
    id: "career-roadmap",
    expert_id: "demo-kavya-rao",
    title: "Career Roadmap Session",
    category: "Career",
    description: "Clarify your next steps with a mentor-guided roadmap for skills, projects, and interview preparation.",
    target_audience: "Students and freshers who need career clarity.",
    deliverables: "Career roadmap, skill-gap notes, and next actions.",
    requirements: "Share your current stage and goals.",
    price: 0,
    duration_minutes: 60,
    delivery_mode: "video_call",
    availability_notes: "Weekend slots",
    max_bookings_per_week: 5,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    expert: { full_name: "Kavya Rao", college_or_company: "Academic Educator", linkedin_or_portfolio: null },
    rating: null,
    review_count: 0,
  },
  {
    id: "gate-doubt-solving",
    expert_id: "demo-sneha-patel",
    title: "GATE Doubt Solving Session",
    category: "Exam",
    description: "Work through GATE doubts, exam strategy, and weak areas with an exam-focused mentor.",
    target_audience: "GATE aspirants and engineering students.",
    deliverables: "Doubt explanation, study direction, and exam practice suggestions.",
    requirements: "Share topic, question, or weak area before the session.",
    price: 0,
    duration_minutes: 45,
    delivery_mode: "video_call",
    availability_notes: "Daily slots",
    max_bookings_per_week: 8,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    expert: { full_name: "Sneha Patel", college_or_company: "Exam Mentor", linkedin_or_portfolio: null },
    rating: null,
    review_count: 0,
  },
  {
    id: "linkedin-profile-optimisation",
    expert_id: "demo-aarav-mehta",
    title: "LinkedIn Profile Optimisation",
    category: "Resume",
    description: "Improve your LinkedIn profile so recruiters and mentors quickly understand your strengths.",
    target_audience: "Students, freshers, and job seekers.",
    deliverables: "Profile feedback, headline suggestions, and positioning checklist.",
    requirements: "Share your LinkedIn profile link.",
    price: 0,
    duration_minutes: 30,
    delivery_mode: "document_review",
    availability_notes: "2 slots left",
    max_bookings_per_week: 6,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    expert: { full_name: "Aarav Mehta", college_or_company: "Career Mentor", linkedin_or_portfolio: null },
    rating: null,
    review_count: 0,
  },
  {
    id: "project-review",
    expert_id: "demo-rohan-iyer",
    title: "Project Review & Feedback",
    category: "Project",
    description: "Get expert feedback on your project before interviews, demos, portfolio reviews, or submissions.",
    target_audience: "Students preparing project portfolios.",
    deliverables: "Project feedback, improvement suggestions, and presentation points.",
    requirements: "Share your project link and short summary.",
    price: 0,
    duration_minutes: 45,
    delivery_mode: "hybrid",
    availability_notes: "This weekend",
    max_bookings_per_week: 6,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    expert: { full_name: "Rohan Iyer", college_or_company: "Technology Mentor", linkedin_or_portfolio: null },
    rating: null,
    review_count: 0,
  },
];

export async function getPublicServices(category?: string): Promise<ExpertService[]> {
  try {
    const admin = createSupabaseAdminClient();
    let query = admin
      .from("expert_services")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(24);
    if (category) query = query.eq("category", category);
    const { data: services, error } = await withTimeout(
      query,
      { data: [], error: null, count: null, status: 200, statusText: "OK", success: true },
      4500,
    );
    if (error) {
      console.error("Unable to load expert services", error);
      return [];
    }
    if (!services?.length) return [];

    const expertIds = Array.from(new Set(services.map((service) => service.expert_id)));
    const serviceIds = services.map((service) => service.id);
    const [{ data: profiles }, { data: reviews }] = await Promise.all([
      withTimeout(
        admin.from("profiles").select("user_id,full_name,college_or_company,linkedin_or_portfolio").in("user_id", expertIds),
        { data: [], error: null, count: null, status: 200, statusText: "OK", success: true },
        2500,
      ),
      withTimeout(
        admin.from("service_reviews").select("service_id,rating").in("service_id", serviceIds),
        { data: [], error: null, count: null, status: 200, statusText: "OK", success: true },
        2500,
      ),
    ]);
    const profileMap = new Map((profiles ?? []).map((profile) => [profile.user_id, profile]));

    return services.map((service) => {
      const serviceReviews = (reviews ?? []).filter((review) => review.service_id === service.id);
      return {
        ...service,
        price: Number(service.price),
        expert: profileMap.get(service.expert_id) ?? null,
        rating: serviceReviews.length
          ? serviceReviews.reduce((total, review) => total + review.rating, 0) / serviceReviews.length
          : null,
        review_count: serviceReviews.length,
      } as ExpertService;
    });
  } catch (error) {
    console.error("Unable to load public service marketplace", error);
    return [];
  }
}

function withTimeout<T>(promise: PromiseLike<T>, fallback: T, ms: number): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

export async function getPublicService(id: string): Promise<ExpertService | null> {
  try {
    const admin = createSupabaseAdminClient();
    const { data: service, error } = await admin.from("expert_services").select("*").eq("id", id).eq("status", "active").maybeSingle();
    if (error || !service) return mockServices[id] ?? demoServices.find((item) => item.id === id) ?? null;
    const [{ data: profile }, { data: reviews }] = await Promise.all([
      admin.from("profiles").select("full_name,college_or_company,linkedin_or_portfolio").eq("user_id", service.expert_id).maybeSingle(),
      admin.from("service_reviews").select("rating").eq("service_id", service.id),
    ]);
    return {
      ...service,
      price: Number(service.price),
      expert: profile,
      rating: reviews?.length ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length : null,
      review_count: reviews?.length ?? 0,
    } as ExpertService;
  } catch (error) {
    console.error("Unable to load expert service", error);
    return mockServices[id] ?? demoServices.find((item) => item.id === id) ?? null;
  }
}
