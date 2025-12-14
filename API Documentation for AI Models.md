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
| Field | Type | Constraints |
|-------|------|-------------|
| `branch_id` | int | PK, identity |
| `name` | string(50) | **required** |
| `location` | string(100) | **required** |
| `contact_number` | string(20) | nullable |
| `created_by` | string(20) | nullable, FK → `Users.user_id`, ON DELETE SET NULL |

### Category
| Field | Type | Constraints |
|-------|------|-------------|
| `category_id` | int | PK, identity |
| `category_name` | string(100) | **required**, unique |
| `created_by` | string(20) | nullable, FK → `Users.user_id`, ON DELETE SET NULL |

### User
| Field | Type | Constraints |
|-------|------|-------------|
| `user_id` | string(20) | PK |
| `name` | string(50) | **required** |
| `email` | string(100) | **required**, unique |
| `password_hash` | string(255) | **required** |
| `phone_number` | string(20) | **required**, unique |
| `role` | string(20) | **required** — allowed: `"Super Admin"`, `"Admin"`, `"User"` |
| `status` | string(20) | **required**, default: `"Active"` — allowed: `"Banned"`, `"Inactive"`, `"Active"` |
| `plan` | string(50) | nullable — allowed: `"Discover"`, `"Enterprise"`, `"Professional"` |
| `created_by` | string(20) | nullable, FK → `Users.user_id` (self-referential), ON DELETE SET NULL |
| `created_at` | timestamp | default: `now()` |
| `updated_at` | timestamp | default: `now()` |
| `last_activity_at` | timestamp | nullable |

### BookDetail (represents the book meta)
| Field | Type | Constraints |
|-------|------|-------------|
| `book_id` | int | PK, identity |
| `name` | string(255) | **required** |
| `category_id` | int | FK → `Categories.category_id` |
| `quantity` | smallint (int16) | **required**, must be >= 0 |
| `sale_price` | numeric(10,2) | nullable |
| `image_url` | text | nullable |
| `created_by` | string(20) | nullable, FK → `Users.user_id`, ON DELETE SET NULL |
| `created_at` | timestamp | default: `now()` |
| `updated_at` | timestamp | default: `now()` |

### BookCopy (physical copy)
| Field | Type | Constraints |
|-------|------|-------------|
| `book_copy_id` | string(50) | PK |
| `book_id` | int | FK → `BookDetails.book_id` |
| `branch_id` | int | FK → `Branches.branch_id` |

> **Note:** Row-Level Security (RLS) is enabled on this table in the DB. API enforces access rules as implemented in backend.

### BookReservation
| Field | Type | Constraints |
|-------|------|-------------|
| `reservation_id` | smallint (int16) | PK, identity |
| `user_id` | string(20) | FK → `Users.user_id` |
| `book_id` | string(50) | FK → `BookCopies.book_copy_id` |
| `reservation_date` | timestamp | default: `now()` |
| `expiration_date` | timestamp | **required** |
| `status` | string(20) | default: `"Active"` — allowed: `"Fulfilled"`, `"Cancelled"`, `"Active"` |
| `reserved_quantity` | int | nullable |
| `is_confirmed` | boolean | nullable |

> **Important:** The `book_id` column in BookReservations references `BookCopies.book_copy_id` (not BookDetails).

### BookTransaction
| Field | Type | Constraints |
|-------|------|-------------|
| `transaction_id` | smallint (int16) | PK, identity |
| `user_id` | string(20) | FK → `Users.user_id` |
| `book_id` | string(50) | FK → `BookCopies.book_copy_id` |
| `transaction_type` | string(20) | **required** — allowed: `"Check-In"`, `"Check-Out"` |
| `borrow_type` | string(20) | default: `"Borrow"` — allowed: `"Purchase"`, `"Borrow"` |
| `status` | string(20) | default: `"Pending"` — allowed: `"Overdue"`, `"Pending"`, `"Completed"` |
| `due_date` | timestamp | nullable |
| `return_date` | timestamp | nullable |
| `fine_amount` | numeric(10,2) | default: `0.00` |
| `created_at` | timestamp | default: `now()` |

> **Important:** The `book_id` column in BookTransactions references `BookCopies.book_copy_id` (not BookDetails).

