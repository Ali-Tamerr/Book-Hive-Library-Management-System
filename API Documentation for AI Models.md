# Library Management System — Backend Data Contract (Machine & Frontend Friendly)

This README is the authoritative, machine- and frontend-consumable contract for API shapes, field names, types, validation rules and endpoints. It is written for frontend engineers and AI models that generate UI, validation logic and API clients. Use the exact property names and rules listed below when generating types or request/response shapes.

---

## Principles (must-follow)

- Use property names exactly as shown (including casing).
- Send only scalar fields and foreign-key IDs in POST/PUT payloads. Do NOT send navigation objects or collections (no nested User/Category objects) except where the contract explicitly allows an array of FK-bearing objects (e.g. `BookCopies`).
- Timestamps are ISO-8601 strings. If omitted and a default exists, the server will set the default value.
- For enum-like columns, send one of the allowed string values exactly.
- Respect required fields, string length limits and numeric types.

---

## Type Definitions (canonical, exact names and types)

### Branch

| Field            | Type        | Constraints                                        |
| ---------------- | ----------- | -------------------------------------------------- |
| `branch_id`      | int         | PK, identity                                       |
| `name`           | string(50)  | **required**                                       |
| `location`       | string(100) | **required**                                       |
| `contact_number` | string(20)  | nullable                                           |
| `created_by`     | string(20)  | nullable, FK → `Users.user_id`, ON DELETE SET NULL |

### Category

| Field           | Type        | Constraints                                        |
| --------------- | ----------- | -------------------------------------------------- |
| `category_id`   | int         | PK, identity                                       |
| `category_name` | string(100) | **required**, unique                               |
| `created_by`    | string(20)  | nullable, FK → `Users.user_id`, ON DELETE SET NULL |

### User

| Field                   | Type        | Constraints                                                                       |
| ----------------------- | ----------- | --------------------------------------------------------------------------------- |
| `user_id`               | string(20)  | PK                                                                                |
| `name`                  | string(50)  | **required**                                                                      |
| `email`                 | string(100) | **required**, unique                                                              |
| `password_hash`         | string(255) | **required**                                                                      |
| `phone_number`          | string(20)  | **required**, unique                                                              |
| `role`                  | string(20)  | **required** — allowed: `"Super Admin"`, `"Admin"`, `"User"`                      |
| `status`                | string(20)  | **required**, default: `"Active"` — allowed: `"Banned"`, `"Inactive"`, `"Active"` |
| `plan`                  | string(50)  | nullable — allowed: `"Discover"`, `"Enterprise"`, `"Professional"`                |
| `subscription_end_date` | timestamp   | nullable — subscription expiration (timestamp without time zone)                  |
| `branch_id`             | int         | nullable, FK → `Branches.branch_id`, ON DELETE SET NULL                           |
| `created_by`            | string(20)  | nullable, FK → `Users.user_id` (self-referential), ON DELETE SET NULL             |
| `created_at`            | timestamp   | default: `now()`                                                                  |
| `updated_at`            | timestamp   | default: `now()`                                                                  |
| `last_activity_at`      | timestamp   | nullable                                                                          |

### BookDetail (represents the book meta)

| Field         | Type             | Constraints                                        |
| ------------- | ---------------- | -------------------------------------------------- |
| `book_id`     | int              | PK, identity                                       |
| `name`        | string(255)      | **required**                                       |
| `category_id` | int              | FK → `Categories.category_id`                      |
| `quantity`    | smallint (int16) | **required**, must be >= 0                         |
| `sale_price`  | numeric(10,2)    | nullable                                           |
| `image_url`   | bytea            | nullable — base64 string in JSON payloads          |
| `created_by`  | string(20)       | nullable, FK → `Users.user_id`, ON DELETE SET NULL |
| `created_at`  | timestamp        | default: `now()`                                   |
| `updated_at`  | timestamp        | default: `now()`                                   |

### BookCopy (physical copy)

| Field          | Type       | Constraints                |
| -------------- | ---------- | -------------------------- |
| `book_copy_id` | string(50) | PK                         |
| `book_id`      | int        | FK → `BookDetails.book_id` |
| `branch_id`    | int        | FK → `Branches.branch_id`  |

> **Note:** Row-Level Security (RLS) is enabled on this table in the DB. API enforces access rules as implemented in backend.

