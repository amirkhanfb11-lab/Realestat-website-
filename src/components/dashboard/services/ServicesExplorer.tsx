"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { AdminService } from "@/lib/adminServices";
import { useServices } from "./ServicesProvider";
import { ServiceRow } from "./ServiceRow";
import { ServiceFormModal } from "./ServiceFormModal";

export function ServicesExplorer() {
  const { services, addService, updateService, toggleActive, moveUp, moveDown } = useServices();

  const [formService, setFormService] = useState<AdminService | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  function handleAdd() {
    setFormService(null);
    setFormOpen(true);
  }

  function handleEdit(service: AdminService) {
    setFormService(service);
    setFormOpen(true);
  }

  const nextOrder = services.length + 1;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {services.length} {services.length === 1 ? "service" : "services"}
        </p>
        <Button onClick={handleAdd} size="sm">
          + Add Service
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        {services.map((service, index) => (
          <ServiceRow
            key={service.id}
            service={service}
            isFirst={index === 0}
            isLast={index === services.length - 1}
            onEdit={() => handleEdit(service)}
            onToggleActive={() => toggleActive(service.id)}
            onMoveUp={() => moveUp(service.id)}
            onMoveDown={() => moveDown(service.id)}
          />
        ))}
      </div>

      <ServiceFormModal
        open={formOpen}
        service={formService}
        nextOrder={nextOrder}
        onClose={() => setFormOpen(false)}
        onSaveCreate={(input) => {
          addService(input);
          setFormOpen(false);
        }}
        onSaveEdit={(id, patch) => {
          updateService(id, patch);
          setFormOpen(false);
        }}
      />
    </div>
  );
}