### UserRequest (registration requests pending admin approval)
| Field | Type | Constraints |
|-------|------|-------------|
| `request_id` | int | PK, identity (auto-generated) |
| `name` | string(50) | **required** |
| `email` | string(100) | **required**, unique |
| `password` | string(200) | **required** |
| `phone_number` | string(20) | **required** |
| `plan` | string(50) | nullable — allowed: `"Discover"`, `"Enterprise"`, `"Professional"` |
| `status` | string(20) | default: `"Pending"` — allowed: `"Pending"`, `"Approved"`, `"Rejected"` |
| `created_at` | timestamp | default: `now()` |

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
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/Branches` | Returns `Branch[]` |
| GET | `/api/Branches/{branch_id}` | Returns single `Branch` |
| POST | `/api/Branches` | Create Branch; body: `{ name, location, contact_number?, created_by? }` |
| PUT | `/api/Branches/{branch_id}` | Update Branch |
| DELETE | `/api/Branches/{branch_id}` | Delete Branch |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/Categories` | Returns `Category[]` |
| GET | `/api/Categories/{category_id}` | Returns single `Category` |
| POST | `/api/Categories` | Create Category; body: `{ category_name, created_by? }` |
| PUT | `/api/Categories/{category_id}` | Update Category |
| DELETE | `/api/Categories/{category_id}` | Delete Category |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/Users` | Returns `UserDTO[]` with related books info |
| GET | `/api/Users/byid/{user_id}` | Returns single `UserDTO` |
| GET | `/api/Users/{name}` | Search users by name |
| POST | `/api/Users` | Create User; body: `{ user_id, name, email, password_hash, phone_number, role?, status?, plan?, created_by? }` |
| PUT | `/api/Users/{user_id}` | Update User |
| PUT | `/api/Users/{user_id}/activity` | Update user's `last_activity_at` timestamp |
| PUT | `/api/Users/activity` | Update activity by body: `{ user_id, LastActivityAt? }` |
| DELETE | `/api/Users/{user_id}` | Delete User |

### Books (BookDetail)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/Books` | Returns `BookDTO[]` (summary + user names) |
| GET | `/api/Books/{book_id}` | Returns single `BookDTO` |
| GET | `/api/Books/title/{title}` | Search by title (partial match) |
| POST | `/api/Books` | Create BookDetail; body: scalar fields + optional `BookCopies[]` |
| PUT | `/api/Books/{book_id}` | Update BookDetail; optional `BookCopies[]` replaces existing (must match `quantity`) |
| DELETE | `/api/Books/{book_id}` | Delete BookDetail and its copies (blocked if referenced) |

### BookCopies
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/BookCopies` | Returns `BookCopy[]` with related BookDetail |
| GET | `/api/BookCopies/{book_copy_id}` | Returns single `BookCopy` |
| POST | `/api/BookCopies` | Create copy; body: `{ book_copy_id, book_id, branch_id }` |
| PUT | `/api/BookCopies/{book_copy_id}` | Update copy; body: `{ book_id, branch_id }` |
| DELETE | `/api/BookCopies/{book_copy_id}` | Delete copy (blocked if referenced) |

### BookReservations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/BookReservations` | Returns `BookReservation[]` with user and copy info |
| GET | `/api/BookReservations/{reservation_id}` | Returns single `BookReservation` |
| POST | `/api/BookReservations` | Create reservation; body: `{ user_id, book_id, expiration_date, reserved_quantity?, is_confirmed? }` |
| PUT | `/api/BookReservations/{reservation_id}` | Update reservation |
| DELETE | `/api/BookReservations/{reservation_id}` | Delete reservation |

### BookTransactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/BookTransactions` | Returns `BookTransaction[]` with user and copy info |
| GET | `/api/BookTransactions/{transaction_id}` | Returns single `BookTransaction` |
| POST | `/api/BookTransactions` | Create transaction; body: `{ user_id, book_id, transaction_type, borrow_type?, due_date? }` |
| PUT | `/api/BookTransactions/{transaction_id}` | Update transaction |
| DELETE | `/api/BookTransactions/{transaction_id}` | Delete transaction |

### UserRequests
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/UserRequests` | Returns `UserRequest[]` ordered by `created_at` descending |
| GET | `/api/UserRequests/{request_id}` | Returns single `UserRequest` |
| POST | `/api/UserRequests` | Create request; body: `{ name, email, password, phone_number, plan? }` |
| PUT | `/api/UserRequests/{request_id}` | Update request (approve/reject); body: `{ status?, name?, email?, phone_number?, plan? }` |
| DELETE | `/api/UserRequests/{request_id}` | Delete request |

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
  "plan": "Professional"
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
  "image_url": "https://example.com/clean-code.jpg",
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
  user_names: string[];       // Users who have reservations/transactions
}
```

---

## Behavior and Implementation Notes (for UI/AI generation)

- **Atomic operations:** Multi-step changes (BookDetail + BookCopies) use explicit transactions. UI should treat create/update as all-or-nothing and implement retry/error handling on 4xx/5xx.
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
  image_url?: string;
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
  status?: 'Pending' | 'Completed' | 'Overdue';
  due_date?: string;
  return_date?: string;
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

### Latest Update (ValidateNever Attribute Fix)
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