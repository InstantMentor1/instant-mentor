import { redirect } from "next/navigation";

export default function LegacyCareerSupportPage() {
  redirect("/services?category=Career%20%26%20Jobs");
}
