"use client";

import { agents } from "@/lib/agents";
import type { Client } from "@/lib/clients";
import { cn } from "@/lib/utils";
import { ClientTypeBadge } from "./ClientTypeBadge";

function agentName(agentId: string | null) {
  if (!agentId) return "Unassigned";
  return agents.find((agent) => agent.id === agentId)?.name ?? "Unassigned";
}

export function ClientsTable({
  clients,
  selectedId,
  onSelect,
}: {
  clients: Client[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  if (clients.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-ivory-100 p-12 text-center">
        <p className="text-base font-semibold text-navy-950">No clients match your filters</p>
        <p className="mt-2 text-sm text-gray-500">Try adjusting search, type, or agent.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {clients.map((client) => (
        <button
          key={client.id}
          type="button"
          onClick={() => onSelect(client.id)}
          aria-current={selectedId === client.id ? "true" : undefined}
          className={cn(
            "flex w-full flex-col gap-3 rounded-2xl bg-white p-4 text-left shadow-soft transition-colors sm:flex-row sm:items-center",
            selectedId === client.id ? "ring-2 ring-gold-500" : "hover:bg-ivory-50"
          )}
        >
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-navy-950">{client.name}</p>
            <p className="truncate text-xs text-gray-500">
              {client.email} · {client.phone}
            </p>
          </div>

          <div className="flex flex-none items-center gap-3 sm:flex-col sm:items-end sm:gap-1.5">
            <ClientTypeBadge type={client.type} />
            <span className="text-xs text-gray-500">{agentName(client.agentId)}</span>
          </div>

          <div className="flex-none text-xs text-gray-500 sm:w-20 sm:text-right">
            {client.notes.length} {client.notes.length === 1 ? "note" : "notes"}
          </div>
        </button>
      ))}
    </div>
  );
}
