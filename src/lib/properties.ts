export type PropertyType = "House" | "Villa" | "Condo" | "Apartment";

/** Shared price-band vocabulary so every price filter on the site (hero search, listings page) stays in sync. */
export const BUY_PRICE_OPTIONS = ["Any Price", "Under $2M", "$2M – $4M", "$4M – $6M", "$6M+"];
export const RENT_PRICE_OPTIONS = [
  "Any Price",
  "Under $3,000/mo",
  "$3,000 – $4,000/mo",
  "$4,000/mo+",
];

export type Property = {
  slug: string;
  title: string;
  location: string;
  type: PropertyType;
  price: string;
  /** Raw numeric price for filtering — dollars for sale, dollars/month for rent. */
  priceValue: number;
  status: "For Sale" | "For Rent";
  badge?: "Featured" | "New";
  beds: number;
  baths: number;
  area: string;
  image: string;
  /** Full photo gallery for the detail page — image[0] is always the primary photo. */
  images: string[];
  description: string;
  features: string[];
  agentId: string;
};

const INTERIOR_KITCHEN =
  "https://images.unsplash.com/photo-1628745277862-bc0b2d68c50c?q=80&w=1600&auto=format&fit=crop";
const INTERIOR_LIVING_A =
  "https://images.unsplash.com/photo-1560185013-ead8277ef8ea?q=80&w=1600&auto=format&fit=crop";
const INTERIOR_LIVING_B =
  "https://images.unsplash.com/photo-1613545325268-9265e1609167?q=80&w=1600&auto=format&fit=crop";
const INTERIOR_BEDROOM =
  "https://images.unsplash.com/photo-1644057501622-dfa7dd26dbfb?q=80&w=1600&auto=format&fit=crop";
const INTERIOR_BATHROOM =
  "https://images.unsplash.com/photo-1756079664354-34944e001f6d?q=80&w=1600&auto=format&fit=crop";

const INTERIOR_SETS = [
  [INTERIOR_KITCHEN, INTERIOR_LIVING_A, INTERIOR_BEDROOM],
  [INTERIOR_LIVING_B, INTERIOR_BATHROOM, INTERIOR_BEDROOM],
];

type BaseProperty = Omit<Property, "images">;

const baseProperties: BaseProperty[] = [];

export const properties: Property[] = baseProperties.map((property, index) => ({
  ...property,
  images: [property.image, ...INTERIOR_SETS[index % INTERIOR_SETS.length]],
}));
