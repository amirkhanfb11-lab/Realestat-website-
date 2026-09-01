import Image from "next/image";
import Link from "next/link";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { Container } from "./Container";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/abusalemrealestate",
    Icon: InstagramIcon,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@abusalemrealestate0",
    Icon: TikTokIcon,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/971508333410",
    Icon: WhatsAppIcon,
  },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-ivory-50">
      <Container>
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src="/logo/abu-salem-logo.jpg"
                alt="Abu Salem Real Estate"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg object-contain"
              />
              <span className="font-serif text-xl">
                Abu Salem <span className="text-gold-500">Real Estate</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory-50/70">
              Al Ain&apos;s trusted property partner since 1994 — buying, selling, renting,
              management, valuation, and consulting.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory-50/15 text-ivory-50/70 transition-colors hover:border-gold-500 hover:text-gold-500"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-500">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory-50/70 transition-colors hover:text-ivory-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-500">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ivory-50/70">
              <li>Al Sarouj, Al Ain</li>
              <li>United Arab Emirates</li>
              <li>
                <a href="tel:+97137511410" className="transition-colors hover:text-ivory-50">
                  +971 3 751 1410
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/971508333410"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ivory-50"
                >
                  WhatsApp: +971 50 833 3410
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-500">
              Stay Updated
            </h3>
            <p className="mt-4 text-sm text-ivory-50/70">
              Get new listings and market insights in your inbox.
            </p>
            <form className="mt-4 flex gap-2">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email"
                className="w-full rounded-full border border-ivory-50/15 bg-transparent px-4 py-2 text-sm text-ivory-50 placeholder:text-ivory-50/40 focus-visible:outline-none focus-visible:border-gold-500"
              />
              <button
                type="button"
                className="shrink-0 rounded-full bg-gold-500 px-4 py-2 text-sm font-medium text-navy-950 transition-colors hover:bg-gold-400"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-ivory-50/10 py-6 text-center text-xs text-ivory-50/50 sm:text-left">
          <p>&copy; {new Date().getFullYear()} Abu Salem Real Estate. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
