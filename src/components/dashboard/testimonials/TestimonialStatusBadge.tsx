import type { TestimonialStatus } from "@/lib/adminTestimonials";

const styles: Record<TestimonialStatus, string> = {
  Pending: "bg-amber-50 text-amber-700",
  Approved: "bg-green-50 text-green-700",
  Hidden: "bg-navy-950/5 text-gray-600",
};

export function TestimonialStatusBadge({ status }: { status: TestimonialStatus }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}
