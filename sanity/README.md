# Sanity Studio — NorthStack Resources

Standalone Sanity Studio for the `/guides`, `/provinces` and `/tools` content.

## Setup

```bash
cd sanity
npm install
SANITY_STUDIO_PROJECT_ID=<your-project-id> npm run dev
```

Or create the project first with `npm create sanity@latest` and paste the project ID
into `sanity.config.ts` and `sanity.cli.ts`.

## Wire the site to Sanity

Set these on the Next.js app (`.env.local`):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<project-id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://your-domain.ca
```

Without `NEXT_PUBLIC_SANITY_PROJECT_ID` the site renders the seed content in
`src/lib/seed.ts`, so local dev never blocks on CMS credentials.

## Content model

- `pillar` — the four guide pillars (`tax`, `software`, `operations`, `growth`)
- `province` — geo hubs (`bc`, `ab`, `on`, `qc`; add Atlantic codes later)
- `article` — `title`, `slug`, `pillar` (ref), `province` (optional ref), `excerpt`,
  `body` (Portable Text + `callout`/`comparisonTable`/`cta` blocks), `faqs[]`,
  `related[]`, `seoMetadata`
- `tool` — configuration for interactive tools and lead-capture hooks

Setting `province` on an article moves its canonical URL to
`/provinces/{code}/{slug}` automatically — see `canonicalPath` in `src/lib/types.ts`.
