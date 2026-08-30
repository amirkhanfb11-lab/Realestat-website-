import type { Metadata } from "next";
import { properties } from "@/lib/properties";
import { leadsChartData, recentLeads } from "@/lib/dashboardMock";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { RecentLeads } from "@/components/dashboard/RecentLeads";
import { RecentProperties } from "@/components/dashboard/RecentProperties";

export const metadata: Metadata = {
  title: { absolute: "Overview | Abu Salem Dashboard" },
};

export default function DashboardPage() {
  const recentProperties = properties.slice(0, 5);

  return (
    <div className="space-y-8">
      <WelcomeHeader />

      <StatsGrid />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AnalyticsChart data={leadsChartData} title="New Leads — Last 6 Months" />
        </div>
        <RecentLeads leads={recentLeads} />
      </div>

      <RecentProperties properties={recentProperties} />
    </div>
  );
}
