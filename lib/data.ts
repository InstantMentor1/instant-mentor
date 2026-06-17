import {
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  BriefcaseBusiness,
  Code2,
  Compass,
  GraduationCap,
  MessageCircleQuestion,
  Palette,
  Presentation,
  Sparkles,
  Users,
  WalletCards,
  Wrench,
} from "lucide-react";
import { technicalTracks as domainNames } from "@/lib/constants";

export const features = [
  { title: "Verified student access", text: "A focused learning network built around trust and real student identities.", icon: BadgeCheck },
  { title: "Domain-wise doubt rooms", text: "Ask specific questions where the right mentors and peers can respond.", icon: MessageCircleQuestion },
  { title: "Live Expert Talks", text: "Learn practical topics through interactive sessions, not passive recordings.", icon: Presentation },
  { title: "Faculty and industry mentors", text: "Get perspectives from educators and professionals doing the work.", icon: GraduationCap },
  { title: "Career guidance", text: "Move from uncertainty to a practical plan for internships, jobs, and growth.", icon: Compass },
  { title: "Community learning", text: "Learn with ambitious students who share your goals and domain.", icon: Users },
  { title: "Monthly subscription pass", text: "Access ongoing guidance through one simple, affordable membership.", icon: WalletCards },
  { title: "Mentor earnings dashboard", text: "Track sessions, student impact, and earnings in one place.", icon: BarChart3 },
];

const domainIcons = {
  "Full Stack Development": Code2,
  "AI & Machine Learning": Sparkles,
  "Data Analytics": BarChart3,
  "Cloud & DevOps": Wrench,
  Cybersecurity: BadgeCheck,
  "UI/UX for Technical Students": Palette,
  "Core Engineering Support": BookOpenCheck,
  "Placement Preparation": BriefcaseBusiness,
  "Resume & Interview Support": Presentation,
  "Career Roadmap Guidance": Compass,
};

export const domains = domainNames.map((name) => ({
  name,
  icon: domainIcons[name],
}));

export const plans = [
  {
    name: "Early Access Confirmation",
    price: "₹1",
    suffix: " one-time",
    description: "Confirm interest and unlock dashboard exploration. Mentor sessions are not included.",
    features: [
      "Explore mentors and Expert Talks",
      "View session plans",
      "Does not include a mentor session",
    ],
  },
  {
    name: "Single Session",
    price: "₹69",
    suffix: "/session",
    description: "Best for: Trying My Expert Talk once",
    features: [
      "One mentor guidance session",
      "Pre-session chat access",
      "Mentor acceptance based on expertise",
    ],
  },
  {
    name: "Launch Offer",
    price: "₹299",
    suffix: "/month",
    description: "Billed as ₹1,794 for 6 months. Best for: Early students starting with mentor support",
    popular: true,
    features: [
      "5 mentor guidance sessions/month",
      "Pre-session chat access",
      "Mentor-reviewed requests",
      "Community access",
    ],
  },
  {
    name: "Regular Plan",
    price: "₹399",
    suffix: "/month",
    description: "Best for: Consistent monthly mentor access",
    features: [
      "5 mentor guidance sessions/month",
      "Pre-session chat access",
      "Mentor-reviewed requests",
      "Community access",
      "Selected Expert Talks at ₹99",
    ],
  },
  {
    name: "Premium Plan",
    price: "₹999",
    suffix: "/month",
    description: "Best for: Career-focused students",
    features: [
      "10 mentor guidance sessions/month",
      "Any Expert Talk at ₹79",
      "Resume/interview support",
      "Career roadmap support",
      "Priority mentor access",
      "Pre-session chat access",
    ],
  },
];

export const faqs = [
  { question: "How does mentorship work?", answer: "Create an eligible student account, choose a plan or single session, submit a focused request, and wait for a mentor whose expertise fits the topic to review it." },
  { question: "Is the first session free?", answer: "No. The ₹1 payment confirms early-access interest and does not include a mentor session. The lowest-cost session option is a ₹69 single mentor guidance session." },
  { question: "How are mentors verified?", answer: "The My Expert Talk team reviews professional identity, relevant experience, expertise areas, and available professional profile evidence before marking a mentor as verified." },
  { question: "Who can join?", answer: "Engineering students, placement aspirants, fresh graduates, early-career professionals with eligible institutional accounts, and experienced professional or faculty mentors can apply." },
  { question: "How do subscriptions work?", answer: "Monthly plans provide a defined number of booking access and plan-specific Expert Talk pricing. The Launch Offer has a minimum six-month purchase; Single Session is purchased separately." },
  { question: "Can I switch mentors?", answer: "Session requests are matched and accepted based on mentor expertise. If a request is not a fit, it can be reviewed for another suitable mentor rather than forcing an unsuitable match." },
  { question: "What domains are available?", answer: "Current tracks include Full Stack Development, AI and Machine Learning, Data Analytics, Cloud and DevOps, Cybersecurity, UI/UX, core engineering, placement preparation, resume support, and career roadmaps." },
];
