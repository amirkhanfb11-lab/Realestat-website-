"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dashboardAgentsSeed, type DashboardAgent } from "@/lib/dashboardAgents";

const STORAGE_KEY = "abu-salem-admin-agents";

type NewAgentInput = Omit<DashboardAgent, "id" | "activeListings" | "leads" | "performance">;

type AgentsContextValue = {
  agents: DashboardAgent[];
  getAgent: (id: string) => DashboardAgent | undefined;
  addAgent: (input: NewAgentInput) => DashboardAgent;
  updateAgent: (id: string, patch: Partial<DashboardAgent>) => void;
};

const AgentsContext = createContext<AgentsContextValue | null>(null);

const EMPTY_PERFORMANCE = [
  { label: "Mar", value: 0 },
  { label: "Apr", value: 0 },
  { label: "May", value: 0 },
  { label: "Jun", value: 0 },
  { label: "Jul", value: 0 },
  { label: "Aug", value: 0 },
];

export function AgentsProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<DashboardAgent[]>(dashboardAgentsSeed);

  // Restore any in-session edits (mock persistence — no backend yet).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setAgents(JSON.parse(raw));
    } catch {
      // Ignore malformed/blocked storage — fall back to seed data.
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
    } catch {
      // Storage may be unavailable (private mode, quota) — edits just won't persist across reloads.
    }
  }, [agents]);

  const value = useMemo<AgentsContextValue>(
    () => ({
      agents,
      getAgent: (id) => agents.find((agent) => agent.id === id),
      addAgent: (input) => {
        const created: DashboardAgent = {
          ...input,
          id: `agent-${Date.now()}`,
          activeListings: 0,
          leads: 0,
          performance: EMPTY_PERFORMANCE,
        };
        setAgents((prev) => [created, ...prev]);
        return created;
      },
      updateAgent: (id, patch) => {
        setAgents((prev) => prev.map((agent) => (agent.id === id ? { ...agent, ...patch } : agent)));
      },
    }),
    [agents]
  );

  return <AgentsContext.Provider value={value}>{children}</AgentsContext.Provider>;
}

export function useAgents() {
  const context = useContext(AgentsContext);
  if (!context) {
    throw new Error("useAgents must be used within AgentsProvider");
  }
  return context;
}
