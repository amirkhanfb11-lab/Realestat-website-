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
  metadataBase: new URL("https://www.abusalamrealestate.com"),
  title: {
    default: "Abusalam Real Estate | Premium Properties",
    template: "%s | Abusalam Real Estate",
  },
  description:
    "Abusalam Real Estate connects discerning buyers and sellers with exceptional homes, backed by trusted local expertise.",
  openGraph: {
    title: "Abusalam Real Estate",
    description:
      "Discover exceptional homes and trusted real estate guidance with Abusalam Real Estate.",
    type: "website",
    siteName: "Abusalam Real Estate",
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
