# NorthStack — Canadian SMB Resource Portal

Answer-first guides and free tools for Canadian small businesses, built with Next.js (App Router), React, TypeScript, Tailwind CSS v4 and Motion. Content is designed for long-tail SEO and Google AI Overview capture — every guide leads with a direct answer.

## Run it

1. Install Node.js 20 or newer from https://nodejs.org (pick "LTS"), if you don't have it yet.
2. Open a terminal and go to this folder.
3. Install the packages (only needed the first time, or after pulling changes):
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000 in your browser. Press `Ctrl + C` to stop it.

## Where things live

- `app/` – Next.js App Router entry (`layout.tsx`, `page.tsx`, `globals.css`)
- `app/guides/` – resource hub: index, pillar hubs, articles
- `app/provinces/` – provincial hubs (bc/ab/on/qc) + provincial articles
- `app/tools/` – cost estimator + compliance checklist; `app/api/lead` captures emails
- `src/lib/` – data layer (`articles.ts` reads Sanity when configured, else `seed.ts`), `pillars.ts`, `provinces.ts`, `seo.ts`, `tools.ts`, `types.ts`
- `src/components/portal/` – reusable blocks: breadcrumbs, JSON-LD, FAQ accordion, Portable Text renderer (callout/table/CTA), cards, lead form
- `sanity/` – standalone Sanity Studio workspace for the editorial team (see `sanity/README.md`)
- `src/data.ts` – nav groups, footer columns, homepage FAQ
- `src/sections/` – site chrome (Nav, Footer)
- `src/components/` – brand UI (`ui.tsx`), `WaveField` hero canvas, `portal/` component library
- `public/assets/` – images

## Sanity (optional)

The site runs on typed seed content out of the box. To use live CMS data, set:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://your-domain.ca
```

Then run the Studio in `sanity/` — schemas match `src/lib/types.ts` exactly.

## Build for publishing

```bash
npm run build
npm start
```
