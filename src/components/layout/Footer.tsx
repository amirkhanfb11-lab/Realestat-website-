import Link from "next/link";
import { Container } from "./Container";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About Us", href: "/about" },
  { label: "Our Agents", href: "/agents" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  {
    label: "Instagram",
    href: "#",
    path: "M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5ZM12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm4.5-3.75a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75ZM12 4.5c-2.05 0-2.31.008-3.117.045-.805.037-1.355.166-1.836.354a3.7 3.7 0 0 0-1.338.871 3.7 3.7 0 0 0-.87 1.338c-.19.48-.318 1.03-.355 1.836C4.447 9.69 4.44 9.95 4.44 12s.007 2.31.044 3.117c.037.805.166 1.355.355 1.836.19.5.44.916.87 1.338.423.43.84.68 1.338.87.48.19 1.03.318 1.836.355.806.037 1.066.045 3.117.045s2.31-.008 3.117-.045c.805-.037 1.355-.166 1.836-.355a3.7 3.7 0 0 0 1.338-.87c.43-.422.68-.839.87-1.338.19-.48.318-1.03.355-1.836.037-.806.045-1.066.045-3.117s-.008-2.31-.045-3.117c-.037-.805-.166-1.355-.355-1.836a3.7 3.7 0 0 0-.87-1.338 3.7 3.7 0 0 0-1.338-.87c-.48-.19-1.03-.318-1.836-.355C14.31 4.508 14.05 4.5 12 4.5Z",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.87.24-1.46 1.5-1.46h1.6V4.35C16.3 4.24 15.4 4.15 14.36 4.15c-2.13 0-3.6 1.3-3.6 3.68V10.5H8.25v3h2.51V21h2.74Z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M6.94 8.5H4.56V19.4h2.38V8.5ZM5.75 4.1a1.38 1.38 0 1 0 0 2.76 1.38 1.38 0 0 0 0-2.76ZM19.44 19.4h-2.37v-5.4c0-1.29-.02-2.94-1.79-2.94-1.8 0-2.08 1.4-2.08 2.85v5.49H10.83V8.5h2.28v1.49h.03c.32-.6 1.1-1.24 2.27-1.24 2.43 0 2.88 1.6 2.88 3.68v6.97Z",
  },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-ivory-50">
      <Container>
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="font-serif text-xl">
              Abusalam <span className="text-gold-500">Real Estate</span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory-50/70">
              Curating exceptional homes and trusted guidance for every step of your property
              journey.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory-50/15 text-ivory-50/70 transition-colors hover:border-gold-500 hover:text-gold-500"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
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
              <li>123 Skyline Avenue, Suite 500</li>
              <li>Los Angeles, CA 90012</li>
              <li>
                <a href="tel:+18005551234" className="transition-colors hover:text-ivory-50">
                  +1 (800) 555-1234
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@abusalamrealestate.com"
                  className="transition-colors hover:text-ivory-50"
                >
                  hello@abusalamrealestate.com
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
                className="shrink-0 rounded-full bg-gold-500 px-4 py-2 text-sm font-medium text-navy-950 transition-colors hover:bg-gold-600"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-ivory-50/10 py-6 text-xs text-ivory-50/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Abusalam Real Estate. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-ivory-50">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ivory-50">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
