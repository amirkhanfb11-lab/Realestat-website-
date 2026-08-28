import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  ctaLabel: string;
  ctaHref: string;
};

export function ServiceCard({ title, description, icon, ctaLabel, ctaHref }: ServiceCardProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-7 transition-shadow duration-300 hover:shadow-elevated">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-950 text-gold-400">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          {icon}
        </svg>
      </span>
      <h3 className="mt-5 text-lg font-semibold text-navy-950">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">{description}</p>
      <Button
        href={ctaHref}
        target={ctaHref.startsWith("http") ? "_blank" : undefined}
        rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
        variant="outline"
        size="sm"
        fullWidth
        className="mt-6"
      >
        {ctaLabel}
      </Button>
    </div>
  );
}
