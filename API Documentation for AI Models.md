# Library Management System – Backend Data Contract (AI-Facing)

Authoritative, machine- and human-friendly schema for the current backend entities. Use this to generate frontend types, forms, validation, and correct API payloads.

Key rules for AI agents:

- Use property names exactly as listed (casing included).
- Do not include navigation properties in write payloads.
- Respect nullability, lengths, and defaults.
- Supply only scalar fields and FK IDs for POST/PUT.

---

## DbContext: LibraryManagementSystemContext

DbSets:

- Books (DbSet<Book>)
- BookReservations (DbSet<BookReservation>)
- BookSales (DbSet<BookSale>)
- BookTransactions (DbSet<BookTransaction>)
- Categories (DbSet<Category>)
- Reports (DbSet<Report>)
- Users (DbSet<User>)
- Languages (DbSet<Language>)
- Branches (DbSet<Branch>)

---

## Entities (Tables)

All fields and attributes are based on the current code in Models/\*.cs. Navigation properties are documented for read comprehension; never send them in write payloads.

### Book (Models/Book.cs)

- Indexes:
  - [Index("name", Name = "IDX_Books_Name")]
- Fields:
  - string book_id
    - [Key]
  - string name
    - [Required], [StringLength(255)]
  - int category_id
  - int quantity
  - DateTime? created_at
    - [Column(TypeName = "datetime")], default: GETDATE() (via OnModelCreating)
  - DateTime? updated_at
    - [Column(TypeName = "datetime")], default: GETDATE() (via OnModelCreating)
  - decimal? sale_price
    - [Column(TypeName = "decimal(10, 2)")]
- Navigation (read-only):
  - ICollection<BookReservation> BookReservations [InverseProperty("book")]
  - ICollection<BookSale> BookSales [InverseProperty("book")]
  - ICollection<BookTransaction> BookTransactions [InverseProperty("book")]
  - Category category [ForeignKey("category_id")] [InverseProperty("Books")]

Notes:

- The `language_id` field has been removed from the Book model in this branch. Do not include `language_id` in Book payloads.
- `book_id` is a string. Controller routes accept string ids for book lookups.

Controller routes (BooksController):

- GET `/api/Books` -> returns list of `BookDTO`.
- GET `/api/Books/{id}` -> get single book by `book_id` (string). Use this route for CreatedAtAction Location.
- GET `/api/Books/title/{title}` -> search books by title (avoids conflict with id route).
- POST `/api/Books` -> create book, returns 201 Created with Location header pointing to `GET /api/Books/{id}`.
- PUT `/api/Books/{id}` -> update book by `book_id` (string).
- DELETE `/api/Books/{id}` -> delete book by `book_id` (string).

Example write (POST/PUT):

```json
{
  "book_id": "B-00123",
  "name": "Clean Code",
  "category_id": 4,
  "quantity": 12,
  "sale_price": 39.99
}
```

---

### User (Models/User.cs)

- Indexes (unique):
  - [Index("email", Name = "UQ__Users__AB6E6164...", IsUnique = true)]
  - [Index("phone_number", Name = "UQ__Users__PhoneNumber", IsUnique = true)]
  - Note: the `username` index and `username` property were removed in this branch.
- Fields:
  - string user_id
    - [Key], ValueGeneratedNever (OnModelGenerating) → client must provide
  - string name
    - [Required], [StringLength(50)]
  - string email
    - [Required], [StringLength(100)]
  - string password_hash
    - [Required], [StringLength(255)]
  - string phone_number
    - [StringLength(20)]
  - string role
    - [Required], [StringLength(20)]
  - string? status
    - [StringLength(20)], default: "Active" (OnModelCreating)
  - DateTime? created_at
    - [Column(TypeName = "datetime")], default: GETDATE() (OnModelCreating)
  - DateTime? updated_at
    - [Column(TypeName = "datetime")], default: GETDATE() (OnModelCreating)
  - DateTime? LastActivityAt
    - [Column("last_activity_at")]
- Navigation (read-only):
  - ICollection<BookReservation> BookReservations [InverseProperty("user")]
  - ICollection<BookSale> BookSales [InverseProperty("user")]
  - ICollection<BookTransaction> BookTransactions [InverseProperty("user")]
  - ICollection<Report> Reports [InverseProperty("generated_byNavigation")]

Controller routes (UsersController):

