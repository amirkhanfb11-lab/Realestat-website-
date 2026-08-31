"use client";

import type { AdminTestimonial, TestimonialStatus } from "@/lib/adminTestimonials";
import { TESTIMONIAL_STATUS_OPTIONS } from "@/lib/adminTestimonials";
import { RatingStars } from "./RatingStars";

export function TestimonialRow({
  testimonial,
  onStatusChange,
  onEdit,
  onDelete,
}: {
  testimonial: AdminTestimonial;
  onStatusChange: (status: TestimonialStatus) => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-soft sm:flex-row sm:items-start">
      <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-navy-950 font-serif text-sm text-gold-400">
        {testimonial.initials}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="text-sm font-semibold text-navy-950">{testimonial.name}</p>
          <span className="text-xs text-gray-500">{testimonial.location}</span>
          <RatingStars rating={testimonial.rating} size={14} />
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-gray-500">&ldquo;{testimonial.quote}&rdquo;</p>
      </div>

      <div className="flex flex-none items-center gap-2 sm:flex-col sm:items-end">
        <label className="sr-only" htmlFor={`status-${testimonial.id}`}>
          Approval status for {testimonial.name}
        </label>
        <select
          id={`status-${testimonial.id}`}
          value={testimonial.status}
          onChange={(event) => onStatusChange(event.target.value as TestimonialStatus)}
          className="rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-medium text-charcoal-900 focus-visible:outline-none focus-visible:border-gold-500"
        >
          {TESTIMONIAL_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-3 text-xs font-medium">
          <button type="button" onClick={onEdit} className="text-gold-600 hover:underline">
            Edit
          </button>
          <button type="button" onClick={onDelete} className="text-red-600 hover:underline">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
