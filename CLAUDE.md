# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (Next.js, Turbopack not configured — plain webpack)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (next/core-web-vitals + next/typescript)
```

There is no test suite configured in this repo.

## Architecture

This is **Sumalani Real Estate**, a marketing/listings website for a real estate agency in Al Ain, built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS v4.

### Data layer: static, typed, in-repo (no backend/CMS)

All content lives in `src/lib/*.ts(x)` as typed arrays/constants and is imported directly by components — there is no API or database:

- `src/lib/properties.ts` — the `Property` type and the full listings array (`properties`). Each entry has both a display `price` string and a numeric `priceValue` used for filtering; `images` galleries are built at module-load time by zipping each base property with a rotating `INTERIOR_SETS` pool. Price-band vocab (`BUY_PRICE_OPTIONS`, `RENT_PRICE_OPTIONS`) is exported from here so every price filter across the site (hero search, `/properties`) stays in sync.
- `src/lib/agents.ts` — agent/team directory (`Agent` type, `agents` array). Properties reference an agent via `agentId`.
- `src/lib/services.tsx` — services list (JSX since entries carry icon components).
- `src/lib/testimonials.ts` — testimonial content for the homepage.
- `src/lib/formStyles.ts` — shared Tailwind class strings for form inputs, reused by `ContactForm` and `InquiryForm`.
- `src/lib/utils.ts` — just `cn()` (clsx + tailwind-merge).

When adding a listing, agent, service, or testimonial, edit the relevant array in `src/lib`; there's no seeding/migration step.

### Routing (App Router, `src/app`)

- `/` (`page.tsx`) — composed from `src/components/home/*` sections (Hero, FeaturedProperties, AboutIntro, ServicesOverview, WhyChooseUs, Testimonials, CTASection).
- `/properties` — server page rendering `PropertiesExplorer`, the client component that owns all filter/search/pagination state.
- `/properties/[slug]` — property detail page; looks up the property by slug from `src/lib/properties.ts` (404 via `notFound()` if missing).
- `/about`, `/services`, `/contact` — mostly server components composed from `src/components/{about,services,contact}/*`.
- `icon.tsx`, `sitemap.ts`, `robots.ts` — generated metadata routes.

### Client vs. server components

Components default to server components. `"use client"` is used only where interactivity requires it — e.g. `PropertiesExplorer` (filter/search state, reads `useSearchParams` for homepage search handoff), `PropertyFilters`, `SearchFilterBar`, `PropertyGallery`, `ContactForm`/`InquiryForm`, `Reveal` (scroll-in animation). Keep new interactive pieces isolated as client leaves rather than converting whole page trees.

### Homepage search → `/properties` handoff

The homepage hero search encodes `?search=&type=&price=` and links to `/properties`. `PropertiesExplorer` reads these on mount to pre-fill filters. A handed-off `price` is always from the buy-scale band (`BUY_PRICE_OPTIONS`), so its presence forces the initial `status` to `"buy"` — otherwise the price `<select>` would show a value with no matching option. If you change the query param shape, update both the hero search component and this pre-fill logic together.

### Styling — design tokens in `globals.css`

Tailwind v4 theme tokens (colors, fonts, shadows, motion) are defined once in the `@theme` block of `src/app/globals.css` (navy/gold/ivory "trustworthy luxury" palette), which Tailwind turns into matching utility classes (e.g. `--color-gold-500` → `bg-gold-500`). Add new design tokens there rather than hardcoding hex values in components. `gold-600` was deliberately darkened from the brand's original gold to pass WCAG AA contrast as text — don't lighten it back without re-checking contrast.

Layout primitives `Container` and `Section` (`src/components/layout/`) wrap page content for consistent max-width/padding/spacing; prefer them over ad hoc wrapper divs.

### Images

Remote images are only Unsplash (`next.config.ts` `images.remotePatterns` allows `images.unsplash.com`). Adding images from another host requires updating that config.
