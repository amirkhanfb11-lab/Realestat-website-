import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

export function CompanyIntro() {
  return (
    <Section spacing="lg">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-elevated">
          <Image
            src="https://images.unsplash.com/photo-1780733066519-df99b3123d30?q=80&w=1600&auto=format&fit=crop"
            alt="A consultant explains property plans to clients"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={100}>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
            Our Story
          </p>
          <h2 className="mt-3 text-3xl text-navy-950 sm:text-4xl">
            Building Al Ain&apos;s real estate future since 1994
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-500">
            What began as a small local office in Al Sarouj has grown into one of Al Ain&apos;s
            most trusted names in real estate. For over three decades, Sumalani Real Estate has
            helped families find homes, investors build portfolios, and landlords manage their
            properties with confidence.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-500">
            Today, we offer a complete range of services — sales, leasing, property management,
            valuation, and consulting — all guided by the same hands-on, honest approach that
            built our reputation in the first place.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
