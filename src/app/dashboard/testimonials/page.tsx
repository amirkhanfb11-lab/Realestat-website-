import type { Metadata } from "next";
import { TestimonialsProvider } from "@/components/dashboard/testimonials/TestimonialsProvider";
import { TestimonialsExplorer } from "@/components/dashboard/testimonials/TestimonialsExplorer";

export const metadata: Metadata = {
  title: { absolute: "Testimonials | Abu Salem Dashboard" },
};

export default function DashboardTestimonialsPage() {
  return (
    <div>
      <h2 className="font-serif text-2xl text-navy-950">Testimonials</h2>
      <p className="mt-1 text-sm text-gray-500">Review, publish, and manage customer testimonials.</p>
      <div className="mt-6">
        <TestimonialsProvider>
          <TestimonialsExplorer />
        </TestimonialsProvider>
      </div>
    </div>
  );
}
