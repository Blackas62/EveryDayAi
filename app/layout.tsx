import type { Metadata } from "next";
import { Manrope, Space_Grotesk, Special_Gothic_Condensed_One, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { VoiceWidget } from "@/components/voice-widget";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const specialGothic = Special_Gothic_Condensed_One({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EveryDay AI with Graham — AI Solutions for Real Businesses",
    template: "%s | EveryDay AI with Graham",
  },
  description:
    "AI automation, business cost reduction, and custom software solutions. Helping Australian businesses work smarter with practical AI.",
  metadataBase: new URL("https://everydayaiwithgraham.com"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "EveryDay AI with Graham",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://everydayaiwithgraham.com/#organization",
  name: "EveryDay AI with Graham",
  url: "https://everydayaiwithgraham.com",
  logo: "https://everydayaiwithgraham.com/graham.jpg",
  description:
    "Australian AI consulting practice serving small-to-mid businesses. Productised packages for AI readiness audits, implementation sprints, and ongoing advisory — with a focus on Western Australian civil, mining-services, and construction SMEs.",
  founder: { "@id": "https://everydayaiwithgraham.com/#graham" },
  areaServed: { "@type": "Country", name: "Australia" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Perth",
    addressRegion: "WA",
    addressCountry: "AU",
  },
  sameAs: [
    "https://www.youtube.com/@EveryDayAiWithGraham",
    "https://www.linkedin.com/in/grahamblackwell/",
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://everydayaiwithgraham.com/#graham",
  name: "Graham Blackwell",
  jobTitle: "AI Consultant and Finance & Business Systems Specialist",
  description:
    "Perth-based AI consultant with 20+ years of finance and business systems experience across Western Australian civil engineering, mining services, and construction. Implemented Procore, InEight, MYOB, Xero, and ApprovalMax at $60M-turnover firms before moving full-time into AI consulting.",
  url: "https://everydayaiwithgraham.com/about",
  image: "https://everydayaiwithgraham.com/graham.jpg",
  worksFor: { "@id": "https://everydayaiwithgraham.com/#organization" },
  knowsAbout: [
    "Artificial intelligence for small and mid-sized business",
    "Procore implementation",
    "InEight construction project management",
    "MYOB to Xero migration",
    "AI automation for finance and operations",
    "Construction and civil engineering systems",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Perth",
    addressRegion: "WA",
    addressCountry: "AU",
  },
  sameAs: [
    "https://www.youtube.com/@EveryDayAiWithGraham",
    "https://www.linkedin.com/in/grahamblackwell/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} ${specialGothic.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <VoiceWidget />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