### BookReservation

| Field               | Type             | Constraints                                                             |
| ------------------- | ---------------- | ----------------------------------------------------------------------- |
| `reservation_id`    | smallint (int16) | PK, identity                                                            |
| `user_id`           | string(20)       | FK → `Users.user_id`                                                    |
| `book_id`           | string(50)       | FK → `BookCopies.book_copy_id`                                          |
| `reservation_date`  | timestamp        | default: `now()`                                                        |
| `expiration_date`   | timestamp        | **required**                                                            |
| `status`            | string(20)       | default: `"Active"` — allowed: `"Fulfilled"`, `"Cancelled"`, `"Active"` |
| `reserved_quantity` | int              | nullable                                                                |
| `is_confirmed`      | boolean          | nullable                                                                |

> **Important:** The `book_id` column in BookReservations references `BookCopies.book_copy_id` (not BookDetails).

### BookTransaction

| Field              | Type             | Constraints                                                                           |
| ------------------ | ---------------- | ------------------------------------------------------------------------------------- |
| `transaction_id`   | smallint (int16) | PK, identity                                                                          |
| `user_id`          | string(20)       | FK → `Users.user_id`                                                                  |
| `book_id`          | string(50)       | FK → `BookCopies.book_copy_id`                                                        |
| `transaction_type` | string(20)       | **required** — allowed: `"Check-In"`, `"Check-Out"`                                   |
| `borrow_type`      | string(20)       | default: `"Borrow"` — allowed: `"Purchase"`, `"Borrow"`                               |
| `status`           | string(20)       | default: `"Pending"` — allowed: `"Overdue"`, `"Pending"`, `"Completed"`, `"Returned"` |
| `due_date`         | timestamp        | nullable                                                                              |
| `return_date`      | timestamp        | nullable                                                                              |
| `fine_amount`      | numeric(10,2)    | default: `0.00`                                                                       |
| `created_at`       | timestamp        | default: `now()`                                                                      |

> **Important:** The `book_id` column in BookTransactions references `BookCopies.book_copy_id` (not BookDetails).

### UserRequest (registration requests pending admin approval)

| Field          | Type        | Constraints                                                             |
| -------------- | ----------- | ----------------------------------------------------------------------- |
| `request_id`   | int         | PK, identity (auto-generated)                                           |
| `name`         | string(50)  | **required**                                                            |
| `email`        | string(100) | **required**, unique                                                    |
| `password`     | string(200) | **required**                                                            |
| `phone_number` | string(20)  | **required**                                                            |
| `plan`         | string(50)  | nullable — allowed: `"Discover"`, `"Enterprise"`, `"Professional"`      |
| `status`       | string(20)  | default: `"Pending"` — allowed: `"Pending"`, `"Approved"`, `"Rejected"` |
| `created_at`   | timestamp   | default: `now()`                                                        |

### NfcScan (temporary NFC reads from ESP8266 → React)

| Field        | Type      | Constraints          |
| ------------ | --------- | -------------------- |
| `scan_id`    | bigint    | PK, identity         |
| `tag_id`     | string    | **required**         |
| `device_id`  | string    | default: `"esp8266"` |
| `created_at` | timestamp | default: `now()`     |

> **Note:** UserRequests are standalone registration requests. Admins review these requests and manually create Users separately. The `request_id` is auto-generated and should not be included in POST requests.

---

## Contract Rules and Validation (server-enforced)

- Always send scalar fields and FK IDs only. Example: use `category_id` not a nested `Category` object.
- **BookDetail / BookCopies invariants:**
  - If a BookDetail POST/PUT includes a `BookCopies` array, then `BookCopies.Count` MUST equal `quantity`. Each element in `BookCopies` must include `book_copy_id` (string) and `branch_id` (int).
  - If the BookDetail update changes `quantity` but `BookCopies` is omitted, the server will validate that the existing number of copies for that `book_id` equals the new `quantity`; otherwise the request will be rejected with 400 and the client must send `BookCopies` to reconcile.
  - `book_copy_id` values must be unique across `BookCopies`.
- BookCopy operations (create/delete) update `BookDetail.quantity` atomically and are performed in transactions.
- Deleting a BookCopy is blocked if the copy is referenced by reservations or transactions.
- Deleting a BookDetail is blocked if any of its copies are referenced by reservations or transactions.
- **User fields:** `password_hash` and `phone_number` are now **required** fields.
- **BookReservation:** `expiration_date` is now **required**.

