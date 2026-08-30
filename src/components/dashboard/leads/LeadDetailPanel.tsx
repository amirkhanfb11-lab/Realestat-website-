"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";
import { fieldClass, labelClass } from "@/lib/formStyles";
import { agents } from "@/lib/agents";
import { LEAD_STATUS_OPTIONS, type Lead, type LeadStatus } from "@/lib/leads";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { useLeads } from "./LeadsProvider";

function formatLongDate(iso: string | null) {
  if (!iso) return "Not set";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function LeadDetailPanel({ lead, onClose }: { lead: Lead | null; onClose: () => void }) {
  const { updateLead, addNote } = useLeads();
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    setNoteText("");
  }, [lead?.id]);

  useEffect(() => {
    if (!lead) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lead, onClose]);

  const phoneHref = lead ? `tel:${lead.phone.replace(/[^0-9+]/g, "")}` : "#";
  const whatsappHref = lead
    ? `https://wa.me/${lead.whatsapp}?text=${encodeURIComponent(
        `Hi ${lead.name}, following up on your interest in ${lead.interest}.`
      )}`
    : "#";
  const emailHref = lead ? `mailto:${lead.email}` : "#";

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-30 bg-navy-950/60 transition-opacity duration-300 lg:hidden",
          lead ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <div
        role="complementary"
        aria-label="Lead details"
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-full max-w-md overflow-y-auto bg-white shadow-elevated transition-transform duration-300 ease-out",
          "lg:static lg:z-auto lg:w-full lg:max-w-none lg:overflow-visible lg:rounded-2xl lg:shadow-soft lg:translate-x-0",
          lead ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        {!lead ? (
          <div className="flex h-full min-h-[16rem] items-center justify-center p-8 text-center">
            <p className="text-sm text-gray-500">Select a lead to view details.</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-navy-950">{lead.name}</p>
                <p className="mt-1 text-xs text-gray-500">
                  Interested in {lead.interest} · {lead.dealType}
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

            <div className="mt-4">
              <LeadStatusBadge status={lead.status} />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <Button href={phoneHref} variant="outline" size="sm" className="px-2 text-xs">
                Call
              </Button>
              <Button
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                className="gap-1 px-2 text-xs"
              >
                <WhatsAppIcon />
                WhatsApp
              </Button>
              <Button href={emailHref} variant="outline" size="sm" className="px-2 text-xs">
                Email
              </Button>
            </div>

            <div className="mt-6 space-y-4 border-t border-border pt-5">
              <div>
                <label htmlFor="lead-status" className={labelClass}>
                  Status
                </label>
                <select
                  id="lead-status"
                  value={lead.status}
                  onChange={(event) => updateLead(lead.id, { status: event.target.value as LeadStatus })}
                  className={fieldClass}
                >
                  {LEAD_STATUS_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="lead-agent" className={labelClass}>
                  Assigned Agent
                </label>
                <select
                  id="lead-agent"
                  value={lead.agentId ?? ""}
                  onChange={(event) => updateLead(lead.id, { agentId: event.target.value || null })}
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

              <div>
                <label htmlFor="lead-followup" className={labelClass}>
                  Follow-up Date
                </label>
                <input
                  id="lead-followup"
                  type="date"
                  value={lead.followUpDate ?? ""}
                  onChange={(event) => updateLead(lead.id, { followUpDate: event.target.value || null })}
                  className={fieldClass}
                />
                <p className="mt-1.5 text-xs text-gray-400">{formatLongDate(lead.followUpDate)}</p>
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <p className={labelClass}>Contact</p>
              <p className="mt-2 text-sm text-charcoal-900">{lead.phone}</p>
              <p className="text-sm text-charcoal-900">{lead.email}</p>
              <p className="mt-2 text-xs text-gray-400">Received {formatLongDate(lead.createdAt)}</p>
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
                    addNote(lead.id, noteText);
                    setNoteText("");
                  }}
                >
                  Add Note
                </Button>
              </div>

              {lead.notes.length === 0 ? (
                <p className="mt-4 text-sm text-gray-400">No notes yet.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {lead.notes.map((note) => (
                    <li key={note.id} className="rounded-lg bg-ivory-100 p-3 text-sm text-charcoal-900">
                      <p>{note.text}</p>
                      <p className="mt-1 text-xs text-gray-400">{note.date}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
