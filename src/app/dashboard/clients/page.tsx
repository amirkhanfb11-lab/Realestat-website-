import type { Metadata } from "next";
import { ClientsProvider } from "@/components/dashboard/clients/ClientsProvider";
import { ClientsExplorer } from "@/components/dashboard/clients/ClientsExplorer";

export const metadata: Metadata = {
  title: { absolute: "Clients | Abu Salem Dashboard" },
};

export default function ClientsPage() {
  return (
    <div>
      <h2 className="font-serif text-2xl text-navy-950">Clients</h2>
      <p className="mt-1 text-sm text-gray-500">Manage buyers, sellers, tenants, landlords, and investors.</p>
      <div className="mt-6">
        <ClientsProvider>
          <ClientsExplorer />
        </ClientsProvider>
      </div>
    </div>
  );
}
