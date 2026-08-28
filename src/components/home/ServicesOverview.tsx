import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

const services = [
  {
    title: "Residential Sales",
    description: "Buy or sell a home with a team that knows your market inside out.",
    icon: (
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9.5Z" strokeLinejoin="round" />
    ),
  },
  {
    title: "Luxury Rentals",
    description: "Find or list premium rental properties with white-glove management.",
    icon: (
      <>
        <circle cx="8.5" cy="8.5" r="4" />
        <path d="M11.5 11.5 20 20M16 17l3-3" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Property Management",
    description: "Full-service management so your investment runs itself, day to day.",
    icon: (
      <>
        <path d="M4 21V9l8-5 8 5v12" strokeLinejoin="round" />
        <path d="M9 21v-6h6v6" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Investment Advisory",
    description: "Data-backed guidance for building a resilient property portfolio.",
    icon: (
      <>
        <path d="M4 19h16" strokeLinecap="round" />
        <path d="m5 15 4-4 3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 8h4v4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Relocation Services",
    description: "Moving cities or states? We handle the logistics so you don't have to.",
    icon: (
      <>
        <path d="M12 21s-6.5-5.7-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.3-6.5 11-6.5 11Z" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.2" />
      </>
    ),
  },
  {
    title: "Home Valuation",
    description: "Get an accurate, no-obligation estimate of what your property is worth.",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 14l2.5-3 2 2L16 9" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

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
            key={service.title}
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
