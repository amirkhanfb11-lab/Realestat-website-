"use client";

import { cn } from "@/lib/utils";
import type { Message } from "@/lib/messages";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function MessageRow({
  message,
  selected,
  onOpen,
  onToggleRead,
  onDelete,
}: {
  message: Message;
  selected: boolean;
  onOpen: () => void;
  onToggleRead: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-soft transition-colors sm:flex-row sm:items-center",
        selected && "ring-2 ring-gold-500"
      )}
    >
      <button type="button" onClick={onOpen} className="flex min-w-0 flex-1 items-start gap-3 text-left">
        <span
          className={cn("mt-1.5 h-2 w-2 flex-none rounded-full", message.read ? "bg-transparent" : "bg-gold-500")}
          aria-hidden="true"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <p className={cn("text-sm text-navy-950", !message.read && "font-semibold")}>{message.name}</p>
            <span className="text-xs text-gray-500">{formatDate(message.receivedAt)}</span>
          </div>
          <p className={cn("truncate text-sm", !message.read ? "font-medium text-charcoal-900" : "text-gray-500")}>
            {message.subject}
          </p>
          <p className="mt-0.5 truncate text-xs text-gray-500">{message.body}</p>
          {message.propertyTitle && (
            <span className="mt-1.5 inline-block rounded-full bg-ivory-100 px-2.5 py-0.5 text-[11px] font-medium text-charcoal-900">
              {message.propertyTitle}
            </span>
          )}
        </div>
      </button>

      <div className="flex flex-none items-center gap-3 text-xs font-medium">
        <button type="button" onClick={onToggleRead} className="text-gold-600 hover:underline">
          {message.read ? "Mark Unread" : "Mark Read"}
        </button>
        <button type="button" onClick={onDelete} className="text-red-600 hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
}
