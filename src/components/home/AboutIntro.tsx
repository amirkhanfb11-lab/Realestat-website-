import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { label: "Homes Sold", value: "1,200+" },
  { label: "Years of Trust", value: "18" },
  { label: "Client Satisfaction", value: "98%" },
  { label: "Expert Agents", value: "40+" },
];

export function AboutIntro() {
  return (
    <Section background="muted" spacing="lg">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-elevated">
          <Image
            src="https://images.unsplash.com/photo-1628744876497-eb30460be9f6?q=80&w=1600&auto=format&fit=crop"
            alt="Bright, modern living room in an Abusalam-listed home"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={100}>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
            About Abusalam
          </p>
          <h2 className="mt-3 text-3xl text-navy-950 sm:text-4xl">
            Two decades of trusted real estate expertise
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-500">
            Abusalam Real Estate was founded on a simple idea: buying or selling a home should
            feel exciting, not overwhelming. Today our agents combine deep local market knowledge
            with a hands-on, honest approach — helping families and investors alike find
            properties they&apos;re proud to call home.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl text-navy-950">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
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
