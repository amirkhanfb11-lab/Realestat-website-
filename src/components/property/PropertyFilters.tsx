"use client";

import { useId } from "react";
import { fieldClass, labelClass } from "@/lib/formStyles";

export type StatusFilter = "all" | "buy" | "rent";

const statusTabs: { label: string; value: StatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "Buy", value: "buy" },
  { label: "Rent", value: "rent" },
];

type PropertyFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  status: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  location: string;
  onLocationChange: (value: string) => void;
  locations: string[];
  type: string;
  onTypeChange: (value: string) => void;
  types: string[];
  price: string;
  onPriceChange: (value: string) => void;
  priceOptions: string[];
};

export function PropertyFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  location,
  onLocationChange,
  locations,
  type,
  onTypeChange,
  types,
  price,
  onPriceChange,
  priceOptions,
}: PropertyFiltersProps) {
  const searchId = useId();
  const locationId = useId();
  const typeId = useId();
  const priceId = useId();

  return (
    <form onSubmit={(event) => event.preventDefault()} className="rounded-2xl bg-ivory-50 p-6 shadow-soft sm:p-8">
      <div
        className="inline-flex rounded-full border border-border bg-white p-1"
        role="group"
        aria-label="Buy or rent"
      >
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            aria-pressed={status === tab.value}
            onClick={() => onStatusChange(tab.value)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              status === tab.value
                ? "bg-navy-950 text-ivory-50"
                : "text-charcoal-900 hover:bg-ivory-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        <div>
          <label htmlFor={searchId} className={labelClass}>
            Search
          </label>
          <input
            id={searchId}
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name or neighborhood"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor={locationId} className={labelClass}>
            Location
          </label>
          <select
            id={locationId}
            value={location}
            onChange={(event) => onLocationChange(event.target.value)}
            className={fieldClass}
          >
            <option>All Locations</option>
            {locations.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={typeId} className={labelClass}>
            Property Type
          </label>
          <select
            id={typeId}
            value={type}
            onChange={(event) => onTypeChange(event.target.value)}
            className={fieldClass}
          >
            <option>All Types</option>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={priceId} className={labelClass}>
            Price Range
          </label>
          <select
            id={priceId}
            value={price}
            onChange={(event) => onPriceChange(event.target.value)}
            className={fieldClass}
          >
            {priceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}
