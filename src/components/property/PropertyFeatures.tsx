export function PropertyFeatures({ features }: { features: string[] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-navy-950">Features &amp; Amenities</h2>
      <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm text-charcoal-900">
            <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-ivory-100 text-gold-600">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
