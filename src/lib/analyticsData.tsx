import type { ReactNode } from "react";
import { adminPropertiesSeed } from "@/lib/adminProperties";
import { leadsSeed } from "@/lib/leads";
import { leadsChartData, type ChartPoint } from "@/lib/dashboardMock";

/**
 * Analytics is read-only reporting, so nothing here is a fresh dataset —
 * it's computed from the Properties and Leads modules' existing seed data
 * (imported directly, since each module's live edits are scoped to its
 * own sessionStorage/route and aren't shared across routes yet).
 *
 * Two figures have no tracking anywhere in the app (no page-view or
 * click pipeline exists), so they're honestly-labeled illustrative mock
 * numbers: Property Views and WhatsApp/Contact Clicks. Everything else
 * is a real count derived from the seed arrays.
 */

const newProperties = adminPropertiesSeed.filter((property) => property.status === "Draft").length;
const soldProperties = adminPropertiesSeed.filter((property) => property.status === "Sold").length;
const rentedProperties = adminPropertiesSeed.filter((property) => property.status === "Rented").length;
const publishedProperties = adminPropertiesSeed.filter((property) => property.status === "Published").length;

const totalLeads = leadsSeed.length;
const convertedLeads = leadsSeed.filter((lead) => lead.status === "Converted").length;
const conversionRate = totalLeads === 0 ? 0 : Math.round((convertedLeads / totalLeads) * 100);

export const propertyViewsTrend: ChartPoint[] = [
  { label: "Mar", value: 320 },
  { label: "Apr", value: 410 },
  { label: "May", value: 380 },
  { label: "Jun", value: 460 },
  { label: "Jul", value: 520 },
  { label: "Aug", value: 610 },
];
const totalPropertyViews = propertyViewsTrend.reduce((sum, point) => sum + point.value, 0);
const contactClicks = 184;

/** Reuses the Home page's existing leads trend — same metric, no need for a second dataset. */
export const leadsOverTime: ChartPoint[] = leadsChartData;

/** Current portfolio composition by status — a snapshot, not a trend, since the data has no sold/rented-at dates to chart over time. */
export const salesRentalActivity: ChartPoint[] = [
  { label: "Published", value: publishedProperties },
  { label: "Sold", value: soldProperties },
  { label: "Rented", value: rentedProperties },
  { label: "Draft", value: newProperties },
];

export type AnalyticsStat = { label: string; value: string; delta: string; icon: ReactNode };

export const analyticsStats: AnalyticsStat[] = [
  {
    label: "Property Views",
    value: totalPropertyViews.toLocaleString(),
    delta: "Last 6 months (est.)",
    icon: (
      <>
        <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
  },
  {
    label: "New Properties",
    value: String(newProperties),
    delta: "Currently in Draft",
    icon: <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9.5Z" strokeLinejoin="round" />,
  },
  {
    label: "Sold Properties",
    value: String(soldProperties),
    delta: "All time",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12.5 2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: "Rented Properties",
    value: String(rentedProperties),
    delta: "All time",
    icon: (
      <>
        <circle cx="7.5" cy="16.5" r="3.4" />
        <path d="M10.3 13.7 19 5M15.7 8.3l2 2M13.2 10.8l2 2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: "Total Leads",
    value: String(totalLeads),
    delta: "All time",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.4" />
        <path d="M3.5 20c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" strokeLinecap="round" />
        <path d="M18 8v6M15 11h6" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Converted Leads",
    value: String(convertedLeads),
    delta: "All time",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3.4" />
      </>
    ),
  },
  {
    label: "Conversion Rate",
    value: `${conversionRate}%`,
    delta: `${convertedLeads} of ${totalLeads} leads`,
    icon: (
      <>
        <path d="M4 17l5-5 4 4 6-8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 7h5v5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: "WhatsApp / Contact Clicks",
    value: String(contactClicks),
    delta: "Last 6 months (est.)",
    icon: <path d="M4 5.5h16v11.5H8.5L4 21V5.5Z" strokeLinejoin="round" />,
  },
];
