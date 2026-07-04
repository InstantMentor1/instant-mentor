import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Courses by Verified Mentors | My Expert Talk",
  description:
    "Buy mentor-created mini courses once, learn at your pace, and book the course creator for a live session when you need help.",
};

export default function CoursesPage() {
  return <CoursesClient />;
}