- GET `/api/Users` -> list of `UserDTO` (includes `LastActivityAt`).
- GET `/api/Users/byid/{id}` -> get single user by `user_id` (string).
- GET `/api/Users/{name}` -> search users by name.
- PUT `/api/Users/{id}/activity` -> update `LastActivityAt` using route id. Server URL-decodes incoming id before lookup (tolerates encoded characters, e.g. spaces -> `%20`). Accepts flexible timestamp keys in body (e.g. `LastActivityAt`, `lastActivityAt`, `last_activity_at`).
- PUT `/api/Users/activity` -> alternative body-based endpoint. Accepts flexible keys for user id and timestamp in JSON body (accepted id keys: `user_id`, `userId`, `user`; accepted timestamp keys: `LastActivityAt`, `lastActivityAt`, `last_activity_at`, `lastAt`). Use this if client cannot reliably call route-based endpoints due to special characters in IDs.

PUT `/api/Users/{id}/activity` and PUT `/api/Users/activity`

- Purpose: update the `LastActivityAt` timestamp for a given user.
- Request body (JSON): flexible key names are accepted. If timestamp is omitted or null, server sets `LastActivityAt` to UTC now.
- Successful response: 200 OK — returns JSON: `{ "user_id": "<id>", "LastActivityAt": "<timestamp>" }` (the persisted timestamp).
- Error responses include more diagnostic information during development (DB error/inner exception) to aid debugging.

Example body-based request:

```json
{
  "user_id": "1c 4r 14 o9",
  "LastActivityAt": "2025-11-28T14:35:00Z"
}
```

Notes:

- The API accepts several JSON key shapes for compatibility with different frontend code. In production you may want to standardize shape and reduce diagnostic verbosity.

---

### Category (Models/Category.cs)

- Indexes:
  - [Index("category_name", Name = "UQ__Categori__5189E255...", IsUnique = true)]
- Fields:
  - int category_id
    - [Key]
  - string category_name
    - [Required], [StringLength(100)]
- Navigation (read-only):
  - ICollection<Book> Books [InverseProperty("category")]

Example write:

```json
{
  "category_id": 4,
  "category_name": "Software Engineering"
}
```

---

### Language (Models/Language.cs)

- Fields:
  - int language_id
    - [Key]
  - string name
    - [Required]
- Navigation (read-only):
  - ICollection<Book> Books [InverseProperty("language")]
    - Backed by private field "\_books" (configured in OnModelCreating)

Example write:

```json
{
  "language_id": 1,
  "name": "English"
}
```

---

### BookReservation (Models/BookReservation.cs)

- Indexes:
  - [Index("status", Name = "IDX_Reservations_Status")]
- Fields:
  - int reservation_id
    - [Key]
  - string user_id
  - string book_id
  - DateTime? reservation_date
    - [Column(TypeName = "datetime")], default: GETDATE() (OnModelCreating)
  - DateTime expiration_date
    - [Column(TypeName = "datetime")]
  - string status
    - [StringLength(20)], default: "Active" (OnModelCreating)
- Navigation (read-only):
  - Book book [ForeignKey("book_id")] [InverseProperty("BookReservations")]
  - User user [ForeignKey("user_id")] [InverseProperty("BookReservations")]

Example write:

```json
{
  "user_id": "U-10001",
  "book_id": "B-00123",
  "expiration_date": "2025-12-31T00:00:00Z",
  "status": "Active"
}
```

---

### BookSale (Models/BookSale.cs)

- Indexes:
  - [Index("transaction_id", Name = "UQ__BookSale__85C600AE...", IsUnique = true)]
- Fields:
  - int sale_id
    - [Key]
  - string user_id
  - string book_id
  - int transaction_id
  - decimal price
    - [Column(TypeName = "decimal(10, 2)")]
  - DateTime? sale_date
    - [Column(TypeName = "datetime")], default: GETDATE() (OnModelCreating)
- Navigation (read-only):
  - Book book [ForeignKey("book_id")] [InverseProperty("BookSales")]
  - BookTransaction transaction [ForeignKey("transaction_id")] [InverseProperty("BookSale")]
  - User user [ForeignKey("user_id")] [InverseProperty("BookSales")]

Example write:

```json
{
  "user_id": "U-10001",
  "book_id": "B-00123",
  "transaction_id": 9876,
  "price": 25.0
}
```

---

### BookTransaction (Models/BookTransaction.cs)

- Indexes:
  - [Index("status", Name = "IDX_Transactions_Status")]
