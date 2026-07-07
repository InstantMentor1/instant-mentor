import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";
import { getAuthContext } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://instant-mentor.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "My Expert Talk | Expert-Led Learning Support Marketplace",
    template: "%s | My Expert Talk",
  },
  description:
    "My Expert Talk is an expert-led learning support marketplace where students discover, book, and learn directly from independent experts through services, rooms, micro-courses, and mentorship plans.",
  keywords: [
    "expert talks",
    "expert services",
    "student learning platform",
    "academic support",
    "career guidance",
    "expert-led learning support",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "My Expert Talk",
    title: "Discover, book, and learn directly from independent experts.",
    description:
      "Experts create their own services, set pricing, and deliver learning support through calls, rooms, micro-courses, and mentorship plans.",
    images: [{ url: "/my-expert-talk-logo.png", alt: "My Expert Talk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Expert Talk | Expert-led learning support marketplace",
    description:
      "Connect with verified experts for learning support, career guidance, doubt-solving, skill mentoring, and premium sessions.",
    images: ["/my-expert-talk-logo.png"],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { profile } = await getAuthContext();
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "My Expert Talk",
      url: siteUrl,
      logo: `${siteUrl}/my-expert-talk-logo.png`,
      email: "support@myexperttalk.com",
      description:
        "An expert-led learning support marketplace for students and independent subject-matter experts.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "My Expert Talk",
      url: siteUrl,
    },
  ];

  return (
    <html lang="en">
      <body className={`${inter.className} bg-ivory text-ink`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
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
