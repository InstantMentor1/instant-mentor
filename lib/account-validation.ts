import {
  approvedInstitutionDomains,
  personalEmailDomains,
} from "@/lib/constants";
import type { AppRole } from "@/lib/auth-shared";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function getEmailDomain(email: string) {
  return normalizeEmail(email).split("@")[1] ?? "";
}

export function isPersonalEmail(email: string) {
  return personalEmailDomains.includes(
    getEmailDomain(email) as (typeof personalEmailDomains)[number],
  );
}

export function validateAccountEmail(email: string, role: AppRole) {
  const normalized = normalizeEmail(email);
  if (!emailPattern.test(normalized)) return "Please enter a valid email address.";

  const domain = getEmailDomain(normalized);
  if (role === "Admin") return null;

  if (role === "Student") {
    const institutionDomain =
      domain.endsWith(".edu") ||
      domain.endsWith(".edu.in") ||
      domain.endsWith(".ac.in") ||
      domain.includes("college") ||
      domain.includes("university") ||
      domain.includes("institute") ||
      domain.includes("academy") ||
      domain.includes("campus") ||
      approvedInstitutionDomains.includes(
        domain as (typeof approvedInstitutionDomains)[number],
      );
    return institutionDomain
      ? null
      : "Please use your college or institution email to create a student account.";
  }

  if (isPersonalEmail(normalized)) {
    if (role === "Mentor") {
      return "Please use your company or professional email to create a mentor account.";
    }
    if (role === "Faculty") {
      return "Please use your institution or professional email to create a faculty account.";
    }
    return "Please use your official institution or company email.";
  }

  return null;
}
