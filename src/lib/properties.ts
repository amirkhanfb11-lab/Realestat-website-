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

const baseProperties: BaseProperty[] = [
  {
    slug: "the-hillcrest-villa",
    title: "The Hillcrest Villa",
    location: "Beverly Hills, CA",
    type: "Villa",
    price: "$4,250,000",
    priceValue: 4_250_000,
    status: "For Sale",
    badge: "Featured",
    beds: 5,
    baths: 6,
    area: "6,200 sqft",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
    description:
      "Perched above Beverly Hills with sweeping city views, The Hillcrest Villa pairs classic Mediterranean architecture with a fully reimagined interior. Soaring ceilings, walls of glass, and a resort-style backyard make this a rare offering in one of the city's most sought-after enclaves.",
    features: [
      "Private Pool & Spa",
      "Home Theater",
      "Wine Cellar",
      "Smart Home System",
      "3-Car Garage",
      "Chef's Kitchen",
      "City Views",
      "Landscaped Gardens",
    ],
    agentId: "abu-salem-team",
  },
  {
    slug: "azure-poolside-estate",
    title: "Azure Poolside Estate",
    location: "Malibu, CA",
    type: "Villa",
    price: "$6,800,000",
    priceValue: 6_800_000,
    status: "For Sale",
    badge: "New",
    beds: 6,
    baths: 7,
    area: "7,500 sqft",
    image: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?q=80&w=1200&auto=format&fit=crop",
    description:
      "Set behind private gates with direct ocean breezes, Azure Poolside Estate is built for entertaining, from its infinity-edge pool to the open-air pavilion overlooking the grounds. Six ensuite bedrooms make it equally suited to full-time living or a coastal retreat.",
    features: [
      "Infinity Pool",
      "Ocean Views",
      "Outdoor Kitchen",
      "Guest House",
      "Home Gym",
      "Wine Cellar",
      "Smart Home System",
      "Private Gated Entry",
    ],
    agentId: "abu-salem-team",
  },
  {
    slug: "skyline-residence",
    title: "Skyline Residence",
    location: "Downtown Los Angeles, CA",
    type: "Apartment",
    price: "$2,150,000",
    priceValue: 2_150_000,
    status: "For Sale",
    beds: 3,
    baths: 3,
    area: "2,400 sqft",
    image: "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?q=80&w=1200&auto=format&fit=crop",
    description:
      "Skyline Residence sits on a high floor of one of Downtown LA's most established towers, with floor-to-ceiling windows framing the city skyline. Building amenities and a walkable location make it a smart choice for professionals who want city living without compromise.",
    features: [
      "Floor-to-Ceiling Windows",
      "Concierge Service",
      "Rooftop Pool",
      "Fitness Center",
      "In-Unit Laundry",
      "Secure Parking",
    ],
    agentId: "abu-salem-team",
  },
  {
    slug: "the-meridian-condominiums",
    title: "The Meridian Condominiums",
    location: "Santa Monica, CA",
    type: "Condo",
    price: "$1,895,000",
    priceValue: 1_895_000,
    status: "For Sale",
    beds: 2,
    baths: 2,
    area: "1,650 sqft",
    image: "https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?q=80&w=1200&auto=format&fit=crop",
    description:
      "A few blocks from the beach, The Meridian offers bright, well-proportioned rooms and a private balcony that catches the evening light. The building's boutique scale keeps it quiet, while Santa Monica's shops and restaurants are a short walk away.",
    features: [
      "Private Balcony",
      "Central Air Conditioning",
      "Hardwood Floors",
      "In-Unit Laundry",
      "Assigned Parking",
      "Pet Friendly",
    ],
    agentId: "abu-salem-team",
  },
  {
    slug: "ridgeline-retreat",
    title: "Ridgeline Retreat",
    location: "Pacific Palisades, CA",
    type: "House",
    price: "$5,400,000",
    priceValue: 5_400_000,
    status: "For Sale",
    beds: 5,
    baths: 5,
    area: "5,800 sqft",
    image: "https://images.unsplash.com/photo-1698994705178-d244d73ea573?q=80&w=1200&auto=format&fit=crop",
    description:
      "Ridgeline Retreat backs onto protected hillside, giving the property an unusually private, tucked-away feel while staying minutes from the Palisades Village. Wide-plank oak floors and a single-level layout make everyday living effortless.",
    features: [
      "Canyon Views",
      "Single-Level Layout",
      "Chef's Kitchen",
      "Home Office",
      "Solar Panels",
      "3-Car Garage",
      "Landscaped Gardens",
    ],
    agentId: "abu-salem-team",
  },
  {
    slug: "the-wilshire-penthouse",
    title: "The Wilshire Penthouse",
    location: "Los Angeles, CA",
    type: "Condo",
    price: "$3,975,000",
    priceValue: 3_975_000,
    status: "For Sale",
    badge: "Featured",
    beds: 4,
    baths: 4,
    area: "3,900 sqft",
    image: "https://images.unsplash.com/photo-1757924461488-ef9ad0670978?q=80&w=1200&auto=format&fit=crop",
    description:
      "Occupying the top floor of its building, The Wilshire Penthouse comes with a private rooftop terrace and unobstructed views in every direction. A rare full-floor layout means no shared walls and light from all four sides.",
    features: [
      "Private Rooftop Terrace",
      "360° City Views",
      "Wine Cellar",
      "Smart Home System",
      "Concierge Service",
      "2 Parking Spaces",
    ],
    agentId: "abu-salem-team",
  },
  {
    slug: "harbor-view-apartments",
    title: "Harbor View Apartments",
    location: "Marina Del Rey, CA",
    type: "Apartment",
    price: "$4,200/mo",
    priceValue: 4_200,
    status: "For Rent",
    beds: 2,
    baths: 2,
    area: "1,150 sqft",
    image: "https://images.unsplash.com/photo-1624204386084-dd8c05e32226?q=80&w=1200&auto=format&fit=crop",
    description:
      "Harbor View Apartments puts you steps from the marina, with a private balcony that catches the sea breeze year-round. Recently renovated throughout, the unit is move-in ready with in-unit laundry and secure parking included.",
    features: [
      "Marina Views",
      "Private Balcony",
      "In-Unit Laundry",
      "Secure Parking",
      "Fitness Center",
      "Pet Friendly",
    ],
    agentId: "abu-salem-team",
  },
  {
    slug: "the-crestwood-flats",
    title: "The Crestwood Flats",
    location: "Culver City, CA",
    type: "Apartment",
    price: "$3,650/mo",
    priceValue: 3_650,
    status: "For Rent",
    beds: 1,
    baths: 1,
    area: "850 sqft",
    image: "https://images.unsplash.com/photo-1571236673892-13d222da2019?q=80&w=1200&auto=format&fit=crop",
    description:
      "A bright, efficiently laid-out one-bedroom in the heart of Culver City, walking distance to the Arts District's restaurants and studios. The building is quiet and well maintained, with a shared courtyard and on-site laundry.",
    features: [
      "Shared Courtyard",
      "On-Site Laundry",
      "Central Air Conditioning",
      "Hardwood Floors",
      "Pet Friendly",
    ],
    agentId: "abu-salem-team",
  },
  {
    slug: "glasshouse-residences",
    title: "Glasshouse Residences",
    location: "West Hollywood, CA",
    type: "Condo",
    price: "$2,675,000",
    priceValue: 2_675_000,
    status: "For Sale",
    beds: 3,
    baths: 3,
    area: "2,200 sqft",
    image: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?q=80&w=1200&auto=format&fit=crop",
    description:
      "True to its name, Glasshouse Residences is wrapped in floor-to-ceiling glass, flooding every room with natural light. The building's rooftop deck and fitness center round out a location that puts West Hollywood's best restaurants at your doorstep.",
    features: [
      "Floor-to-Ceiling Windows",
      "Rooftop Deck",
      "Fitness Center",
      "Concierge Service",
      "Smart Home System",
      "Assigned Parking",
    ],
    agentId: "abu-salem-team",
  },
  {
    slug: "sunset-terrace-rentals",
    title: "Sunset Terrace Rentals",
    location: "Hollywood, CA",
    type: "Apartment",
    price: "$3,900/mo",
    priceValue: 3_900,
    status: "For Rent",
    badge: "New",
    beds: 2,
    baths: 2,
    area: "1,300 sqft",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    description:
      "Sunset Terrace offers two well-sized bedrooms and a private terrace with views toward the Hollywood Hills. Recent upgrades include new appliances and flooring throughout, with a secure entry and on-site parking.",
    features: [
      "Private Terrace",
      "Hollywood Hills Views",
      "New Appliances",
      "Secure Entry",
      "On-Site Parking",
      "Pet Friendly",
    ],
    agentId: "abu-salem-team",
  },
  {
    slug: "coastline-cottage",
    title: "Coastline Cottage",
    location: "Malibu, CA",
    type: "House",
    price: "$3,150,000",
    priceValue: 3_150_000,
    status: "For Sale",
    beds: 4,
    baths: 3,
    area: "2,900 sqft",
    image: "https://images.unsplash.com/photo-1764223531702-1614efb82e40?q=80&w=1200&auto=format&fit=crop",
    description:
      "A short walk from the sand, Coastline Cottage blends beach-house charm with thoughtful modern updates. An open kitchen and living area lead out to a sun-drenched patio, ideal for indoor-outdoor living year-round.",
    features: [
      "Steps to the Beach",
      "Open Floor Plan",
      "Outdoor Patio",
      "Updated Kitchen",
      "Central Air Conditioning",
      "2-Car Garage",
    ],
    agentId: "abu-salem-team",
  },
  {
    slug: "parkview-residence",
    title: "Parkview Residence",
    location: "Pasadena, CA",
    type: "House",
    price: "$1,675,000",
    priceValue: 1_675_000,
    status: "For Sale",
    beds: 3,
    baths: 2,
    area: "2,100 sqft",
    image: "https://images.unsplash.com/photo-1592276040264-e10344a6a10e?q=80&w=1200&auto=format&fit=crop",
    description:
      "Set on a tree-lined street near Pasadena's Old Town, Parkview Residence offers a classic California bungalow layout with a fully updated kitchen and bath. A generous backyard and detached studio make it as practical as it is charming.",
    features: [
      "Updated Kitchen",
      "Detached Studio",
      "Landscaped Backyard",
      "Hardwood Floors",
      "Central Air Conditioning",
      "2-Car Garage",
    ],
    agentId: "abu-salem-team",
  },
];

export const properties: Property[] = baseProperties.map((property, index) => ({
  ...property,
  images: [property.image, ...INTERIOR_SETS[index % INTERIOR_SETS.length]],
}));
