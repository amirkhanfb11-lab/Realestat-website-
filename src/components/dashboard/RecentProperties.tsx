import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/properties";

export function RecentProperties({ properties }: { properties: Property[] }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft">
      <h3 className="text-base font-semibold text-navy-950">Recent Properties</h3>

      <div className="mt-4 divide-y divide-border">
        {properties.map((property) => (
          <Link
            key={property.slug}
            href={`/properties/${property.slug}`}
            className="flex items-center gap-4 py-3 transition-colors hover:bg-ivory-50"
          >
            <div className="relative h-14 w-14 flex-none overflow-hidden rounded-lg">
              <Image src={property.image} alt={property.title} fill sizes="56px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-navy-950">{property.title}</p>
              <p className="truncate text-xs text-gray-500">{property.location}</p>
            </div>
            <div className="flex-none text-right">
              <p className="text-sm font-medium text-navy-950">{property.price}</p>
              <span className="mt-1 inline-block rounded-full bg-ivory-100 px-2.5 py-0.5 text-[11px] font-medium text-charcoal-900">
                {property.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
