import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PropertyCard } from "@/components/property/PropertyCard";
import { properties } from "@/lib/properties";

export function FeaturedProperties() {
  return (
    <Section id="featured-properties" spacing="lg">
      <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
            Featured Listings
          </p>
          <h2 className="mt-3 max-w-xl text-3xl text-navy-950 sm:text-4xl">
            Handpicked homes worth a closer look
          </h2>
        </div>
        <Button href="/properties" variant="outline">
          View All Properties
        </Button>
      </Reveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, index) => (
          <Reveal key={property.slug} delay={index * 80} className="h-full">
            <PropertyCard property={property} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
