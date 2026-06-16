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
    default: "Mentrix | Your Journey, Guided By Greatness",
    template: "%s | Mentrix",
  },
  description:
    "Mentrix helps students discover verified subject-matter experts, compare expertise menus, and book guided academic, career, and professional support.",
  keywords: [
    "SME marketplace",
    "subject matter experts India",
    "student expert booking",
    "academic SME guidance",
    "book verified SMEs",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Mentrix",
    title: "Your Journey, Guided By Greatness.",
    description:
      "Discover verified SMEs, compare expertise menus, and book the guidance moment you need.",
    images: [{ url: "/assets/mentrix-logo.png", alt: "Mentrix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mentrix | Your Journey, Guided By Greatness",
    description:
      "Discover verified SMEs and book guided academic, career, and professional support.",
    images: ["/assets/mentrix-logo.png"],
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
      name: "Mentrix",
      url: siteUrl,
      logo: `${siteUrl}/assets/mentrix-logo.png`,
      email: "support@mentrix.in",
      description:
        "A premium marketplace where verified subject-matter experts offer bookable expertise to serious students.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Mentrix",
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
