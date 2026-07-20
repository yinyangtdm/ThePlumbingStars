# The Plumbing Stars

Next.js marketing site for The Plumbing Stars — licensed plumbers serving Los Angeles County and Ventura County.

## Setup

```bash
npm install
cp .env.example .env.local   # fill RESEND_API_KEY, EMAIL_FROM, BOOKING_TO, REVIEW_TO
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Architecture notes

App Router code lives under `src/` (`app/`, `components/`, `lib/`). City hubs and city×service pages are generated from `src/lib/cityHubs.ts`. See `CLAUDE.md` / `AGENTS.md` for route map and Next.js 16 conventions.
