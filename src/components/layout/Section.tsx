import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionBackground = "default" | "muted" | "dark" | "accent";
type SectionSpacing = "sm" | "md" | "lg";

type SectionProps = {
  id?: string;
  background?: SectionBackground;
  spacing?: SectionSpacing;
  container?: boolean;
  className?: string;
  children: ReactNode;
};

const backgrounds: Record<SectionBackground, string> = {
  default: "bg-ivory-50 text-charcoal-900",
  muted: "bg-ivory-100 text-charcoal-900",
  dark: "bg-navy-950 text-ivory-50",
  accent: "bg-navy-900 text-ivory-50",
};

const spacings: Record<SectionSpacing, string> = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-28 lg:py-32",
};

/**
 * Standardizes vertical rhythm and background across every page section.
 */
export function Section({
  id,
  background = "default",
  spacing = "md",
  container = true,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn(backgrounds[background], spacings[spacing], className)}>
      {container ? <Container>{children}</Container> : children}
    </section>
  );
}
