import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

const reasons = [
  {
    title: "Trusted Expertise",
    description:
      "Serving Al Ain since 1994, guiding buyers and sellers through every market cycle with steady, informed advice.",
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Curated Listings",
    description: "Every property is personally vetted before it ever reaches your search results.",
    icon: (
      <path
        d="M12 3l2.4 5.3L20 9.1l-4 3.6.9 6.3L12 15.9 7.1 19l.9-6.3-4-3.6 5.6-.8L12 3Z"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Transparent Process",
    description: "Clear pricing and honest guidance from offer to closing — no hidden surprises.",
    icon: (
      <>
        <path d="M6 4h9l3 3v13H6z" strokeLinejoin="round" />
        <path d="M9 10h6M9 14h6M9 18h3" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Dedicated Support",
    description: "One agent with you from first tour to final signature — always a call away.",
    icon: (
      <>
        <path d="M4 13a8 8 0 0 1 16 0" strokeLinecap="round" />
        <path d="M4 13v4a2 2 0 0 0 2 2h1v-6H5a1 1 0 0 0-1 1Z" strokeLinejoin="round" />
        <path d="M20 13v4a2 2 0 0 1-2 2h-1v-6h2a1 1 0 0 1 1 1Z" strokeLinejoin="round" />
      </>
    ),
  },
];

export function WhyChooseUs() {
  return (
    <Section background="muted" spacing="lg">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
          Why Abu Salem
        </p>
        <h2 className="mt-3 text-3xl text-navy-950 sm:text-4xl">
          Trust, built one closing at a time
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason, index) => (
          <Reveal
            key={reason.title}
            delay={index * 80}
            className="rounded-2xl bg-ivory-50 p-6 shadow-soft"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-950 text-gold-400">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                {reason.icon}
              </svg>
            </span>
            <h3 className="mt-5 text-base font-semibold text-navy-950">{reason.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">{reason.description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
