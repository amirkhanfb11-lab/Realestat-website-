import type { ReactNode } from "react";

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: ReactNode;
};

export const services: Service[] = [
  {
    slug: "property-buying",
    title: "Property Buying",
    description:
      "Find and secure the right property with guidance at every step — from search to final signature.",
    icon: (
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9.5Z" strokeLinejoin="round" />
    ),
  },
  {
    slug: "property-selling",
    title: "Property Selling",
    description:
      "List with confidence. We handle pricing, marketing, and negotiation to get you the best outcome.",
    icon: (
      <>
        <path d="M11 4H4v7l9 9 7-7-9-9Z" strokeLinejoin="round" />
        <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    slug: "property-rental",
    title: "Property Rental",
    description:
      "Whether you're renting a home or listing one, we match tenants and landlords quickly and fairly.",
    icon: (
      <>
        <circle cx="8.5" cy="8.5" r="4" />
        <path d="M11.5 11.5 20 20M16 17l3-3" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    slug: "property-management",
    title: "Property Management",
    description:
      "Full day-to-day management — maintenance, tenants, and reporting — so owners can step back.",
    icon: (
      <>
        <path d="M4 21V9l8-5 8 5v12" strokeLinejoin="round" />
        <path d="M9 21v-6h6v6" strokeLinejoin="round" />
      </>
    ),
  },
  {
    slug: "real-estate-consultation",
    title: "Real Estate Consultation",
    description: "Independent, experienced advice on any property decision, big or small.",
    icon: <path d="M4 4h16v12H8l-4 4V4Z" strokeLinejoin="round" />,
  },
  {
    slug: "investment-consultation",
    title: "Investment Consultation",
    description: "Data-backed guidance for building and growing a property portfolio in Al Ain.",
    icon: (
      <>
        <path d="M4 19h16" strokeLinecap="round" />
        <path d="m5 15 4-4 3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 8h4v4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];
