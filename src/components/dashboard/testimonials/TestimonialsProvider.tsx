"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { adminTestimonialsSeed, slugifyTestimonialName, type AdminTestimonial } from "@/lib/adminTestimonials";

const STORAGE_KEY = "abu-salem-admin-testimonials";

type NewTestimonialInput = Omit<AdminTestimonial, "id" | "submittedAt">;

type TestimonialsContextValue = {
  testimonials: AdminTestimonial[];
  getTestimonial: (id: string) => AdminTestimonial | undefined;
  addTestimonial: (input: NewTestimonialInput) => AdminTestimonial;
  updateTestimonial: (id: string, patch: Partial<AdminTestimonial>) => void;
  deleteTestimonial: (id: string) => void;
};

const TestimonialsContext = createContext<TestimonialsContextValue | null>(null);

function todayIso() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function TestimonialsProvider({ children }: { children: ReactNode }) {
  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>(adminTestimonialsSeed);

  // Restore any in-session edits (mock persistence — no backend yet).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setTestimonials(JSON.parse(raw));
    } catch {
      // Ignore malformed/blocked storage — fall back to seed data.
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
    } catch {
      // Storage may be unavailable (private mode, quota) — edits just won't persist across reloads.
    }
  }, [testimonials]);

  const value = useMemo<TestimonialsContextValue>(
    () => ({
      testimonials,
      getTestimonial: (id) => testimonials.find((testimonial) => testimonial.id === id),
      addTestimonial: (input) => {
        const created: AdminTestimonial = {
          ...input,
          id: slugifyTestimonialName(input.name),
          submittedAt: todayIso(),
        };
        setTestimonials((prev) => [created, ...prev]);
        return created;
      },
      updateTestimonial: (id, patch) => {
        setTestimonials((prev) =>
          prev.map((testimonial) => (testimonial.id === id ? { ...testimonial, ...patch } : testimonial))
        );
      },
      deleteTestimonial: (id) => {
        setTestimonials((prev) => prev.filter((testimonial) => testimonial.id !== id));
      },
    }),
    [testimonials]
  );

  return <TestimonialsContext.Provider value={value}>{children}</TestimonialsContext.Provider>;
}

export function useTestimonials() {
  const context = useContext(TestimonialsContext);
  if (!context) {
    throw new Error("useTestimonials must be used within TestimonialsProvider");
  }
  return context;
}
