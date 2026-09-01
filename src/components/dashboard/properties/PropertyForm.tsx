"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { fieldClass, labelClass } from "@/lib/formStyles";
import { agents } from "@/lib/agents";
import {
  DEAL_TYPE_OPTIONS,
  PROPERTY_STATUS_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  type AdminProperty,
  type DealType,
  type PropertyStatus,
} from "@/lib/adminProperties";
import { useProperties } from "./PropertiesProvider";

type FormValues = {
  title: string;
  type: string;
  dealType: DealType;
  price: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  description: string;
  images: string;
  amenities: string;
  agentId: string;
  status: PropertyStatus;
};

function toFormValues(property?: AdminProperty): FormValues {
  if (!property) {
    return {
      title: "",
      type: PROPERTY_TYPE_OPTIONS[0],
      dealType: "For Sale",
      price: "",
      location: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      description: "",
      images: "",
      amenities: "",
      agentId: agents[0]?.id ?? "",
      status: "Draft",
    };
  }
  return {
    title: property.title,
    type: property.type,
    dealType: property.dealType,
    price: String(property.price),
    location: property.location,
    bedrooms: String(property.bedrooms),
    bathrooms: String(property.bathrooms),
    area: property.area,
    description: property.description,
    images: property.images.join("\n"),
    amenities: property.amenities.join(", "),
    agentId: property.agentId,
    status: property.status,
  };
}

type Errors = Partial<Record<"title" | "location" | "description" | "price" | "bedrooms" | "bathrooms" | "area", string>>;

