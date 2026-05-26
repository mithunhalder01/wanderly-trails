# TODO — Wanderly Trails performance fixes

## Step 0: Verify build tooling
- [x] Remove garbage build artifacts (`node_modules`, `dist`).
- [ ] Fix missing `tsc` for `pnpm typecheck`
  - [ ] Add `typescript` to devDependencies (or ensure it exists)

## Step 1: Reduce expensive content initialization
- [x] Edit `src/context/content.tsx`
  - [x] Remove deep-clone on default snapshot init
  - [x] Change `/api/content` fetch from `cache: "no-store"` to `cache: "force-cache"`

## Step 2: Stop autoplay videos (major perf win)
- [ ] Edit `src/components/home/HomeVibe.tsx`
  - [ ] Remove `autoPlay`, add `preload="none"` and render poster cover
- [ ] Edit `src/components/VibeSection.tsx`
  - [ep 3: Defer always-mounted heavy widgets
- [ ] Edit `src/App.tsx`
  - [x] Lazy-load `FloatingWidgets` (and optionally Footer) so first paint is faster

## Step 4: Optimize Navbar search suggestions
- [ ] Edit `src/components/Navbar.tsx`
  - [x] Precompute suggestions pool on
## Step 5: Build & verify
- [ ] `pnpm typecheck`
- [ ] `pnpm build`
- [ ] Re-test on Vercel (LCP/CLS/INP)
