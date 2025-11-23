Library Management System - API Documentation

Overview

This document describes the Web API endpoints implemented in the project and documents every model property, DTO field, DbContext set name, and controller route names used by the backend. Use this file as a schema reference for external tools or AI models that need to interact with the API.

Conventions
- Model property names shown exactly as in the C# models (usually snake_case for DB-mapped properties in this project).
- DTOs are listed with their property names as exposed by the controllers (BookDTO currently uses snake_case; UserDTO mixes lower-case and PascalCase for LastActivityAt).
- All endpoints return JSON unless otherwise stated.

DbContext (LibraryManagementSystemContext)
- DbSet<Book> Books
- DbSet<BookReservation> BookReservations
- DbSet<BookSale> BookSales
- DbSet<BookTransaction> BookTransactions
- DbSet<Category> Categories
- DbSet<RFID_Tag> RFID_Tags
- DbSet<Report> Reports
- DbSet<SystemLog> SystemLogs
- DbSet<User> Users
- DbSet<Branch> Branches

Models (properties exactly as in code)

Book
- int book_id
- string isbn
- string title
- string author
- string publisher
- int? publication_year
- int category_id
- int total_copies
- int available_copies
- string digital_url
- DateTime? created_at
- DateTime? updated_at
- decimal? sale_price
- ICollection<BookReservation> BookReservations
- ICollection<BookSale> BookSales
- ICollection<BookTransaction> BookTransactions
- Category category (navigation property; FK: category_id)

User
- int user_id
- int? rfid_tag_id
- string first_name
- string last_name
- string email
- string password_hash
- string phone_number
- string role
- string status
- DateTime? created_at
- DateTime? updated_at
- ICollection<BookReservation> BookReservations
- ICollection<BookSale> BookSales
- ICollection<BookTransaction> BookTransactions
- ICollection<Report> Reports
- ICollection<SystemLog> SystemLogs
- RFID_Tag rfid_tag (navigation; FK: rfid_tag_id)
- DateTime? LastActivityAt (column name: last_activity_at)

Category
- int category_id
- string category_name
- ICollection<Book> Books

BookReservation
- int reservation_id
- int user_id
- int book_id
- DateTime? reservation_date
- DateTime expiration_date
- string status
- Book book (navigation; FK: book_id)
- User user (navigation; FK: user_id)

BookSale
- int sale_id
- int user_id
- int book_id
- int transaction_id
- decimal price
- DateTime? sale_date
- Book book (navigation; FK: book_id)
- BookTransaction transaction (navigation; FK: transaction_id)
- User user (navigation; FK: user_id)

BookTransaction
- int transaction_id
- int user_id
- int book_id
- int rfid_tag_id
- string transaction_type
- DateTime? due_date
- DateTime? return_date
- decimal? fine_amount
- string status
- DateTime? created_at
- string borrow_type
- BookSale BookSale (navigation)
- Book book (navigation; FK: book_id)
- RFID_Tag rfid_tag (navigation; FK: rfid_tag_id)
- User user (navigation; FK: user_id)

RFID_Tag
- int tag_id
- string tag_type
- int assigned_to
- DateTime? assigned_date
- string status
- ICollection<BookTransaction> BookTransactions
- User User (navigation)

Report
- int report_id
- string report_name
- int generated_by
- string report_type
- DateTime? generated_at
- string file_path
- User generated_byNavigation (navigation; FK: generated_by)

SystemLog
- int log_id
- int? user_id
- string action_type
- string description
- DateTime? created_at
- User user (navigation; FK: user_id)

Branch
- int branch_id
- string name
- string location
- string contact_number

DTOs (as used by controllers)

BookDTO (current controller mapping)
- int book_id
- string isbn
- string title
- string author
- string publisher
- int? publication_year
- int category_id
- int total_copies
- int available_copies
- decimal? sale_price
- string digital_url
- string description (DTO-only)
- List<string> user_names (DTO-only; aggregated user full names involved in reservations/sales/transactions)

UserDTO
- int id
- string full_name
- string first_name
- string last_name
- string email
- string phone_number
- string role
- string password_hash (sensitive; consider removing in production)
- List<string> booksBought
- List<string> booksReserved
- DateTime? LastActivityAt

Notes about DTOs and payloads
- Controllers currently bind `Book` entity directly for POST/PUT actions. This allows clients to accidentally include navigation properties (e.g., `category`, `BookReservations`) in the request body which can lead to EF attach/FK issues. Recommended pattern: accept an input DTO (BookInputDTO) with only the writable primitive fields, then map server-side to the `Book` entity.

Controllers and routes (summary)
- BooksController (base route: /api/Books)
  - GET /api/Books -> returns List<BookDTO>
  - GET /api/Books/{id:int} -> returns BookDTO
  - GET /api/Books/{title:alpha} -> returns list of Book entities matching title substring
  - POST /api/Books -> expects `Book` entity in body (or a BookInput shape). Validations: isbn & title required; total_copies/available_copies non-negative; available_copies <= total_copies; category_id must exist. Returns 201 Created with BookDTO.
  - PUT /api/Books/{id:int} -> expects `Book` entity in body. Same validations as POST. Returns 200 OK with BookDTO.
  - DELETE /api/Books/{id:int} -> deletes book (controller currently allows delete regardless of related items but has commented checks to prevent deleting when related records exist). Returns 204 NoContent.