export function PropertyForm({ mode, property }: { mode: "create" | "edit"; property?: AdminProperty }) {
  const router = useRouter();
  const { addProperty, updateProperty } = useProperties();

  const [values, setValues] = useState<FormValues>(() => toFormValues(property));
  const [errors, setErrors] = useState<Errors>({});
  const [saved, setSaved] = useState(false);

  const ids = {
    title: useId(),
    type: useId(),
    dealType: useId(),
    price: useId(),
    location: useId(),
    bedrooms: useId(),
    bathrooms: useId(),
    area: useId(),
    description: useId(),
    images: useId(),
    amenities: useId(),
    agent: useId(),
    status: useId(),
  };

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!values.title.trim()) next.title = "Title is required.";
    if (!values.location.trim()) next.location = "Location is required.";
    if (!values.description.trim()) next.description = "Description is required.";
    if (!values.area.trim()) next.area = "Area is required.";

    const price = Number(values.price);
    if (!values.price.trim() || Number.isNaN(price) || price <= 0) next.price = "Enter a valid price.";

    const bedrooms = Number(values.bedrooms);
    if (values.bedrooms.trim() === "" || Number.isNaN(bedrooms) || bedrooms < 0) {
      next.bedrooms = "Enter a valid number.";
    }

    const bathrooms = Number(values.bathrooms);
    if (values.bathrooms.trim() === "" || Number.isNaN(bathrooms) || bathrooms < 0) {
      next.bathrooms = "Enter a valid number.";
    }

    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const images = values.images
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const amenities = values.amenities
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const shared = {
      title: values.title.trim(),
      type: values.type as AdminProperty["type"],
      dealType: values.dealType,
      price: Number(values.price),
      location: values.location.trim(),
      bedrooms: Number(values.bedrooms),
      bathrooms: Number(values.bathrooms),
      area: values.area.trim(),
      description: values.description.trim(),
      images,
      amenities,
      agentId: values.agentId,
    };

    if (mode === "create") {
      const created = addProperty({ ...shared, status: values.status });
      router.push(`/dashboard/properties/edit?id=${created.id}`);
      return;
    }

    if (property) {
      updateProperty(property.id, shared);
      setSaved(true);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={ids.title} className={labelClass}>
            Title
          </label>
          <input
            id={ids.title}
            type="text"
            value={values.title}
            onChange={(event) => update("title", event.target.value)}
            aria-invalid={Boolean(errors.title)}
            placeholder="e.g. The Hillcrest Villa"
            className={cn(fieldClass, errors.title && "border-red-400")}
          />
          {errors.title && <p className="mt-1.5 text-xs text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor={ids.type} className={labelClass}>
            Type
          </label>
          <select
            id={ids.type}
            value={values.type}
            onChange={(event) => update("type", event.target.value)}
            className={fieldClass}
          >
            {PROPERTY_TYPE_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={ids.dealType} className={labelClass}>
            Sale / Rent
          </label>
          <select
            id={ids.dealType}
            value={values.dealType}
            onChange={(event) => update("dealType", event.target.value as DealType)}
            className={fieldClass}
          >
            {DEAL_TYPE_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={ids.price} className={labelClass}>
            Price (USD{values.dealType === "For Rent" ? "/mo" : ""})
          </label>
          <input
            id={ids.price}
            type="number"
            min="0"
            value={values.price}
            onChange={(event) => update("price", event.target.value)}
            aria-invalid={Boolean(errors.price)}
            placeholder="e.g. 2500000"
            className={cn(fieldClass, errors.price && "border-red-400")}
          />
          {errors.price && <p className="mt-1.5 text-xs text-red-600">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor={ids.location} className={labelClass}>
            Location
          </label>
          <input
            id={ids.location}
            type="text"
            value={values.location}
            onChange={(event) => update("location", event.target.value)}
            aria-invalid={Boolean(errors.location)}
            placeholder="e.g. Al Ain, UAE"
            className={cn(fieldClass, errors.location && "border-red-400")}
          />
          {errors.location && <p className="mt-1.5 text-xs text-red-600">{errors.location}</p>}
        </div>

        <div>
          <label htmlFor={ids.bedrooms} className={labelClass}>
            Bedrooms
          </label>
          <input
            id={ids.bedrooms}
            type="number"
            min="0"
            value={values.bedrooms}
            onChange={(event) => update("bedrooms", event.target.value)}
            aria-invalid={Boolean(errors.bedrooms)}
            className={cn(fieldClass, errors.bedrooms && "border-red-400")}
          />
          {errors.bedrooms && <p className="mt-1.5 text-xs text-red-600">{errors.bedrooms}</p>}
        </div>

        <div>
          <label htmlFor={ids.bathrooms} className={labelClass}>
            Bathrooms
          </label>
          <input
            id={ids.bathrooms}
            type="number"
            min="0"
            value={values.bathrooms}
            onChange={(event) => update("bathrooms", event.target.value)}
            aria-invalid={Boolean(errors.bathrooms)}
            className={cn(fieldClass, errors.bathrooms && "border-red-400")}
          />
          {errors.bathrooms && <p className="mt-1.5 text-xs text-red-600">{errors.bathrooms}</p>}
        </div>

        <div>
          <label htmlFor={ids.area} className={labelClass}>
            Area
          </label>
          <input
            id={ids.area}
            type="text"
            value={values.area}
            onChange={(event) => update("area", event.target.value)}
            aria-invalid={Boolean(errors.area)}
            placeholder="e.g. 2,400 sqft"
            className={cn(fieldClass, errors.area && "border-red-400")}
          />
          {errors.area && <p className="mt-1.5 text-xs text-red-600">{errors.area}</p>}
        </div>

        <div>
          <label htmlFor={ids.agent} className={labelClass}>
            Agent
          </label>
          <select
            id={ids.agent}
            value={values.agentId}
            onChange={(event) => update("agentId", event.target.value)}
            className={fieldClass}
          >
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
        </div>

        {mode === "create" && (
          <div>
            <label htmlFor={ids.status} className={labelClass}>
              Status
            </label>
            <select
              id={ids.status}
              value={values.status}
              onChange={(event) => update("status", event.target.value as PropertyStatus)}
              className={fieldClass}
            >
              {PROPERTY_STATUS_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        )}

        <div className="sm:col-span-2">
          <label htmlFor={ids.description} className={labelClass}>
            Description
          </label>
          <textarea
            id={ids.description}
            rows={5}
            value={values.description}
            onChange={(event) => update("description", event.target.value)}
            aria-invalid={Boolean(errors.description)}
            placeholder="Describe the property..."
            className={cn(fieldClass, "resize-none", errors.description && "border-red-400")}
          />
          {errors.description && <p className="mt-1.5 text-xs text-red-600">{errors.description}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={ids.images} className={labelClass}>
            Images <span className="normal-case text-gray-500">(one URL per line, images.unsplash.com)</span>
          </label>
          <textarea
            id={ids.images}
            rows={4}
            value={values.images}
            onChange={(event) => update("images", event.target.value)}
            placeholder="https://images.unsplash.com/..."
            className={cn(fieldClass, "resize-none font-mono text-xs")}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={ids.amenities} className={labelClass}>
            Amenities <span className="normal-case text-gray-500">(comma separated)</span>
          </label>
          <input
            id={ids.amenities}
            type="text"
            value={values.amenities}
            onChange={(event) => update("amenities", event.target.value)}
            placeholder="Private Pool, Smart Home System, 3-Car Garage"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Button type="submit" variant="primary">
          {mode === "create" ? "Create Property" : "Save Changes"}
        </Button>
        <Button href="/dashboard/properties" variant="ghost">
          Cancel
        </Button>
        {saved && (
          <p className="text-sm text-gold-600" role="status">
            Changes saved.
          </p>
        )}
      </div>
    </form>
  );
}
