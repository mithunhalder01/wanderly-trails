# TODO — Wanderly Trails performance fixes

## Step 1: Reduce expensive content initialization
- [ ] Edit `src/context/content.tsx`
  - [ ] Stop deep-cloning defaults on initial render
  - [ ] Change `/api/content` fetch from `cache: "no-store"` to cached behavior

## Step 2: Reduce always-mounted heavy UI
- [ ] Edit `src/App.tsx`
  - [ ] Lazy-load or defer `FloatingWidgets` (and/or Footer)

## Step 3: Optimize Navbar search suggestion filtering
- [ ] Edit `src/components/Navbar.tsx`
  - [ ] Precompute suggestion pool once per data change; filter only by `searchText`

## Step 4: Stop autoplaying background videos for non-critical sections
- [ ] Edit `src/components/home/HomeVibe.tsx` and/or `src/components/VibeSection.tsx`
  - [ ] Remove `autoPlay` (use play on interaction/in-view) and set `preload="none"`

## Step 5: Optimize image/video attributes for faster LCP
- [ ] Edit key hero components (HomeHero / PageHero / cards)
  - [ ] Add `loading` strategy, `decoding="async"`, explicit width/height

## Step 6: Build & sanity test
- [ ] `pnpm typecheck`
- [ ] `pnpm build`
- [ ] Verify on Vercel (LCP/CLS/INP improvements)

