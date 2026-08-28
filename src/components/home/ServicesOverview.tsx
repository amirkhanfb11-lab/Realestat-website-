import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/services";

export function ServicesOverview() {
  return (
    <Section spacing="lg">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
          What We Offer
        </p>
        <h2 className="mt-3 text-3xl text-navy-950 sm:text-4xl">
          Full-service guidance, start to finish
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal
            key={service.slug}
            delay={index * 60}
            className="rounded-2xl border border-border bg-white p-6 transition-shadow duration-300 hover:shadow-soft"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory-100 text-navy-950">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                {service.icon}
              </svg>
            </span>
            <h3 className="mt-5 text-base font-semibold text-navy-950">{service.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">{service.description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