---

## API Endpoints (canonical list)

### Branches

| Method | Endpoint                    | Description                                                             |
| ------ | --------------------------- | ----------------------------------------------------------------------- |
| GET    | `/api/Branches`             | Returns `Branch[]`                                                      |
| GET    | `/api/Branches/{branch_id}` | Returns single `Branch`                                                 |
| POST   | `/api/Branches`             | Create Branch; body: `{ name, location, contact_number?, created_by? }` |
| PUT    | `/api/Branches/{branch_id}` | Update Branch                                                           |
| DELETE | `/api/Branches/{branch_id}` | Delete Branch                                                           |

### Categories

| Method | Endpoint                        | Description                                             |
| ------ | ------------------------------- | ------------------------------------------------------- |
| GET    | `/api/Categories`               | Returns `Category[]`                                    |
| GET    | `/api/Categories/{category_id}` | Returns single `Category`                               |
| POST   | `/api/Categories`               | Create Category; body: `{ category_name, created_by? }` |
| PUT    | `/api/Categories/{category_id}` | Update Category                                         |
| DELETE | `/api/Categories/{category_id}` | Delete Category                                         |

### Users

| Method | Endpoint                        | Description                                                                                                    |
| ------ | ------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/Users`                    | Returns `UserDTO[]` with related books info                                                                    |
| GET    | `/api/Users/byid/{user_id}`     | Returns single `UserDTO`                                                                                       |
| GET    | `/api/Users/{name}`             | Search users by name                                                                                           |
| POST   | `/api/Users`                    | Create User; body: `{ user_id, name, email, password_hash, phone_number, role?, status?, plan?, created_by? }` |
| PUT    | `/api/Users/{user_id}`          | Update User                                                                                                    |
| PUT    | `/api/Users/{user_id}/activity` | Update user's `last_activity_at` timestamp                                                                     |
| PUT    | `/api/Users/activity`           | Update activity by body: `{ user_id, LastActivityAt? }`                                                        |
| DELETE | `/api/Users/{user_id}`          | Delete User                                                                                                    |

### Books (BookDetail)

| Method | Endpoint                   | Description                                                                          |
| ------ | -------------------------- | ------------------------------------------------------------------------------------ |
| GET    | `/api/Books`               | Returns `BookDTO[]` (summary + user names)                                           |
| GET    | `/api/Books/{book_id}`     | Returns single `BookDTO`                                                             |
| GET    | `/api/Books/title/{title}` | Search by title (partial match)                                                      |
| POST   | `/api/Books`               | Create BookDetail; body: scalar fields + optional `BookCopies[]`                     |
| PUT    | `/api/Books/{book_id}`     | Update BookDetail; optional `BookCopies[]` replaces existing (must match `quantity`) |
| DELETE | `/api/Books/{book_id}`     | Delete BookDetail and its copies (blocked if referenced)                             |

### BookCopies

| Method | Endpoint                         | Description                                               |
| ------ | -------------------------------- | --------------------------------------------------------- |
| GET    | `/api/BookCopies`                | Returns `BookCopy[]` with related BookDetail              |
| GET    | `/api/BookCopies/{book_copy_id}` | Returns single `BookCopy`                                 |
| POST   | `/api/BookCopies`                | Create copy; body: `{ book_copy_id, book_id, branch_id }` |
| PUT    | `/api/BookCopies/{book_copy_id}` | Update copy; body: `{ book_id, branch_id }`               |
| DELETE | `/api/BookCopies/{book_copy_id}` | Delete copy (blocked if referenced)                       |

### BookReservations

| Method | Endpoint                                 | Description                                                                                          |
| ------ | ---------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| GET    | `/api/BookReservations`                  | Returns `BookReservation[]` with user and copy info                                                  |
| GET    | `/api/BookReservations/{reservation_id}` | Returns single `BookReservation`                                                                     |
| POST   | `/api/BookReservations`                  | Create reservation; body: `{ user_id, book_id, expiration_date, reserved_quantity?, is_confirmed? }` |
| PUT    | `/api/BookReservations/{reservation_id}` | Update reservation                                                                                   |
| DELETE | `/api/BookReservations/{reservation_id}` | Delete reservation                                                                                   |

### BookTransactions

| Method | Endpoint                                 | Description                                                                                                                                             |
| ------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/BookTransactions`                  | Returns `BookTransaction[]` with user and copy info                                                                                                     |
| GET    | `/api/BookTransactions/{transaction_id}` | Returns single `BookTransaction`                                                                                                                        |
| POST   | `/api/BookTransactions`                  | Create transaction; body: `{ user_id, book_id, transaction_type, borrow_type?, due_date? }`                                                             |
| PUT    | `/api/BookTransactions/{transaction_id}` | Update transaction                                                                                                                                      |
| DELETE | `/api/BookTransactions/{transaction_id}` | Delete transaction                                                                                                                                      |
| POST   | `/api/BookTransactions/return`           | Mark a book as returned; body: `{ transaction_id, return_date?, action? }` (sets `return_date` to provided or current UTC; status becomes `"Returned"`) |

