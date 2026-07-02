<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

Single Next.js 16 (App Router, Turbopack) service. Commands are in `CLAUDE.md` (`npm run dev`, `npm run build`, `npm run lint`); dev server runs on port 3000. No automated test suite exists.

Non-obvious notes:
- `npm run lint` currently reports 2 pre-existing `@next/next/no-html-link-for-pages` errors (in `Header.tsx` and `service-areas/page.tsx`) unrelated to environment setup.
- The `/api/book` endpoint uses nodemailer (`src/lib/mailer.ts`) which needs `GMAIL_USER` and `GMAIL_APP_PASSWORD` (optionally `BOOKING_TO`). When these are absent, the endpoint does not fail — it logs the lead to the server console and returns `{"ok":true}`, so the booking flow is fully testable without email credentials.
