import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyOverview } from "@/components/property/PropertyOverview";
import { PropertyFeatures } from "@/components/property/PropertyFeatures";
import { AgentCard } from "@/components/property/AgentCard";
import { InquiryForm } from "@/components/property/InquiryForm";
import { SimilarProperties } from "@/components/property/SimilarProperties";
import { properties } from "@/lib/properties";
import { agents } from "@/lib/agents";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = properties.find((item) => item.slug === slug);

  if (!property) {
    return {};
  }

  return {
    title: property.title,
    description: `${property.title} in ${property.location} — ${property.beds} bed, ${property.baths} bath, ${property.area}. ${property.price}.`,
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = properties.find((item) => item.slug === slug);

  if (!property) {
    notFound();
  }

  const agent = agents.find((item) => item.id === property.agentId) ?? agents[0];
  const similar = properties
    .filter(
      (item) =>
        item.slug !== property.slug &&
        (item.type === property.type || item.location === property.location)
    )
    .slice(0, 3);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Properties", href: "/properties" },
          { label: property.title },
        ]}
      />
      <PropertyGallery images={property.images} title={property.title} />

      <Section spacing="lg">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            <Reveal>
              <PropertyOverview property={property} />
            </Reveal>

            <Reveal delay={80} className="mt-8">
              <h2 className="text-xl font-semibold text-navy-950">Description</h2>
              <p className="mt-4 text-base leading-relaxed text-gray-500">
                {property.description}
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-10">
              <PropertyFeatures features={property.features} />
            </Reveal>
          </div>

          <div className="lg:col-span-1">
            <Reveal delay={160} className="flex flex-col gap-6 lg:sticky lg:top-24">
              <AgentCard agent={agent} property={property} />
              <InquiryForm property={property} />
            </Reveal>
          </div>
        </div>
      </Section>

      <SimilarProperties properties={similar} />
    </>
  );
}
