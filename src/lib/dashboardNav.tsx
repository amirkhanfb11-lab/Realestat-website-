import type { ReactNode } from "react";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

/** Shared with DashboardSidebar (desktop + mobile drawer) and DashboardHeader (page title lookup). */
export const dashboardNavItems: DashboardNavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <>
        <rect x="4" y="4" width="7" height="7" rx="1.5" />
        <rect x="13" y="4" width="7" height="7" rx="1.5" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    label: "Properties",
    href: "/dashboard/properties",
    icon: <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9.5Z" strokeLinejoin="round" />,
  },
  {
    label: "Leads",
    href: "/dashboard/leads",
    icon: <path d="M4 4h16l-6.5 7.5V19l-3 2v-9.5L4 4Z" strokeLinejoin="round" />,
  },
  {
    label: "Clients",
    href: "/dashboard/clients",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 20c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" strokeLinecap="round" />
        <circle cx="17" cy="8.5" r="2.3" />
        <path d="M15.7 14.7c2.3.4 4 2.4 4 4.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Agents",
    href: "/dashboard/agents",
    icon: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2" />
        <circle cx="9" cy="12" r="2" />
        <path d="M14 10.5h4M14 13.5h2.5" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Services",
    href: "/dashboard/services",
    icon: (
      <>
        <rect x="3" y="7.5" width="18" height="12" rx="2" />
        <path d="M8.5 7.5v-2a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5v2" />
        <path d="M3 12h18" />
      </>
    ),
  },
  {
    label: "Testimonials",
    href: "/dashboard/testimonials",
    icon: (
      <path
        d="m12 3.5 2.6 5.4 5.9.6-4.4 4 1.3 5.8L12 16.3l-5.4 3-1.3-5.8-4.4-4 5.9-.6 2.6-5.4Z"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Messages",
    href: "/dashboard/messages",
    icon: <path d="M4 5.5h16v11.5H8.5L4 21V5.5Z" strokeLinejoin="round" />,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: (
      <>
        <rect x="4" y="12" width="3.5" height="8" rx="1" />
        <rect x="10.25" y="7" width="3.5" height="13" rx="1" />
        <rect x="16.5" y="3.5" width="3.5" height="16.5" rx="1" />
      </>
    ),
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path
          d="M19.4 13.5a7.6 7.6 0 0 0 0-3l2-1.5-1.9-3.3-2.3.9a7.6 7.6 0 0 0-2.6-1.5L14.2 2.6h-3.8l-.4 2.5a7.6 7.6 0 0 0-2.6 1.5l-2.3-.9-1.9 3.3 2 1.5a7.6 7.6 0 0 0 0 3l-2 1.5 1.9 3.3 2.3-.9c.77.66 1.65 1.17 2.6 1.5l.4 2.5h3.8l.4-2.5a7.6 7.6 0 0 0 2.6-1.5l2.3.9 1.9-3.3-2-1.5Z"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];