- UsersController (base route: /api/Users)
  - GET /api/Users -> returns list of UserDTO
  - GET /api/Users/{id:int} -> returns UserDTO
  - GET /api/Users/{name:alpha} -> returns UserDTO (by first name)
  - POST /api/Users -> create User (binds User entity)
  - PUT /api/Users/{id} -> update User (binds User entity)
  - PUT /api/Users/{id}/activity -> updates last_activity_at timestamp
  - (PATCH may not be implemented; APIs hosted in Azure returned 405 for PATCH in some tests)

- CategoriesController (base route: /api/Categories)
  - CRUD for categories, expects `Category` entity in body for POST/PUT

- BookReservationsController (base route: /api/BookReservations)
  - CRUD for reservations, binds BookReservation entity

- BookSalesController (base route: /api/BookSales)
  - CRUD for sales, binds BookSale entity

- BookTransactionsController (base route: /api/BookTransactions)
  - CRUD for transactions, binds BookTransaction entity

- RFID_TagController (base route: /api/RFID_Tag)
  - CRUD for RFID tags, binds RFID_Tag entity

- ReportsController (base route: /api/Reports)
  - CRUD for reports, binds Report entity

- BranchesController (base route: /api/Branches)
  - GET /api/Branches -> returns list of Branch entities
  - GET /api/Branches/{id} -> returns single Branch entity
  - POST /api/Branches -> create Branch (binds Branch entity)
  - PUT /api/Branches/{id} -> update Branch (binds Branch entity)
  - DELETE /api/Branches/{id} -> delete Branch

Field name casing and JSON
- The server returns JSON using the C# property names. Currently many model properties use snake_case identifiers (e.g., `book_id`, `category_id`). BookDTO returns snake_case fields. UserDTO uses `id` and `LastActivityAt` (note the mixed casing).
- If a client expects a different casing (e.g., camelCase), either update serialization settings or handle mapping client-side.

Example JSON payloads

Book (entity shape expected by POST/PUT)
{
  "book_id": 0,                 // omitted or 0 for new
  "isbn": "ABC123",
  "title": "Book Title",
  "author": "Author Name",
  "publisher": "Publisher",
  "publication_year": 2023,
  "category_id": 4,             // must exist in Categories table
  "total_copies": 5,
  "available_copies": 5,
  "digital_url": "http://...",
  "sale_price": 12.50
}

BookDTO (returned by GET endpoints)
{
  "book_id": 16,
  "isbn": "2131313",
  "title": "dsawad",
  "author": "111",
  "publisher": "111",
  "publication_year": 2022,
  "category_id": 4,
  "total_copies": 1,
  "available_copies": 1,
  "digital_url": null,
  "sale_price": 22.00,
  "description": "",
  "user_names": ["Alice Smith", "Bob Jones"]
}

User (entity shape expected by POST/PUT)
{
  "user_id": 0,
  "rfid_tag_id": null,
  "first_name": "Ali",
  "last_name": "Tamerr",
  "email": "ali@example.com",
  "password_hash": "...",
  "phone_number": "1234567890",
  "role": "Admin",
  "status": "Active"
}

UserDTO (returned by GET)
{
  "id": 51,
  "full_name": "Ali Tamerr",
  "first_name": "Ali",
  "last_name": "Tamerr",
  "email": "ali@example.com",
  "phone_number": "1234567890",
  "role": "Admin",
  "password_hash": "...",
  "booksBought": ["Book A"],
  "booksReserved": ["Book B"],
  "LastActivityAt": "2025-11-18T...Z"
}

Branch (entity shape expected by POST/PUT)
{
  "branch_id": 0,
  "name": "Central Library",
  "location": "123 Main St, City",
  "contact_number": "0123456789"
}

Validation and common errors
- FK constraint violations (Postgres 23503) happen when `category_id` or other FK value doesn't exist. Validate existence server-side before SaveChanges.
- Do not send navigation properties (e.g., `category`, `BookReservations`) in POST/PUT bodies; send only primitive FK ids.
- `405 Method Not Allowed` for PATCH means server doesn't accept PATCH; either use PUT or implement PATCH support server-side with JSON Patch and AddNewtonsoftJson.

Tips for AI models / automated agents
- Use the DbContext DbSet names to discover available collections: `Books`, `Users`, `Categories`, `BookReservations`, `BookSales`, `BookTransactions`, `RFID_Tags`, `Reports`, `SystemLogs`, `Branches`.
- Use model property lists above as canonical field names for building queries and payloads.
- For updates, prefer using `PUT /api/Books/{id}` with full entity or implement a dedicated input DTO on server to accept partial updates safely.
- When creating/updating Books, check `Categories` for existence of `category_id` first to avoid FK errors.

Contact
- If you change models or DTOs, update this README so downstream tools and models stay in sync.