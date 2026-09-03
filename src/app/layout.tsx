import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sumalani Real Estate | Al Ain Property Experts",
    template: "%s | Sumalani Real Estate",
  },
  description:
    "Sumalani Real Estate is Al Ain's trusted property partner since 1994 — buying, selling, renting, property management, valuation, and consulting.",
  openGraph: {
    title: "Sumalani Real Estate",
    description:
      "Al Ain's trusted property partner since 1994 — buying, selling, renting, property management, valuation, and consulting.",
    type: "website",
    siteName: "Sumalani Real Estate",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
