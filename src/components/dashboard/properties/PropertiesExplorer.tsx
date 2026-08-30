"use client";

import { useMemo, useState } from "react";
import type { PropertyStatus } from "@/lib/adminProperties";
import { useProperties } from "./PropertiesProvider";
import { PropertiesToolbar } from "./PropertiesToolbar";
import { PropertyRow } from "./PropertyRow";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

export function PropertiesExplorer() {
  const { properties, updateProperty, deleteProperty } = useProperties();

  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Types");
  const [deal, setDeal] = useState("All");
  const [status, setStatus] = useState("All Statuses");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return properties.filter((property) => {
      if (type !== "All Types" && property.type !== type) return false;
      if (deal !== "All" && property.dealType !== deal) return false;
      if (status !== "All Statuses" && property.status !== status) return false;
      if (
        query &&
        !property.title.toLowerCase().includes(query) &&
        !property.location.toLowerCase().includes(query) &&
        !property.propertyId.toLowerCase().includes(query)
      ) {
        return false;
      }
      return true;
    });
  }, [properties, search, type, deal, status]);

  const pendingDelete = properties.find((property) => property.id === pendingDeleteId);

  return (
    <div>
      <PropertiesToolbar
        search={search}
        onSearchChange={setSearch}
        type={type}
        onTypeChange={setType}
        deal={deal}
        onDealChange={setDeal}
        status={status}
        onStatusChange={setStatus}
      />

      <p className="mt-6 text-sm text-gray-500">
        {filtered.length} {filtered.length === 1 ? "property" : "properties"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-border bg-ivory-100 p-12 text-center">
          <p className="text-base font-semibold text-navy-950">No properties match your filters</p>
          <p className="mt-2 text-sm text-gray-500">Try adjusting search, type, or status.</p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {filtered.map((property) => (
            <PropertyRow
              key={property.id}
              property={property}
              onStatusChange={(nextStatus: PropertyStatus) => updateProperty(property.id, { status: nextStatus })}
              onDelete={() => setPendingDeleteId(property.id)}
            />
          ))}
        </div>
      )}

      <DeleteConfirmDialog
        open={Boolean(pendingDelete)}
        propertyTitle={pendingDelete?.title ?? ""}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (pendingDeleteId) deleteProperty(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
