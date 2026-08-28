export type Property = {
  slug: string;
  title: string;
  location: string;
  price: string;
  status: "For Sale" | "For Rent";
  badge?: "Featured" | "New";
  beds: number;
  baths: number;
  area: string;
  image: string;
};

export const properties: Property[] = [
  {
    slug: "the-hillcrest-villa",
    title: "The Hillcrest Villa",
    location: "Beverly Hills, CA",
    price: "$4,250,000",
    status: "For Sale",
    badge: "Featured",
    beds: 5,
    baths: 6,
    area: "6,200 sqft",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "azure-poolside-estate",
    title: "Azure Poolside Estate",
    location: "Malibu, CA",
    price: "$6,800,000",
    status: "For Sale",
    badge: "New",
    beds: 6,
    baths: 7,
    area: "7,500 sqft",
    image: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "skyline-residence",
    title: "Skyline Residence",
    location: "Downtown Los Angeles, CA",
    price: "$2,150,000",
    status: "For Sale",
    beds: 3,
    baths: 3,
    area: "2,400 sqft",
    image: "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "the-meridian-condominiums",
    title: "The Meridian Condominiums",
    location: "Santa Monica, CA",
    price: "$1,895,000",
    status: "For Sale",
    beds: 2,
    baths: 2,
    area: "1,650 sqft",
    image: "https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "ridgeline-retreat",
    title: "Ridgeline Retreat",
    location: "Pacific Palisades, CA",
    price: "$5,400,000",
    status: "For Sale",
    beds: 5,
    baths: 5,
    area: "5,800 sqft",
    image: "https://images.unsplash.com/photo-1698994705178-d244d73ea573?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "the-wilshire-penthouse",
    title: "The Wilshire Penthouse",
    location: "Los Angeles, CA",
    price: "$3,975,000",
    status: "For Sale",
    badge: "Featured",
    beds: 4,
    baths: 4,
    area: "3,900 sqft",
    image: "https://images.unsplash.com/photo-1757924461488-ef9ad0670978?q=80&w=1200&auto=format&fit=crop",
  },
];
