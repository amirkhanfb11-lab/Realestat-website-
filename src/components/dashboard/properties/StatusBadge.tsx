import type { PropertyStatus } from "@/lib/adminProperties";

const styles: Record<PropertyStatus, string> = {
  Draft: "bg-ivory-100 text-gray-600",
  Published: "bg-green-50 text-green-700",
  Sold: "bg-navy-950/5 text-navy-950",
  Rented: "bg-gold-500/15 text-gold-600",
};

export function StatusBadge({ status }: { status: PropertyStatus }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}
