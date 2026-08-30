"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { adminPropertiesSeed, slugify, type AdminProperty } from "@/lib/adminProperties";

const STORAGE_KEY = "abu-salem-admin-properties";

type NewPropertyInput = Omit<AdminProperty, "id" | "propertyId" | "updatedAt">;

type PropertiesContextValue = {
  properties: AdminProperty[];
  getProperty: (id: string) => AdminProperty | undefined;
  addProperty: (input: NewPropertyInput) => AdminProperty;
  updateProperty: (id: string, patch: Partial<AdminProperty>) => void;
  deleteProperty: (id: string) => void;
};

const PropertiesContext = createContext<PropertiesContextValue | null>(null);

function todayLabel() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function PropertiesProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<AdminProperty[]>(adminPropertiesSeed);
  const nextPropertyNumber = useRef(1000 + adminPropertiesSeed.length);

  // Restore any in-session edits (mock persistence — no backend yet).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as AdminProperty[];
        setProperties(stored);
        nextPropertyNumber.current = 1000 + stored.length;
      }
    } catch {
      // Ignore malformed/blocked storage — fall back to seed data.
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
    } catch {
      // Storage may be unavailable (private mode, quota) — edits just won't persist across reloads.
    }
  }, [properties]);

  const value = useMemo<PropertiesContextValue>(
    () => ({
      properties,
      getProperty: (id) => properties.find((property) => property.id === id),
      addProperty: (input) => {
        const propertyId = `PROP-${nextPropertyNumber.current}`;
        nextPropertyNumber.current += 1;
        const created: AdminProperty = {
          ...input,
          id: slugify(input.title),
          propertyId,
          updatedAt: todayLabel(),
        };
        setProperties((prev) => [created, ...prev]);
        return created;
      },
      updateProperty: (id, patch) => {
        setProperties((prev) =>
          prev.map((property) =>
            property.id === id ? { ...property, ...patch, updatedAt: todayLabel() } : property
          )
        );
      },
      deleteProperty: (id) => {
        setProperties((prev) => prev.filter((property) => property.id !== id));
      },
    }),
    [properties]
  );

  return <PropertiesContext.Provider value={value}>{children}</PropertiesContext.Provider>;
}

export function useProperties() {
  const context = useContext(PropertiesContext);
  if (!context) {
    throw new Error("useProperties must be used within PropertiesProvider");
  }
  return context;
}
