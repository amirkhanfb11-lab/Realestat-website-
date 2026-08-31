"use client";

import { useId } from "react";
import { Button } from "@/components/ui/Button";
import { fieldClass, labelClass } from "@/lib/formStyles";
import { AGENT_STATUS_OPTIONS } from "@/lib/dashboardAgents";

export function AgentsToolbar({
  status,
  onStatusChange,
  onAddAgent,
}: {
  status: string;
  onStatusChange: (value: string) => void;
  onAddAgent: () => void;
}) {
  const statusId = useId();

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-ivory-50 p-6 shadow-soft sm:flex-row sm:items-end sm:justify-between sm:p-8">
      <div className="max-w-xs">
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
          {AGENT_STATUS_OPTIONS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <Button onClick={onAddAgent} size="md" className="sm:flex-none">
        + Add Agent
      </Button>
    </div>
  );
}
