# TODO - Content sync + caching fix

- [ ] Identify all Next App Router pages in `next-app/src/app/**` that render content from `/api/content`.
- [ ] Force dynamic rendering for those pages (e.g. `export const dynamic = "force-dynamic"` or `revalidate = 0`) to avoid stale payloads.
- [ ] Add strict no-store cache headers in `next-app/src/app/api/content/route.ts` and verify admin update route.
- [ ] Add temporary logging in API routes to confirm the resolved `contentPath` on local vs Vercel.
- [ ] If Vercel not updating from repo file, switch to a persistent storage approach (or ensure Vercel reads updated `data/content.json`).
- [ ] Retest: local dev refresh + Vercel redeploy, confirm content changes propagate.
