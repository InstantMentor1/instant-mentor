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
  { title: "Live webinars", text: "Learn practical topics through interactive sessions, not passive recordings.", icon: Presentation },
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
    name: "Single Session",
    price: "₹69",
    suffix: "/session",
    description: "Best for: Trying Instant Mentor once",
    features: [
      "One doubt-solving session",
      "Pre-session chat access",
      "Mentor acceptance based on expertise",
    ],
  },
  {
    name: "Launch Offer",
    price: "₹299",
    suffix: "/month",
    description: "Minimum 6-month purchase. Total ₹1,794 for 6 months. Best for: Early students starting with mentor support",
    features: [
      "5 doubt-solving sessions/month",
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
    popular: true,
    features: [
      "5 doubt-solving sessions/month",
      "Pre-session chat access",
      "Mentor-reviewed requests",
      "Community access",
      "Selected webinars at ₹99",
    ],
  },
  {
    name: "Premium Plan",
    price: "₹999",
    suffix: "/month",
    description: "Best for: Career-focused students",
    features: [
      "10 doubt-solving sessions/month",
      "Any webinar at ₹79",
      "Resume/interview support",
      "Career roadmap support",
      "Priority mentor access",
      "Pre-session chat access",
    ],
  },
];

export const faqs = [
  { question: "Who can join Instant Mentor?", answer: "Verified students, faculty, mentors, and industry experts." },
  { question: "Is it only for one subject?", answer: "No. Instant Mentor is built across domains, starting with selected high-demand areas." },
  { question: "How are students verified?", answer: "Through an eligible institutional email and, when needed, a manual account review." },
  { question: "Are doubts unlimited?", answer: "Students get unlimited community access with fair-use priority doubt credits depending on their plan." },
  { question: "Can mentors earn money?", answer: "Yes. Mentors and faculty can earn through doubt-clearing, live sessions, webinars, and revenue-sharing models." },
  { question: "Is this a course platform?", answer: "No. Instant Mentor combines doubt support, mentorship, webinars, community learning, and career guidance." },
];
