"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { fieldClass, labelClass } from "@/lib/formStyles";
import { agents } from "@/lib/agents";
import { CLIENT_TYPE_OPTIONS, type Client, type ClientType } from "@/lib/clients";
import { ClientTypeBadge } from "./ClientTypeBadge";
import { useClients } from "./ClientsProvider";

export type PanelMode = "view" | "edit" | "create";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  type: ClientType;
};

function toFormValues(client: Client | null): FormValues {
  if (!client) {
    return { name: "", email: "", phone: "", type: CLIENT_TYPE_OPTIONS[0] };
  }
  return { name: client.name, email: client.email, phone: client.phone, type: client.type };
}

type Errors = Partial<Record<"name" | "email" | "phone", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatLongDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function ClientDetailPanel({
  client,
  mode,
  onStartEdit,
  onCancelEdit,
  onSaveCreate,
  onSaveEdit,
  onClose,
}: {
  client: Client | null;
  mode: PanelMode;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSaveCreate: (input: Omit<Client, "id" | "notes" | "createdAt">) => void;
  onSaveEdit: (patch: Partial<Client>) => void;
  onClose: () => void;
}) {
  const { updateClient, addNote } = useClients();

  const [values, setValues] = useState<FormValues>(() => toFormValues(mode === "edit" ? client : null));
  const [errors, setErrors] = useState<Errors>({});
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    setValues(toFormValues(mode === "edit" ? client : null));
    setErrors({});
  }, [client, mode]);

  useEffect(() => {
    setNoteText("");
  }, [client?.id]);

  const isOpen = mode === "create" || client !== null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Name is required.";
    if (!values.email.trim()) next.email = "Email is required.";
    else if (!EMAIL_PATTERN.test(values.email.trim())) next.email = "Enter a valid email address.";
    if (!values.phone.trim()) next.phone = "Phone is required.";
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const shared = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      type: values.type,
    };

    if (mode === "create") {
      onSaveCreate({ ...shared, agentId: null });
    } else {
      onSaveEdit(shared);
    }
  }

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-30 bg-navy-950/60 transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <div
        role="complementary"
        aria-label="Client details"
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-full max-w-md overflow-y-auto bg-white shadow-elevated transition-transform duration-300 ease-out",
          "lg:static lg:z-auto lg:w-full lg:max-w-none lg:overflow-visible lg:rounded-2xl lg:shadow-soft lg:translate-x-0",
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        {mode === "view" && !client && (
          <div className="flex h-full min-h-[16rem] items-center justify-center p-8 text-center">
            <p className="text-sm text-gray-500">Select a client to view details, or add a new one.</p>
          </div>
        )}

        {mode === "view" && client && (
          <div className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-navy-950">{client.name}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {client.email} · {client.phone}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close details"
                className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-navy-950/60 transition-colors hover:bg-navy-950/5 lg:hidden"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <ClientTypeBadge type={client.type} />
              <span className="text-xs text-gray-500">Client since {formatLongDate(client.createdAt)}</span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <Button href={`tel:${client.phone.replace(/[^0-9+]/g, "")}`} variant="outline" size="sm" className="px-2 text-xs">
                Call
              </Button>
              <Button href={`mailto:${client.email}`} variant="outline" size="sm" className="px-2 text-xs">
                Email
              </Button>
            </div>

            <div className="mt-5">
              <Button size="sm" variant="ghost" onClick={onStartEdit}>
                Edit Client
              </Button>
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <label htmlFor="client-agent" className={labelClass}>
                Assigned Agent
              </label>
              <select
                id="client-agent"
                value={client.agentId ?? ""}
                onChange={(event) => updateClient(client.id, { agentId: event.target.value || null })}
                className={fieldClass}
              >
                <option value="">Unassigned</option>
                {agents.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <p className={labelClass}>Notes</p>

              <div className="mt-3">
                <textarea
                  rows={3}
                  value={noteText}
                  onChange={(event) => setNoteText(event.target.value)}
                  placeholder="Add a note..."
                  className={cn(fieldClass, "resize-none")}
                />
                <Button
                  size="sm"
                  variant="primary"
                  className="mt-2"
                  onClick={() => {
                    if (!noteText.trim()) return;
                    addNote(client.id, noteText);
                    setNoteText("");
                  }}
                >
                  Add Note
                </Button>
              </div>

              {client.notes.length === 0 ? (
                <p className="mt-4 text-sm text-gray-500">No notes yet.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {client.notes.map((note) => (
                    <li key={note.id} className="rounded-lg bg-ivory-100 p-3 text-sm text-charcoal-900">
                      <p>{note.text}</p>
                      <p className="mt-1 text-xs text-gray-500">{note.date}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {(mode === "edit" || mode === "create") && (
          <form onSubmit={handleSubmit} noValidate className="p-6">
            <div className="flex items-start justify-between gap-3">
              <p className="text-base font-semibold text-navy-950">
                {mode === "create" ? "Add Client" : "Edit Client"}
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close details"
                className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-navy-950/60 transition-colors hover:bg-navy-950/5 lg:hidden"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="mt-5 space-y-4">
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
                <label className={labelClass}>Client Type</label>
                <select
                  value={values.type}
                  onChange={(event) => update("type", event.target.value as ClientType)}
                  className={fieldClass}
                >
                  {CLIENT_TYPE_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Button type="submit" variant="primary" size="sm">
                {mode === "create" ? "Create Client" : "Save Changes"}
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={mode === "create" ? onClose : onCancelEdit}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
