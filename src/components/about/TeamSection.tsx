import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

const departments = [
  {
    title: "Sales & Acquisitions",
    description: "Guidance from first viewing to final signature for buyers and sellers alike.",
    icon: (
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9.5Z" strokeLinejoin="round" />
    ),
  },
  {
    title: "Leasing & Rentals",
    description: "Matching tenants and landlords quickly, with clear terms on every agreement.",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h6v6H9z" />
      </>
    ),
  },
  {
    title: "Property Management",
    description: "Day-to-day upkeep, tenant relations, and reporting so owners can step back.",
    icon: (
      <>
        <path d="M4 21V9l8-5 8 5v12" strokeLinejoin="round" />
        <path d="M9 21v-6h6v6" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Valuation & Consulting",
    description: "Accurate, data-backed valuations and honest advice on your next move.",
    icon: (
      <>
        <path d="M4 19h16" strokeLinecap="round" />
        <path d="m5 15 4-4 3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 8h4v4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export function TeamSection() {
  return (
    <Section spacing="lg">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
          Who We Are
        </p>
        <h2 className="mt-3 text-3xl text-navy-950 sm:text-4xl">Meet Our Team</h2>
        <p className="mt-4 text-base text-gray-500">
          Every inquiry is handled by a dedicated specialist for that service — reach out and
          you&apos;ll speak directly with the right person.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {departments.map((dept, index) => (
          <Reveal
            key={dept.title}
            delay={index * 80}
            className="flex h-full flex-col rounded-2xl border border-border bg-white p-6"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory-100 text-navy-950">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                {dept.icon}
              </svg>
            </span>
            <h3 className="mt-5 text-base font-semibold text-navy-950">{dept.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
              {dept.description}
            </p>
            <a
              href="https://wa.me/971508333410"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold-600 transition-colors hover:text-gold-500"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Contact this team
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
