import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth";

export default async function MessagesIndexPage() {
  const { profile } = await requireAuth();
  redirect(profile.role === "Student" ? "/student/dashboard" : profile.role === "Admin" ? "/admin/sessions" : "/mentor/dashboard");
}
