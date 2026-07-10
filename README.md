# Atria360 Website + CMS

Full marketing website for **Atria360** ("Smarter Systems From Every Angle") with a built-in admin CMS. Every page, section, and component is editable from the admin panel.

## Stack

- **Next.js 15** (App Router, React 19, TypeScript, Tailwind CSS)
- **Supabase** — Postgres (content, leads), Auth (admin login), Storage (media library)
- **Vercel** — hosting

## How content works

Pages live in the `pages` table; each page is an ordered list of `sections` rows (`type` + JSONB `content`). The catch-all route `src/app/(site)/[[...slug]]/page.tsx` renders sections through the registry in `src/components/sections/index.tsx`. Section field definitions in `src/lib/sectionSchemas.ts` drive the admin's form-based editor, so every field is editable without touching code.

- **Public site**: `/`, `/services/*`, `/products`, `/industries/*`, `/enterprise`, `/blog(+posts)`, `/about`, `/contact`, `/pricing`, `/faq`, `/integrations`, `/press`, `/privacy`, `/terms`
- **Admin CMS**: `/admin` — dashboard, page & section editor (add/reorder/hide/delete sections, form or raw-JSON editing), blog manager, navigation editor, site settings, leads inbox, media library

Heading fields support inline color markers: `[[c:text]]` cyan, `[[o:text]]` orange, `[[y:text]]` yellow, `[[t:text]]` teal, and `|` for a line break.

## Development

```bash
npm install
npm run dev
```

Environment (see `.env.local`):

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

The anon key is a public client key; all access control is enforced by Postgres RLS (public read of published content, writes only for CMS users, leads insert-only for visitors).

## Admin access

Sign in at `/admin/login`. The first user to sign up becomes admin automatically; additional users default to editor. Passwords can be changed in **Admin → Settings**.