### UserRequests

| Method | Endpoint                         | Description                                                                               |
| ------ | -------------------------------- | ----------------------------------------------------------------------------------------- |
| GET    | `/api/UserRequests`              | Returns `UserRequest[]` ordered by `created_at` descending                                |
| GET    | `/api/UserRequests/{request_id}` | Returns single `UserRequest`                                                              |
| POST   | `/api/UserRequests`              | Create request; body: `{ name, email, password, phone_number, plan? }`                    |
| PUT    | `/api/UserRequests/{request_id}` | Update request (approve/reject); body: `{ status?, name?, email?, phone_number?, plan? }` |
| DELETE | `/api/UserRequests/{request_id}` | Delete request                                                                            |

### NfcScans (temporary NFC reads)

| Method | Endpoint                  | Description                                              |
| ------ | ------------------------- | -------------------------------------------------------- |
| GET    | `/api/NfcScans`           | Returns `NfcScan[]` ordered by `created_at` descending   |
| GET    | `/api/NfcScans/{scan_id}` | Returns single `NfcScan`                                 |
| POST   | `/api/NfcScans`           | Create scan; body: `{ tag_id, device_id?, created_at? }` |

---

## Request/Response Examples (exact shapes)

### Create User

```json
POST /api/Users
{
  "user_id": "user-001",
  "name": "John Doe",
  "email": "john@example.com",
  "password_hash": "hashed_password_here",
  "phone_number": "+1234567890",
  "role": "User",
  "status": "Active",
  "plan": "Professional",
  "subscription_end_date": "2025-12-31T23:59:59Z",
  "branch_id": 2
}
```

### Create BookDetail with copies

```json
POST /api/Books
{
  "name": "Clean Code",
  "category_id": 4,
  "quantity": 3,
  "sale_price": 39.99,
  "image_url": "BASE64_ENCODED_IMAGE_BYTES",
  "BookCopies": [
    { "book_copy_id": "BC-0001", "branch_id": 1 },
    { "book_copy_id": "BC-0002", "branch_id": 1 },
    { "book_copy_id": "BC-0003", "branch_id": 2 }
  ]
}
```

### Create single BookCopy (increments parent quantity)

```json
POST /api/BookCopies
{
  "book_copy_id": "BC-0004",
  "book_id": 42,
  "branch_id": 1
}
```

### Create BookReservation

```json
POST /api/BookReservations
{
  "user_id": "user-001",
  "book_id": "BC-0001",
  "expiration_date": "2025-12-31T23:59:59Z",
  "reserved_quantity": 1,
  "is_confirmed": false
}
```

### Create BookTransaction (checkout)

```json
POST /api/BookTransactions
{
  "user_id": "user-001",
  "book_id": "BC-0001",
  "transaction_type": "Check-Out",
  "borrow_type": "Borrow",
  "due_date": "2025-12-15T00:00:00Z"
}
```

### Update User Activity

```json
PUT /api/Users/user-001/activity
{
  "LastActivityAt": "2025-06-15T14:30:00Z"
}
```

### Create UserRequest (registration request)

```json
POST /api/UserRequests
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "user_password_here",
  "phone_number": "+1987654321",
  "plan": "Discover"
}
```

### Approve/Reject UserRequest

```json
PUT /api/UserRequests/1
{
  "status": "Approved"
}
```

