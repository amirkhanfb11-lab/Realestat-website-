/**
 * Mock lead/inquiry data for the admin dashboard. Kept independent of the
 * Properties module's data (separate file, separate sessionStorage key) —
 * only the `interest` text and `agentId` values are chosen to line up with
 * real listings/agents for narrative consistency.
 */

export type LeadStatus = "New" | "Contacted" | "Viewing Scheduled" | "Negotiating" | "Converted" | "Lost";

export const LEAD_STATUS_OPTIONS: LeadStatus[] = [
  "New",
  "Contacted",
  "Viewing Scheduled",
  "Negotiating",
  "Converted",
  "Lost",
];

export type LeadNote = {
  id: string;
  text: string;
  date: string;
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  interest: string;
  dealType: "Buy" | "Rent";
  status: LeadStatus;
  agentId: string | null;
  followUpDate: string | null;
  createdAt: string;
  notes: LeadNote[];
};

export const leadsSeed: Lead[] = [
  {
    id: "lead-1",
    name: "Sara Al Mazrouei",
    phone: "+971 50 111 2233",
    whatsapp: "971501112233",
    email: "sara.almazrouei@example.com",
    interest: "The Hillcrest Villa",
    dealType: "Buy",
    status: "New",
    agentId: "abu-salem-team",
    followUpDate: "2026-09-02",
    createdAt: "2026-08-31",
    notes: [],
  },
  {
    id: "lead-2",
    name: "Yousef Al Shamsi",
    phone: "+971 55 222 3344",
    whatsapp: "971552223344",
    email: "yousef.alshamsi@example.com",
    interest: "Harbor View Apartments",
    dealType: "Rent",
    status: "Contacted",
    agentId: "abu-salem-team",
    followUpDate: "2026-09-01",
    createdAt: "2026-08-30",
    notes: [{ id: "note-2-1", text: "Called, interested in a 2-bed unit — sending more photos.", date: "Aug 30" }],
  },
  {
    id: "lead-3",
    name: "Fatima Al Kaabi",
    phone: "+971 52 333 4455",
    whatsapp: "971523334455",
    email: "fatima.alkaabi@example.com",
    interest: "Glasshouse Residences",
    dealType: "Buy",
    status: "Viewing Scheduled",
    agentId: "abu-salem-team",
    followUpDate: "2026-09-03",
    createdAt: "2026-08-28",
    notes: [{ id: "note-3-1", text: "Scheduled a viewing for Sep 3 at 4pm.", date: "Aug 28" }],
  },
  {
    id: "lead-4",
    name: "Omar Al Nuaimi",
    phone: "+971 56 444 5566",
    whatsapp: "971564445566",
    email: "omar.alnuaimi@example.com",
    interest: "Sunset Terrace Rentals",
    dealType: "Rent",
    status: "Negotiating",
    agentId: "abu-salem-team",
    followUpDate: "2026-09-01",
    createdAt: "2026-08-25",
    notes: [{ id: "note-4-1", text: "Countered on price, awaiting owner response.", date: "Aug 26" }],
  },
  {
    id: "lead-5",
    name: "Mona Al Dhaheri",
    phone: "+971 50 555 6677",
    whatsapp: "971505556677",
    email: "mona.aldhaheri@example.com",
    interest: "Ridgeline Retreat",
    dealType: "Buy",
    status: "Converted",
    agentId: "abu-salem-team",
    followUpDate: null,
    createdAt: "2026-08-20",
    notes: [{ id: "note-5-1", text: "Signed agreement — deal closed.", date: "Aug 24" }],
  },
  {
    id: "lead-6",
    name: "Khalid Al Ameri",
    phone: "+971 54 666 7788",
    whatsapp: "971546667788",
    email: "khalid.alameri@example.com",
    interest: "Coastline Cottage",
    dealType: "Buy",
    status: "Lost",
    agentId: null,
    followUpDate: null,
    createdAt: "2026-08-15",
    notes: [{ id: "note-6-1", text: "Went with another agency.", date: "Aug 18" }],
  },
  {
    id: "lead-7",
    name: "Layla Al Mansoori",
    phone: "+971 58 777 8899",
    whatsapp: "971587778899",
    email: "layla.almansoori@example.com",
    interest: "Parkview Residence",
    dealType: "Buy",
    status: "New",
    agentId: null,
    followUpDate: "2026-09-05",
    createdAt: "2026-08-10",
    notes: [],
  },
  {
    id: "lead-8",
    name: "Hamdan Al Falasi",
    phone: "+971 50 888 9900",
    whatsapp: "971508889900",
    email: "hamdan.alfalasi@example.com",
    interest: "The Crestwood Flats",
    dealType: "Rent",
    status: "Contacted",
    agentId: "abu-salem-team",
    followUpDate: null,
    createdAt: "2026-08-05",
    notes: [{ id: "note-8-1", text: "Left a voicemail, will try again this week.", date: "Aug 6" }],
  },
  {
    id: "lead-9",
    name: "Noura Al Suwaidi",
    phone: "+971 52 999 0011",
    whatsapp: "971529990011",
    email: "noura.alsuwaidi@example.com",
    interest: "Skyline Residence",
    dealType: "Buy",
    status: "Viewing Scheduled",
    agentId: "abu-salem-team",
    followUpDate: "2026-09-04",
    createdAt: "2026-07-20",
    notes: [],
  },
  {
    id: "lead-10",
    name: "Rashid Al Blooshi",
    phone: "+971 56 000 1122",
    whatsapp: "971560001122",
    email: "rashid.alblooshi@example.com",
    interest: "The Wilshire Penthouse",
    dealType: "Buy",
    status: "Negotiating",
    agentId: "abu-salem-team",
    followUpDate: "2026-09-02",
    createdAt: "2026-07-02",
    notes: [{ id: "note-10-1", text: "Requested a final price reduction of 3%.", date: "Jul 5" }],
  },
];
