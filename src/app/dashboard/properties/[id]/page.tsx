import type { Metadata } from "next";
import { PropertyEditClient } from "@/components/dashboard/properties/PropertyEditClient";

export const metadata: Metadata = {
  title: { absolute: "Edit Property | Abu Salem Dashboard" },
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      <h2 className="font-serif text-2xl text-navy-950">Edit Property</h2>
      <p className="mt-1 text-sm text-gray-500">View and update this listing.</p>
      <div className="mt-6">
        <PropertyEditClient id={id} />
      </div>
    </div>
  );
}
