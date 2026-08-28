import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CompanyIntro } from "@/components/about/CompanyIntro";
import { MissionVision } from "@/components/about/MissionVision";
import { AboutStats } from "@/components/about/AboutStats";
import { TeamSection } from "@/components/about/TeamSection";
import { CompanyValues } from "@/components/about/CompanyValues";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Abu Salem Real Estate has served Al Ain since 1994 — learn about our mission, values, and the team behind every transaction.",
};

export default function AboutPage() {
  return (
    <>
      <Section background="dark" spacing="md">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            About Us
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Al Ain&apos;s Property Partner Since 1994
          </h1>
          <p className="mt-4 text-base text-ivory-50/80">
            Three decades of buying, selling, renting, and managing property across Al Ain —
            built on trust, one client at a time.
          </p>
        </Reveal>
      </Section>

      <CompanyIntro />
      <MissionVision />
      <AboutStats />
      <WhyChooseUs />
      <TeamSection />
      <CompanyValues />
      <CTASection />
    </>
  );
}
