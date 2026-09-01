"use client";

import Image from "next/image";
import Link from "next/link";
import { AreaIcon, BathIcon, BedIcon } from "@/components/property/PropertyStatIcons";
import type { AdminProperty, PropertyStatus } from "@/lib/adminProperties";
import { formatPrice, PROPERTY_STATUS_OPTIONS } from "@/lib/adminProperties";
import { DealBadge } from "./DealBadge";

const statIcon = "h-4 w-4 flex-none text-gold-600";

export function PropertyRow({
  property,
  onStatusChange,
  onDelete,
}: {
  property: AdminProperty;
  onStatusChange: (status: PropertyStatus) => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-soft sm:flex-row sm:items-center">
      <Link href={`/dashboard/properties/edit?id=${property.id}`} className="flex flex-1 items-center gap-4 min-w-0">
        <div className="relative h-16 w-16 flex-none overflow-hidden rounded-lg">
          <Image src={property.images[0]} alt={property.title} fill sizes="64px" className="object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-navy-950">{property.title}</p>
          <p className="truncate text-xs text-gray-500">
            {property.propertyId} · {property.location}
          </p>
          <div className="mt-1.5 flex items-center gap-3 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <BedIcon className={statIcon} />
              {property.bedrooms}
            </span>
            <span className="inline-flex items-center gap-1">
              <BathIcon className={statIcon} />
              {property.bathrooms}
            </span>
            <span className="inline-flex items-center gap-1">
              <AreaIcon className={statIcon} />
              {property.area}
            </span>
          </div>
        </div>

        <div className="flex-none text-right">
          <p className="text-sm font-semibold text-navy-950">{formatPrice(property.price, property.dealType)}</p>
          <div className="mt-1.5">
            <DealBadge dealType={property.dealType} />
          </div>
        </div>
      </Link>

      <div className="flex flex-none items-center gap-2 sm:flex-col sm:items-end">
        <label className="sr-only" htmlFor={`status-${property.id}`}>
          Status for {property.title}
        </label>
        <select
          id={`status-${property.id}`}
          value={property.status}
          onChange={(event) => onStatusChange(event.target.value as PropertyStatus)}
          className="rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-medium text-charcoal-900 focus-visible:outline-none focus-visible:border-gold-500"
        >
          {PROPERTY_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-3 text-xs font-medium">
          <Link href={`/dashboard/properties/edit?id=${property.id}`} className="text-gold-600 hover:underline">
            Edit
          </Link>
          <button type="button" onClick={onDelete} className="text-red-600 hover:underline">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
