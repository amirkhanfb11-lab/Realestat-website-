"use client";

import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import type { DashboardAgent } from "@/lib/dashboardAgents";
import { AgentStatusBadge } from "./AgentStatusBadge";
import { AgentModal } from "./AgentModal";

export function PerformanceModal({
  agent,
  onClose,
}: {
  agent: DashboardAgent | null;
  onClose: () => void;
}) {
  return (
    <AgentModal open={Boolean(agent)} title={agent ? `${agent.name} — Performance` : "Performance"} onClose={onClose}>
      {agent && (
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <AgentStatusBadge status={agent.status} />
            <span className="text-xs text-gray-500">{agent.title}</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-ivory-100 p-4">
              <p className="text-xs text-gray-500">Active Listings</p>
              <p className="mt-1 font-serif text-2xl text-navy-950">{agent.activeListings}</p>
            </div>
            <div className="rounded-xl bg-ivory-100 p-4">
              <p className="text-xs text-gray-500">Leads</p>
              <p className="mt-1 font-serif text-2xl text-navy-950">{agent.leads}</p>
            </div>
          </div>

          <div className="mt-5">
            <AnalyticsChart data={agent.performance} title="Leads Handled — Last 6 Months" />
          </div>
        </div>
      )}
    </AgentModal>
  );
}
