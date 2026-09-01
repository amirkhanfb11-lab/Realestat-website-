import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SearchFilterBar } from "@/components/property/SearchFilterBar";

export function Hero() {
  return (
    <section className="relative">
      <div className="relative flex min-h-[620px] items-center overflow-hidden bg-navy-950 text-ivory-50 sm:min-h-[700px]">
        <Image
          src="https://images.unsplash.com/photo-1748063578185-3d68121b11ff?q=80&w=2400&auto=format&fit=crop"
          alt="Modern luxury home exterior glowing at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,37,64,0.78) 0%, rgba(10,37,64,0.55) 45%, rgba(10,37,64,0.92) 100%)",
          }}
          aria-hidden="true"
        />

        <Container className="relative py-24 sm:py-28">
          <div className="flex max-w-2xl flex-col items-start">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-4 py-1 text-xs font-medium uppercase tracking-widest text-gold-400 animate-fade-in-up">
              Al Ain&apos;s Property Partner Since 1994
            </span>
            <h1 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl animate-fade-in-up">
              Find a home that feels extraordinary.
            </h1>
            <p className="mt-6 max-w-xl text-base text-ivory-50/85 sm:text-lg animate-fade-in-up">
              Abu Salem Real Estate pairs curated listings with attentive, trusted guidance — from
              first showing to closing day.
            </p>
            <div className="mt-10 animate-fade-in-up">
              <Button href="/properties" size="lg">
                Explore Properties
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="relative -mt-10 sm:-mt-12">
        <SearchFilterBar />
      </Container>
    </section>
  );
}
