/**
 * Mock client/contact data for the admin dashboard. Independent of the
 * Properties and Leads modules (own file, own sessionStorage key).
 */

export type ClientType = "Buyer" | "Seller" | "Tenant" | "Landlord" | "Investor";

export const CLIENT_TYPE_OPTIONS: ClientType[] = ["Buyer", "Seller", "Tenant", "Landlord", "Investor"];

export type ClientNote = {
  id: string;
  text: string;
  date: string;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: ClientType;
  agentId: string | null;
  notes: ClientNote[];
  createdAt: string;
};

export const clientsSeed: Client[] = [
  {
    id: "client-1",
    name: "Ahmed Al Ketbi",
    email: "ahmed.alketbi@example.com",
    phone: "+971 50 210 3344",
    type: "Buyer",
    agentId: "abu-salem-team",
    createdAt: "2026-06-12",
    notes: [{ id: "cnote-1-1", text: "Looking for a 4-bed villa under AED 3.5M in Al Ain.", date: "Jun 12" }],
  },
  {
    id: "client-2",
    name: "Mariam Al Zaabi",
    email: "mariam.alzaabi@example.com",
    phone: "+971 55 321 4455",
    type: "Seller",
    agentId: "abu-salem-team",
    createdAt: "2026-05-28",
    notes: [
      { id: "cnote-2-1", text: "Wants to list her Al Jimi apartment by end of Q3.", date: "May 28" },
      { id: "cnote-2-2", text: "Sent comparable listings for pricing guidance.", date: "Jun 3" },
    ],
  },
  {
    id: "client-3",
    name: "Saeed Al Marri",
    email: "saeed.almarri@example.com",
    phone: "+971 52 432 5566",
    type: "Tenant",
    agentId: null,
    createdAt: "2026-07-02",
    notes: [],
  },
  {
    id: "client-4",
    name: "Aisha Al Hosani",
    email: "aisha.alhosani@example.com",
    phone: "+971 56 543 6677",
    type: "Landlord",
    agentId: "abu-salem-team",
    createdAt: "2026-04-15",
    notes: [{ id: "cnote-4-1", text: "Owns two rental units, wants full property management.", date: "Apr 15" }],
  },
  {
    id: "client-5",
    name: "Sultan Al Qassimi",
    email: "sultan.alqassimi@example.com",
    phone: "+971 50 654 7788",
    type: "Investor",
    agentId: "abu-salem-team",
    createdAt: "2026-03-30",
    notes: [{ id: "cnote-5-1", text: "Building a rental portfolio — interested in off-plan opportunities.", date: "Apr 2" }],
  },
  {
    id: "client-6",
    name: "Reem Al Shehhi",
    email: "reem.alshehhi@example.com",
    phone: "+971 54 765 8899",
    type: "Buyer",
    agentId: null,
    createdAt: "2026-08-01",
    notes: [],
  },
  {
    id: "client-7",
    name: "Faisal Al Rashdi",
    email: "faisal.alrashdi@example.com",
    phone: "+971 58 876 9900",
    type: "Tenant",
    agentId: "abu-salem-team",
    createdAt: "2026-07-20",
    notes: [],
  },
  {
    id: "client-8",
    name: "Maitha Al Marzouqi",
    email: "maitha.almarzouqi@example.com",
    phone: "+971 50 987 0011",
    type: "Landlord",
    agentId: null,
    createdAt: "2026-06-25",
    notes: [{ id: "cnote-8-1", text: "Considering switching management companies next renewal.", date: "Jun 25" }],
  },
  {
    id: "client-9",
    name: "Abdullah Al Junaibi",
    email: "abdullah.aljunaibi@example.com",
    phone: "+971 52 098 1122",
    type: "Investor",
    agentId: "abu-salem-team",
    createdAt: "2026-02-14",
    notes: [],
  },
  {
    id: "client-10",
    name: "Hessa Al Yammahi",
    email: "hessa.alyammahi@example.com",
    phone: "+971 55 109 2233",
    type: "Seller",
    agentId: "abu-salem-team",
    createdAt: "2026-05-05",
    notes: [
      { id: "cnote-10-1", text: "Selling family home, sentimental — needs a patient approach.", date: "May 5" },
      { id: "cnote-10-2", text: "Agreed on listing price after valuation visit.", date: "May 19" },
    ],
  },
];
