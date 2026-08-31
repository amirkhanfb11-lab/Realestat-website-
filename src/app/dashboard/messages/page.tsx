import type { Metadata } from "next";
import { MessagesProvider } from "@/components/dashboard/messages/MessagesProvider";
import { MessagesExplorer } from "@/components/dashboard/messages/MessagesExplorer";

export const metadata: Metadata = {
  title: { absolute: "Messages | Abu Salem Dashboard" },
};

export default function DashboardMessagesPage() {
  return (
    <div>
      <h2 className="font-serif text-2xl text-navy-950">Messages</h2>
      <p className="mt-1 text-sm text-gray-500">Inquiries from the public site.</p>
      <div className="mt-6">
        <MessagesProvider>
          <MessagesExplorer />
        </MessagesProvider>
      </div>
    </div>
  );
}
