"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { AdminService } from "@/lib/adminServices";
import { getServiceIcon } from "@/lib/serviceIcons";

export function ServiceRow({
  service,
  isFirst,
  isLast,
  onEdit,
  onToggleActive,
  onMoveUp,
  onMoveDown,
}: {
  service: AdminService;
  isFirst: boolean;
  isLast: boolean;
  onEdit: () => void;
  onToggleActive: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-soft sm:flex-row sm:items-center">
      <div className="flex flex-none flex-col items-center gap-1">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={isFirst}
          aria-label="Move up"
          className="flex h-6 w-6 items-center justify-center rounded text-navy-950/60 transition-colors hover:bg-navy-950/5 disabled:opacity-25 disabled:pointer-events-none"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m6 15 6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="text-xs font-semibold text-gray-500">{service.displayOrder}</span>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={isLast}
          aria-label="Move down"
          className="flex h-6 w-6 items-center justify-center rounded text-navy-950/60 transition-colors hover:bg-navy-950/5 disabled:opacity-25 disabled:pointer-events-none"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="relative h-14 w-14 flex-none overflow-hidden rounded-lg">
        <Image src={service.image} alt="" fill sizes="56px" className="object-cover" />
      </div>

      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-ivory-100 text-navy-950">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          {getServiceIcon(service.icon)}
        </svg>
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-navy-950">{service.name}</p>
        <p className="truncate text-xs text-gray-500">{service.shortDescription}</p>
      </div>

      <div className="flex flex-none items-center gap-3">
        <button
          type="button"
          onClick={onToggleActive}
          aria-pressed={service.active}
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
            service.active ? "bg-green-50 text-green-700" : "bg-navy-950/5 text-gray-500"
          }`}
        >
          {service.active ? "Active" : "Inactive"}
        </button>

        <Button size="sm" variant="outline" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
}
