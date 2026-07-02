# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint (flat config, ESLint 9)
```

There is no test suite configured.

## Architecture

Next.js App Router site for a local plumbing business ("The Plumbing Stars"). All routes live under `src/app/`.

**Next.js 16 + React 19** — both are cutting-edge; see AGENTS.md before writing any framework code.

**Route map:**
- `/` (`page.tsx`) — main landing page: hero, services grid, special offer, why-us, service area router, FAQ, contact CTA
- `/losangeles` — LA county landing with city list, Leaflet map, and `BookingForm`
- `/ventura` — Ventura county landing with city list, Leaflet map, and `BookingForm`
- `/service-areas` — full coverage map with grouped city lists (SFV, Westside, Eastside, Ventura) and `ServiceMap`
- `/services/[drain-cleaning|sewer-repair|hydro-jetting|camera-inspection|trenchless-replacement|pipe-lining|water-heater]` — 7 individual service pages, all built with `ServiceShell`
- `/api/book` — POST endpoint that receives booking form submissions and emails them via nodemailer

**Component roles:**
- `Header` — sticky nav; accepts an optional `links` prop so each page can customize nav items. Falls back to home-page anchor links
- `Footer` — static; links to `/losangeles` and `/ventura`
- `MobileMenu` — `"use client"` hamburger drawer, rendered by `Header`, hidden on `md:` and up
- `ServiceAreaRouter` — `"use client"` ZIP code lookup that pushes to `/losangeles` or `/ventura` using `getRegionByZip`; also renders two manual county buttons
- `BookingForm` — `"use client"` form that POSTs to `/api/book` with a `region` prop (`"losangeles" | "ventura"`)
- `ServiceShell` — server component wrapper for all service pages: renders `Header` (with back-to-home nav), trust bar, `children` (page-specific content), FAQ section, and a `ServiceAreaRouter` booking CTA at the bottom
- `ServiceMap` — thin server-safe wrapper that uses `next/dynamic` with `ssr: false` to lazy-load `ServiceMapClient` (Leaflet requires the DOM). Accepts `county?: "la" | "ventura" | "both"` (defaults to `"both"`).
- `ServiceMapClient` — `"use client"` Leaflet map rendering LA and/or Ventura county polygons via `react-leaflet`. Polygon coordinates are hardcoded in this file.

**Data / lib:**
- `src/lib/zipLookup.ts` — exports `getRegionByZip(zip)` returning `"losangeles" | "ventura" | null`; backed by two hardcoded `Set`s. Add ZIPs here to expand coverage.
- `src/lib/mailer.ts` — nodemailer via Gmail. Requires `GMAIL_USER` and `GMAIL_APP_PASSWORD` env vars. `BOOKING_TO` overrides the destination address (defaults to `info@theplumbingstars.com`). When env vars are absent the API route logs the lead to console instead of silently failing.

**Adding a new service page:** create `src/app/services/<slug>/page.tsx`, export `metadata`, define a `faqs` array, and return `<ServiceShell title="..." intro="..." faqs={faqs}>` with page-specific `<section>` blocks as children.

**Adding a new service area county:** add ZIPs to `zipLookup.ts`, create `src/app/<region>/page.tsx` mirroring the LA/Ventura pattern, add a county button to `ServiceAreaRouter`, and link it from `Footer`.

## Styling

**Tailwind CSS v4** is in use — there is no `tailwind.config.js`. Configuration is done entirely in CSS via `@theme` blocks in `globals.css`. Do not create a `tailwind.config.js`.

Brand tokens available as Tailwind utility classes:

| Token | Value |
|---|---|
| `bg-brand-navy` | `#0b2a55` |
| `bg-brand-navy-dark` | `#081d3d` |
| `bg-brand-navy-darker` | `#050f28` |
| `bg-brand-red` | `#b81f2a` |
| `bg-brand-red-dark` | `#7c1018` |
| `bg-brand-sky` | `#92b7e2` |
| `bg-brand-sky-light` | `#e9f0f9` |
| `bg-brand-gold` | `#f5c518` |

`brand-gold` is reserved for star-rating icons, not general accents. Use these tokens instead of hardcoded hex values.

Fonts: `font-sans` → Manrope (body); `font-display` → DM Serif Display (headings). `h1`–`h4` default to the display font via a global CSS rule in `globals.css`.

## Path aliases

`@/*` resolves to `src/*` (configured in `tsconfig.json`).
