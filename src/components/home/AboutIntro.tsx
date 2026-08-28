import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { label: "Established", value: "1994" },
  { label: "Google Rating", value: "5.0★" },
  { label: "Core Services", value: "6" },
  { label: "Based In", value: "Al Ain" },
];

export function AboutIntro() {
  return (
    <Section background="muted" spacing="lg">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-elevated">
          <Image
            src="https://images.unsplash.com/photo-1628744876497-eb30460be9f6?q=80&w=1600&auto=format&fit=crop"
            alt="Bright, modern living room interior"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={100}>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
            About Abu Salem
          </p>
          <h2 className="mt-3 text-3xl text-navy-950 sm:text-4xl">
            Over 30 years of trusted real estate expertise
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600">
            Abu Salem Real Estate has served Al Ain since 1994, helping families and investors
            buy, sell, rent, and manage property across the city. Our team combines decades of
            local market knowledge with a hands-on, honest approach — from first inquiry to final
            signature.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl text-navy-950">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-gray-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <Button href="/about" variant="primary" className="mt-8">
            Learn More About Us
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
