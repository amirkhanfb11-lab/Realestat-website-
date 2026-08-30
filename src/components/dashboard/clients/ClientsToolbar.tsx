"use client";

import { useId } from "react";
import { Button } from "@/components/ui/Button";
import { fieldClass, labelClass } from "@/lib/formStyles";
import { agents } from "@/lib/agents";
import { CLIENT_TYPE_OPTIONS } from "@/lib/clients";

type ClientsToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  agent: string;
  onAgentChange: (value: string) => void;
  onAddClient: () => void;
};

export function ClientsToolbar({
  search,
  onSearchChange,
  type,
  onTypeChange,
  agent,
  onAgentChange,
  onAddClient,
}: ClientsToolbarProps) {
  const searchId = useId();
  const typeId = useId();
  const agentId = useId();

  return (
    <div className="rounded-2xl bg-ivory-50 p-6 shadow-soft sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="grid flex-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor={searchId} className={labelClass}>
              Search
            </label>
            <input
              id={searchId}
              type="text"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Name, email, or phone"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor={typeId} className={labelClass}>
              Client Type
            </label>
            <select id={typeId} value={type} onChange={(event) => onTypeChange(event.target.value)} className={fieldClass}>
              <option>All Types</option>
              {CLIENT_TYPE_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={agentId} className={labelClass}>
              Agent
            </label>
            <select id={agentId} value={agent} onChange={(event) => onAgentChange(event.target.value)} className={fieldClass}>
              <option>All Agents</option>
              <option>Unassigned</option>
              {agents.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button onClick={onAddClient} size="md" className="sm:flex-none">
          + Add Client
        </Button>
      </div>
    </div>
  );
}
