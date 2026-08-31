"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { fieldClass, labelClass } from "@/lib/formStyles";
import { AGENT_STATUS_OPTIONS, type AgentStatus, type DashboardAgent } from "@/lib/dashboardAgents";
import { AgentModal } from "./AgentModal";

type FormValues = {
  name: string;
  title: string;
  phone: string;
  email: string;
  status: AgentStatus;
};

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return letters.join("") || "AG";
}

function toFormValues(agent: DashboardAgent | null): FormValues {
  if (!agent) {
    return { name: "", title: "", phone: "", email: "", status: "Active" };
  }
  return { name: agent.name, title: agent.title, phone: agent.phone, email: agent.email, status: agent.status };
}

type Errors = Partial<Record<"name" | "title" | "phone" | "email", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AgentFormModal({
  open,
  agent,
  onClose,
  onSaveCreate,
  onSaveEdit,
}: {
  open: boolean;
  agent: DashboardAgent | null;
  onClose: () => void;
  onSaveCreate: (input: Omit<DashboardAgent, "id" | "activeListings" | "leads" | "performance">) => void;
  onSaveEdit: (id: string, patch: Partial<DashboardAgent>) => void;
}) {
  const isEdit = Boolean(agent);
  const [values, setValues] = useState<FormValues>(() => toFormValues(agent));
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (open) {
      setValues(toFormValues(agent));
      setErrors({});
    }
  }, [open, agent]);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Name is required.";
    if (!values.title.trim()) next.title = "Title is required.";
    if (!values.phone.trim()) next.phone = "Phone is required.";
    if (!values.email.trim()) next.email = "Email is required.";
    else if (!EMAIL_PATTERN.test(values.email.trim())) next.email = "Enter a valid email address.";
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const name = values.name.trim();
    const shared = {
      name,
      title: values.title.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      status: values.status,
    };

    if (isEdit && agent) {
      onSaveEdit(agent.id, shared);
    } else {
      onSaveCreate({ ...shared, initials: initialsFrom(name) });
    }
  }

  return (
    <AgentModal open={open} title={isEdit ? "Edit Agent" : "Add Agent"} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Name</label>
            <input
              type="text"
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
              placeholder="Full name"
              className={cn(fieldClass, errors.name && "border-red-400")}
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={values.title}
              onChange={(event) => update("title", event.target.value)}
              aria-invalid={Boolean(errors.title)}
              placeholder="e.g. Senior Sales Agent"
              className={cn(fieldClass, errors.title && "border-red-400")}
            />
            {errors.title && <p className="mt-1.5 text-xs text-red-600">{errors.title}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="tel"
                value={values.phone}
                onChange={(event) => update("phone", event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                placeholder="+971 50 000 0000"
                className={cn(fieldClass, errors.phone && "border-red-400")}
              />
              {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={values.email}
                onChange={(event) => update("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                placeholder="name@example.com"
                className={cn(fieldClass, errors.email && "border-red-400")}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select
              value={values.status}
              onChange={(event) => update("status", event.target.value as AgentStatus)}
              className={fieldClass}
            >
              {AGENT_STATUS_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button type="submit" variant="primary" size="sm">
            {isEdit ? "Save Changes" : "Add Agent"}
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </AgentModal>
  );
}
