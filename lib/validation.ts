export const roles = ["Student", "Mentor", "Faculty", "Institution"] as const;
export type WaitlistRole = (typeof roles)[number];

export type WaitlistFormData = {
  fullName: string;
  email: string;
  phone: string;
  role: WaitlistRole | "";
  collegeOrCompany: string;
  domainOfInterest: string;
  linkedinOrPortfolio: string;
  message: string;
};

export type WaitlistField = keyof WaitlistFormData;
export type WaitlistFieldErrors = Partial<Record<WaitlistField, string>>;

export const approvedInstitutionDomains: string[] = [];

const personalEmailDomains = new Set([
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "protonmail.com",
  "live.com",
  "rediffmail.com",
]);

const educationDomainKeywords = ["college", "university"];

export function getEmailDomain(email: string) {
  return email.trim().toLowerCase().split("@")[1] ?? "";
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isPersonalEmail(email: string) {
  return personalEmailDomains.has(getEmailDomain(email));
}

export function isEducationEmail(email: string) {
  const domain = getEmailDomain(email);

  return (
    domain.endsWith(".edu") ||
    domain.endsWith(".edu.in") ||
    domain.endsWith(".ac.in") ||
    educationDomainKeywords.some((keyword) => domain.includes(keyword)) ||
    approvedInstitutionDomains.includes(domain)
  );
}

export function isProfessionalEmail(email: string) {
  return isValidEmail(email) && !isPersonalEmail(email) && !isEducationEmail(email);
}

export function isWaitlistRole(value: unknown): value is WaitlistRole {
  return typeof value === "string" && roles.includes(value as WaitlistRole);
}

export function validateWaitlistForm(data: WaitlistFormData) {
  const errors: WaitlistFieldErrors = {};

  if (!data.fullName.trim()) errors.fullName = "Full name is required.";
  if (!data.email.trim()) errors.email = "Email is required.";
  if (!data.phone.trim()) errors.phone = "Phone number is required.";
  if (!data.role) errors.role = "Role is required.";
  if (!data.collegeOrCompany.trim()) {
    errors.collegeOrCompany = "College or company name is required.";
  }
  if (!data.domainOfInterest.trim()) {
    errors.domainOfInterest = "Please select your domain of interest.";
  } else if (!isDomain(data.domainOfInterest)) {
    errors.domainOfInterest = "Please select a valid domain of interest.";
  }

  if (data.email && !isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  } else if (data.email && data.role) {
    if (data.role === "Student" && !isEducationEmail(data.email)) {
      errors.email = "Please use your college or institution email to join as a student.";
    }

    if (data.role === "Mentor" && !isProfessionalEmail(data.email)) {
      errors.email = "Please use your company or professional email to join as a mentor.";
    }

    if (
      data.role === "Faculty" &&
      !isEducationEmail(data.email) &&
      !isProfessionalEmail(data.email)
    ) {
      errors.email = "Please use your institution or professional email to join as faculty.";
    }

    if (
      data.role === "Institution" &&
      !isEducationEmail(data.email) &&
      !isProfessionalEmail(data.email)
    ) {
      errors.email = "Please use your official institution or company email.";
    }
  }

  if (
    (data.role === "Mentor" || data.role === "Faculty") &&
    !data.linkedinOrPortfolio.trim()
  ) {
    errors.linkedinOrPortfolio = `LinkedIn or portfolio URL is required for ${data.role.toLowerCase()}.`;
  }

  if (data.linkedinOrPortfolio.trim()) {
    try {
      const url = new URL(data.linkedinOrPortfolio);
      if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error();
    } catch {
      errors.linkedinOrPortfolio =
        "LinkedIn or portfolio must be a valid URL beginning with http:// or https://.";
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
import { isDomain } from "@/lib/constants";
