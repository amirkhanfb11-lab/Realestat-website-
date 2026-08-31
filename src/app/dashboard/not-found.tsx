import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-ivory-100 p-12 text-center">
      <p className="text-base font-semibold text-navy-950">Page not found</p>
      <p className="mt-2 text-sm text-gray-500">
        This dashboard page doesn&apos;t exist, or the link is out of date.
      </p>
      <Link href="/dashboard" className="mt-4 inline-block text-sm font-medium text-gold-600 hover:underline">
        Back to Dashboard
      </Link>
    </div>
  );
}
