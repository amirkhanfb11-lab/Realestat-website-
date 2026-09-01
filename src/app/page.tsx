import { Hero } from "@/components/home/Hero";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { AboutIntro } from "@/components/home/AboutIntro";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ServicesOverview />
      <AboutIntro />
      <Testimonials />
      <CTASection />
    </>
  );
}