### Return Book (set return_date, status → Returned)

```json
POST /api/BookTransactions/return
{
  "action": "return_book",
  "transaction_id": 12,
  "return_date": "2025-01-15T10:00:00Z"
}
```

> If `return_date` is omitted, the backend sets it to current UTC. Status is set to `"Returned"`.

---

## DTO Shapes (Response Objects)

### UserDTO

```typescript
interface UserDTO {
  user_id: string;
  name: string;
  email: string;
  phone_number: string;
  role: string;
  password_hash: string;
  plan?: string;              // User's subscription plan (nullable)
  subscription_end_date?: string;
  branch_id?: number;
  booksReserved: string[];    // Book names or copy IDs
  booksBought: string[];      // Book names from Purchase transactions
  LastActivityAt: string | null;
}
```

### BookDTO

```typescript
interface BookDTO {
  book_id: number;
  name: string;
  category_id: number;
  quantity: number;
  sale_price?: number;        // numeric(10,2)
  image_url?: string;        // base64-encoded bytes
  created_by?: string;        // User ID who created this book
  created_at?: string;        // ISO-8601 timestamp
  updated_at?: string;        // ISO-8601 timestamp
  user_names: string[];       // Users who have reservations/transactions
}
```

---

## Behavior and Implementation Notes (for UI/AI generation)

- **Atomic operations:** Multi-step changes (BookDetail + BookCopies) use explicit transactions. UI should treat create/update as all-or-nothing and implement retry/error handling on 4xx/5xx.
- **Return flow:** To mark a return, call `POST /api/BookTransactions/return` with `transaction_id` (and optional `return_date`). Backend sets `return_date` (defaults to UTC now) and status to `Returned`.
- **Error handling:** API returns:
  - `400` for validation failures (include readable error message)
  - `404` for missing resources
  - `409` for unique constraint violations (e.g., duplicate `book_copy_id`)
  - `500` for server errors
- **Pagination and filtering:** Long-list endpoints may implement pagination. Check OpenAPI or query params in real-time endpoints.
- **Row-Level Security:** `BookCopies` has RLS in the database; API enforces access based on authenticated user and server rules.
- **Foreign Key Naming:** Note that `book_id` in `BookReservations` and `BookTransactions` refers to `BookCopies.book_copy_id`, not `BookDetails.book_id`.

---

## Generating Client Code

- Use these exact property names and types when auto-generating TypeScript/Swift/Kotlin models.
- Map `timestamp` to `string` in JSON models (ISO-8601).
- Map `numeric(10,2)` to `number`/`decimal` in clients that support decimals.
- String length constraints are enforced server-side but should be validated client-side for better UX.

---

## TypeScript Interfaces (for frontend)

