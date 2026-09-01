"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { PropertyStatus } from "@/lib/adminProperties";
import { useProperties } from "./PropertiesProvider";
import { PropertyForm } from "./PropertyForm";
import { PropertyStatusActions } from "./PropertyStatusActions";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

export function PropertyEditClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const { getProperty, updateProperty, deleteProperty } = useProperties();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const property = getProperty(id);

  if (!property) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-ivory-100 p-12 text-center">
        <p className="text-base font-semibold text-navy-950">Property not found</p>
        <p className="mt-2 text-sm text-gray-500">It may have been deleted, or the link is out of date.</p>
        <Link
          href="/dashboard/properties"
          className="mt-4 inline-block text-sm font-medium text-gold-600 hover:underline"
        >
          Back to Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PropertyStatusActions
        property={property}
        onChangeStatus={(status: PropertyStatus) => updateProperty(property.id, { status })}
        onDelete={() => setConfirmDelete(true)}
      />

      <PropertyForm mode="edit" property={property} />

      <DeleteConfirmDialog
        open={confirmDelete}
        propertyTitle={property.title}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={() => {
          deleteProperty(property.id);
          setConfirmDelete(false);
          router.push("/dashboard/properties");
        }}
      />
    </div>
  );
}
