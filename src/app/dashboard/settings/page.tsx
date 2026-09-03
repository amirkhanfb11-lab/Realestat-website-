import type { Metadata } from "next";
import { SettingsForm } from "@/components/dashboard/settings/SettingsForm";

export const metadata: Metadata = {
  title: { absolute: "Settings | Sumalani Dashboard" },
};

export default function DashboardSettingsPage() {
  return (
    <div>
      <h2 className="font-serif text-2xl text-navy-950">Settings</h2>
      <p className="mt-1 text-sm text-gray-500">Company, website, social links, notifications, and your profile.</p>
      <div className="mt-6 max-w-3xl">
        <SettingsForm />
      </div>
    </div>
  );
}
