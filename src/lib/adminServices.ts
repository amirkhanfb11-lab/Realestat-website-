import { services as publicServices } from "@/lib/services";
import { properties } from "@/lib/properties";
import type { ServiceIconKey } from "@/lib/serviceIcons";

/**
 * Admin-side service records, seeded from the real public services
 * (`lib/services.tsx`) so the six actual Abu Salem offerings are what the
 * admin manages — not fabricated placeholders.
 *
 * Forward-compat note: this is intentionally shaped as a superset of the
 * public `Service` type so a future integration can drive the public
 * Services section directly from here — `id` -> `slug`, `name` -> `title`,
 * `shortDescription` -> `description`, `icon` -> `getServiceIcon(icon)` —
 * filtering to `active` records and sorting by `displayOrder`.
 */

export type AdminService = {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon: ServiceIconKey;
  image: string;
  displayOrder: number;
  active: boolean;
};

const SEED_ICON_MAP: Record<string, ServiceIconKey> = {
  "property-buying": "buying",
  "property-selling": "selling",
  "property-rental": "rental",
  "property-management": "management",
  "real-estate-consultation": "consultation",
  "investment-consultation": "investment",
};

/** Placeholder imagery reused from the existing (already-whitelisted) property photos until real service photography exists. */
const SEED_IMAGES: Record<string, string> = {
  "property-buying": properties[0]?.image,
  "property-selling": properties[1]?.image,
  "property-rental": properties[6]?.image,
  "property-management": properties[3]?.image,
  "real-estate-consultation": properties[5]?.image,
  "investment-consultation": properties[4]?.image,
};

export const adminServicesSeed: AdminService[] = publicServices.map((service, index) => ({
  id: service.slug,
  name: service.title,
  // Public site only has one description today; both fields start identical
  // until real short/long copy is written — don't invent new marketing text.
  shortDescription: service.description,
  fullDescription: service.description,
  icon: SEED_ICON_MAP[service.slug] ?? "consultation",
  image: SEED_IMAGES[service.slug] ?? properties[0]?.image ?? "",
  displayOrder: index + 1,
  active: true,
}));

export function slugifyServiceName(name: string) {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base || "service"}-${Math.random().toString(36).slice(2, 6)}`;
}
