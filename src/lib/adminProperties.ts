import { properties, type PropertyType } from "@/lib/properties";

/**
 * Admin-side property records, kept separate from the public `properties.ts`
 * catalog (which the live site renders from) so this mock CRUD module can't
 * accidentally affect public pages. Seeded from the same listings so the
 * admin sees familiar data, plus admin-only fields (status lifecycle,
 * amenities, a human-readable property code).
 */

export type DealType = "For Sale" | "For Rent";
export type PropertyStatus = "Draft" | "Published" | "Sold" | "Rented";

export type AdminProperty = {
  id: string;
  propertyId: string;
  title: string;
  type: PropertyType;
  dealType: DealType;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  description: string;
  images: string[];
  amenities: string[];
  agentId: string;
  status: PropertyStatus;
  updatedAt: string;
};

export const PROPERTY_TYPE_OPTIONS: PropertyType[] = ["House", "Villa", "Condo", "Apartment"];
export const DEAL_TYPE_OPTIONS: DealType[] = ["For Sale", "For Rent"];
export const PROPERTY_STATUS_OPTIONS: PropertyStatus[] = ["Draft", "Published", "Sold", "Rented"];

/** Deterministic mock status per seeded listing, for a realistic status mix. */
const SEED_STATUS: PropertyStatus[] = [
  "Sold",
  "Published",
  "Published",
  "Draft",
  "Published",
  "Sold",
  "Rented",
  "Published",
  "Published",
  "Rented",
  "Draft",
  "Published",
];

export const adminPropertiesSeed: AdminProperty[] = properties.map((property, index) => ({
  id: property.slug,
  propertyId: `PROP-${1000 + index}`,
  title: property.title,
  type: property.type,
  dealType: property.status,
  price: property.priceValue,
  location: property.location,
  bedrooms: property.beds,
  bathrooms: property.baths,
  area: property.area,
  description: property.description,
  images: property.images,
  amenities: property.features,
  agentId: property.agentId,
  status: SEED_STATUS[index] ?? "Published",
  updatedAt: "Aug 2026",
}));

export function formatPrice(price: number, dealType: DealType) {
  const amount = price.toLocaleString("en-US");
  return dealType === "For Rent" ? `$${amount}/mo` : `$${amount}`;
}

export function slugify(title: string) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base || "property"}-${Math.random().toString(36).slice(2, 6)}`;
}
