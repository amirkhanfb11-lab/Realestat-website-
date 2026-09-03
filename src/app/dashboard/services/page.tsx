import type { Metadata } from "next";
import { ServicesProvider } from "@/components/dashboard/services/ServicesProvider";
import { ServicesExplorer } from "@/components/dashboard/services/ServicesExplorer";

export const metadata: Metadata = {
  title: { absolute: "Services | Sumalani Dashboard" },
};

export default function DashboardServicesPage() {
  return (
    <div>
      <h2 className="font-serif text-2xl text-navy-950">Services</h2>
      <p className="mt-1 text-sm text-gray-500">
        Manage the services shown on the public site — order, availability, and details.
      </p>
      <div className="mt-6">
        <ServicesProvider>
          <ServicesExplorer />
        </ServicesProvider>
      </div>
    </div>
  );
}
