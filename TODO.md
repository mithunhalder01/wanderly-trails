- [ ] Step 1: Implement real sync in `next-app` by making pages consume `GET /api/content` (via `fetchSiteContent()`), not `staticData.ts`.
- [ ] Step 2: Update `next-app/src/app/packages/page.tsx` to use fetched `packages` from `content.json`.
- [ ] Step 3: (If needed) Repeat for other pages/components that currently import `@/data/staticData`.
- [ ] Step 4: Re-lint and run local Next dev to verify updated content shows after admin POST.
- [ ] Step 5: Confirm `/api/admin/update-content` write + `/api/content` read works end-to-end.


