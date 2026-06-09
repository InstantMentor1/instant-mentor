export type AppRole = "Student" | "Mentor" | "Faculty" | "Institution" | "Admin";

export function dashboardForRole(role: AppRole) {
  if (role === "Mentor" || role === "Faculty" || role === "Institution") {
    return "/mentor/dashboard";
  }
  if (role === "Admin") return "/admin/dashboard";
  return "/student/dashboard";
}
