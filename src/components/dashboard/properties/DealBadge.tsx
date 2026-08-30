import type { DealType } from "@/lib/adminProperties";

export function DealBadge({ dealType }: { dealType: DealType }) {
  return (
    <span className="inline-block rounded-full bg-ivory-100 px-2.5 py-0.5 text-[11px] font-medium text-charcoal-900">
      {dealType}
    </span>
  );
}
