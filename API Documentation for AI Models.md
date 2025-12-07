# Library Management System — Backend Data Contract (Machine & Frontend Friendly)

This document is the authoritative, machine-readable contract for frontend engineers and AI agents that generate UI, validation, and API clients. Use the exact property names, types and rules listed here when generating types or request/response shapes. Do not include navigation properties in write payloads — send only scalar fields and foreign-key IDs.

Quick rules for AI models and frontend devs

- Use property names exactly as shown (including casing).
- Send only scalar fields and FK IDs in POST/PUT payloads; never send navigation collections or complex objects.
- Respect required fields, string lengths and numeric types.
- For enum-like columns, send one of the allowed string values.
- Timestamps are ISO-8601 strings. If omitted where default exists, the server will set defaults.

---

Summary of recent backend changes (important for frontend/AI clients)

- The model originally named `Book` was renamed to `BookDetail` to reflect the `BookDetails` table. Public controller routes remain under `/api/Books` for compatibility.
- New entity `BookCopy` was added to represent physical copies. Each copy has a unique `book_copy_id` (string) and an FK `book_id` (int) referencing `BookDetail.book_id`.
- The system now enforces that `BookDetail.quantity` equals the number of `BookCopy` rows linked to that `book_id`. Controllers validate and persist copies accordingly.
- `BooksController` was updated to accept `BookCopies` in POST/PUT payloads (optional). If provided, the controller requires `BookCopies.Count == quantity`.
- All create/update operations that affect a `BookDetail` and its `BookCopies` are performed inside explicit EF Core transactions to guarantee atomicity.
- A new `BookCopiesController` was added to manage individual copies. Creating or deleting a `BookCopy` adjusts the parent `BookDetail.quantity` inside a transaction.

Why this matters to frontend

- Your book form should collect `quantity` and then prompt the user to enter exactly `quantity` copy IDs in the popup. The frontend should send the `BookCopies` array when creating or updating a `BookDetail` if it intends to set or change the copy IDs.
- If the frontend updates `quantity` but does not send `BookCopies`, the server requires that the existing number of copies already matches the updated `quantity`. Otherwise the request will be rejected with 400 and the client should send the exact list of `book_copy_id`s.
- When removing a single physical copy (e.g., borrowed and removed from inventory), use `DELETE /api/BookCopies/{book_copy_id}`. The controller will verify the copy is not referenced by reservations/transactions/sales and will decrement `BookDetail.quantity` atomically.

---

API changes and endpoints (high level)

Books (BookDetail resource)

- GET `/api/Books` — returns list of `BookDTO` (summary plus aggregated user names).
- GET `/api/Books/{id}` — return single BookDetail DTO by `book_id` (integer).
- GET `/api/Books/title/{t}` — search by title.
- POST `/api/Books` — create BookDetail; optionally include `BookCopies` array. If `BookCopies` present, its length must equal `quantity`.
- PUT `/api/Books/{id}` — update BookDetail; optionally include `BookCopies` to replace current copies. Must match `quantity` if provided.
- DELETE `/api/Books/{id}` — delete BookDetail and its copies.

BookCopies

- GET `/api/BookCopies` — list copies.
- GET `/api/BookCopies/{id}` — get single copy by `book_copy_id`.
- POST `/api/BookCopies` — create single copy. Body: `{ "book_copy_id": "BC-0001", "book_id": 42 }`. This increments `BookDetail.quantity`.
- DELETE `/api/BookCopies/{id}` — delete single copy. Controller prevents deletion if the copy is referenced by reservations/transactions/sales; on success decrements `BookDetail.quantity`.

Validation rules enforced by controllers

- When `BookCopies` array is provided with a BookDetail create/update, controllers validate `BookCopies.Count == quantity`.
- When updating quantity without a `BookCopies` array, controllers validate the existing copy count equals the new `quantity`.
- `BookCopies` must have unique `book_copy_id` values.
- Deleting a `BookCopy` is blocked if there are related reservations, transactions or sales referencing that `book_copy_id`.

Atomic behavior and transactions

- Add and Edit flows that affect both `BookDetail` and `BookCopies` use explicit EF Core transactions so the operations commit together. If any step fails the transaction is rolled back.
- Independent copy operations in `BookCopiesController` (create/delete) also use transactions and update the parent `BookDetail.quantity` atomically.

Frontend guidance and examples

- Frontend form flow for creating/updating books:
  1. User sets `quantity` in the book form.
  2. User clicks "Enter copy IDs" → popup opens and expects exactly `quantity` entries.
  3. Frontend sends BookDetail POST/PUT with `BookCopies` array when creating/updating copies.

- Example POST payload with copies:

```json
{
  "name": "Clean Code",
  "category_id": 4,
  "quantity": 3,
  "sale_price": 39.99,
  "BookCopies": [
    { "book_copy_id": "BC-0001" },
    { "book_copy_id": "BC-0002" },
    { "book_copy_id": "BC-0003" }
  ]
}
```

- Example creating a single copy (increments quantity):

```json
POST /api/BookCopies
{ "book_copy_id": "BC-0004", "book_id": 42 }
```

- Example deleting a single copy (decrements quantity):

```http
DELETE /api/BookCopies/BC-0002
```

Database recommendations

- The application enforces the copies-count rule in code. Enforcing it in the DB requires more complex constructs (triggers or stored procedures). Consider one of these if you want a DB-level invariant:
  - Add a trigger that runs after insert/update/delete on `BookCopies` and verifies `BookDetails.quantity` equals the count of copies; optionally rollback on mismatch.
  - Use stored procedures for creating/updating `BookDetails` and copies and restrict direct table modifications.
- Ensure `BookCopies.book_id` FK is NOT NULL and indexed for fast counts/joins.
- Keep `book_copy_id` as primary key (unique) and consider adding a separate numeric surrogate id if you need sequential numeric ordering.

Compatibility notes

- The public `Books` controller routes remain `/api/Books` to reduce client changes even though the CLR model type is `BookDetail`.
- DTOs and controller behaviors changed to support `BookCopies`. Update frontend generators to include the `BookCopies` array on create/update when appropriate.
