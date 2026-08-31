import type { LeadStatus } from "@/lib/leads";

const styles: Record<LeadStatus, string> = {
  New: "bg-gold-500/15 text-gold-600",
  Contacted: "bg-navy-950/5 text-navy-950",
  "Viewing Scheduled": "bg-blue-50 text-blue-700",
  Negotiating: "bg-amber-50 text-amber-700",
  Converted: "bg-green-50 text-green-700",
  Lost: "bg-red-50 text-red-700",
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}
