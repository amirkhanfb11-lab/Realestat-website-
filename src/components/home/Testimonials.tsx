import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/testimonials";

function Stars() {
  return (
    <div className="flex gap-1 text-gold-500" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3l2.6 5.8L21 9.6l-4.6 4.1L17.6 21 12 17.6 6.4 21l1.2-7.3L3 9.6l6.4-.8L12 3Z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <Section spacing="lg">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
          Client Stories
        </p>
        <h2 className="mt-3 text-3xl text-navy-950 sm:text-4xl">
          Homeowners who found more than a house
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal
            key={testimonial.name}
            delay={index * 80}
            className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-soft"
          >
            <Stars />
            <p className="mt-5 flex-1 text-sm leading-relaxed text-gray-500">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-navy-950 font-serif text-sm text-gold-400">
                {testimonial.initials}
              </span>
              <div>
                <p className="text-sm font-semibold text-navy-950">{testimonial.name}</p>
                <p className="text-xs text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
