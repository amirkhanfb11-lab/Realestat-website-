import type { ReactNode } from "react";

/**
 * Placeholder data for the dashboard home page until Leads/Analytics have a
 * real backend. Stat totals are kept internally consistent (Active + Sold +
 * Rented = Total; the "for rent / for sale" split sums to Active) so the
 * shell reads coherently even though the numbers are illustrative.
 */

export type DashboardStat = {
  label: string;
  value: string;
  delta: string;
  icon: ReactNode;
};

export const dashboardStats: DashboardStat[] = [
  {
    label: "Total Properties",
    value: "48",
    delta: "+4 this month",
    icon: <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9.5Z" strokeLinejoin="round" />,
  },
  {
    label: "Active Listings",
    value: "31",
    delta: "19 for sale · 12 for rent",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "Sold",
    value: "9",
    delta: "+2 this month",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12.5 2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: "Rented",
    value: "8",
    delta: "+1 this month",
    icon: (
      <>
        <circle cx="7.5" cy="16.5" r="3.4" />
        <path d="M10.3 13.7 19 5M15.7 8.3l2 2M13.2 10.8l2 2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: "New Leads",
    value: "14",
    delta: "+5 this week",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.4" />
        <path d="M3.5 20c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" strokeLinecap="round" />
        <path d="M18 8v6M15 11h6" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Pending Inquiries",
    value: "6",
    delta: "3 awaiting reply",
    icon: (
      <>
        <path d="M4 5.5h16v11.5H8.5L4 21V5.5Z" strokeLinejoin="round" />
        <path d="M12 9.5v3l2.2 1.3" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export type LeadStatus = "New" | "Contacted" | "Qualified";

export type Lead = {
  id: string;
  name: string;
  interest: string;
  type: "Buy" | "Rent";
  date: string;
  status: LeadStatus;
};

export const recentLeads: Lead[] = [
  { id: "lead-1", name: "Sara Al Mazrouei", interest: "The Hillcrest Villa", type: "Buy", date: "Aug 27", status: "New" },
  { id: "lead-2", name: "Yousef Al Shamsi", interest: "Harbor View Apartments", type: "Rent", date: "Aug 26", status: "Contacted" },
  { id: "lead-3", name: "Fatima Al Kaabi", interest: "Glasshouse Residences", type: "Buy", date: "Aug 25", status: "New" },
  { id: "lead-4", name: "Omar Al Nuaimi", interest: "Sunset Terrace Rentals", type: "Rent", date: "Aug 24", status: "Qualified" },
  { id: "lead-5", name: "Mona Al Dhaheri", interest: "Ridgeline Retreat", type: "Buy", date: "Aug 22", status: "Contacted" },
];

export type ChartPoint = { label: string; value: number };

export const leadsChartData: ChartPoint[] = [
  { label: "Mar", value: 8 },
  { label: "Apr", value: 11 },
  { label: "May", value: 9 },
  { label: "Jun", value: 15 },
  { label: "Jul", value: 17 },
  { label: "Aug", value: 14 },
];
