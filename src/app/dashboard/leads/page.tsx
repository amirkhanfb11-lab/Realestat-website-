import type { Metadata } from "next";
import { LeadsProvider } from "@/components/dashboard/leads/LeadsProvider";
import { LeadsExplorer } from "@/components/dashboard/leads/LeadsExplorer";

export const metadata: Metadata = {
  title: { absolute: "Leads | Abu Salem Dashboard" },
};

export default function LeadsPage() {
  return (
    <div>
      <h2 className="font-serif text-2xl text-navy-950">Leads</h2>
      <p className="mt-1 text-sm text-gray-500">Track inquiries from first contact to close.</p>
      <div className="mt-6">
        <LeadsProvider>
          <LeadsExplorer />
        </LeadsProvider>
      </div>
    </div>
  );
}