- Fields:
  - int transaction_id
    - [Key]
  - string user_id
  - string book_id
  - string transaction_type
    - [Required], [StringLength(20)]
  - DateTime? due_date
    - [Column(TypeName = "datetime")]
  - DateTime? return_date
    - [Column(TypeName = "datetime")]
  - decimal? fine_amount
    - [Column(TypeName = "decimal(10, 2)")], default: 0.00 (OnModelCreating)
  - string status
    - [StringLength(20)], default: "Pending" (OnModelCreating)
  - DateTime? created_at
    - [Column(TypeName = "datetime")], default: GETDATE() (OnModelCreating)
  - string borrow_type
    - [Required], [StringLength(20)], default: "Borrow" (OnModelCreating)
- Navigation (read-only):
  - BookSale BookSale [InverseProperty("transaction")]
  - Book book [ForeignKey("book_id")] [InverseProperty("BookTransactions")]
  - User user [ForeignKey("user_id")] [InverseProperty("BookTransactions")]

Example write:

```json
{
  "user_id": "U-10001",
  "book_id": "B-00123",
  "transaction_type": "Borrow",
  "due_date": "2025-12-15T00:00:00Z",
  "borrow_type": "Borrow"
}
```

---

### Report (Models/Report.cs)

- Fields:
  - int report_id
    - [Key]
  - string report_name
    - [Required], [StringLength(255)]
  - string generated_by
  - string report_type
    - [Required], [StringLength(50)]
  - DateTime? generated_at
    - [Column(TypeName = "datetime")], default: GETDATE() (OnModelCreating)
  - string file_path
    - [StringLength(500)]
- Navigation (read-only):
  - User generated_byNavigation [ForeignKey("generated_by")] [InverseProperty("Reports")]

Example write:

```json
{
  "report_name": "Monthly Inventory",
  "generated_by": "U-10001",
  "report_type": "Inventory",
  "file_path": "/reports/inventory-2025-11.pdf"
}
```

---

### Branch (Models/Branch.cs)

- Fields:
  - int branch_id
    - [Key]
  - string name
    - [Required], [StringLength(50)]
  - string location
    - [Required], [StringLength(100)]
  - string contact_number
    - [StringLength(20)]

Example write:

```json
{
  "branch_id": 10,
  "name": "Central Library",
  "location": "123 Main St, City",
  "contact_number": "0123456789"
}
```

---

## Relationships & Delete Behavior (OnModelCreating highlights)

- Book → Category (Many-to-One): FK `category_id`, DeleteBehavior.ClientSetNull
- Book → Language (Many-to-One): FK `language_id`, DeleteBehavior.ClientSetNull
- BookReservation → Book/User: FKs `book_id`, `user_id`, DeleteBehavior.ClientSetNull
- BookSale → Book (Many-to-One), User (Many-to-One)
- BookSale → BookTransaction (One-to-One): FK `transaction_id`, DeleteBehavior.ClientSetNull
- BookTransaction → Book/User: FKs `book_id`, `user_id`, DeleteBehavior.ClientSetNull
- Report → User (Many-to-One): FK `generated_by`, DeleteBehavior.ClientSetNull

---

## Repository & API changes (summary)

Overview

- The `LastActivityAt` field for users is supported end-to-end: it can be sent to the API, persisted asynchronously, and is returned in responses.

Repository changes

- `IGenericRepository<T>`: added async signatures `getByIdAsync(string|int)` and `saveAsync()`.
- `GenericRepository<T>`: implemented `FindAsync(...)` and `SaveChangesAsync()` usages in the new async methods.

Users activity endpoints

- PUT `/api/Users/{id}/activity` — updates `LastActivityAt` by route id (server will URL-decode the id).
- PUT `/api/Users/activity` — body-based update accepting flexible key names (`user_id`, `userId`, `user`) and timestamp keys (`LastActivityAt`, `lastActivityAt`, `last_activity_at`, `lastAt`).

Notes on behavior & errors

- Both user-activity endpoints return 200 OK with `{ user_id, LastActivityAt }` on success.
- During development the API returns additional diagnostic details for DB errors (error message and inner exception) to aid debugging; consider removing or sanitizing this in production.

---

## JSON & Validation Guidance for AI Agents

- Casing: Use the exact property names (mostly snake_case). Note: `LastActivityAt` is PascalCase but maps to `last_activity_at` in DB.
- Required fields enforced via annotations must be present in write payloads.
- Unique constraints (User: email, phone_number) should be pre-checked or handled on 409/400.
- Default values (e.g., timestamps, statuses) may be set server-side; do not rely on client to populate unless required.
- Never send navigation properties or collections in POST/PUT bodies.

---

Example curl (books)

curl -X PUT "https://<host>/api/books/activity" -H "Content-Type: application/json" -d '{"user_id":"1c 4r 14 o9","LastActivityAt":"2025-11-28T14:35:00Z"}'
