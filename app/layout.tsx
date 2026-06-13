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
    default: "Instant Mentor | Subject-Matter Expert Service Marketplace",
    template: "%s | Instant Mentor",
  },
  description:
    "Discover verified subject-matter experts, compare expert-created services, check availability, and book with confidence.",
  keywords: [
    "expert service marketplace",
    "subject matter experts India",
    "career expert services",
    "academic expert guidance",
    "business consultant marketplace",
    "book verified experts",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Instant Mentor",
    title: "Discover experts. Compare services. Book with confidence.",
    description:
      "Browse expert-created service menus with expert-set pricing, availability, duration, and deliverables.",
    images: [{ url: "/assets/instant-mentor-logo.png", alt: "Instant Mentor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Instant Mentor | Expert Service Marketplace",
    description:
      "Discover verified experts and book the exact service you need.",
    images: ["/assets/instant-mentor-logo.png"],
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
      name: "Instant Mentor",
      url: siteUrl,
      logo: `${siteUrl}/assets/instant-mentor-logo.png`,
      email: "hello.instantmentor@gmail.com",
      description:
        "A service-based marketplace for career, academic, skill, business, and industry expertise.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Instant Mentor",
      url: siteUrl,
    },
  ];

  return (
    <html lang="en">
      <body className={inter.className}>
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
