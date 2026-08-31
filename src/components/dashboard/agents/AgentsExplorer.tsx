"use client";

import { useMemo, useState } from "react";
import type { DashboardAgent } from "@/lib/dashboardAgents";
import { useAgents } from "./AgentsProvider";
import { AgentsToolbar } from "./AgentsToolbar";
import { AgentsGrid } from "./AgentsGrid";
import { AgentFormModal } from "./AgentFormModal";
import { PerformanceModal } from "./PerformanceModal";

export function AgentsExplorer() {
  const { agents, addAgent, updateAgent } = useAgents();

  const [status, setStatus] = useState("All Statuses");
  const [formAgent, setFormAgent] = useState<DashboardAgent | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [performanceAgent, setPerformanceAgent] = useState<DashboardAgent | null>(null);

  const filtered = useMemo(() => {
    if (status === "All Statuses") return agents;
    return agents.filter((agent) => agent.status === status);
  }, [agents, status]);

  function handleAddAgent() {
    setFormAgent(null);
    setFormOpen(true);
  }

  function handleEdit(agent: DashboardAgent) {
    setFormAgent(agent);
    setFormOpen(true);
  }

  return (
    <div>
      <AgentsToolbar status={status} onStatusChange={setStatus} onAddAgent={handleAddAgent} />

      <p className="mt-6 text-sm text-gray-500">
        {filtered.length} {filtered.length === 1 ? "agent" : "agents"}
      </p>

      <div className="mt-4">
        <AgentsGrid agents={filtered} onEdit={handleEdit} onViewPerformance={setPerformanceAgent} />
      </div>

      <AgentFormModal
        open={formOpen}
        agent={formAgent}
        onClose={() => setFormOpen(false)}
        onSaveCreate={(input) => {
          addAgent(input);
          setFormOpen(false);
        }}
        onSaveEdit={(id, patch) => {
          updateAgent(id, patch);
          setFormOpen(false);
        }}
      />

      <PerformanceModal agent={performanceAgent} onClose={() => setPerformanceAgent(null)} />
    </div>
  );
}
