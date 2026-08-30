"use client";

import { useId } from "react";
import { fieldClass, labelClass } from "@/lib/formStyles";
import { agents } from "@/lib/agents";
import { LEAD_STATUS_OPTIONS } from "@/lib/leads";

export const DATE_FILTER_OPTIONS = ["All Time", "Today", "This Week", "This Month"] as const;

type LeadsToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  agent: string;
  onAgentChange: (value: string) => void;
  date: string;
  onDateChange: (value: string) => void;
};

export function LeadsToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  agent,
  onAgentChange,
  date,
  onDateChange,
}: LeadsToolbarProps) {
  const searchId = useId();
  const statusId = useId();
  const agentId = useId();
  const dateId = useId();

  return (
    <div className="rounded-2xl bg-ivory-50 p-6 shadow-soft sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor={searchId} className={labelClass}>
            Search
          </label>
          <input
            id={searchId}
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Name, interest, or email"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor={statusId} className={labelClass}>
            Status
          </label>
          <select
            id={statusId}
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            className={fieldClass}
          >
            <option>All Statuses</option>
            {LEAD_STATUS_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={agentId} className={labelClass}>
            Agent
          </label>
          <select
            id={agentId}
            value={agent}
            onChange={(event) => onAgentChange(event.target.value)}
            className={fieldClass}
          >
            <option>All Agents</option>
            <option>Unassigned</option>
            {agents.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={dateId} className={labelClass}>
            Date Received
          </label>
          <select
            id={dateId}
            value={date}
            onChange={(event) => onDateChange(event.target.value)}
            className={fieldClass}
          >
            {DATE_FILTER_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
