const STAR_PATH = "M12 3l2.6 5.8L21 9.6l-4.6 4.1L17.6 21 12 17.6 6.4 21l1.2-7.3L3 9.6l6.4-.8L12 3Z";

/** Read-only star display — same glyph as the public site's Testimonials section. */
export function RatingStars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={index < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          className={index < rating ? "text-gold-500" : "text-border"}
          aria-hidden="true"
        >
          <path d={STAR_PATH} strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}
