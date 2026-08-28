import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

const values = [
  {
    title: "Integrity",
    description: "Straight answers, fair terms, and no surprises — even when it costs us a deal.",
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Client First",
    description: "Every recommendation starts with what's genuinely right for the client, not the quickest close.",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Local Expertise",
    description: "Three decades in Al Ain means we know the streets, the market, and the people.",
    icon: (
      <>
        <path d="M12 21s-6.5-5.7-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.3-6.5 11-6.5 11Z" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.2" />
      </>
    ),
  },
  {
    title: "Long-Term Relationships",
    description: "Most of our business comes from repeat clients and referrals — trust we work to keep earning.",
    icon: (
      <>
        <circle cx="8" cy="9" r="2.5" />
        <circle cx="16" cy="9" r="2.5" />
        <path d="M3 19c0-2.8 2.2-5 5-5s5 2.2 5 5M11 19c0-2.8 2.2-5 5-5s5 2.2 5 5" strokeLinecap="round" />
      </>
    ),
  },
];

export function CompanyValues() {
  return (
    <Section background="muted" spacing="lg">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
          Our Values
        </p>
        <h2 className="mt-3 text-3xl text-navy-950 sm:text-4xl">
          What guides every conversation
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, index) => (
          <Reveal
            key={value.title}
            delay={index * 80}
            className="rounded-2xl bg-ivory-50 p-6 shadow-soft"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-950 text-gold-400">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                {value.icon}
              </svg>
            </span>
            <h3 className="mt-5 text-base font-semibold text-navy-950">{value.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">{value.description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
