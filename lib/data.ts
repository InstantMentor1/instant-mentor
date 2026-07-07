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
  { title: "Expert service menus", text: "Book focused expert-created services with clear outcomes, availability, and pricing.", icon: MessageCircleQuestion },
  { title: "Live Expert Talks", text: "Learn practical topics through interactive sessions, not passive recordings.", icon: Presentation },
  { title: "Faculty and industry mentors", text: "Get perspectives from educators and professionals doing the work.", icon: GraduationCap },
  { title: "Career guidance", text: "Move from uncertainty to a practical plan for internships, jobs, and growth.", icon: Compass },
  { title: "Community learning", text: "Learn with ambitious students who share your goals and domain.", icon: Users },
  { title: "Service-based learning", text: "Choose the exact expert service, room, micro-course, or support plan you need next.", icon: WalletCards },
  { title: "Expert earnings dashboard", text: "Track services, student impact, and earnings in one place.", icon: BarChart3 },
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
    name: "Expert Talks",
    price: "Live",
    suffix: " sessions",
    description: "Join live education sessions hosted by mentors, educators, and subject experts.",
    features: [
      "Career, academic, and skill sessions",
      "Online event-style learning",
      "Recordings when available",
    ],
  },
  {
    name: "Expert Services",
    price: "Expert-set",
    suffix: " pricing",
    description: "Book outcome-focused services created and priced by independent experts.",
    features: [
      "Resume reviews, mock interviews, project reviews",
      "Duration and deliverables shown upfront",
      "Availability confirmed before delivery",
    ],
  },
  {
    name: "Recordings",
    price: "On demand",
    suffix: " learning",
    description: "Access recorded expert talks, past learning sessions, and useful materials.",
    popular: true,
    features: [
      "Recorded expert sessions",
      "Skill resources",
      "Session materials",
    ],
  },
  {
    name: "Institution Programs",
    price: "Custom",
    suffix: " programs",
    description: "Bring expert-created services, rooms, talks, and guided learning programs to students at scale.",
    features: [
      "College or school programs",
      "Placement and academic support",
      "Expert-led learning drives",
    ],
  },
];

export const faqs = [
  { question: "How does expert-led support work?", answer: "Create an account, explore expert profiles or services, choose the support you need, and book an expert-created offer with clear outcomes." },
  { question: "Are service prices fixed by My Expert Talk?", answer: "No. Experts decide their own pricing based on duration, outcome, availability, format, and deliverables." },
  { question: "How are mentors verified?", answer: "The My Expert Talk team reviews professional identity, relevant experience, expertise areas, and available professional profile evidence before marking a mentor as verified." },
  { question: "Who can join?", answer: "Students, placement aspirants, fresh graduates, early-career professionals, mentors, educators, experts, and institutions can use My Expert Talk." },
  { question: "How do bookings work?", answer: "Students choose an expert service, share context, pick a preferred slot, and complete the booking flow. The expert can then manage the request from the dashboard." },
  { question: "Can I choose another expert?", answer: "You can browse expert profiles and services before booking. If a service is not a fit, you can choose another expert-created service." },
  { question: "What domains are available?", answer: "Current tracks include Full Stack Development, AI and Machine Learning, Data Analytics, Cloud and DevOps, Cybersecurity, UI/UX, core engineering, placement preparation, resume support, and career roadmaps." },
];
