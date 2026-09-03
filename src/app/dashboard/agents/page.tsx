import type { Metadata } from "next";
import { AgentsProvider } from "@/components/dashboard/agents/AgentsProvider";
import { AgentsExplorer } from "@/components/dashboard/agents/AgentsExplorer";

export const metadata: Metadata = {
  title: { absolute: "Agents | Sumalani Dashboard" },
};

export default function AgentsPage() {
  return (
    <div>
      <h2 className="font-serif text-2xl text-navy-950">Agents</h2>
      <p className="mt-1 text-sm text-gray-500">Manage your team, track listings and leads, and review performance.</p>
      <div className="mt-6">
        <AgentsProvider>
          <AgentsExplorer />
        </AgentsProvider>
      </div>
    </div>
  );
}
