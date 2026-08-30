import type { ClientType } from "@/lib/clients";

const styles: Record<ClientType, string> = {
  Buyer: "bg-gold-500/15 text-gold-600",
  Seller: "bg-navy-950/5 text-navy-950",
  Tenant: "bg-blue-50 text-blue-700",
  Landlord: "bg-amber-50 text-amber-700",
  Investor: "bg-green-50 text-green-700",
};

export function ClientTypeBadge({ type }: { type: ClientType }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${styles[type]}`}>
      {type}
    </span>
  );
}
