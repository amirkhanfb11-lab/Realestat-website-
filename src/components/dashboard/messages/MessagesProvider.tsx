"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { messagesSeed, type Message } from "@/lib/messages";

const STORAGE_KEY = "abu-salem-admin-messages";

type MessagesContextValue = {
  messages: Message[];
  getMessage: (id: string) => Message | undefined;
  setRead: (id: string, read: boolean) => void;
  deleteMessage: (id: string) => void;
};

const MessagesContext = createContext<MessagesContextValue | null>(null);

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(messagesSeed);

  // Restore any in-session edits (mock persistence — no backend yet).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setMessages(JSON.parse(raw));
    } catch {
      // Ignore malformed/blocked storage — fall back to seed data.
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Storage may be unavailable (private mode, quota) — edits just won't persist across reloads.
    }
  }, [messages]);

  const value = useMemo<MessagesContextValue>(
    () => ({
      messages,
      getMessage: (id) => messages.find((message) => message.id === id),
      setRead: (id, read) => {
        setMessages((prev) => prev.map((message) => (message.id === id ? { ...message, read } : message)));
      },
      deleteMessage: (id) => {
        setMessages((prev) => prev.filter((message) => message.id !== id));
      },
    }),
    [messages]
  );

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
}

export function useMessages() {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error("useMessages must be used within MessagesProvider");
  }
  return context;
}
