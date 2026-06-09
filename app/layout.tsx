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
    default: "Instant Mentor | Ask doubts. Get mentored.",
    template: "%s | Instant Mentor",
  },
  description:
    "Live mentorship for engineering students, fresh graduates, and early-career professionals seeking technical support, career guidance, and placement preparation.",
  keywords: [
    "engineering mentorship",
    "career guidance for students",
    "technical mentor India",
    "placement preparation",
    "resume interview support",
    "student webinars",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Instant Mentor",
    title: "Instant Mentor | Real mentors for technical and career growth",
    description:
      "Connect with reviewed professionals for doubt-solving, career guidance, placement preparation, and live webinars.",
    images: [{ url: "/assets/instant-mentor-logo.png", alt: "Instant Mentor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Instant Mentor | Real mentors for technical and career growth",
    description:
      "Connect with reviewed professionals for doubt-solving, career guidance, placement preparation, and live webinars.",
    images: ["/assets/instant-mentor-logo.png"],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { profile } = await getAuthContext();
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Instant Mentor",
    url: siteUrl,
    logo: `${siteUrl}/assets/instant-mentor-logo.png`,
    email: "hello.instantmentor@gmail.com",
    description:
      "A live mentorship platform for engineering students, fresh graduates, and early-career professionals.",
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Instant Mentor",
    url: siteUrl,
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]).replace(/</g, "\\u003c"),
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
