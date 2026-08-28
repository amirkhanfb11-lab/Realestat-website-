import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AreaIcon, BathIcon, BedIcon } from "@/components/property/PropertyStatIcons";
import type { Property } from "@/lib/properties";

const statIcon = "h-4 w-4 flex-none text-gold-600";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
      <Link href={`/properties/${property.slug}`} className="relative block aspect-[4/3] overflow-hidden">
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
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <p className="font-serif text-xl text-navy-950">{property.price}</p>
          <h3 className="mt-2 text-base font-semibold text-charcoal-900">
            <Link href={`/properties/${property.slug}`} className="hover:text-gold-600">
              {property.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{property.location}</p>

          <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <BedIcon className={statIcon} />
              {property.beds} Beds
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BathIcon className={statIcon} />
              {property.baths} Baths
            </span>
            <span className="inline-flex items-center gap-1.5">
              <AreaIcon className={statIcon} />
              {property.area}
            </span>
          </div>
        </div>

        <Button href={`/properties/${property.slug}`} variant="outline" size="sm" fullWidth className="mt-6">
          View Details
        </Button>
      </div>
    </div>
  );
}
