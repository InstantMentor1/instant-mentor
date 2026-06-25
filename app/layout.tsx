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
    default: "My Expert Talk | Learn Directly From Experts",
    template: "%s | My Expert Talk",
  },
  description:
    "My Expert Talk helps students and learners join expert talks, book mentor services, access recordings, and connect with verified educators and subject-matter experts.",
  keywords: [
    "expert talks",
    "mentor services",
    "student learning platform",
    "academic support",
    "career guidance",
    "recorded learning sessions",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "My Expert Talk",
    title: "Learn directly from experts, mentors, and educators.",
    description:
      "Join live expert talks, explore expert-led services, access recordings, and book guidance sessions.",
    images: [{ url: "/my-expert-talk-logo.png", alt: "My Expert Talk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Expert Talk | Expert talks and mentor services",
    description:
      "Connect with verified experts for academic support, career guidance, skill development, and live learning sessions.",
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
        "An education and expert-service platform for students, experts, and subject-matter mentors.",
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