```typescript
interface Branch {
  branch_id: number;
  name: string;
  location: string;
  contact_number?: string;
  created_by?: string;       // max 20 chars, FK to Users.user_id
}

interface Category {
  category_id: number;
  category_name: string;
  created_by?: string;       // max 20 chars, FK to Users.user_id
}

interface User {
  user_id: string;           // max 20 chars
  name: string;              // max 50 chars
  email: string;             // max 100 chars
  password_hash: string;     // max 255 chars
  phone_number: string;      // max 20 chars
  role: 'Super Admin' | 'Admin' | 'User';
  status: 'Active' | 'Inactive' | 'Banned';
  plan?: 'Discover' | 'Enterprise' | 'Professional';
  subscription_end_date?: string;
  branch_id?: number;
  created_by?: string;       // max 20 chars, FK to Users.user_id
  created_at?: string;
  updated_at?: string;
  last_activity_at?: string;
}

interface UserDTO {
  user_id: string;
  name: string;
  email: string;
  phone_number: string;
  role: string;
  password_hash: string;
  plan?: string;              // User's subscription plan (nullable)
  booksReserved: string[];    // Book names or copy IDs
  booksBought: string[];      // Book names from Purchase transactions
  LastActivityAt: string | null;
}

interface BookDetail {
  book_id: number;
  name: string;              // max 255 chars
  category_id: number;
  quantity: number;          // smallint, >= 0
  sale_price?: number;       // numeric(10,2)
  image_url?: string;        // base64-encoded bytes
  created_by?: string;       // max 20 chars, FK to Users.user_id
  created_at?: string;
  updated_at?: string;
  BookCopies?: BookCopy[];   // Only in POST/PUT payloads
}

interface BookDTO {
  book_id: number;
  name: string;
  category_id: number;
  quantity: number;
  user_names: string[];       // Users who have reservations/transactions
}

interface BookCopy {
  book_copy_id: string;      // max 50 chars
  book_id: number;
  branch_id: number;
}

interface BookReservation {
  reservation_id: number;    // smallint
  user_id: string;           // max 20 chars
  book_id: string;           // references BookCopy.book_copy_id, max 50 chars
  reservation_date?: string;
  expiration_date: string;   // required
  status?: 'Active' | 'Cancelled' | 'Fulfilled';
  reserved_quantity?: number;
  is_confirmed?: boolean;
}

interface BookTransaction {
  transaction_id: number;    // smallint
  user_id: string;           // max 20 chars
  book_id: string;           // references BookCopy.book_copy_id, max 50 chars
  transaction_type: 'Check-In' | 'Check-Out';
  borrow_type?: 'Borrow' | 'Purchase';
  status?: 'Pending' | 'Completed' | 'Overdue' | 'Returned';
  due_date?: string;
  return_date?: string;      // set when returned
  fine_amount?: number;      // numeric(10,2), default 0.00
  created_at?: string;
}

interface UserRequest {
  request_id: number;        // auto-generated, do not send in POST
  name: string;              // max 50 chars
  email: string;             // max 100 chars, unique
  password: string;          // max 200 chars, required
  phone_number: string;      // max 20 chars
  plan?: 'Discover' | 'Enterprise' | 'Professional';
  status?: 'Pending' | 'Approved' | 'Rejected';  // default: 'Pending'
  created_at?: string;       // auto-set by database
}

interface NfcScan {
  scan_id: number;           // bigint identity
  tag_id: string;            // required
  device_id?: string;        // defaults to "esp8266"
  created_at?: string;       // ISO-8601, default now()
}
```

---

## Schema Diagram (Foreign Key Relationships)

```
Categories
    └──< BookDetails (category_id)
              └──< BookCopies (book_id)
                        ├──< BookReservations (book_id → book_copy_id)
                        └──< BookTransactions (book_id → book_copy_id)

Branches
    └──< BookCopies (branch_id)

Users
    ├──< BookReservations (user_id)
    ├──< BookTransactions (user_id)
    └──< Reports (generated_by)

UserRequests (standalone, no FK relationships)
```

---

## Changelog

### Latest Update (User subscription end date)

- Added `subscription_end_date` (timestamp) to `Users` for plan expiration tracking.

### Previous Update (Book return marker)

- Removed `returned_at` (dropped from DB). Return flow now uses `return_date`.
- `POST /api/BookTransactions/return` sets `return_date` (defaults to current UTC) and status to `Returned`.

### Previous Update (NFC Scans table + API)

- Added `nfc_scans` table mapping and REST API to ingest temporary NFC reads from ESP8266 and expose them to the frontend.
- Schema: `scan_id` (bigint identity), `tag_id` (required), `device_id` (default `"esp8266"`), `created_at` (default `now()`).
- Endpoints: `GET /api/NfcScans`, `GET /api/NfcScans/{scan_id}`, `POST /api/NfcScans`.

### Latest Update (Database Identity Column Fix - ROOT CAUSE FOUND)

- **Bug fix:** Fixed `null value in column "book_id" violates not-null constraint` error when creating books.
- **ROOT CAUSE:** The PostgreSQL database column `BookDetails.book_id` was **NOT configured as an identity column** in the database schema itself. The EF Core configuration was correct, but the actual database didn't have the identity property.
- **Database fix applied:**
  ```sql
  ALTER TABLE public."BookDetails" ALTER COLUMN book_id ADD GENERATED BY DEFAULT AS IDENTITY;
  SELECT setval(pg_get_serial_sequence('public."BookDetails"','book_id'), COALESCE((SELECT MAX(book_id) FROM public."BookDetails"), 1));
  ```
- **Backend code:** Reverted to clean EF Core approach (no raw SQL needed) since the database is now properly configured.
- **Lesson learned:** When EF Core identity columns aren't working, check the actual database schema - the column itself might not be configured as an identity column.

### Previous Update (Complete Identity Column Fix)

