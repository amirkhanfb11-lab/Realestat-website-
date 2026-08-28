import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
    default: "Abu Salem Real Estate | Al Ain Property Experts",
    template: "%s | Abu Salem Real Estate",
  },
  description:
    "Abu Salem Real Estate is Al Ain's trusted property partner since 1994 — buying, selling, renting, property management, valuation, and consulting.",
  openGraph: {
    title: "Abu Salem Real Estate",
    description:
      "Al Ain's trusted property partner since 1994 — buying, selling, renting, property management, valuation, and consulting.",
    type: "website",
    siteName: "Abu Salem Real Estate",
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
