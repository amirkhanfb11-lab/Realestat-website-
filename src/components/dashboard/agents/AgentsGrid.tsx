import type { DashboardAgent } from "@/lib/dashboardAgents";
import { AgentProfileCard } from "./AgentProfileCard";

export function AgentsGrid({
  agents,
  onEdit,
  onViewPerformance,
}: {
  agents: DashboardAgent[];
  onEdit: (agent: DashboardAgent) => void;
  onViewPerformance: (agent: DashboardAgent) => void;
}) {
  if (agents.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-ivory-100 p-12 text-center">
        <p className="text-base font-semibold text-navy-950">No agents match this filter</p>
        <p className="mt-2 text-sm text-gray-500">Try a different status.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <AgentProfileCard
          key={agent.id}
          agent={agent}
          onEdit={() => onEdit(agent)}
          onViewPerformance={() => onViewPerformance(agent)}
        />
      ))}
    </div>
  );
}
