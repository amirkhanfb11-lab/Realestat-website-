"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { clientsSeed, type Client } from "@/lib/clients";

const STORAGE_KEY = "abu-salem-admin-clients";

type NewClientInput = Omit<Client, "id" | "notes" | "createdAt">;

type ClientsContextValue = {
  clients: Client[];
  getClient: (id: string) => Client | undefined;
  addClient: (input: NewClientInput) => Client;
  updateClient: (id: string, patch: Partial<Client>) => void;
  addNote: (id: string, text: string) => void;
};

const ClientsContext = createContext<ClientsContextValue | null>(null);

function todayIso() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function todayLabel() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ClientsProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>(clientsSeed);

  // Restore any in-session edits (mock persistence — no backend yet).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setClients(JSON.parse(raw));
    } catch {
      // Ignore malformed/blocked storage — fall back to seed data.
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
    } catch {
      // Storage may be unavailable (private mode, quota) — edits just won't persist across reloads.
    }
  }, [clients]);

  const value = useMemo<ClientsContextValue>(
    () => ({
      clients,
      getClient: (id) => clients.find((client) => client.id === id),
      addClient: (input) => {
        const created: Client = {
          ...input,
          id: `client-${Date.now()}`,
          notes: [],
          createdAt: todayIso(),
        };
        setClients((prev) => [created, ...prev]);
        return created;
      },
      updateClient: (id, patch) => {
        setClients((prev) => prev.map((client) => (client.id === id ? { ...client, ...patch } : client)));
      },
      addNote: (id, text) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        setClients((prev) =>
          prev.map((client) =>
            client.id === id
              ? {
                  ...client,
                  notes: [{ id: `cnote-${Date.now()}`, text: trimmed, date: todayLabel() }, ...client.notes],
                }
              : client
          )
        );
      },
    }),
    [clients]
  );

  return <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>;
}

export function useClients() {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error("useClients must be used within ClientsProvider");
  }
  return context;
}
