import type { ChartPoint } from "@/lib/dashboardMock";

/**
 * Mock staff/agent records for the admin dashboard's Agents module.
 * Independent of `lib/agents.ts` (the single real public-facing business
 * entity used on the live site) — this models individual internal staff,
 * which the public site deliberately does not expose.
 */

export type AgentStatus = "Active" | "Away" | "Inactive";

export const AGENT_STATUS_OPTIONS: AgentStatus[] = ["Active", "Away", "Inactive"];

export type DashboardAgent = {
  id: string;
  name: string;
  title: string;
  initials: string;
  phone: string;
  email: string;
  status: AgentStatus;
  activeListings: number;
  leads: number;
  performance: ChartPoint[];
};

export const dashboardAgentsSeed: DashboardAgent[] = [
  {
    id: "agent-1",
    name: "Yasmin Al Otaiba",
    title: "Senior Sales Agent",
    initials: "YA",
    phone: "+971 50 300 1122",
    email: "yasmin.alotaiba@abusalemrealestate.com",
    status: "Active",
    activeListings: 8,
    leads: 12,
    performance: [
      { label: "Mar", value: 4 },
      { label: "Apr", value: 6 },
      { label: "May", value: 5 },
      { label: "Jun", value: 8 },
      { label: "Jul", value: 9 },
      { label: "Aug", value: 7 },
    ],
  },
  {
    id: "agent-2",
    name: "Khalifa Al Mheiri",
    title: "Leasing Agent",
    initials: "KM",
    phone: "+971 55 300 2233",
    email: "khalifa.almheiri@abusalemrealestate.com",
    status: "Active",
    activeListings: 5,
    leads: 7,
    performance: [
      { label: "Mar", value: 2 },
      { label: "Apr", value: 3 },
      { label: "May", value: 4 },
      { label: "Jun", value: 3 },
      { label: "Jul", value: 5 },
      { label: "Aug", value: 4 },
    ],
  },
  {
    id: "agent-3",
    name: "Noora Al Ketbi",
    title: "Property Consultant",
    initials: "NK",
    phone: "+971 52 300 3344",
    email: "noora.alketbi@abusalemrealestate.com",
    status: "Away",
    activeListings: 3,
    leads: 4,
    performance: [
      { label: "Mar", value: 1 },
      { label: "Apr", value: 2 },
      { label: "May", value: 1 },
      { label: "Jun", value: 2 },
      { label: "Jul", value: 2 },
      { label: "Aug", value: 1 },
    ],
  },
  {
    id: "agent-4",
    name: "Rashed Al Suwaidi",
    title: "Investment Advisor",
    initials: "RS",
    phone: "+971 56 300 4455",
    email: "rashed.alsuwaidi@abusalemrealestate.com",
    status: "Active",
    activeListings: 6,
    leads: 9,
    performance: [
      { label: "Mar", value: 3 },
      { label: "Apr", value: 5 },
      { label: "May", value: 4 },
      { label: "Jun", value: 6 },
      { label: "Jul", value: 7 },
      { label: "Aug", value: 6 },
    ],
  },
  {
    id: "agent-5",
    name: "Alia Al Blooshi",
    title: "Sales Agent",
    initials: "AB",
    phone: "+971 58 300 5566",
    email: "alia.alblooshi@abusalemrealestate.com",
    status: "Inactive",
    activeListings: 0,
    leads: 1,
    performance: [
      { label: "Mar", value: 1 },
      { label: "Apr", value: 0 },
      { label: "May", value: 1 },
      { label: "Jun", value: 0 },
      { label: "Jul", value: 0 },
      { label: "Aug", value: 0 },
    ],
  },
];
