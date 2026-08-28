import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/properties";

const statIcon = "h-4 w-4 flex-none text-gold-600";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block h-full overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {property.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-navy-950/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold-400">
            {property.badge}
          </span>
        )}
        <span className="absolute right-4 top-4 rounded-full bg-ivory-50/95 px-3 py-1 text-xs font-semibold text-navy-950">
          {property.status}
        </span>
      </div>

      <div className="p-6">
        <p className="font-serif text-xl text-navy-950">{property.price}</p>
        <h3 className="mt-2 text-base font-semibold text-charcoal-900">{property.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{property.location}</p>

        <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <svg className={statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9.5Z" strokeLinejoin="round" />
            </svg>
            {property.beds} Beds
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg className={statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 12h16M6 12V6.5A1.5 1.5 0 0 1 7.5 5h1A1.5 1.5 0 0 1 10 6.5V12M5 16.5V19M19 16.5V19" strokeLinecap="round" />
            </svg>
            {property.baths} Baths
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg className={statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="4" y="4" width="7" height="7" rx="1" />
              <rect x="13" y="13" width="7" height="7" rx="1" />
            </svg>
            {property.area}
          </span>
        </div>
      </div>
    </Link>
  );
}
