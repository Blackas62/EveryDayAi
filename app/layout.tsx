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
