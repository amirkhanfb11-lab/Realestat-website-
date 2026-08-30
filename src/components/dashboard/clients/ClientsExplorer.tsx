"use client";

import { useMemo, useState } from "react";
import type { Client } from "@/lib/clients";
import { useClients } from "./ClientsProvider";
import { ClientsToolbar } from "./ClientsToolbar";
import { ClientsTable } from "./ClientsTable";
import { ClientDetailPanel, type PanelMode } from "./ClientDetailPanel";

export function ClientsExplorer() {
  const { clients, getClient, addClient, updateClient } = useClients();

  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Types");
  const [agent, setAgent] = useState("All Agents");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<PanelMode>("view");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return clients.filter((client) => {
      if (type !== "All Types" && client.type !== type) return false;
      if (agent === "Unassigned" && client.agentId) return false;
      if (agent !== "All Agents" && agent !== "Unassigned" && client.agentId !== agent) return false;
      if (
        query &&
        !client.name.toLowerCase().includes(query) &&
        !client.email.toLowerCase().includes(query) &&
        !client.phone.toLowerCase().includes(query)
      ) {
        return false;
      }
      return true;
    });
  }, [clients, search, type, agent]);

  const selectedClient = selectedId ? getClient(selectedId) ?? null : null;

  function handleSelect(id: string) {
    setSelectedId(id);
    setMode("view");
  }

  function handleAddClient() {
    setSelectedId(null);
    setMode("create");
  }

  function handleClosePanel() {
    setSelectedId(null);
    setMode("view");
  }

  function handleSaveCreate(input: Omit<Client, "id" | "notes" | "createdAt">) {
    const created = addClient(input);
    setSelectedId(created.id);
    setMode("view");
  }

  function handleSaveEdit(patch: Partial<Client>) {
    if (!selectedId) return;
    updateClient(selectedId, patch);
    setMode("view");
  }

  return (
    <div>
      <ClientsToolbar
        search={search}
        onSearchChange={setSearch}
        type={type}
        onTypeChange={setType}
        agent={agent}
        onAgentChange={setAgent}
        onAddClient={handleAddClient}
      />

      <p className="mt-6 text-sm text-gray-500">
        {filtered.length} {filtered.length === 1 ? "client" : "clients"}
      </p>

      <div className="mt-4 lg:grid lg:grid-cols-[1fr_380px] lg:items-start lg:gap-6">
        <ClientsTable clients={filtered} selectedId={mode === "view" ? selectedId : null} onSelect={handleSelect} />
        <ClientDetailPanel
          client={selectedClient}
          mode={mode}
          onStartEdit={() => setMode("edit")}
          onCancelEdit={() => setMode("view")}
          onSaveCreate={handleSaveCreate}
          onSaveEdit={handleSaveEdit}
          onClose={handleClosePanel}
        />
      </div>
    </div>
  );
}
