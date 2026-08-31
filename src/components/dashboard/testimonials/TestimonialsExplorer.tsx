"use client";

import { useMemo, useState } from "react";
import type { AdminTestimonial, TestimonialStatus } from "@/lib/adminTestimonials";
import { useTestimonials } from "./TestimonialsProvider";
import { TestimonialsToolbar } from "./TestimonialsToolbar";
import { TestimonialRow } from "./TestimonialRow";
import { TestimonialFormModal } from "./TestimonialFormModal";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

export function TestimonialsExplorer() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials();

  const [status, setStatus] = useState("All Statuses");
  const [formTestimonial, setFormTestimonial] = useState<AdminTestimonial | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (status === "All Statuses") return testimonials;
    return testimonials.filter((testimonial) => testimonial.status === status);
  }, [testimonials, status]);

  const pendingDelete = testimonials.find((testimonial) => testimonial.id === pendingDeleteId);

  function handleAdd() {
    setFormTestimonial(null);
    setFormOpen(true);
  }

  function handleEdit(testimonial: AdminTestimonial) {
    setFormTestimonial(testimonial);
    setFormOpen(true);
  }

  return (
    <div>
      <TestimonialsToolbar status={status} onStatusChange={setStatus} onAdd={handleAdd} />

      <p className="mt-6 text-sm text-gray-500">
        {filtered.length} {filtered.length === 1 ? "testimonial" : "testimonials"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-border bg-ivory-100 p-12 text-center">
          <p className="text-base font-semibold text-navy-950">No testimonials match this filter</p>
          <p className="mt-2 text-sm text-gray-500">Try a different approval status.</p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {filtered.map((testimonial) => (
            <TestimonialRow
              key={testimonial.id}
              testimonial={testimonial}
              onStatusChange={(nextStatus: TestimonialStatus) =>
                updateTestimonial(testimonial.id, { status: nextStatus })
              }
              onEdit={() => handleEdit(testimonial)}
              onDelete={() => setPendingDeleteId(testimonial.id)}
            />
          ))}
        </div>
      )}

      <TestimonialFormModal
        open={formOpen}
        testimonial={formTestimonial}
        onClose={() => setFormOpen(false)}
        onSaveCreate={(input) => {
          addTestimonial(input);
          setFormOpen(false);
        }}
        onSaveEdit={(id, patch) => {
          updateTestimonial(id, patch);
          setFormOpen(false);
        }}
      />

      <DeleteConfirmDialog
        open={Boolean(pendingDelete)}
        itemLabel={pendingDelete?.name ?? ""}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (pendingDeleteId) deleteTestimonial(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
