"use client";

import { agents } from "@/lib/agents";
import type { Lead } from "@/lib/leads";
import { cn } from "@/lib/utils";
import { LeadStatusBadge } from "./LeadStatusBadge";

function agentName(agentId: string | null) {
  if (!agentId) return "Unassigned";
  return agents.find((agent) => agent.id === agentId)?.name ?? "Unassigned";
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function LeadsTable({
  leads,
  selectedId,
  onSelect,
}: {
  leads: Lead[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-ivory-100 p-12 text-center">
        <p className="text-base font-semibold text-navy-950">No leads match your filters</p>
        <p className="mt-2 text-sm text-gray-500">Try adjusting search, status, agent, or date.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {leads.map((lead) => (
        <button
          key={lead.id}
          type="button"
          onClick={() => onSelect(lead.id)}
          aria-current={selectedId === lead.id ? "true" : undefined}
          className={cn(
            "flex w-full flex-col gap-3 rounded-2xl bg-white p-4 text-left shadow-soft transition-colors sm:flex-row sm:items-center",
            selectedId === lead.id ? "ring-2 ring-gold-500" : "hover:bg-ivory-50"
          )}
        >
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-navy-950">{lead.name}</p>
            <p className="truncate text-xs text-gray-500">
              Interested in {lead.interest} · {lead.dealType}
            </p>
          </div>

          <div className="flex flex-none items-center gap-3 sm:flex-col sm:items-end sm:gap-1.5">
            <LeadStatusBadge status={lead.status} />
            <span className="text-xs text-gray-500">{agentName(lead.agentId)}</span>
          </div>

          <div className="flex-none text-xs text-gray-400 sm:w-28 sm:text-right">
            <p>Received {formatDate(lead.createdAt)}</p>
            <p>Follow-up {formatDate(lead.followUpDate)}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
