# Workspace Agent Rules — Book Hive (Frontend + Backend)

Purpose
-------
This file is the single-source reference for an automated coding assistant (agent) working on this repository. It contains the minimal, high-value facts and conventions about the frontend and backend that the agent must read and follow before making changes or answering new requests.

Always read this file at session start. When given a task, prefer to consult relevant files listed here first.

Quick paths & context
---------------------
- Frontend workspace root: d:/Finished - Unfinished web projects/Library-Management-System-React
  - Main entry: `src/main.jsx` (sets up `QueryClientProvider`)
  - Home page: `src/Home/Home.jsx`
  - Key hooks: `src/hooks/useBooks.js`, `src/hooks/useFeedbacks.js`, `src/hooks/queryConfig.js`
  - API helper: `src/services/api.config.js`
  - Books service: `src/services/books.api.js`
  - Testimonials UI: `src/Home/Components/Testimonials.jsx`

- Backend project root (local development machine):
  `C:\Users\Administrator\source\repos\LibraryManagementSystem`
  - Solution / project: `LibraryManagementSystem.sln` / `LibraryManagementSystem.csproj`
  - Controllers: `Controllers/BooksController.cs`, `Controllers/StatsController.cs`, `Controllers/FeedbacksController.cs` (and others)
  - Program startup: `Program.cs` (DI, `AddMemoryCache()` was added)
  - API docs (authoritative contract): `API Documentation for AI Models.md` (project root frontend)

Important API endpoints (used by frontend)
-----------------------------------------
- `GET /api/Books` — returns `BookDTO[]` (used by `useBooks`) — cached on backend under key `books:all:homepage`.
- `GET /api/Stats` — lightweight counts { branches, books, categories } — cached server-side under `stats:summary`.
- `GET /api/Feedbacks/approved` — approved feedbacks for public display.
- `POST /api/Feedbacks` — create feedback (status = Pending)
- See `API Documentation for AI Models.md` for full contract and DTO shapes.

React Query usage & conventions
------------------------------
- Query keys must be Arrays (v4). Example: `['books','list']` or `bookKeys.lists()` which returns an array.
- Use the project's key helpers where provided: `bookKeys`, `feedbackKeys`, `userKeys` (in `src/hooks/*`). They produce arrays.
- Default query options live in `src/hooks/queryConfig.js` — `adminQueryOptions` sets `staleTime`, `refetchOnMount`, etc.
- Common hooks:
  - `useBooks()` — queryKey `bookKeys.lists()` and queryFn `getAllBooks`.
  - `useApprovedFeedbacks()` — queryKey `feedbackKeys.approved()`.
  - Mutations should `invalidateQueries({ queryKey: ... })` with array keys.

Frontend state & UX notes
-------------------------
- Homepage shows three carousels derived from a single book list. Use `useBooks()` as the single source.
- Counters (branches/books/categories) should be fast: fetch `/api/Stats` first, then prefetch the full books list into React Query for carousels.
- Local cache key names used by backend expectations:
  - `books:all:homepage` (backend IMemoryCache key for GET /api/Books)
  - `stats:summary` (backend IMemoryCache key for GET /api/Stats)

Backend caching & invalidation
------------------------------
- Backend uses `IMemoryCache` currently (see `Program.cs` and `BooksController`).
- Controllers should remove the relevant cache keys on write operations:
  - On Add/Edit/Delete of books: remove `stats:summary` and `books:all:homepage`.
  - On other count-changing operations (branches/categories) also remove `stats:summary`.
- If scaling to multiple instances, replace IMemoryCache with a distributed cache (Redis/Upstash) and maintain invalidation patterns.

Developer commands (local dev)
-----------------------------
- Frontend (from frontend repo root):
  - `npm install`
  - `npm run dev` (start Vite dev server)
  - Env: `VITE_API_BASE_URL` (set to backend base e.g. `http://localhost:5000/api`)
- Backend (from backend repo root):
  - `dotnet restore`
  - `dotnet run --project LibraryManagementSystem.csproj`
  - Program.cs maps controllers under `/api/*`

