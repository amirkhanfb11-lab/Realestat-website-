const STAR_PATH = "M12 3l2.6 5.8L21 9.6l-4.6 4.1L17.6 21 12 17.6 6.4 21l1.2-7.3L3 9.6l6.4-.8L12 3Z";

/** Clickable 1–5 star input, same glyph as the public site's Testimonials section. */
export function RatingInput({ value, onChange }: { value: number; onChange: (rating: number) => void }) {
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Rating">
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        const filled = starValue <= value;
        return (
          <button
            key={starValue}
            type="button"
            role="radio"
            aria-checked={filled}
            aria-label={`${starValue} star${starValue === 1 ? "" : "s"}`}
            onClick={() => onChange(starValue)}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-ivory-100"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={filled ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.5"
              className={filled ? "text-gold-500" : "text-border"}
              aria-hidden="true"
            >
              <path d={STAR_PATH} strokeLinejoin="round" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
