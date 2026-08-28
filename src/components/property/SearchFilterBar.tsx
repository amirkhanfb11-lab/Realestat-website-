"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { fieldClass, labelClass } from "@/lib/formStyles";
import { BUY_PRICE_OPTIONS } from "@/lib/properties";

const propertyTypes = ["Any Type", "House", "Villa", "Condo", "Apartment"];

export function SearchFilterBar() {
  const router = useRouter();
  const locationId = useId();
  const typeId = useId();
  const priceId = useId();

  const [search, setSearch] = useState("");
  const [type, setType] = useState(propertyTypes[0]);
  const [price, setPrice] = useState(BUY_PRICE_OPTIONS[0]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (type !== propertyTypes[0]) params.set("type", type);
    if (price !== BUY_PRICE_OPTIONS[0]) params.set("price", price);

    const query = params.toString();
    router.push(query ? `/properties?${query}` : "/properties");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl bg-ivory-50 p-6 shadow-elevated sm:p-8 lg:grid-cols-[2fr_1fr_1fr_auto] lg:items-end lg:gap-6"
    >
      <div>
        <label htmlFor={locationId} className={labelClass}>
          Location
        </label>
        <input
          id={locationId}
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="City or neighborhood"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor={typeId} className={labelClass}>
          Property Type
        </label>
        <select
          id={typeId}
          value={type}
          onChange={(event) => setType(event.target.value)}
          className={fieldClass}
        >
          {propertyTypes.map((option) => (
            <option key={option}>{option}</option>
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
          onChange={(event) => setPrice(event.target.value)}
          className={fieldClass}
        >
          {BUY_PRICE_OPTIONS.map((option) => (
            <option key={option}>{option}</option>
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
