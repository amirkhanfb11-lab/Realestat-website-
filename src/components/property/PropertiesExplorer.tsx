"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyFilters, type StatusFilter } from "@/components/property/PropertyFilters";
import { properties, BUY_PRICE_OPTIONS, RENT_PRICE_OPTIONS } from "@/lib/properties";

const PAGE_SIZE = 6;

function matchesPrice(priceValue: number, price: string, status: StatusFilter) {
  if (price === "Any Price") return true;

  if (status === "rent") {
    if (price === "Under $3,000/mo") return priceValue < 3_000;
    if (price === "$3,000 – $4,000/mo") return priceValue >= 3_000 && priceValue <= 4_000;
    if (price === "$4,000/mo+") return priceValue > 4_000;
  } else {
    if (price === "Under $2M") return priceValue < 2_000_000;
    if (price === "$2M – $4M") return priceValue >= 2_000_000 && priceValue <= 4_000_000;
    if (price === "$4M – $6M") return priceValue >= 4_000_000 && priceValue <= 6_000_000;
    if (price === "$6M+") return priceValue > 6_000_000;
  }

  return true;
}

export function PropertiesExplorer() {
  const searchParams = useSearchParams();

  const locations = useMemo(
    () => Array.from(new Set(properties.map((property) => property.location))).sort(),
    []
  );
  const types = useMemo(
    () => Array.from(new Set(properties.map((property) => property.type))).sort(),
    []
  );

  // Pre-fill from the homepage search bar's handoff (?search=&type=&price=), if present.
  // A handed-off price is always a buy-scale band, so default status to "buy" too —
  // otherwise the price select below would show a value with no matching option.
  const hasHandoffPrice = searchParams.get("price") !== null;
  const [search, setSearch] = useState(() => searchParams.get("search") ?? "");
  const [status, setStatus] = useState<StatusFilter>(hasHandoffPrice ? "buy" : "all");
  const [location, setLocation] = useState("All Locations");
  const [type, setType] = useState(() => searchParams.get("type") ?? "All Types");
  const [price, setPrice] = useState(() => searchParams.get("price") ?? "Any Price");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const priceOptions =
    status === "rent" ? RENT_PRICE_OPTIONS : status === "buy" ? BUY_PRICE_OPTIONS : ["Any Price"];

  // Reset price only on an actual user tab click — not a reactive effect on `status`,
  // since that would also fire (and clobber a handed-off price) on initial mount.
  function handleStatusChange(nextStatus: StatusFilter) {
    setStatus(nextStatus);
    setPrice("Any Price");
  }

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, status, location, type, price]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return properties.filter((property) => {
      if (status === "buy" && property.status !== "For Sale") return false;
      if (status === "rent" && property.status !== "For Rent") return false;
      if (location !== "All Locations" && property.location !== location) return false;
      if (type !== "All Types" && property.type !== type) return false;
      if (!matchesPrice(property.priceValue, price, status)) return false;
      if (
        query &&
        !property.title.toLowerCase().includes(query) &&
        !property.location.toLowerCase().includes(query)
      ) {
        return false;
      }
      return true;
    });
  }, [search, status, location, type, price]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div>
      <PropertyFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={handleStatusChange}
        location={location}
        onLocationChange={setLocation}
        locations={locations}
        type={type}
        onTypeChange={setType}
        types={types}
        price={price}
        onPriceChange={setPrice}
        priceOptions={priceOptions}
      />

      <p className="mt-8 text-sm text-gray-500">
        {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-ivory-100 p-12 text-center">
          <p className="text-base font-semibold text-navy-950">No properties match your search</p>
          <p className="mt-2 text-sm text-gray-500">
            Try adjusting your filters or clearing the search to see more listings.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((property, index) => (
              <Reveal key={property.slug} delay={(index % PAGE_SIZE) * 60} className="h-full">
                <PropertyCard property={property} />
              </Reveal>
            ))}
          </div>

          {hasMore && (
            <div className="mt-12 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              >
                Load More Properties
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
