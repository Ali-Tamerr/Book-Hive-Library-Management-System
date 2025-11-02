Library Management System - API Documentation

Overview

This document describes the Web API endpoints implemented in the project. Base route for controllers: `/api/[controller]`.

Notes
- All endpoints return JSON.
- Where controllers return EF entity types directly, the shapes reflect the `Models` classes.
- Some controllers map entities to DTOs (e.g. `UsersController`, `BooksController`).
- Sensitive fields: `password_hash` is currently returned by `Users` DTOs — remove in production.

Users

Base route: `/api/Users`

- GET `/api/Users`
  - Description: Returns list of users mapped to `UserDTO`.
  - Response: 200 OK — array of `UserDTO`:
    - `id` (int)
    - `full_name` (string)
    - `first_name` (string)
    - `last_name` (string)
    - `email` (string)
    - `phone_number` (string)
    - `role` (string)
    - `password_hash` (string) — sensitive
    - `booksReserved` (array[string]) — book titles
    - `booksBought` (array[string]) — book titles

- GET `/api/Users/{id:int}`
  - Description: Get single user by numeric id. Returns `UserDTO`.
  - Responses: 200 OK (user), 404 NotFound (message: "User not found").

- GET `/api/Users/{name:alpha}`
  - Description: Get user by alphabetic first name. Returns `UserDTO`.
  - Responses: 200 OK (user), 404 NotFound.
  - Notes: Route constraint `alpha` means segments containing digits will not match. If both `id` and `name` are ambiguous, the route with matching constraint applies.

- POST `/api/Users`
  - Description: Create a new user.
  - Request body: `User` entity (fields from model): `first_name`, `last_name`, `email`, `password_hash`, `phone_number`, `role`, optional `rfid_tag_id` etc.
  - Responses: 201 Created — Location of created resource, 400 BadRequest (invalid model).

- PUT `/api/Users/{id}`
  - Description: Update an existing user. Body is full `User` entity.
  - Responses: 204 NoContent, 400 BadRequest (id mismatch or invalid), other errors.

- DELETE `/api/Users/{id}`
  - Description: Delete user by id.
  - Responses: 204 NoContent, 404 NotFound.

Books

Base route: `/api/Books`

- GET `/api/Books`
  - Description: Returns list of books mapped to `BookDTO`.
  - `BookDTO` fields (as used by controller): `Title`, `Author`, `ISBN`, `Publisher`, `PublicationYear` (int), `CategoryId` (int), `TotalCopies`, `AvailableCopies`, `SalePrice` (decimal), `DigitalUrl`, `Description` (string), `UserNames` (array[string]).

- GET `/api/Books/{id:int}`
  - Description: Get book by numeric id. Returns `BookDTO`.
  - Responses: 200 OK, 404 NotFound.

- GET `/api/Books/{title:alpha}`
  - Description: Search books by title substring (route uses `alpha` constraint); returns list of matching Book entities.
  - Responses: 200 OK (array), 404 NotFound (none found).

RFID Tag

Base route: `/api/RFID_Tag`

- GET `/api/RFID_Tag`
  - Returns all RFID_Tag entities.

- GET `/api/RFID_Tag/{id}`
  - Returns single RFID_Tag by id or 404.

- POST `/api/RFID_Tag`
  - Create a tag. Request body: `RFID_Tag` entity.
  - Response: 201 Created.

- PUT `/api/RFID_Tag/{id}`
  - Update tag. Response: 204 NoContent, 400 BadRequest, 404 NotFound.

- DELETE `/api/RFID_Tag/{id}`
  - Delete tag. Response: 204 NoContent, 404 NotFound.

BookReservations

Base route: `/api/BookReservations`

- GET `/api/BookReservations` — list all reservations (entities).
- GET `/api/BookReservations/{id}` — single reservation or 404.
- POST `/api/BookReservations` — create reservation; body is `BookReservation` entity.
- PUT `/api/BookReservations/{id}` — update reservation; responses: 204, 400, 404.
- DELETE `/api/BookReservations/{id}` — delete reservation; 204 or 404.

BookSales

Base route: `/api/BookSales`

- GET `/api/BookSales` — list all sales.
- GET `/api/BookSales/{id}` — single sale or 404.
- POST `/api/BookSales` — create sale; body `BookSale`.
- PUT `/api/BookSales/{id}` — update sale; 204 or 400/404.
- DELETE `/api/BookSales/{id}` — delete sale; 204 or 404.

BookTransactions

Base route: `/api/BookTransactions`

- GET `/api/BookTransactions` — list all transactions.
- GET `/api/BookTransactions/{id}` — single transaction or 404.
- POST `/api/BookTransactions` — create transaction; body `BookTransaction`.
- PUT `/api/BookTransactions/{id}` — update transaction; 204 or 400/404.
- DELETE `/api/BookTransactions/{id}` — delete transaction; 204 or 404.

Categories

Base route: `/api/Categories`

- GET `/api/Categories` — list categories.
- GET `/api/Categories/{id}` — single category or 404.
- POST `/api/Categories` — create category; body `Category`.
- PUT `/api/Categories/{id}` — update category; 204 or 400/404.
- DELETE `/api/Categories/{id}` — delete category; 204 or 404.

Reports

Base route: `/api/Reports`

- GET `/api/Reports` — list reports (entities).
- GET `/api/Reports/{id}` — single report or 404.
- POST `/api/Reports` — create report; body `Report` (fields: `report_name`, `generated_by` (user id), `report_type`, optional `generated_at`, `file_path`).
- PUT `/api/Reports/{id}` — update report; 204 or 400/404.
- DELETE `/api/Reports/{id}` — delete; 204 or 404.

Common Patterns and Status Codes

- 200 OK — request succeeded and response body returned.
- 201 Created — resource created; Location header points to GET endpoint.
- 204 No Content — successful update or delete with no returned body.
- 400 Bad Request — invalid input, model validation failure, or id mismatch.
- 404 Not Found — resource not present.

Recommendations

- Remove `password_hash` from returned DTOs or mask it.
- Use asynchronous action methods consistently (prefer Task-based async) and return DTOs rather than EF entities in API responses.
- Add XML/Swagger comments for each action to auto-generate richer API docs (Swagger UI is already configured in project).
- Consider centralizing DTO definitions and using `AutoMapper` to keep controllers concise.

Swagger/OpenAPI

- The project already registers Swagger in `Program.cs` (AddSwaggerGen / UseSwagger / UseSwaggerUI). Add XML comments (generate docs file via project settings) and configure `SwaggerGen` to include them for detailed endpoint descriptions.

Contact

- For changes to models or DTOs, update this document accordingly.

