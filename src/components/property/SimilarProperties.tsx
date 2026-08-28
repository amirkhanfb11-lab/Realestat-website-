import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PropertyCard } from "@/components/property/PropertyCard";
import type { Property } from "@/lib/properties";

export function SimilarProperties({ properties }: { properties: Property[] }) {
  if (properties.length === 0) return null;

  return (
    <Section background="muted" spacing="lg">
      <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
            You May Also Like
          </p>
          <h2 className="mt-3 text-3xl text-navy-950 sm:text-4xl">Similar Properties</h2>
        </div>
        <Button href="/properties" variant="outline">
          Browse All Properties
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
