"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { adminServicesSeed, slugifyServiceName, type AdminService } from "@/lib/adminServices";

const STORAGE_KEY = "abu-salem-admin-services";

type NewServiceInput = Omit<AdminService, "id">;

type ServicesContextValue = {
  services: AdminService[];
  getService: (id: string) => AdminService | undefined;
  addService: (input: NewServiceInput) => AdminService;
  updateService: (id: string, patch: Partial<AdminService>) => void;
  toggleActive: (id: string) => void;
  moveUp: (id: string) => void;
  moveDown: (id: string) => void;
};

const ServicesContext = createContext<ServicesContextValue | null>(null);

function sortedByOrder(list: AdminService[]) {
  return [...list].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<AdminService[]>(adminServicesSeed);

  // Restore any in-session edits (mock persistence — no backend yet).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setServices(JSON.parse(raw));
    } catch {
      // Ignore malformed/blocked storage — fall back to seed data.
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    } catch {
      // Storage may be unavailable (private mode, quota) — edits just won't persist across reloads.
    }
  }, [services]);

  const value = useMemo<ServicesContextValue>(
    () => ({
      services: sortedByOrder(services),
      getService: (id) => services.find((service) => service.id === id),
      addService: (input) => {
        const created: AdminService = { ...input, id: slugifyServiceName(input.name) };
        setServices((prev) => [...prev, created]);
        return created;
      },
      updateService: (id, patch) => {
        setServices((prev) => prev.map((service) => (service.id === id ? { ...service, ...patch } : service)));
      },
      toggleActive: (id) => {
        setServices((prev) =>
          prev.map((service) => (service.id === id ? { ...service, active: !service.active } : service))
        );
      },
      moveUp: (id) => {
        setServices((prev) => {
          const ordered = sortedByOrder(prev);
          const index = ordered.findIndex((service) => service.id === id);
          if (index <= 0) return prev;
          const current = ordered[index];
          const previous = ordered[index - 1];
          const swappedOrder = previous.displayOrder;
          return prev.map((service) => {
            if (service.id === current.id) return { ...service, displayOrder: swappedOrder };
            if (service.id === previous.id) return { ...service, displayOrder: current.displayOrder };
            return service;
          });
        });
      },
      moveDown: (id) => {
        setServices((prev) => {
          const ordered = sortedByOrder(prev);
          const index = ordered.findIndex((service) => service.id === id);
          if (index === -1 || index >= ordered.length - 1) return prev;
          const current = ordered[index];
          const next = ordered[index + 1];
          const swappedOrder = next.displayOrder;
          return prev.map((service) => {
            if (service.id === current.id) return { ...service, displayOrder: swappedOrder };
            if (service.id === next.id) return { ...service, displayOrder: current.displayOrder };
            return service;
          });
        });
      },
    }),
    [services]
  );

  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
}

export function useServices() {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be used within ServicesProvider");
  }
  return context;
}
