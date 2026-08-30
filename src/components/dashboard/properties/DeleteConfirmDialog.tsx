"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export function DeleteConfirmDialog({
  open,
  propertyTitle,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  propertyTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-950/60" onClick={onCancel} aria-hidden="true" />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-elevated"
      >
        <h3 id="delete-dialog-title" className="text-base font-semibold text-navy-950">
          Delete property?
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          This will permanently remove &ldquo;{propertyTitle}&rdquo; from the list. This can&apos;t be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant="outline" fullWidth onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 active:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
