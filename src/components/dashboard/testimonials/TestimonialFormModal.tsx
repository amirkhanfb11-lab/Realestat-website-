"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { fieldClass, labelClass } from "@/lib/formStyles";
import { TESTIMONIAL_STATUS_OPTIONS, type AdminTestimonial, type TestimonialStatus } from "@/lib/adminTestimonials";
import { TestimonialModal } from "./TestimonialModal";
import { RatingInput } from "./RatingInput";

type FormValues = {
  name: string;
  location: string;
  quote: string;
  rating: number;
  status: TestimonialStatus;
};

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return letters.join("") || "AS";
}

function toFormValues(testimonial: AdminTestimonial | null): FormValues {
  if (!testimonial) {
    return { name: "", location: "", quote: "", rating: 5, status: "Pending" };
  }
  return {
    name: testimonial.name,
    location: testimonial.location,
    quote: testimonial.quote,
    rating: testimonial.rating,
    status: testimonial.status,
  };
}

type Errors = Partial<Record<"name" | "location" | "quote", string>>;

export function TestimonialFormModal({
  open,
  testimonial,
  onClose,
  onSaveCreate,
  onSaveEdit,
}: {
  open: boolean;
  testimonial: AdminTestimonial | null;
  onClose: () => void;
  onSaveCreate: (input: Omit<AdminTestimonial, "id" | "submittedAt">) => void;
  onSaveEdit: (id: string, patch: Partial<AdminTestimonial>) => void;
}) {
  const isEdit = Boolean(testimonial);
  const [values, setValues] = useState<FormValues>(() => toFormValues(testimonial));
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (open) {
      setValues(toFormValues(testimonial));
      setErrors({});
    }
  }, [open, testimonial]);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Name is required.";
    if (!values.location.trim()) next.location = "Location is required.";
    if (!values.quote.trim()) next.quote = "Testimonial text is required.";
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const name = values.name.trim();
    const shared = {
      name,
      location: values.location.trim(),
      quote: values.quote.trim(),
      rating: values.rating,
      status: values.status,
    };

    if (isEdit && testimonial) {
      onSaveEdit(testimonial.id, shared);
    } else {
      onSaveCreate({ ...shared, initials: initialsFrom(name) });
    }
  }

  return (
    <TestimonialModal open={open} title={isEdit ? "Edit Testimonial" : "Add Testimonial"} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Customer Name</label>
              <input
                type="text"
                value={values.name}
                onChange={(event) => update("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                placeholder="Full name"
                className={cn(fieldClass, errors.name && "border-red-400")}
              />
              {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className={labelClass}>Location</label>
              <input
                type="text"
                value={values.location}
                onChange={(event) => update("location", event.target.value)}
                aria-invalid={Boolean(errors.location)}
                placeholder="e.g. Al Ain, UAE"
                className={cn(fieldClass, errors.location && "border-red-400")}
              />
              {errors.location && <p className="mt-1.5 text-xs text-red-600">{errors.location}</p>}
            </div>
          </div>

          <div>
            <label className={labelClass}>Testimonial</label>
            <textarea
              rows={4}
              value={values.quote}
              onChange={(event) => update("quote", event.target.value)}
              aria-invalid={Boolean(errors.quote)}
              placeholder="What did the customer say?"
              className={cn(fieldClass, "resize-none", errors.quote && "border-red-400")}
            />
            {errors.quote && <p className="mt-1.5 text-xs text-red-600">{errors.quote}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
            <div>
              <span className={labelClass}>Rating</span>
              <div className="mt-2">
                <RatingInput value={values.rating} onChange={(rating) => update("rating", rating)} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Approval Status</label>
              <select
                value={values.status}
                onChange={(event) => update("status", event.target.value as TestimonialStatus)}
                className={fieldClass}
              >
                {TESTIMONIAL_STATUS_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button type="submit" variant="primary" size="sm">
            {isEdit ? "Save Changes" : "Add Testimonial"}
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </TestimonialModal>
  );
}
