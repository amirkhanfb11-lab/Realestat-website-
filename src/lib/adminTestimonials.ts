import { testimonials as publicTestimonials } from "@/lib/testimonials";

/**
 * Admin-side testimonial records. The three currently live on the public
 * site are seeded in as "Approved" (they're already public); two extra
 * mock entries are added in "Pending" and "Hidden" so the moderation
 * workflow has something real to demonstrate.
 */

export type TestimonialStatus = "Pending" | "Approved" | "Hidden";

export const TESTIMONIAL_STATUS_OPTIONS: TestimonialStatus[] = ["Pending", "Approved", "Hidden"];

export type AdminTestimonial = {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  initials: string;
  status: TestimonialStatus;
  submittedAt: string;
};

export const adminTestimonialsSeed: AdminTestimonial[] = [
  ...publicTestimonials.map((testimonial, index) => ({
    id: `testimonial-live-${index + 1}`,
    name: testimonial.name,
    location: testimonial.location,
    quote: testimonial.quote,
    rating: 5,
    initials: testimonial.initials,
    status: "Approved" as TestimonialStatus,
    submittedAt: "2026-06-01",
  })),
  {
    id: "testimonial-pending-1",
    name: "Khalid Al Marri",
    location: "Al Ain, UAE",
    quote:
      "Found us a great villa in Al Jimi within two weeks of starting the search. Communication was clear the whole way through.",
    rating: 4,
    initials: "KM",
    status: "Pending",
    submittedAt: "2026-08-20",
  },
  {
    id: "testimonial-hidden-1",
    name: "Amina Al Falahi",
    location: "Al Ain, UAE",
    quote: "Process took longer than expected and I had to follow up a few times for updates.",
    rating: 2,
    initials: "AF",
    status: "Hidden",
    submittedAt: "2026-07-10",
  },
];

export function slugifyTestimonialName(name: string) {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base || "testimonial"}-${Math.random().toString(36).slice(2, 6)}`;
}
