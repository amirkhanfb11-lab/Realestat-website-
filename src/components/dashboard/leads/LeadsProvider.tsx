"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { leadsSeed, type Lead } from "@/lib/leads";

const STORAGE_KEY = "abu-salem-admin-leads";

type LeadsContextValue = {
  leads: Lead[];
  getLead: (id: string) => Lead | undefined;
  updateLead: (id: string, patch: Partial<Lead>) => void;
  addNote: (id: string, text: string) => void;
};

const LeadsContext = createContext<LeadsContextValue | null>(null);

function todayLabel() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function LeadsProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(leadsSeed);

  // Restore any in-session edits (mock persistence — no backend yet).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setLeads(JSON.parse(raw));
    } catch {
      // Ignore malformed/blocked storage — fall back to seed data.
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch {
      // Storage may be unavailable (private mode, quota) — edits just won't persist across reloads.
    }
  }, [leads]);

  const value = useMemo<LeadsContextValue>(
    () => ({
      leads,
      getLead: (id) => leads.find((lead) => lead.id === id),
      updateLead: (id, patch) => {
        setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...lead, ...patch } : lead)));
      },
      addNote: (id, text) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        setLeads((prev) =>
          prev.map((lead) =>
            lead.id === id
              ? {
                  ...lead,
                  notes: [{ id: `note-${Date.now()}`, text: trimmed, date: todayLabel() }, ...lead.notes],
                }
              : lead
          )
        );
      },
    }),
    [leads]
  );

  return <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>;
}

export function useLeads() {
  const context = useContext(LeadsContext);
  if (!context) {
    throw new Error("useLeads must be used within LeadsProvider");
  }
  return context;
}
