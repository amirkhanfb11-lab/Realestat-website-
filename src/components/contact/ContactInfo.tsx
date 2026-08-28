import { Button } from "@/components/ui/Button";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";

const iconClass = "h-5 w-5 flex-none text-gold-600";

const hours = [
  { day: "Saturday – Thursday", time: "9:00 AM – 1:00 PM, 5:00 PM – 8:00 PM" },
  { day: "Friday", time: "Closed" },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/abusalemrealestate", Icon: InstagramIcon },
  { label: "TikTok", href: "https://www.tiktok.com/@abusalemrealestate0", Icon: TikTokIcon },
];

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
        <h2 className="text-lg font-semibold text-navy-950">Contact Information</h2>

        <ul className="mt-5 space-y-4 text-sm text-charcoal-900">
          <li className="flex items-start gap-3">
            <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M4 5c0-.6.4-1 1-1h3l2 5-2 1.5a11 11 0 0 0 5.5 5.5L15 14l5 2v3c0 .6-.4 1-1 1C10.4 20 4 13.6 4 5Z" strokeLinejoin="round" />
            </svg>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500">Phone</p>
              <a href="tel:+97137511410" className="font-medium transition-colors hover:text-gold-600">
                +971 3 751 1410
              </a>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500">Email</p>
              <a
                href="mailto:info@abusalemrealestate.com"
                className="font-medium transition-colors hover:text-gold-600"
              >
                info@abusalemrealestate.com
              </a>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M12 21s-6.5-5.7-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.3-6.5 11-6.5 11Z" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="2.2" />
            </svg>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500">Office</p>
              <p className="font-medium">Al Sarouj, Al Ain, United Arab Emirates</p>
            </div>
          </li>
        </ul>

        <Button
          href="https://wa.me/971508333410"
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          fullWidth
          className="mt-6 gap-2"
        >
          <WhatsAppIcon />
          Chat on WhatsApp
        </Button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
        <h2 className="text-lg font-semibold text-navy-950">Business Hours</h2>
        <ul className="mt-4 space-y-2 text-sm text-gray-500">
          {hours.map((row) => (
            <li key={row.day} className="flex items-center justify-between gap-4">
              <span>{row.day}</span>
              <span className="text-right font-medium text-charcoal-900">{row.time}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
        <h2 className="text-lg font-semibold text-navy-950">Follow Us</h2>
        <div className="mt-4 flex gap-3">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-gray-500 transition-colors hover:border-gold-500 hover:text-gold-600"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
