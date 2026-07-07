import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Courses by Verified Mentors | My Expert Talk",
  description:
    "Buy expert-created micro-courses once, learn at your pace, and book the expert creator for live support when you need help.",
};

export default function CoursesPage() {
  return <CoursesClient />;
}
