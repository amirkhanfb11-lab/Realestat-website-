import type { Metadata } from "next";
import { StatCard } from "@/components/dashboard/StatCard";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { analyticsStats, leadsOverTime, propertyViewsTrend, salesRentalActivity } from "@/lib/analyticsData";

export const metadata: Metadata = {
  title: { absolute: "Analytics | Abu Salem Dashboard" },
};

export default function DashboardAnalyticsPage() {
  return (
    <div>
      <h2 className="font-serif text-2xl text-navy-950">Analytics</h2>
      <p className="mt-1 text-sm text-gray-500">Performance across properties, leads, and engagement.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {analyticsStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <AnalyticsChart data={leadsOverTime} title="Leads Over Time — Last 6 Months" />
        <AnalyticsChart data={propertyViewsTrend} title="Property Views — Last 6 Months" />
      </div>

      <div className="mt-6">
        <AnalyticsChart data={salesRentalActivity} title="Sales & Rental Activity — By Status" />
      </div>
    </div>
  );
}
