"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-ivory-50 pt-4 sm:pt-6">
      <Container>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ivory-100 sm:aspect-[16/8]">
          <Image
            src={images[active]}
            alt={`${title} — photo ${active + 1} of ${images.length}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover"
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => setActive((i) => (i - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ivory-50/90 text-navy-950 shadow-soft transition-colors hover:bg-ivory-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => setActive((i) => (i + 1) % images.length)}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ivory-50/90 text-navy-950 shadow-soft transition-colors hover:bg-ivory-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="absolute bottom-4 right-4 rounded-full bg-navy-950/80 px-3 py-1 text-xs font-medium text-ivory-50">
                {active + 1} / {images.length}
              </span>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
            {images.map((src, index) => (
              <button
                key={src + index}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`View photo ${index + 1}`}
                aria-current={index === active}
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-lg transition-opacity duration-200",
                  index === active ? "opacity-100 ring-2 ring-gold-500" : "opacity-70 hover:opacity-100"
                )}
              >
                <Image src={src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
