import type { Metadata } from "next";
import { PropertyForm } from "@/components/dashboard/properties/PropertyForm";

export const metadata: Metadata = {
  title: { absolute: "Add Property | Sumalani Dashboard" },
};

export default function NewPropertyPage() {
  return (
    <div>
      <h2 className="font-serif text-2xl text-navy-950">Add Property</h2>
      <p className="mt-1 text-sm text-gray-500">Create a new listing.</p>
      <div className="mt-6">
        <PropertyForm mode="create" />
      </div>
    </div>
  );
}
