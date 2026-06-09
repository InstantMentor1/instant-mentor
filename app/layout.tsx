import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";
import { getAuthContext } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Instant Mentor | Ask doubts. Get mentored.",
    template: "%s | Instant Mentor",
  },
  description:
    "India's verified student mentorship and doubt-clearing platform for academic and career growth.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { profile } = await getAuthContext();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider
          initialProfile={
            profile
              ? {
                  user_id: profile.user_id,
                  full_name: profile.full_name,
                  email: profile.email,
                  role: profile.role,
                }
              : null
          }
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
