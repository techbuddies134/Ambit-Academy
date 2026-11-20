# Ambit Academy

A responsive academy website built with Next.js App Router, TypeScript, PostgreSQL, and Drizzle. Artwork and variable fonts are served locally.

## Set up

1. Install dependencies with `npm install`.
2. Set `DATABASE_URL` for a local PostgreSQL database. Use the same connection for Drizzle Kit.
3. Apply the schema with `npx drizzle-kit push`.
4. Load the three programmes and their nine weekly sessions with `npx tsx src/db/seed-academy.ts`.
5. Run `npm run dev` for local development, or use the platform's production preview.

## Included

- Custom illustrated homepage with parallax and reduced-motion support.
- Lazy-loaded, interactive Three.js classroom, viewpoint presets, zoom, rotation, and an illustrated fallback when WebGL is unavailable.
- Searchable grade-based programmes, subject lists, learning outcomes, weekly timetables.
- Working geometry, astronomy, and language mini-lessons.
- Admissions, trial-class, and campus-visit enquiry forms; server-side validation and PostgreSQL persistence.
- Private enquiry lookup using both the random reference and original email address.
- Contact, about, privacy, 404 and loading pages. Responsive, keyboard-accessible navigation and native modal dialogs.

## Before publishing for a real academy

Replace the example contact details, community figures, grade ranges and session times with verified details. Contact information lives in `src/lib/academy.ts`; re-run the seed after changing programme data. Set `SITE_URL` to the public origin for the sitemap. The form saves enquiries for admissions staff; it does not claim to charge fees, book a confirmed seat, or send automated emails.

The previous VESTRA storefront source is preserved in `archive/vestra-storefront.tgz`. Its existing tables and records have not been deleted. Academy records use the separate `academy_programs` and `academy_enquiries` tables.
