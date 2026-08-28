"use client";

import { useId } from "react";
import { Button } from "@/components/ui/Button";

const propertyTypes = ["Any Type", "House", "Condo", "Villa", "Apartment", "Land"];
const priceRanges = ["Any Price", "Under $1M", "$1M – $3M", "$3M – $5M", "$5M+"];

const fieldClass =
  "mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-charcoal-900 transition-colors focus-visible:outline-none focus-visible:border-gold-500";
const labelClass = "text-xs font-semibold uppercase tracking-wider text-gray-500";

export function SearchFilterBar() {
  const locationId = useId();
  const typeId = useId();
  const priceId = useId();

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="grid gap-4 rounded-2xl bg-ivory-50 p-6 shadow-elevated sm:p-8 lg:grid-cols-[2fr_1fr_1fr_auto] lg:items-end lg:gap-6"
    >
      <div>
        <label htmlFor={locationId} className={labelClass}>
          Location
        </label>
        <input
          id={locationId}
          type="text"
          placeholder="City, neighborhood, or ZIP"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor={typeId} className={labelClass}>
          Property Type
        </label>
        <select id={typeId} className={fieldClass} defaultValue={propertyTypes[0]}>
          {propertyTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={priceId} className={labelClass}>
          Price Range
        </label>
        <select id={priceId} className={fieldClass} defaultValue={priceRanges[0]}>
          {priceRanges.map((range) => (
            <option key={range}>{range}</option>
          ))}
        </select>
      </div>

      <Button type="submit" size="lg" className="w-full lg:w-auto">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        Search
      </Button>
    </form>
  );
}
