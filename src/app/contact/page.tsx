import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Sumalani Real Estate in Al Ain — call, WhatsApp, or send us a message about buying, selling, renting, or managing property.",
};

export default function ContactPage() {
  return (
    <>
      <Section background="dark" spacing="md">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            Get In Touch
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-base text-ivory-50/80">
            Questions about buying, selling, renting, or managing a property in Al Ain? We&apos;re
            here to help.
          </p>
        </Reveal>
      </Section>

      <Section spacing="lg">
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          <Reveal className="lg:col-span-1">
            <ContactInfo />
          </Reveal>
          <Reveal delay={80} className="lg:col-span-2">
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      <Section background="muted" spacing="lg">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
            Find Us
          </p>
          <h2 className="mt-3 text-3xl text-navy-950 sm:text-4xl">Visit Our Office</h2>
        </Reveal>
        <Reveal delay={80} className="mt-10">
          <MapEmbed />
        </Reveal>
      </Section>
    </>
  );
}
