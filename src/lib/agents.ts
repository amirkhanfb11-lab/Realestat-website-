export type Agent = {
  id: string;
  name: string;
  title: string;
  phone: string;
  /** Digits only (with country code), for wa.me links. */
  whatsapp: string;
  email?: string;
  initials: string;
};

export const agents: Agent[] = [
  {
    id: "abu-salem-team",
    name: "Sumalani Real Estate",
    title: "Sales & Leasing Team",
    phone: "+971 3 751 1410",
    whatsapp: "971508333410",
    initials: "SR",
  },
];
