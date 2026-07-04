import type { AppRole } from "@/lib/auth-shared";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function validateAccountEmail(email: string, role: AppRole) {
  const normalized = normalizeEmail(email);
  if (!emailPattern.test(normalized)) return "Please enter a valid email address.";

  if (role === "Admin") return null;

  return null;
}
