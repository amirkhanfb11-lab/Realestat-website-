import type { Metadata } from "next";
import { PropertiesExplorer } from "@/components/dashboard/properties/PropertiesExplorer";

export const metadata: Metadata = {
  title: { absolute: "Properties | Sumalani Dashboard" },
};

export default function DashboardPropertiesPage() {
  return (
    <div>
      <h2 className="font-serif text-2xl text-navy-950">Properties</h2>
      <p className="mt-1 text-sm text-gray-500">Manage every listing — search, filter, and update status.</p>
      <div className="mt-6">
        <PropertiesExplorer />
      </div>
    </div>
  );
}
