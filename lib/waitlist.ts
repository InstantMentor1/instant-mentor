import { createHash, randomBytes } from "node:crypto";
import type { WaitlistRole } from "@/lib/validation";

export const verificationMethods = [
  "college_email",
  "company_email",
  "institution_email",
  "linkedin_manual",
  "student_id_manual",
  "pending_manual_review",
] as const;
export type VerificationMethod = (typeof verificationMethods)[number];

export type VerificationStatus = "unverified" | "pending" | "verified" | "rejected";

export type WaitlistInput = {
  fullName: string;
  email: string;
  phone: string;
  role: WaitlistRole;
  collegeOrCompany: string;
  domainOfInterest: string;
  linkedinOrPortfolio: string;
  message: string;
};

export type VerificationDecision = {
  method: VerificationMethod;
  status: VerificationStatus;
  requiresEmailVerification: boolean;
};

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function determineVerification(input: WaitlistInput): VerificationDecision {
  if (input.role === "Student") {
    return { method: "college_email", status: "unverified", requiresEmailVerification: true };
  }

  if (input.role === "Mentor") {
    return { method: "company_email", status: "unverified", requiresEmailVerification: true };
  }

  if (input.role === "Faculty") {
    return { method: "institution_email", status: "unverified", requiresEmailVerification: true };
  }

  return { method: "institution_email", status: "pending", requiresEmailVerification: true };
}

export function createVerificationToken() {
  const token = randomBytes(32).toString("hex");
  return { token, tokenHash: hashVerificationToken(token) };
}

export function hashVerificationToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
