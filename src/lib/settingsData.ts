import { agents } from "@/lib/agents";

/**
 * Settings seeded from the real Abu Salem Real Estate info already used
 * elsewhere on the site (Footer.tsx, ContactInfo.tsx, agents.ts,
 * app/layout.tsx metadata) — nothing here is invented business data.
 * Notifications is the one section with no public-site equivalent, since
 * it's an admin-only app preference rather than business information.
 */

export type SettingsState = {
  company: {
    name: string;
    tagline: string;
    establishedYear: string;
    logoUrl: string;
    address: string;
    weekdayHours: string;
    fridayHours: string;
  };
  website: {
    siteTitle: string;
    metaDescription: string;
    domain: string;
  };
  social: {
    instagram: string;
    tiktok: string;
    whatsapp: string;
    phone: string;
    email: string;
  };
  notifications: {
    notifyNewLeads: boolean;
    notifyNewMessages: boolean;
    weeklySummary: boolean;
    notifyEmail: string;
  };
  adminProfile: {
    name: string;
    role: string;
    phone: string;
    email: string;
    initials: string;
  };
};

const primaryAgent = agents[0];

export const settingsSeed: SettingsState = {
  company: {
    name: "Abu Salem Real Estate",
    tagline:
      "Al Ain's trusted property partner since 1994 — buying, selling, renting, management, valuation, and consulting.",
    establishedYear: "1994",
    logoUrl: "/logo/abu-salem-logo.jpg",
    address: "Al Sarouj, Al Ain, United Arab Emirates",
    weekdayHours: "Saturday – Thursday: 9:00 AM – 1:00 PM, 5:00 PM – 8:00 PM",
    fridayHours: "Friday: Closed",
  },
  website: {
    siteTitle: "Abu Salem Real Estate | Al Ain Property Experts",
    metaDescription:
      "Abu Salem Real Estate is Al Ain's trusted property partner since 1994 — buying, selling, renting, property management, valuation, and consulting.",
    // Matches app/sitemap.ts and app/robots.ts — flagged there too as an unconfirmed placeholder.
    domain: "abusalemrealestate.com",
  },
  social: {
    instagram: "https://www.instagram.com/abusalemrealestate",
    tiktok: "https://www.tiktok.com/@abusalemrealestate0",
    whatsapp: "971508333410",
    phone: primaryAgent?.phone ?? "+971 3 751 1410",
    email: "info@abusalemrealestate.com",
  },
  notifications: {
    notifyNewLeads: true,
    notifyNewMessages: true,
    weeklySummary: false,
    notifyEmail: "info@abusalemrealestate.com",
  },
  adminProfile: {
    name: primaryAgent?.name ?? "Abu Salem Real Estate",
    role: primaryAgent?.title ?? "Admin",
    phone: primaryAgent?.phone ?? "+971 3 751 1410",
    email: primaryAgent?.email ?? "info@abusalemrealestate.com",
    initials: primaryAgent?.initials ?? "AS",
  },
};
