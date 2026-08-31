import type { Lead, LeadStatus } from "@/lib/dashboardMock";

const statusStyles: Record<LeadStatus, string> = {
  New: "bg-gold-500/15 text-gold-600",
  Contacted: "bg-navy-950/5 text-navy-950",
  Qualified: "bg-green-50 text-green-700",
};

export function RecentLeads({ leads }: { leads: Lead[] }) {
  return (
    <div className="h-full rounded-2xl bg-white p-6 shadow-soft">
      <h3 className="text-base font-semibold text-navy-950">Recent Leads</h3>

      <ul className="mt-4 space-y-4">
        {leads.map((lead) => (
          <li
            key={lead.id}
            className="flex items-start justify-between gap-3 border-b border-border pb-4 last:border-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-navy-950">{lead.name}</p>
              <p className="mt-0.5 truncate text-xs text-gray-500">
                Interested in {lead.interest} · {lead.type}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">{lead.date}</p>
            </div>
            <span className={`flex-none rounded-full px-2.5 py-0.5 text-[11px] font-medium ${statusStyles[lead.status]}`}>
              {lead.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
