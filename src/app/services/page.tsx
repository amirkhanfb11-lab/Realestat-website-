import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/services/ServiceCard";
import { CTASection } from "@/components/home/CTASection";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Abu Salem Real Estate's full range of services in Al Ain — buying, selling, rental, property management, real estate consultation, and investment consultation.",
};

const WHATSAPP_HREF = "https://wa.me/971508333410";

export default function ServicesPage() {
  return (
    <>
      <Section background="dark" spacing="md">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            What We Offer
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Our Services</h1>
          <p className="mt-4 text-base text-ivory-50/80">
            One team, every step of the property journey — from your first search to long-term
            management.
          </p>
        </Reveal>
      </Section>

      <Section spacing="lg">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 60} className="h-full">
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                ctaLabel="Contact Us"
                ctaHref={WHATSAPP_HREF}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
