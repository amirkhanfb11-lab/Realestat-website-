import type { Metadata } from "next";
import { Suspense } from "react";
import { PropertyEditClient } from "@/components/dashboard/properties/PropertyEditClient";

export const metadata: Metadata = {
  title: { absolute: "Edit Property | Sumalani Dashboard" },
};

export default function EditPropertyPage() {
  return (
    <div>
      <h2 className="font-serif text-2xl text-navy-950">Edit Property</h2>
      <p className="mt-1 text-sm text-gray-500">View and update this listing.</p>
      <div className="mt-6">
        <Suspense fallback={null}>
          <PropertyEditClient />
        </Suspense>
      </div>
    </div>
  );
}
