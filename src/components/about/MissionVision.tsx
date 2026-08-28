import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

const cards = [
  {
    title: "Our Mission",
    description:
      "To make every property transaction in Al Ain simple, transparent, and genuinely helpful — whether someone is buying their first home, leasing an apartment, or managing an investment portfolio.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="0.5" fill="currentColor" />
      </>
    ),
  },
  {
    title: "Our Vision",
    description:
      "To be the real estate partner every family and investor in Al Ain thinks of first — known not just for the properties we handle, but for the trust we've built over three decades.",
    icon: (
      <>
        <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2.6" />
      </>
    ),
  },
];

export function MissionVision() {
  return (
    <Section background="muted" spacing="lg">
      <div className="grid gap-6 sm:grid-cols-2">
        {cards.map((card, index) => (
          <Reveal
            key={card.title}
            delay={index * 100}
            className="rounded-2xl bg-ivory-50 p-8 shadow-soft"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-950 text-gold-400">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                {card.icon}
              </svg>
            </span>
            <h2 className="mt-5 text-xl font-semibold text-navy-950">{card.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">{card.description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
