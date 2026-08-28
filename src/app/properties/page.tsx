import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PropertiesExplorer } from "@/components/property/PropertiesExplorer";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse Abu Salem Real Estate's full collection of homes for sale and rent — filter by location, type, and price.",
};

export default function PropertiesPage() {
  return (
    <>
      <Section background="dark" spacing="md">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            Listings
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Find Your Next Property</h1>
          <p className="mt-4 text-base text-ivory-50/80">
            Browse our full collection of homes for sale and rent across Southern California.
          </p>
        </Reveal>
      </Section>

      <Section spacing="lg">
        <Suspense fallback={null}>
          <PropertiesExplorer />
        </Suspense>
      </Section>
    </>
  );
}
