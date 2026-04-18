# Workspace Agent Rules — Book Hive (Frontend + Backend)

Purpose
-------
This file is the single-source reference for an automated coding assistant (agent) working on this repository. It contains the minimal, high-value facts and conventions about the frontend and backend that the agent must read and follow before making changes or answering new requests.

Always read this file at session start. When given a task, prefer to consult relevant files listed here first.

Quick paths & context
---------------------
- Frontend workspace root: `d:/Finished - Unfinished web projects/Library-Management-System-React`
  - Main entry: `src/main.jsx`
  - Home page: `src/Home/Home.jsx`
  - User Dashboard: `src/User pages/Dashboard.jsx` (Personalized stats, recommendations)
  - Key hooks: `src/hooks/useBooks.js`, `src/hooks/useFeedbacks.js`, `src/hooks/useUserRequests.js`
  - API helper: `src/services/api.config.js` (Axios instance with JWT interceptor)
  - Auth service: `src/services/auth.api.js` (Login, Signup via `UserRequests`)
  - Chatbot: `src/User pages/UserChatbot.jsx` (Gemini-powered assistant)

- Backend project root (local development machine):
  `C:\Users\Administrator\source\repos\LibraryManagementSystem`
  - Solution: `LibraryManagementSystem.sln`
  - Controllers:
    - `BooksController.cs`: Main CRUD + Dashboard + Semantic Search.
    - `UserRequestsController.cs`: Handles registration requests + **Email Verification (OTP)**.
    - `UsersController.cs`: Authentication (JWT), Profile management.
    - `StatsController.cs`: Summary statistics.
    - `NfcScansController.cs`: Physical tag scanning support.
  - Services: `IEmailService` (Gmail), `IBookEmbeddingService` (OpenAI), `IAiResponseService` (Gemini).
  - Program startup: `Program.cs` (JWT config, DI registrations, Cache setup).

- Recommendation System (External):
  - Path: `hf_space_deployment/Book-hive/app.py`
  - Purpose: Flask-based cosine similarity engine deployed to Hugging Face Spaces.
  - Endpoints: `GET /api/recommendations/<user_id>`

Important API endpoints
-----------------------
- `GET /api/Books/dashboard` — Returns enriched book list for user dashboard (cached: `books:dashboard`).
- `GET /api/Books/recommend?title=...` — Category-based recommendations.
- `GET /api/Books/semantic-search?question=...` — Query-based book search.
- `POST /api/UserRequests/send-otp` — Triggers 6-digit verification code to email (stored in memory cache).
- `POST /api/UserRequests` — Finalizes signup after OTP verification.
- `POST /api/chat` — Unified Gemini chat endpoint with grounded search capabilities.

React Query & Frontend State
----------------------------
- Query keys must be Arrays (v4). Use helpers in `src/hooks/*.js`.
- `useDashboardBooks()` — Primary hook for the personal user dashboard.
- `api.config.js` handles JWT injection from `localStorage.getItem("authToken")`.
- Authentication flow: Signup -> `send-otp` -> `verify-otp` -> Admin approval -> `login`.

Backend caching & invalidation
------------------------------
- Cache keys (IMemoryCache):
  - `books:all:homepage` (Base books list)
  - `books:dashboard` (Dashboard view)
  - `books:covers` (Covers only)
  - `books:management` (Admin management view)
  - `stats:summary` (Home page counts)
  - `otp_<email>` (Temporary registration codes, 15 min expiration)
- Invalidation: All book-related keys must be cleared in `BooksController` write paths (Add/Edit/Delete).

Agent editing rules
-------------------
1. Always use the repository's `queryKey` helpers rather than raw strings.
2. Use `apply_patch` for minimal edits. Maintain existing styles.
3. Authentication: Ensure all requests requiring auth use the `apiGet`/`apiPost` helpers which include the JWT bearer token.
4. Caching: When adding new endpoints or entities, consider if they should be cached and documented here.
5. AI Models: Consult `Program.cs` for allowed Gemini models before changing chat logic.

Developer commands (local dev)
-----------------------------
- Frontend: `npm run dev` (Vite)
- Backend: `dotnet run --project LibraryManagementSystem.csproj`
- Env: Backend uses `.env` for secrets like `DB_PASSWORD`, `Gemini__ApiKey`, `Gmail__AppPassword`.

What to check on a new task
---------------------------
- Check `API Documentation for AI Models.md` for authoritative DTO shapes.
- Verify if the feature impacts the AI Chatbot's grounding logic in `Program.cs`.
- Ensure new registration/auth steps respect the 2-step OTP flow.

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
