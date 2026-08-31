"use client";

import { useId } from "react";
import { Button } from "@/components/ui/Button";
import { fieldClass, labelClass } from "@/lib/formStyles";
import { TESTIMONIAL_STATUS_OPTIONS } from "@/lib/adminTestimonials";

export function TestimonialsToolbar({
  status,
  onStatusChange,
  onAdd,
}: {
  status: string;
  onStatusChange: (value: string) => void;
  onAdd: () => void;
}) {
  const statusId = useId();

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-ivory-50 p-6 shadow-soft sm:flex-row sm:items-end sm:justify-between sm:p-8">
      <div className="max-w-xs">
        <label htmlFor={statusId} className={labelClass}>
          Approval Status
        </label>
        <select
          id={statusId}
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className={fieldClass}
        >
          <option>All Statuses</option>
          {TESTIMONIAL_STATUS_OPTIONS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <Button onClick={onAdd} size="md" className="sm:flex-none">
        + Add Testimonial
      </Button>
    </div>
  );
}
