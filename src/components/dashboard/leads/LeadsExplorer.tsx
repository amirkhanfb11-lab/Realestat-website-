"use client";

import { useMemo, useState } from "react";
import { useLeads } from "./LeadsProvider";
import { LeadsToolbar } from "./LeadsToolbar";
import { LeadsTable } from "./LeadsTable";
import { LeadDetailPanel } from "./LeadDetailPanel";

function matchesDate(iso: string, filter: string) {
  if (filter === "All Time") return true;

  const date = new Date(`${iso}T00:00:00`);
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (filter === "Today") {
    return date.getTime() === startOfToday.getTime();
  }
  if (filter === "This Week") {
    const weekAgo = new Date(startOfToday);
    weekAgo.setDate(weekAgo.getDate() - 6);
    return date >= weekAgo && date <= startOfToday;
  }
  if (filter === "This Month") {
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  }
  return true;
}

export function LeadsExplorer() {
  const { leads, getLead } = useLeads();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [agent, setAgent] = useState("All Agents");
  const [date, setDate] = useState("All Time");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return leads.filter((lead) => {
      if (status !== "All Statuses" && lead.status !== status) return false;
      if (agent === "Unassigned" && lead.agentId) return false;
      if (agent !== "All Agents" && agent !== "Unassigned" && lead.agentId !== agent) return false;
      if (!matchesDate(lead.createdAt, date)) return false;
      if (
        query &&
        !lead.name.toLowerCase().includes(query) &&
        !lead.interest.toLowerCase().includes(query) &&
        !lead.email.toLowerCase().includes(query)
      ) {
        return false;
      }
      return true;
    });
  }, [leads, search, status, agent, date]);

  const selectedLead = selectedId ? getLead(selectedId) ?? null : null;

  return (
    <div>
      <LeadsToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        agent={agent}
        onAgentChange={setAgent}
        date={date}
        onDateChange={setDate}
      />

      <p className="mt-6 text-sm text-gray-500">
        {filtered.length} {filtered.length === 1 ? "lead" : "leads"}
      </p>

      <div className="mt-4 lg:grid lg:grid-cols-[1fr_380px] lg:items-start lg:gap-6">
        <LeadsTable leads={filtered} selectedId={selectedId} onSelect={setSelectedId} />
        <LeadDetailPanel lead={selectedLead} onClose={() => setSelectedId(null)} />
      </div>
    </div>
  );
}
