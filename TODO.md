# TODO - Admin Sync + LocalStorage removal

- [ ] Inspect all places where `window.localStorage` / `STORAGE_KEY` / localStorage CMS is used.
- [ ] Modify `src/context/content.tsx` to remove localStorage persistence entirely (read/write).
- [ ] Add backend sync status logic:
  - [ ] If backend update API succeeds -> show message “Supabase/DB (backend) updated successfully”.
  - [ ] If backend update fails -> show message “Saved locally (offline)”.
- [ ] Update admin dashboard UI badge/text to reflect real behavior.
- [ ] Ensure admin update API returns clear success/failure (already returns ok/error; may refine message).
- [ ] Run typecheck/build/tests for both Vite/Next apps (as applicable).

