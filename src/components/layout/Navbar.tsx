"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "./Container";

const links = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function isActiveLink(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled || open
          ? "bg-ivory-50/95 shadow-soft backdrop-blur-md"
          : "bg-ivory-50/0"
      )}
    >
      <Container>
        <nav className="flex h-20 items-center justify-between" aria-label="Primary">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <Image
              src="/logo/abu-salem-logo.jpg"
              alt="Abu Salem Real Estate"
              width={44}
              height={44}
              className="h-11 w-11 rounded-lg border border-border object-contain"
              priority
            />
            <span className="font-serif text-xl tracking-tight text-navy-950">
              Abu Salem <span className="text-gold-600">Real Estate</span>
            </span>
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            {links.map((link) => {
              const active = isActiveLink(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-gold-600",
                    active ? "text-gold-600" : "text-navy-950/80"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <Button href="/contact" size="sm">
              Get in Touch
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-navy-950 transition-colors hover:bg-navy-950/5 lg:hidden"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </nav>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden transition-[max-height,opacity] duration-300 ease-out lg:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <Container>
          <div className="flex flex-col gap-1 border-t border-border py-4">
            {links.map((link) => {
              const active = isActiveLink(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-ivory-100",
                    active ? "text-gold-600" : "text-navy-950"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button href="/contact" className="mt-2" onClick={() => setOpen(false)}>
              Get in Touch
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
