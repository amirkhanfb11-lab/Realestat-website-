import type { ReactNode } from "react";

/**
 * Selectable icon palette for the Services admin module — the same six
 * icon glyphs used on the public site (`lib/services.tsx`), copied here as
 * a keyed registry so an icon can be stored as a plain string and picked
 * from a dropdown, rather than editing raw SVG in a form.
 */

export type ServiceIconKey = "buying" | "selling" | "rental" | "management" | "consultation" | "investment";

export const SERVICE_ICON_OPTIONS: { key: ServiceIconKey; label: string; icon: ReactNode }[] = [
  {
    key: "buying",
    label: "Buying (house)",
    icon: <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9.5Z" strokeLinejoin="round" />,
  },
  {
    key: "selling",
    label: "Selling (tag)",
    icon: (
      <>
        <path d="M11 4H4v7l9 9 7-7-9-9Z" strokeLinejoin="round" />
        <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    key: "rental",
    label: "Rental (search)",
    icon: (
      <>
        <circle cx="8.5" cy="8.5" r="4" />
        <path d="M11.5 11.5 20 20M16 17l3-3" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    key: "management",
    label: "Management (building)",
    icon: (
      <>
        <path d="M4 21V9l8-5 8 5v12" strokeLinejoin="round" />
        <path d="M9 21v-6h6v6" strokeLinejoin="round" />
      </>
    ),
  },
  {
    key: "consultation",
    label: "Consultation (document)",
    icon: <path d="M4 4h16v12H8l-4 4V4Z" strokeLinejoin="round" />,
  },
  {
    key: "investment",
    label: "Investment (chart)",
    icon: (
      <>
        <path d="M4 19h16" strokeLinecap="round" />
        <path d="m5 15 4-4 3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 8h4v4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export function getServiceIcon(key: ServiceIconKey): ReactNode {
  return SERVICE_ICON_OPTIONS.find((option) => option.key === key)?.icon ?? SERVICE_ICON_OPTIONS[0].icon;
}
