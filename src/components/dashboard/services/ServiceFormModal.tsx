"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { fieldClass, labelClass } from "@/lib/formStyles";
import type { AdminService } from "@/lib/adminServices";
import { SERVICE_ICON_OPTIONS, getServiceIcon, type ServiceIconKey } from "@/lib/serviceIcons";
import { ServiceModal } from "./ServiceModal";

type FormValues = {
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon: ServiceIconKey;
  image: string;
  displayOrder: string;
  active: boolean;
};

function toFormValues(service: AdminService | null, nextOrder: number): FormValues {
  if (!service) {
    return {
      name: "",
      shortDescription: "",
      fullDescription: "",
      icon: SERVICE_ICON_OPTIONS[0].key,
      image: "",
      displayOrder: String(nextOrder),
      active: true,
    };
  }
  return {
    name: service.name,
    shortDescription: service.shortDescription,
    fullDescription: service.fullDescription,
    icon: service.icon,
    image: service.image,
    displayOrder: String(service.displayOrder),
    active: service.active,
  };
}

type Errors = Partial<Record<"name" | "shortDescription" | "fullDescription" | "image" | "displayOrder", string>>;

export function ServiceFormModal({
  open,
  service,
  nextOrder,
  onClose,
  onSaveCreate,
  onSaveEdit,
}: {
  open: boolean;
  service: AdminService | null;
  nextOrder: number;
  onClose: () => void;
  onSaveCreate: (input: Omit<AdminService, "id">) => void;
  onSaveEdit: (id: string, patch: Partial<AdminService>) => void;
}) {
  const isEdit = Boolean(service);
  const [values, setValues] = useState<FormValues>(() => toFormValues(service, nextOrder));
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (open) {
      setValues(toFormValues(service, nextOrder));
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, service]);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Name is required.";
    if (!values.shortDescription.trim()) next.shortDescription = "Short description is required.";
    if (!values.fullDescription.trim()) next.fullDescription = "Full description is required.";
    if (!values.image.trim()) next.image = "Image URL is required.";
    const order = Number(values.displayOrder);
    if (values.displayOrder.trim() === "" || Number.isNaN(order) || order <= 0) {
      next.displayOrder = "Enter a valid position (1 or higher).";
    }
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const shared = {
      name: values.name.trim(),
      shortDescription: values.shortDescription.trim(),
      fullDescription: values.fullDescription.trim(),
      icon: values.icon,
      image: values.image.trim(),
      displayOrder: Number(values.displayOrder),
      active: values.active,
    };

    if (isEdit && service) {
      onSaveEdit(service.id, shared);
    } else {
      onSaveCreate(shared);
    }
  }

  return (
    <ServiceModal open={open} title={isEdit ? "Edit Service" : "Add Service"} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Name</label>
            <input
              type="text"
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
              placeholder="e.g. Property Buying"
              className={cn(fieldClass, errors.name && "border-red-400")}
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className={labelClass}>Short Description</label>
            <input
              type="text"
              value={values.shortDescription}
              onChange={(event) => update("shortDescription", event.target.value)}
              aria-invalid={Boolean(errors.shortDescription)}
              placeholder="Shown on the service card"
              className={cn(fieldClass, errors.shortDescription && "border-red-400")}
            />
            {errors.shortDescription && <p className="mt-1.5 text-xs text-red-600">{errors.shortDescription}</p>}
          </div>

          <div>
            <label className={labelClass}>Full Description</label>
            <textarea
              rows={4}
              value={values.fullDescription}
              onChange={(event) => update("fullDescription", event.target.value)}
              aria-invalid={Boolean(errors.fullDescription)}
              placeholder="Longer description for a future service detail page"
              className={cn(fieldClass, "resize-none", errors.fullDescription && "border-red-400")}
            />
            {errors.fullDescription && <p className="mt-1.5 text-xs text-red-600">{errors.fullDescription}</p>}
          </div>

          <div>
            <label className={labelClass}>Icon</label>
            <div className="mt-2 flex items-center gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-ivory-100 text-navy-950">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  {getServiceIcon(values.icon)}
                </svg>
              </span>
              <select
                value={values.icon}
                onChange={(event) => update("icon", event.target.value as ServiceIconKey)}
                className={cn(fieldClass, "mt-0")}
              >
                {SERVICE_ICON_OPTIONS.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Image URL</label>
            <div className="mt-2 flex items-center gap-3">
              {values.image && (
                <div className="relative h-12 w-12 flex-none overflow-hidden rounded-lg bg-ivory-100">
                  <Image src={values.image} alt="" fill sizes="48px" className="object-cover" />
                </div>
              )}
              <input
                type="text"
                value={values.image}
                onChange={(event) => update("image", event.target.value)}
                aria-invalid={Boolean(errors.image)}
                placeholder="https://images.unsplash.com/..."
                className={cn(fieldClass, "mt-0 font-mono text-xs", errors.image && "border-red-400")}
              />
            </div>
            {errors.image && <p className="mt-1.5 text-xs text-red-600">{errors.image}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Display Order</label>
              <input
                type="number"
                min="1"
                value={values.displayOrder}
                onChange={(event) => update("displayOrder", event.target.value)}
                aria-invalid={Boolean(errors.displayOrder)}
                className={cn(fieldClass, errors.displayOrder && "border-red-400")}
              />
              {errors.displayOrder && <p className="mt-1.5 text-xs text-red-600">{errors.displayOrder}</p>}
            </div>

            <div>
              <label className={labelClass}>Status</label>
              <select
                value={values.active ? "Active" : "Inactive"}
                onChange={(event) => update("active", event.target.value === "Active")}
                className={fieldClass}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button type="submit" variant="primary" size="sm">
            {isEdit ? "Save Changes" : "Add Service"}
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </ServiceModal>
  );
}
