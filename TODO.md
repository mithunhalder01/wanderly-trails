# TODO

## Information gathered
- `src/pages/Home.tsx` contains the hero section and a separate “TRUST BAR” section below it.
- There is no existing “hero trust badge” component that matches the requested layout (heading + avatar group + rating).

## Plan execution status
- [x] Create `src/components/HeroTrustBadge.tsx`
- [x] Insert `HeroTrustBadge` at the top of the hero section in `src/pages/Home.tsx`
- [ ] Ensure styling matches modern minimal premium style and is responsive (already implemented per spec; will verify visually via dev server/lint).
- [x] Verify build/lint (attempted via `pnpm build` / `pnpm exec vite build`; failed due to Corepack/pnpm download TLS error: `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`).

## Dependent files
- `src/pages/Home.tsx`
- `src/components/HeroTrustBadge.tsx`