- **Bug fix:** Fixed persistent `null value in column "book_id" violates not-null constraint` error when creating books and other entities.
- **Root cause:** EF Core wasn't properly recognizing identity columns due to missing configuration in both the model classes and Fluent API.
- **Complete fix applied:** Added BOTH data annotations AND Fluent API configuration:
  1. **Model classes** - Added `[DatabaseGenerated(DatabaseGeneratedOption.Identity)]` attribute to:
     - `BookDetail.book_id`
     - `Category.category_id`
     - `Branch.branch_id`
     - `BookReservation.reservation_id`
     - `BookTransaction.transaction_id`
     - `Report.report_id`
     - `UserRequest.request_id` (already had it)
  2. **DbContext Fluent API** - Added `.ValueGeneratedOnAdd().UseIdentityByDefaultColumn()` to all identity columns
- **No database changes required.**
- **No frontend changes required.**
- **IMPORTANT:** After deploying, ensure the application is fully restarted to pick up the new model configuration.

### Previous Update (Identity Column ValueGeneratedOnAdd Fix)

- **Bug fix:** Fixed persistent `null value in column "book_id" violates not-null constraint` error when creating books and other entities with identity columns.
- **Root cause:** The EF Core configuration was missing `.ValueGeneratedOnAdd()` before `.UseIdentityByDefaultColumn()`. Without both, EF Core wasn't properly recognizing the column as database-generated.
- **Fix applied:** Updated all identity column configurations in `LibraryManagementSystemContext.cs` to include both `.ValueGeneratedOnAdd()` and `.UseIdentityByDefaultColumn()`:
  - `BookDetail.book_id`
  - `BookReservation.reservation_id`
  - `BookTransaction.transaction_id`
  - `Category.category_id`
  - `Branch.branch_id`
  - `Report.report_id`
  - `UserRequest.request_id`
- **Also added:** `[DatabaseGenerated(DatabaseGeneratedOption.Identity)]` attribute to `BookDetail.book_id` in the model class for extra clarity.
- **No database changes required.**
- **No frontend changes required.**

### Previous Update (Clear Navigation Properties in All Controllers)

- **Bug fix:** Fixed `null value in column "book_id" violates not-null constraint` error when creating Books, BookCopies, BookReservations, and BookTransactions.
- **Root cause:** Navigation properties were not being cleared in all controller POST methods, causing EF Core tracking issues that prevented proper identity column generation.
- **Fix applied:** Added explicit clearing of all navigation properties before adding entities to the database:
  - `BooksController.Add()` - clears `category`, `BookCopies`, `created_byNavigation`; also clears navigation properties on incoming BookCopy objects
  - `BooksController.Edit()` - clears navigation properties and also updates `created_by`
  - `BookCopiesController.Create()` - clears `book`, `branch`, `BookTransactions`, `BookReservations`
  - `BookReservationsController.CreateReservation()` - clears `user`, `book_copy`
  - `BookTransactionsController.CreateTransaction()` - clears `user`, `book_copy`
- **No database changes required.**
- **No frontend changes required.**

### Previous Update (PostgreSQL Timestamp Fix)

- **Bug fix:** Fixed `Cannot write DateTime with Kind=UTC to PostgreSQL type 'timestamp without time zone'` error when updating users and other entities with timestamp fields.
- **Root cause:** Npgsql 6.0+ enforces strict timestamp handling. When code uses `DateTime.UtcNow` (which has `Kind=UTC`), it cannot be written to PostgreSQL `timestamp without time zone` columns directly.
- **Fix applied:** Added `AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true)` at the start of `Program.cs` to enable legacy timestamp behavior, allowing UTC DateTimes to be written to `timestamp without time zone` columns.
- **No database changes required.**
- **No frontend changes required.**

### Previous Update (PUT/Update Methods Fix)

