"use client";

import { useId } from "react";
import { Button } from "@/components/ui/Button";
import { fieldClass, labelClass } from "@/lib/formStyles";
import { DEAL_TYPE_OPTIONS, PROPERTY_STATUS_OPTIONS, PROPERTY_TYPE_OPTIONS } from "@/lib/adminProperties";

type PropertiesToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  deal: string;
  onDealChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
};

export function PropertiesToolbar({
  search,
  onSearchChange,
  type,
  onTypeChange,
  deal,
  onDealChange,
  status,
  onStatusChange,
}: PropertiesToolbarProps) {
  const searchId = useId();
  const typeId = useId();
  const dealId = useId();
  const statusId = useId();

  return (
    <div className="rounded-2xl bg-ivory-50 p-6 shadow-soft sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="grid flex-1 gap-4 sm:grid-cols-4">
          <div>
            <label htmlFor={searchId} className={labelClass}>
              Search
            </label>
            <input
              id={searchId}
              type="text"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Title, location, or ID"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor={typeId} className={labelClass}>
              Type
            </label>
            <select id={typeId} value={type} onChange={(event) => onTypeChange(event.target.value)} className={fieldClass}>
              <option>All Types</option>
              {PROPERTY_TYPE_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={dealId} className={labelClass}>
              Sale / Rent
            </label>
            <select id={dealId} value={deal} onChange={(event) => onDealChange(event.target.value)} className={fieldClass}>
              <option>All</option>
              {DEAL_TYPE_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={statusId} className={labelClass}>
              Status
            </label>
            <select id={statusId} value={status} onChange={(event) => onStatusChange(event.target.value)} className={fieldClass}>
              <option>All Statuses</option>
              {PROPERTY_STATUS_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <Button href="/dashboard/properties/new" size="md" className="sm:flex-none">
          + Add Property
        </Button>
      </div>
    </div>
  );
}
