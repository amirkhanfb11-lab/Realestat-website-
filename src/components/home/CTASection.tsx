import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CTASection() {
  return (
    <Section background="accent" spacing="lg">
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl">Ready to find your extraordinary home?</h2>
        <p className="mt-4 text-base text-ivory-50/80">
          Tell us what you&apos;re looking for and one of our agents will reach out within one
          business day.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/contact" variant="secondary" size="lg">
            Schedule a Consultation
          </Button>
          <Button
            href="/properties"
            variant="outline"
            size="lg"
            className="border-ivory-50/40 text-ivory-50 hover:bg-ivory-50 hover:text-navy-950"
          >
            Browse Properties
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
