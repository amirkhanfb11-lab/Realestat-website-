"use client";

import { Button } from "@/components/ui/Button";
import type { AdminProperty, PropertyStatus } from "@/lib/adminProperties";
import { StatusBadge } from "./StatusBadge";

export function PropertyStatusActions({
  property,
  onChangeStatus,
  onDelete,
}: {
  property: AdminProperty;
  onChangeStatus: (status: PropertyStatus) => void;
  onDelete: () => void;
}) {
  const { status, dealType } = property;
  const soldOrRentedLabel = dealType === "For Rent" ? "Rented" : "Sold";

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-soft">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Status</span>
      <StatusBadge status={status} />

      <div className="ml-auto flex flex-wrap items-center gap-2">
        {status === "Draft" && (
          <Button size="sm" variant="primary" onClick={() => onChangeStatus("Published")}>
            Publish
          </Button>
        )}

        {status === "Published" && (
          <>
            <Button size="sm" variant="outline" onClick={() => onChangeStatus("Draft")}>
              Unpublish
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onChangeStatus(dealType === "For Rent" ? "Rented" : "Sold")}
            >
              Mark as {soldOrRentedLabel}
            </Button>
          </>
        )}

        {(status === "Sold" || status === "Rented") && (
          <Button size="sm" variant="outline" onClick={() => onChangeStatus("Published")}>
            Mark as Available
          </Button>
        )}

        <Button size="sm" variant="ghost" onClick={onDelete} className="text-red-600 hover:bg-red-50">
          Delete
        </Button>
      </div>
    </div>
  );
}
