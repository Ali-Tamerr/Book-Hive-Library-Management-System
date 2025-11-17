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
    - `LastActivityAt` (DateTime?) — timestamp of the user's last activity (nullable)
  - Notes: `UserDTO.LastActivityAt` includes XML comments and is exposed in Swagger/OpenAPI.

- GET `/api/Users/{id:int}`
  - Description: Get single user by numeric id. Returns `UserDTO`.
  - Responses: 200 OK (user), 404 NotFound (message: "User not found"). The returned `UserDTO` includes `LastActivityAt` as above.

- GET `/api/Users/{name:alpha}`
  - Description: Get user by alphabetic first name. Returns `UserDTO`.
  - Responses: 200 OK (user), 404 NotFound.
  - Notes: Route constraint `alpha` means segments containing digits will not match. If both `id` and `name` are ambiguous, the route with matching constraint applies. The returned `UserDTO` includes `LastActivityAt`.

- PUT `/api/Users/{id}/activity`
  - Description: Update the `last_activity_at` timestamp for the user identified by `id`.
  - Behavior: Controller sets the model's `last_activity_at` to the current UTC time and persists the change.
  - Request body: none (id in route)
  - Responses: 204 NoContent — update succeeded, 404 NotFound (message: "User not found").
  - Notes: This endpoint is documented with XML comments to appear in Swagger/OpenAPI.

- POST `/api/Users`
  - Description: Create a new user.
  - Request body: `User` entity (fields from model): `first_name`, `last_name`, `email`, `password_hash`, `phone_number`, `role`, optional `rfid_tag_id` etc.
  - Responses: Current controller returns 200 OK on success (note: documentation previously expected 201 Created; consider changing controller to return 201 and Location header).

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

- POST `/api/Books`
  - Description: Create a new book. Controller validates payload and returns the created `BookDTO`.
  - Validations:
    - `isbn` and `title` are required (non-empty).
    - `total_copies` and `available_copies` must be non-negative.
    - `available_copies` cannot be greater than `total_copies`.
    - Duplicate ISBN results in 409 Conflict.
  - Behavior: On success, controller persists the book, reloads related collections (`BookReservations`, `BookSales`, `BookTransactions`) to build a `BookDTO.UserNames` list and returns 201 Created with the DTO and Location header (CreatedAtAction).
  - Responses: 201 Created (DTO), 400 BadRequest (validation), 409 Conflict (duplicate ISBN).

- PUT `/api/Books/{id:int}`
  - Description: Update an existing book. Controller validates payload similarly to POST.
  - Validations: same as POST plus ensure the ISBN is not used by another book.
  - Behavior: Applies changes, saves, and returns the updated `BookDTO` (200 OK) constructed via the controller's `ToDTO` helper which populates `UserNames` from related collections.
  - Responses: 200 OK (updated DTO), 400 BadRequest (validation), 404 NotFound, 409 Conflict.

- DELETE `/api/Books/{id:int}`
  - Description: Delete a book if it has no related reservations, sales, or transactions.
  - Behavior: Controller loads related collections and refuses delete with 400 BadRequest when related records exist.
  - Responses: 204 NoContent, 404 NotFound, 400 BadRequest (has related records).

Notes on `BooksController` implementation
- The controller includes a private `ToDTO(Book book)` helper used to construct `BookDTO`s and populate `UserNames` by concatenating names from related reservations, sales and transactions.
- POST and PUT actions reload related collections (via `Include`/`ThenInclude`) before returning a DTO so that `UserNames` contains accurate values.

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
- POST `/api/BookTransactions` — create transaction; body is `BookTransaction`.
- PUT `/api/BookTransactions/{id}` — update transaction; 204 or 400/404.
- DELETE `/api/BookTransactions/{id}` — delete transaction; 204 or 404.

Categories

Base route: `/api/Categories`

- GET `/api/Categories` — list categories.
- GET `/api/Categories/{id}` — single category or 404.
- POST `/api/Categories` — create category; body is `Category`.
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
- 201 Created — resource created; Location header points to GET endpoint (used by BooksController POST).
- 204 No Content — successful update or delete with no returned body.
- 400 Bad Request — invalid input, model validation failure, or id mismatch.
- 404 Not Found — resource not present.

Recommendations

- Remove `password_hash` from returned DTOs or mask it.
- Use asynchronous action methods consistently (prefer Task-based async) and return DTOs rather than EF entities in API responses.
- Add XML/Swagger comments for each action to auto-generate richer API docs (Swagger UI is already configured in project). The `UsersController.UpdateActivity` and `UserDTO.LastActivityAt` already include XML comments to appear in Swagger.
- Consider centralizing DTO definitions and using `AutoMapper` to keep controllers concise.

Swagger/OpenAPI

- The project already registers Swagger in `Program.cs` (AddSwaggerGen / UseSwagger / UseSwaggerUI). Add XML comments (generate docs file via project settings) and configure `SwaggerGen` to include them for detailed endpoint descriptions.

Contact

- For changes to models or DTOs, update this document accordingly.

