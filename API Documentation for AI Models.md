# Library Management System — Backend Data Contract (Machine & Frontend Friendly)

This README is the authoritative, machine- and frontend-consumable contract for API shapes, field names, types, validation rules and endpoints. It is written for frontend engineers and AI models that generate UI, validation logic and API clients. Use the exact property names and rules listed below when generating types or request/response shapes.

Principles (must-follow)
- Use property names exactly as shown (including casing).
- Send only scalar fields and foreign-key IDs in POST/PUT payloads. Do NOT send navigation objects or collections (no nested User/Category objects) except where the contract explicitly allows an array of FK-bearing objects (e.g. `BookCopies`).
- Timestamps are ISO-8601 strings. If omitted and a default exists, the server will set the default value.
- For enum-like columns, send one of the allowed string values exactly.
- Respect required fields, string length limits and numeric types.

Type definitions (canonical, exact names and types)
- Branch
  - `branch_id` (int, identity, PK)
  - `name` (string, required)
  - `location` (string, required)
  - `contact_number` (string, nullable)

- Category
  - `category_id` (int, identity, PK)
  - `category_name` (string, required, unique)

- User
  - `user_id` (string, PK)
  - `name` (string, nullable)
  - `email` (string, required, unique)
  - `password_hash` (string, nullable)
  - `phone_number` (string, unique, nullable)
  - `role` (string, required) — allowed: `"Super Admin"`, `"Admin"`, `"User"`
  - `status` (string, required, default: `"Active"`) — allowed: `"Banned"`, `"Inactive"`, `"Active"`
  - `plan` (string, nullable) — allowed: `"Discover"`, `"Enterprise"`, `"Professional"`
  - `created_at` (timestamp, default: now())
  - `updated_at` (timestamp, default: now())
  - `last_activity_at` (timestamp, nullable)

- BookDetail (represents the book meta)
  - `book_id` (int, PK)
  - `name` (string, required)
  - `category_id` (int, FK -> `Categories.category_id`)
  - `quantity` (short/int16, required) — invariant: must be >= 0
  - `sale_price` (numeric, nullable)
  - `image_url` (text, nullable)
  - `created_at` (timestamp, default: now())
  - `updated_at` (timestamp, default: now())

- BookCopy (physical copy)
  - `book_copy_id` (string, PK)
  - `book_id` (int, FK -> `BookDetails.book_id`)
  - `branch_id` (int, FK -> `Branches.branch_id`)
  - Note: Row-Level Security (RLS) is enabled on this table in the DB. API enforces access rules as implemented in backend.

- BookReservation
  - `reservation_id` (short/int16, identity, PK)
  - `user_id` (string, FK -> `Users.user_id`)
  - `book_id` (string, FK -> `BookCopies.book_copy_id`)
  - `reservation_date` (timestamp, default: now())
  - `expiration_date` (timestamp, nullable)
  - `status` (string, default: `"Active"`) — allowed: `"Fulfilled"`, `"Cancelled"`, `"Active"`
  - `reserved_quantity` (int, nullable)
  - `is_confirmed` (boolean, nullable)

- BookTransaction
  - `transaction_id` (short/int16, identity, PK)
  - `user_id` (string, FK -> `Users.user_id`)
  - `book_id` (string, FK -> `BookCopies.book_copy_id`)
  - `transaction_type` (string, required) — allowed: `"Check-In"`, `"Check-Out"`
  - `borrow_type` (string, default: `"Borrow"`) — allowed: `"Purchase"`, `"Borrow"`
  - `status` (string, default: `"Pending"`) — allowed: `"Overdue"`, `"Pending"`, `"Completed"`
  - `due_date` (timestamp, nullable)
  - `return_date` (timestamp, nullable)
  - `fine_amount` (numeric, default: 0.00)
  - `created_at` (timestamp, default: now())

Contract rules and validation (server-enforced)
- Always send scalar fields and FK IDs only. Example: use `category_id` not a nested `Category` object.
- BookDetail / BookCopies invariants:
  - If a BookDetail POST/PUT includes a `BookCopies` array, then `BookCopies.Count` MUST equal `quantity`. Each element in `BookCopies` must include `book_copy_id` (string) and `branch_id` (int).
  - If the BookDetail update changes `quantity` but `BookCopies` is omitted, the server will validate that the existing number of copies for that `book_id` equals the new `quantity`; otherwise the request will be rejected with 400 and the client must send `BookCopies` to reconcile.
  - `book_copy_id` values must be unique across `BookCopies`.
- BookCopy operations (create/delete) update `BookDetail.quantity` atomically and are performed in transactions.
- Deleting a BookCopy is blocked if the copy is referenced by reservations, transactions or other domain rules.

