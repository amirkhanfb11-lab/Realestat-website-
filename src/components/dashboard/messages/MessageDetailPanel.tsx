"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Message } from "@/lib/messages";

function formatLongDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function MessageDetailPanel({
  message,
  onClose,
  onDelete,
}: {
  message: Message | null;
  onClose: () => void;
  onDelete: () => void;
}) {
  useEffect(() => {
    if (!message) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [message, onClose]);

  const replyHref = message
    ? `mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`
    : "#";
  const phoneHref = message ? `tel:${message.phone.replace(/[^0-9+]/g, "")}` : "#";

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-30 bg-navy-950/60 transition-opacity duration-300 lg:hidden",
          message ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <div
        role="complementary"
        aria-label="Message details"
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-full max-w-md overflow-y-auto bg-white shadow-elevated transition-transform duration-300 ease-out",
          "lg:static lg:z-auto lg:w-full lg:max-w-none lg:overflow-visible lg:rounded-2xl lg:shadow-soft lg:translate-x-0",
          message ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        {!message ? (
          <div className="flex h-full min-h-[16rem] items-center justify-center p-8 text-center">
            <p className="text-sm text-gray-500">Select a message to read it.</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-navy-950">{message.subject}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {message.name} · {formatLongDate(message.receivedAt)}
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

            {message.propertyTitle && (
              <span className="mt-3 inline-block rounded-full bg-ivory-100 px-2.5 py-0.5 text-[11px] font-medium text-charcoal-900">
                {message.propertyTitle}
              </span>
            )}

            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-charcoal-900">{message.body}</p>

            <div className="mt-6 border-t border-border pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Contact</p>
              <p className="mt-2 text-sm text-charcoal-900">
                <a href={phoneHref} className="hover:text-gold-600">
                  {message.phone}
                </a>
              </p>
              <p className="text-sm text-charcoal-900">
                <a href={replyHref} className="hover:text-gold-600">
                  {message.email}
                </a>
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <Button href={replyHref} variant="primary" fullWidth>
                Reply
              </Button>
              <Button variant="outline" onClick={onDelete} className="text-red-600 hover:bg-red-50">
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
