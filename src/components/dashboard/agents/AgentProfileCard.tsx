"use client";

import { Button } from "@/components/ui/Button";
import type { DashboardAgent } from "@/lib/dashboardAgents";
import { AgentStatusBadge } from "./AgentStatusBadge";

export function AgentProfileCard({
  agent,
  onEdit,
  onViewPerformance,
}: {
  agent: DashboardAgent;
  onEdit: () => void;
  onViewPerformance: () => void;
}) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-soft">
      <div className="flex items-start gap-4">
        <span className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-navy-950 font-serif text-lg text-gold-400">
          {agent.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-navy-950">{agent.name}</p>
          <p className="truncate text-sm text-gray-500">{agent.title}</p>
          <div className="mt-2">
            <AgentStatusBadge status={agent.status} />
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-1 border-t border-border pt-4 text-sm text-gray-500">
        <p className="truncate">
          <a href={`tel:${agent.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-gold-600">
            {agent.phone}
          </a>
        </p>
        <p className="truncate">
          <a href={`mailto:${agent.email}`} className="hover:text-gold-600">
            {agent.email}
          </a>
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
        <div>
          <p className="text-xs text-gray-500">Active Listings</p>
          <p className="mt-0.5 font-serif text-xl text-navy-950">{agent.activeListings}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Leads</p>
          <p className="mt-0.5 font-serif text-xl text-navy-950">{agent.leads}</p>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <Button size="sm" variant="outline" fullWidth onClick={onEdit}>
          Edit
        </Button>
        <Button size="sm" variant="ghost" fullWidth onClick={onViewPerformance}>
          Performance
        </Button>
      </div>
    </div>
  );
}