API endpoints (canonical list)
- Branches
  - GET    `/api/Branches`                — returns `Branch[]`
  - GET    `/api/Branches/{branch_id}`    — returns single `Branch`
  - POST   `/api/Branches`                — create Branch; body: `{ name, location, contact_number? }`
  - PUT    `/api/Branches/{branch_id}`    — update Branch
  - DELETE `/api/Branches/{branch_id}`    — delete Branch

- Categories
  - GET    `/api/Categories`
  - POST   `/api/Categories`               — body: `{ category_name }`

- Users
  - GET    `/api/Users`
  - GET    `/api/Users/{user_id}`
  - POST   `/api/Users`                    — body: `{ user_id, email, name?, password_hash?, phone_number?, role?, status?, plan? }`
  - PUT    `/api/Users/{user_id}`

- Books (BookDetail)
  - GET    `/api/Books`                    — returns `BookDTO[]` (summary + optional aggregates)
  - GET    `/api/Books/{book_id}`
  - GET    `/api/Books/title/{t}`          — search by title
  - POST   `/api/Books`                    — create BookDetail; body: scalar book fields and optional `BookCopies` array
  - PUT    `/api/Books/{book_id}`          — update BookDetail; optional `BookCopies` array replaces existing copies (must match `quantity`)
  - DELETE `/api/Books/{book_id}`          — delete BookDetail and its copies

- BookCopies
  - GET    `/api/BookCopies`
  - GET    `/api/BookCopies/{book_copy_id}`
  - POST   `/api/BookCopies`                — create single copy; body: `{ "book_copy_id": "BC-0001", "book_id": 42, "branch_id": 1 }`
  - DELETE `/api/BookCopies/{book_copy_id}`

- BookReservations
  - GET    `/api/BookReservations`
  - GET    `/api/BookReservations/{reservation_id}`
  - POST   `/api/BookReservations`          — body: `{ "user_id": "u-1", "book_id": "BC-0001", "expiration_date"?: "ISO-8601", "reserved_quantity"?: 1, "is_confirmed"?: true }`
  - PUT    `/api/BookReservations/{reservation_id}`
  - DELETE `/api/BookReservations/{reservation_id}`

- BookTransactions
  - GET    `/api/BookTransactions`
  - GET    `/api/BookTransactions/{transaction_id}`
  - POST   `/api/BookTransactions`          — body: `{ "user_id": "u-1", "book_id": "BC-0001", "transaction_type": "Check-Out", "borrow_type"?: "Borrow", "due_date"?: "ISO-8601" }`
  - PUT    `/api/BookTransactions/{transaction_id}`

Examples (exact shapes)
- Create BookDetail with copies (server will set timestamps):

{
  "name": "Clean Code",
  "category_id": 4,
  "quantity": 3,
  "sale_price": 39.99,
  "image_url": "https://.../clean-code.jpg",
  "BookCopies": [
    { "book_copy_id": "BC-0001", "branch_id": 1 },
    { "book_copy_id": "BC-0002", "branch_id": 1 },
    { "book_copy_id": "BC-0003", "branch_id": 1 }
  ]
}

- Create single BookCopy (increments parent quantity):
POST /api/BookCopies
{ "book_copy_id": "BC-0004", "book_id": 42, "branch_id": 1 }

- Create reservation:
POST /api/BookReservations
{ "user_id": "user-123", "book_id": "BC-0001", "expiration_date": "2025-12-31T23:59:59Z" }

- Create transaction (checkout):
POST /api/BookTransactions
{ "user_id": "user-123", "book_id": "BC-0001", "transaction_type": "Check-Out", "due_date": "2025-12-15T00:00:00Z" }

Behavior and implementation notes (for UI/AI generation)
- Atomic operations: multi-step changes (BookDetail + BookCopies) use explicit transactions. UI should treat create/update as all-or-nothing and implement retry/error handling on 4xx/5xx.
- Error handling: API returns 400 for validation failures (include readable error message), 409 for unique constraint violations, 404 for missing resources and 500 for server errors.
- Pagination and filtering: long-list endpoints may implement pagination. Check OpenAPI or query params in real-time endpoints.
- Row-Level Security: `BookCopies` has RLS in the database; API enforces access based on authenticated user and server rules.

Generating client code
- Use these exact property names and types when auto-generating TypeScript/Swift/Kotlin models.
- Map `timestamp` to `string` in JSON models (ISO-8601). Map `numeric` to `number`/`decimal` in clients that support decimals.

If you need machine-friendly artifacts I can generate:
- OpenAPI (Swagger) operation descriptions for all endpoints.
- TypeScript interfaces for all resources matching this contract.
- JSON Schema or Protobuf definitions for use by AI models.