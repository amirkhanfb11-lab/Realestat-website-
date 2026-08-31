"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";

export function DeleteConfirmDialog({
  open,
  itemLabel,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  itemLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  // Focus the safe default action (Cancel) on open, and return focus on close.
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
      cancelRef.current?.focus();
    } else if (triggerRef.current instanceof HTMLElement) {
      triggerRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-950/60" onClick={onCancel} aria-hidden="true" />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-testimonial-title"
        className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-elevated"
      >
        <h3 id="delete-testimonial-title" className="text-base font-semibold text-navy-950">
          Delete testimonial?
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          This will permanently remove &ldquo;{itemLabel}&rdquo;&apos;s testimonial. This can&apos;t be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-navy-950 px-6 text-sm font-medium text-navy-950 transition-all duration-200 ease-out hover:bg-navy-950 hover:text-ivory-50"
          >
            Cancel
          </button>
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