Agent editing rules (must-follow)
--------------------------------
1. Always use the repository's `queryKey` helpers (e.g., `bookKeys.lists()`) rather than raw strings. Ensure `queryKey` is an Array when calling React Query methods.
2. Use `apply_patch` to modify files. Keep edits minimal and focused. Follow the existing code style (no reformatting unrelated code).
3. For multi-step tasks use the todo list tool (`manage_todo_list`) and keep the user updated.
4. When changing caching logic, update both frontend (React Query) and backend (IMemoryCache keys or distributed cache) and add cache invalidation in write paths.
5. If adding new endpoints, update `API Documentation for AI Models.md` or ask the backend owner — do NOT guess API shapes.
6. Before changing queries or cache keys, run a repo search for all usages of the key and update them together.

What to check on a new task
---------------------------
- Which side(s) the change touches: frontend, backend, or both.
- If network performance / slow load is reported: inspect `src/hooks/queryConfig.js`, `useBooks`, `api.config.js`, and backend controllers for heavy joins (e.g., `ToDTO` in `BooksController`).
- If an error mentions React Query v4 ("queryKey needs to be an Array") search for `fetchQuery(`, `useQuery(`, `invalidateQueries(` and convert string keys or positional calls to the v4 object/array style.
- Confirm dev servers and environment variables before debugging: frontend uses `VITE_API_BASE_URL`; backend runs with Kestrel on `localhost` port configured in launch settings.

Important files to read first (high priority)
--------------------------------------------
- Frontend: `src/main.jsx`, `src/Home/Home.jsx`, `src/hooks/useBooks.js`, `src/hooks/useFeedbacks.js`, `src/hooks/queryConfig.js`, `src/services/api.config.js`
- Backend: `Program.cs`, `Controllers/BooksController.cs`, `Controllers/StatsController.cs`, `Controllers/FeedbacksController.cs`, `Models/`, `public_schema.sql`
- API contract: `API Documentation for AI Models.md` (frontend repo root)

When you start a new chat or get a new task, these are the first steps:
1. Read this file.
2. Grep for affected files (hooks, components, controllers). Use the code search in the workspace.
3. If making edits, create a short todo plan via `manage_todo_list` and then apply focused patches with `apply_patch`.
4. Run or instruct the user to run quick checks: `curl` to the backend endpoints (`/api/Stats`, `/api/Books`, `/api/Feedbacks/approved`) and report responses.

Reference: API documentation
---------------------------
The authoritative backend and database contract is in `API Documentation for AI Models.md` at the frontend repo root. Always consult it before changing request/response shapes.

Contact points
--------------
- Frontend query hooks: `src/hooks/*.js`
- Backend controllers: `Controllers/*.cs`
- API spec: `API Documentation for AI Models.md`

Appendix: quick checklist for common issues
-----------------------------------------
- Slow homepage: check React Query `staleTime`, prefetching, image sizes (serving base64), and backend DTO heavy joins (avoid loading many related entities).
- Duplicate testimonials: prefer dedupe in `Testimonials.jsx` (latest per user) and ensure `useApprovedFeedbacks` returns deduped list if necessary.
- React Query v4 errors: ensure `queryKey` usage is always an Array or use the object style for client methods (e.g., `fetchQuery({ queryKey, queryFn })`).

End of rules file.

General Superpower Skills
-------------------------
These core engineering skills are globally available and should be used for complex tasks:
- Path: `C:\Users\Administrator\.gemini\extensions\superpowers\skills`
- Included Skills:
  - `subagent-driven-development`: Decompose large tasks for autonomous sub-agents.
  - `systematic-debugging`: Structured isolation and fixing of complex bugs.
  - `test-driven-development`: Writing tests before code for maximum reliability.
  - `writing-plans` & `executing-plans`: Step-by-step implementation for complex features.
  - `verification-before-completion`: Rigorous final check-lists to prevent regressions.
  - `brainstorming`: Divergent thinking to explore multiple technical solutions.
- **Rule**: When starting a major feature or hard-to-reproduce bug, refer to the relevant `SKILL.md` in the paths above immediately after reading this main rules file.

