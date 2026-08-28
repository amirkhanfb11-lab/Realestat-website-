import { AreaIcon, BathIcon, BedIcon } from "@/components/property/PropertyStatIcons";
import type { Property } from "@/lib/properties";

export function PropertyOverview({ property }: { property: Property }) {
  return (
    <div className="border-b border-border pb-8">
      <div className="flex flex-wrap items-center gap-2">
        {property.badge && (
          <span className="rounded-full bg-navy-950 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold-400">
            {property.badge}
          </span>
        )}
        <span className="rounded-full bg-ivory-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy-950">
          {property.status}
        </span>
        <span className="rounded-full bg-ivory-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy-950">
          {property.type}
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div>
          <h1 className="font-serif text-3xl text-navy-950 sm:text-4xl">{property.title}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="flex-none" aria-hidden="true">
              <path d="M12 21s-6.5-5.7-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.3-6.5 11-6.5 11Z" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="2.2" />
            </svg>
            {property.location}
          </p>
        </div>
        <p className="font-serif text-2xl text-navy-950 sm:text-3xl">{property.price}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-500">
        <span className="inline-flex items-center gap-2">
          <BedIcon className="h-5 w-5 text-gold-600" />
          {property.beds} Bedrooms
        </span>
        <span className="inline-flex items-center gap-2">
          <BathIcon className="h-5 w-5 text-gold-600" />
          {property.baths} Bathrooms
        </span>
        <span className="inline-flex items-center gap-2">
          <AreaIcon className="h-5 w-5 text-gold-600" />
          {property.area}
        </span>
      </div>
    </div>
  );
}
