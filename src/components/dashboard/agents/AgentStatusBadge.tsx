import type { AgentStatus } from "@/lib/dashboardAgents";

const styles: Record<AgentStatus, string> = {
  Active: "bg-green-50 text-green-700",
  Away: "bg-amber-50 text-amber-700",
  Inactive: "bg-navy-950/5 text-gray-600",
};

export function AgentStatusBadge({ status }: { status: AgentStatus }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}
