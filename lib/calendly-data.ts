export type MentorCalendlyProfile = {
  name: string;
  slug: string;
  title: string;
  calendlyBaseUrl: string;
  calendlyUrls: Record<string, string>;
};

export const mentorCalendlyProfiles: Record<string, MentorCalendlyProfile> = {
  "priya-nair": {
    name: "Priya Nair",
    slug: "priya-nair",
    title: "HR Manager",
    calendlyBaseUrl: "https://calendly.com/myexperttalk-priya",
    calendlyUrls: {
      "hr-round-practice": "https://calendly.com/myexperttalk-priya/hr-round",
      "self-introduction": "https://calendly.com/myexperttalk-priya/self-introduction",
      "software-mock-interview": "https://calendly.com/myexperttalk-priya/hr-round",
      "career-roadmap": "https://calendly.com/myexperttalk-priya/self-introduction",
    },
  },
  "aarav-mehta": {
    name: "Aarav Mehta",
    slug: "aarav-mehta",
    title: "Career Mentor",
    calendlyBaseUrl: "https://calendly.com/myexperttalk-aarav",
    calendlyUrls: {
      "resume-review": "https://calendly.com/myexperttalk-aarav/resume-review",
      "linkedin-profile-optimisation": "https://calendly.com/myexperttalk-aarav/linkedin",
      "linkedin-optimisation": "https://calendly.com/myexperttalk-aarav/linkedin",
    },
  },
  "kavya-rao": {
    name: "Kavya Rao",
    slug: "kavya-rao",
    title: "Academic Educator",
    calendlyBaseUrl: "https://calendly.com/myexperttalk-kavya",
    calendlyUrls: {
      "career-roadmap": "https://calendly.com/myexperttalk-kavya/career-roadmap",
      "mba-decision": "https://calendly.com/myexperttalk-kavya/mba-decision",
    },
  },
  "rohan-iyer": {
    name: "Rohan Iyer",
    slug: "rohan-iyer",
    title: "Technology Mentor",
    calendlyBaseUrl: "https://calendly.com/myexperttalk-rohan",
    calendlyUrls: {
      "software-mock-interview": "https://calendly.com/myexperttalk-rohan/mock-interview",
      "mock-interview": "https://calendly.com/myexperttalk-rohan/mock-interview",
      "project-review": "https://calendly.com/myexperttalk-rohan/project-review",
      "system-design": "https://calendly.com/myexperttalk-rohan/system-design",
    },
  },
  "meera-shah": {
    name: "Meera Shah",
    slug: "meera-shah",
    title: "Skill Coach",
    calendlyBaseUrl: "https://calendly.com/myexperttalk-meera",
    calendlyUrls: {
      communication: "https://calendly.com/myexperttalk-meera/communication",
      "workplace-confidence": "https://calendly.com/myexperttalk-meera/workplace",
      "career-roadmap": "https://calendly.com/myexperttalk-meera/workplace",
    },
  },
};

export const serviceMentorMap: Record<string, Array<{
  mentorSlug: keyof typeof mentorCalendlyProfiles;
  serviceKey: string;
  serviceName: string;
  duration: string;
  deliverable: string;
}>> = {
  "resume-review": [
    {
      mentorSlug: "aarav-mehta",
      serviceKey: "resume-review",
      serviceName: "Resume Review for Freshers",
      duration: "30 min",
      deliverable: "Annotated PDF + 3 priority fixes",
    },
  ],
  "software-mock-interview": [
    {
      mentorSlug: "rohan-iyer",
      serviceKey: "software-mock-interview",
      serviceName: "Mock Interview for Software Roles",
      duration: "45 min",
      deliverable: "Performance breakdown + weak areas",
    },
  ],
  "career-roadmap": [
    {
      mentorSlug: "kavya-rao",
      serviceKey: "career-roadmap",
      serviceName: "Career Roadmap Session",
      duration: "60 min",
      deliverable: "90-day action plan PDF",
    },
  ],
  "project-review": [
    {
      mentorSlug: "rohan-iyer",
      serviceKey: "project-review",
      serviceName: "Project Review Session",
      duration: "45 min",
      deliverable: "Improvement notes + presentation tips",
    },
  ],
};

export const talkCalendlyUrls: Record<string, string> = {
  "placement-prep-sprint": "https://calendly.com/myexperttalk/placement-prep-sprint",
  "ai-tools-students": "https://calendly.com/myexperttalk/ai-tools-students",
  "exam-strategy-clinic": "https://calendly.com/myexperttalk/exam-strategy-clinic",
  "project-portfolio-review": "https://calendly.com/myexperttalk/portfolio-review",
};
