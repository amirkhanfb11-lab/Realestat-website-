/**
 * Mock inbox data for the admin dashboard — messages as if submitted via
 * the public Contact form / property inquiry forms. Independent of the
 * Leads/Clients modules (own file, own sessionStorage key).
 */

export type Message = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  body: string;
  propertyTitle: string | null;
  receivedAt: string;
  read: boolean;
};

export const messagesSeed: Message[] = [
  {
    id: "msg-1",
    name: "Fatima Al Nuaimi",
    email: "fatima.alnuaimi@example.com",
    phone: "+971 50 400 1122",
    subject: "Property Buying",
    body: "Hi, I saw The Hillcrest Villa listed and would love to arrange a viewing this week if possible. Please let me know what times work.",
    propertyTitle: "The Hillcrest Villa",
    receivedAt: "2026-08-31",
    read: false,
  },
  {
    id: "msg-2",
    name: "Omar Al Kindi",
    email: "omar.alkindi@example.com",
    phone: "+971 55 400 2233",
    subject: "General Inquiry",
    body: "We're relocating to Al Ain in the next few months and would like some general guidance on the buying process for newcomers. Could someone call us back?",
    propertyTitle: null,
    receivedAt: "2026-08-30",
    read: false,
  },
  {
    id: "msg-3",
    name: "Layla Al Marzouqi",
    email: "layla.almarzouqi@example.com",
    phone: "+971 52 400 3344",
    subject: "Property Rental",
    body: "Is Harbor View Apartments still available for rent? I'm looking to move in by the start of next month.",
    propertyTitle: "Harbor View Apartments",
    receivedAt: "2026-08-29",
    read: true,
  },
  {
    id: "msg-4",
    name: "Yousef Al Hammadi",
    email: "yousef.alhammadi@example.com",
    phone: "+971 56 400 4455",
    subject: "Investment Consultation",
    body: "I'm looking to diversify into a couple of rental properties in Al Ain this year. Could we set up a call to discuss options and expected yields?",
    propertyTitle: null,
    receivedAt: "2026-08-28",
    read: false,
  },
  {
    id: "msg-5",
    name: "Noor Al Shamsi",
    email: "noor.alshamsi@example.com",
    phone: "+971 58 400 5566",
    subject: "Property Selling",
    body: "I'd like to get Glasshouse Residences valued and listed. What documents do you need from me to get started?",
    propertyTitle: "Glasshouse Residences",
    receivedAt: "2026-08-26",
    read: true,
  },
  {
    id: "msg-6",
    name: "Ahmed Al Rashidi",
    email: "ahmed.alrashidi@example.com",
    phone: "+971 50 400 6677",
    subject: "Property Management",
    body: "I own two units in Al Ain and I'm currently self-managing. Interested in learning what your full management service includes and the fees involved.",
    propertyTitle: null,
    receivedAt: "2026-08-24",
    read: true,
  },
  {
    id: "msg-7",
    name: "Mariam Al Qubaisi",
    email: "mariam.alqubaisi@example.com",
    phone: "+971 52 400 7788",
    subject: "Real Estate Consultation",
    body: "We inherited a family property and aren't sure whether to sell, rent, or keep it as-is. Would appreciate an independent opinion before we decide.",
    propertyTitle: null,
    receivedAt: "2026-08-24",
    read: false,
  },
  {
    id: "msg-8",
    name: "Khalid Al Zaabi",
    email: "khalid.alzaabi@example.com",
    phone: "+971 55 400 8899",
    subject: "Property Buying",
    body: "Ridgeline Retreat looks like a great fit for our family. Is the price negotiable and is financing assistance available?",
    propertyTitle: "Ridgeline Retreat",
    receivedAt: "2026-08-17",
    read: true,
  },
];
