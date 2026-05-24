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
  - [ ] Remove `autoPlay`, add `preload="none"`

## Step 3: Defer always-mounted heavy widgets
- [ ] Edit `src/App.tsx`
  - [ ] Lazy-load `FloatingWidgets` (and optionally Footer) so first paint is faster

## Step 4: Optimize Navbar search suggestions
- [ ] Edit `src/components/Navbar.tsx`
  - [ ] Precompute suggestions pool only when content changes; filter only by input

## Step 5: Build & verify
- [ ] `pnpm install`
- [ ] `pnpm typecheck`
- [ ] `pnpm build`
- [ ] Re-test on Vercel (LCP/CLS/INP)

