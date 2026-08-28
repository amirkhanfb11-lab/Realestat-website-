import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { value: "1994", label: "Year Established" },
  { value: "5.0★", label: "Google Rating" },
  { value: "6", label: "Core Services" },
  { value: "Al Ain", label: "Proudly Based In" },
];

export function AboutStats() {
  return (
    <Section background="dark" spacing="md">
      <Reveal className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-serif text-3xl text-gold-400 sm:text-4xl">{stat.value}</p>
            <p className="mt-2 text-xs uppercase tracking-wider text-ivory-50/70 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
