## 2024-03-24 - [Fix Storing Password Hash in LocalStorage]
**Vulnerability:** The `persistAuthSession` function in `src/services/auth.api.js` was storing the entire `user` object in plaintext `localStorage`, which included the `password` and `password_hash` properties.
**Learning:** In projects that don't have dedicated backend authentication endpoints and rely on returning user objects for client-side evaluation (or mock login), special care must be taken to sanitize objects before caching them in local storage to prevent sensitive data leaks through XSS.
**Prevention:** Always filter out sensitive attributes (like passwords and hashes) from user objects before serialization and storage.
