import type { DashboardStat } from "@/lib/dashboardMock";

export function StatCard({ label, value, delta, icon }: DashboardStat) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gray-500">{label}</p>
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ivory-100 text-gold-600">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            {icon}
          </svg>
        </span>
      </div>
      <p className="mt-3 font-serif text-3xl text-navy-950">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{delta}</p>
    </div>
  );
}
