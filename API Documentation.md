Library Management System - API Documentation

Overview

This document describes the Web API endpoints implemented in the project. Base route for controllers: `/api/[controller]`.

Notes
- All endpoints return JSON.
- Where controllers return EF entity types directly, the shapes reflect the `Models` classes.
- Some controllers map entities to DTOs (e.g. `UsersController`, `BooksController`).
- Sensitive fields: `password_hash` is currently returned by `Users` DTOs — remove in production.

Breaking change: BookDTO property renames
- The `BookDTO` used by `BooksController` has been changed to use the same property names as the `Book` model (snake_case) to avoid confusion and ensure the frontend can reliably reference the numeric primary key.
- New `BookDTO` fields (match `Models/Book`):
  - `book_id` (int)
  - `isbn` (string)
  - `title` (string)
  - `author` (string)
  - `publisher` (string)
  - `publication_year` (int?)
  - `category_id` (int)
  - `total_copies` (int)
  - `available_copies` (int)
  - `sale_price` (decimal?)
  - `digital_url` (string)

- DTO-only fields remain (snake_case):
  - `description` (string)
  - `user_names` (array[string])

Why this change
- The frontend needs the integer primary key (`book_id`) to call `PUT /api/Books/{id:int}` and `DELETE /api/Books/{id:int}`. Returning `book_id` in the DTO fixes edit/delete route usage and avoids sending ISBN strings where an integer is required.

Frontend impact
- The JSON returned from `GET /api/Books` and `GET /api/Books/{id}` now uses snake_case keys as listed above. Update the frontend to read/write those keys or add a client-side mapping layer.

Recommendations
- Prefer accepting a dedicated input DTO for POST/PUT (e.g., `BookInputDTO`) instead of binding the EF `Book` entity directly. This prevents clients from sending navigation properties that could attach or conflict with tracked entities.
- Consider using `AutoMapper` to map between entity models and DTOs, keeping controller code concise and preventing accidental model binding of navigation properties.
- Keep API documentation and frontend code in sync after making field-name changes.

(Other sections remain unchanged — see below for existing endpoint docs.)

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
  - `BookDTO` fields (as used by controller): use the snake_case names documented above.

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
  - Behavior: On success, controller persists the book, reloads related collections (`BookReservations`, `BookSales`, `BookTransactions`) to build a `BookDTO.user_names` list and returns 201 Created with the DTO and Location header (CreatedAtAction).
  - Responses: 201 Created (DTO), 400 BadRequest (validation), 409 Conflict (duplicate ISBN).

- PUT `/api/Books/{id:int}`
  - Description: Update an existing book. Controller validates payload similarly to POST.
  - Validations: same as POST plus ensure the ISBN is not used by another book.
  - Behavior: Applies changes, saves, and returns the updated `BookDTO` (200 OK) constructed via the controller's `ToDTO` helper which populates `user_names` from related collections.
  - Responses: 200 OK (updated DTO), 400 BadRequest (validation), 404 NotFound, 409 Conflict.

- DELETE `/api/Books/{id:int}`
  - Description: Delete a book if it has no related reservations, sales, or transactions.
  - Behavior: Controller loads related collections and refuses delete with 400 BadRequest when related records exist.
  - Responses: 204 NoContent, 404 NotFound, 400 BadRequest (has related records).

Notes on `BooksController` implementation
- The controller includes a private `ToDTO(Book book)` helper used to construct `BookDTO`s and populate `user_names` by concatenating names from related reservations, sales and transactions.
- POST and PUT actions reload related collections (via `Include`/`ThenInclude`) before returning a DTO so that `user_names` contains accurate values.

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

Base route: `/api/BookReservations` — list, get, create, update, delete.

BookSales

Base route: `/api/BookSales` — list, get, create, update, delete.

BookTransactions

Base route: `/api/BookTransactions` — list, get, create, update, delete.

Categories

Base route: `/api/Categories` — list, get, create, update, delete.

Reports

Base route: `/api/Reports` — list, get, create, update, delete.

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

