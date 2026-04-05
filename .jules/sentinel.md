## 2026-04-05 - [Critical] Removed Client-Side Password Comparison
**Vulnerability:** Client-side password comparison logic in `SettingsPopup.jsx` exposed sensitive credential material because it required the backend's user payload to include user passwords or hashes.
**Learning:** During the migration to a secure, server-side BCrypt login flow, some legacy client-side comparison checks were left behind. This highlights a gap where migration efforts need comprehensive audits for legacy checks that circumvent server security boundaries.
**Prevention:** Always rely on secure server endpoints (e.g., `loginUser`) for validating credentials or making state-modifying actions requiring current authorization contexts.
