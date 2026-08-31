"use client";

import { useState } from "react";
import { useMessages } from "./MessagesProvider";
import { MessageRow } from "./MessageRow";
import { MessageDetailPanel } from "./MessageDetailPanel";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

export function MessagesExplorer() {
  const { messages, getMessage, setRead, deleteMessage } = useMessages();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const selectedMessage = selectedId ? getMessage(selectedId) ?? null : null;
  const pendingDelete = pendingDeleteId ? getMessage(pendingDeleteId) : undefined;
  const unreadCount = messages.filter((message) => !message.read).length;

  function handleOpen(id: string) {
    setSelectedId(id);
    setRead(id, true);
  }

  function handleDeleteConfirmed() {
    if (!pendingDeleteId) return;
    deleteMessage(pendingDeleteId);
    if (selectedId === pendingDeleteId) setSelectedId(null);
    setPendingDeleteId(null);
  }

  return (
    <div>
      <p className="text-sm text-gray-500">
        {messages.length} {messages.length === 1 ? "message" : "messages"}
        {unreadCount > 0 && ` · ${unreadCount} unread`}
      </p>

      {messages.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-border bg-ivory-100 p-12 text-center">
          <p className="text-base font-semibold text-navy-950">No messages</p>
          <p className="mt-2 text-sm text-gray-500">New inquiries from the public site will show up here.</p>
        </div>
      ) : (
        <div className="mt-4 lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-6">
          <div className="space-y-3">
            {messages.map((message) => (
              <MessageRow
                key={message.id}
                message={message}
                selected={selectedId === message.id}
                onOpen={() => handleOpen(message.id)}
                onToggleRead={() => setRead(message.id, !message.read)}
                onDelete={() => setPendingDeleteId(message.id)}
              />
            ))}
          </div>

          <MessageDetailPanel
            message={selectedMessage}
            onClose={() => setSelectedId(null)}
            onDelete={() => selectedId && setPendingDeleteId(selectedId)}
          />
        </div>
      )}

      <DeleteConfirmDialog
        open={Boolean(pendingDelete)}
        itemLabel={pendingDelete?.name ?? ""}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={handleDeleteConfirmed}
      />
    </div>
  );
}