- **Bug fix:** Fixed `500 Internal Server Error` when updating Users, Branches, and Categories.
- **Root cause:** The PUT methods were using `EntityState.Modified` on a detached entity, which caused EF Core tracking issues. Navigation properties were also not being cleared.
- **Fix applied:** Rewrote PUT methods in controllers to:
  1. Find the existing entity first (ensuring it's tracked by EF Core)
  2. Clear navigation properties on the incoming entity
  3. Update only scalar properties on the tracked entity
  4. Add proper error handling with meaningful error messages
- **Affected controllers:** `UsersController`, `BranchesController`, `CategoriesController`
- **Additional improvements:**
  - `UsersController.edit()` now URL-decodes the user ID to handle IDs with special characters
  - All PUT methods now return proper error messages instead of generic 500 errors
- **No database changes required.**
- **No frontend changes required.**

### Previous Update (ValidateNever Attribute Fix)

- **Bug fix:** Fixed `400 Bad Request` error `"The created_byNavigation field is required"` when creating Branches, Categories, Users, Books, BookCopies, BookReservations, and BookTransactions.
- **Root cause:** ASP.NET's model validation was requiring navigation properties before the request even reached the controller. The previous fix using `.IsRequired(false)` in EF Core only affected database operations, not API model validation.
- **Fix applied:** Added `[ValidateNever]` attribute from `Microsoft.AspNetCore.Mvc.ModelBinding.Validation` to all navigation properties in model classes:
  - `Branch.cs` - `created_byNavigation`, `BookCopies`
  - `Category.cs` - `created_byNavigation`, `BookDetails`
  - `BookDetail.cs` - `created_byNavigation`, `category`, `BookCopies`
  - `User.cs` - All navigation properties (reservations, transactions, reports, created entities)
  - `BookCopy.cs` - `book`, `branch`, `BookTransactions`, `BookReservations`
  - `BookReservation.cs` - `user`, `book_copy`
  - `BookTransaction.cs` - `user`, `book_copy`
  - `Report.cs` - `generated_byNavigation`
- **No database changes required.**
- **No frontend changes required** - the frontend should NOT send navigation properties.

### Previous Update (Navigation Property Fix)

- **Bug fix:** Fixed `400 Bad Request` error when creating Branches, Categories, and Users where the API was incorrectly requiring navigation properties (e.g., `created_byNavigation`).
- **Root cause:** With nullable reference types enabled in .NET 9, EF Core and ASP.NET model validation treated non-nullable navigation properties as required, even though they should be optional.
- **Fix applied:**
  1. Added `.IsRequired(false)` to all `created_by` navigation property configurations in `LibraryManagementSystemContext.cs`
  2. Updated controllers (`BranchesController`, `CategoriesController`, `UsersController`) to clear navigation properties before saving to prevent EF from trying to insert related entities
- **Affected entities:** `BookDetail`, `Category`, `Branch`, `User`
- **No database changes required.**
- **No frontend changes required** - the frontend should NOT send navigation properties.

### Previous Update (EF Core Identity Column Fix)

- **Bug fix:** Fixed `null value in column "book_id" violates not-null constraint` error when creating books, reservations, transactions, categories, branches, and reports.
- **Root cause:** Entity Framework Core configuration was missing `.UseIdentityByDefaultColumn()` for PostgreSQL identity columns, causing EF Core to send NULL instead of letting the database auto-generate the primary key.
- **Affected tables:** `BookDetails`, `BookReservations`, `BookTransactions`, `Categories`, `Branches`, `Reports`
- **Backend-only fix:** No database schema changes required. The database identity columns were already configured correctly; only the EF Core model configuration needed updating.
- **No frontend changes required:** API contract remains unchanged.

### Previous Update (created_by Tracking)

- **created_by column:** Added `created_by` field to `Users`, `BookDetails`, `Categories`, and `Branches` tables.
  - Type: `VARCHAR(20)`, nullable
  - FK: References `Users.user_id` with `ON DELETE SET NULL`
  - Purpose: Track which admin/user created each record
  - Indexed: B-tree index on each table for efficient filtering
  - Note: `Users.created_by` is self-referential (admin who created the user)
- **Backend behavior:** When the referenced admin user is deleted, `created_by` values are automatically set to NULL.

### Previous Update (UserRequests Feature)

- **UserRequest:** Added new `UserRequests` table and API for handling user registration requests pending admin approval.
  - Fields: `request_id` (auto-generated), `name`, `email` (unique), `password`, `phone_number`, `plan`, `status`, `created_at`
  - Status workflow: `Pending` → `Approved` or `Rejected`
  - Admins manually create Users after approving requests
- **New endpoints:** Full CRUD for `/api/UserRequests`

### Previous Update (Schema Alignment)
