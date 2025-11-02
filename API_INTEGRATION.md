# Book Hive - API Integration Guide

## Overview
This React application is now fully integrated with the Library Management System API hosted at:
**https://library-management-system-bqdmafdqfdamdefv.uaenorth-01.azurewebsites.net**

## API Services

All API services are located in the `src/services/` directory:

### Core Services

1. **api.config.js** - Base API configuration and helper functions
   - Base URL configuration
   - HTTP request wrappers (GET, POST, PUT, DELETE)
   - Authentication token management

2. **auth.api.js** - Authentication services
   - `login(username, password)` - Authenticate user
   - `signup(userData)` - Create new user account
   - `logout()` - Clear authentication
   - `getCurrentUser()` - Get logged-in user info
   - `isAuthenticated()` - Check auth status

3. **users.api.js** - User management
   - `getAllUsers()` - Get all users
   - `getUserById(id)` - Get user by ID
   - `getUserByName(name)` - Get user by name
   - `createUser(userData)` - Create new user
   - `updateUser(id, userData)` - Update user
   - `deleteUser(id)` - Delete user

4. **books.api.js** - Book management
   - `getAllBooks()` - Get all books
   - `getBookById(id)` - Get book by ID
   - `searchBooksByTitle(title)` - Search books by title
   - `createBook(bookData)` - Create new book
   - `updateBook(id, bookData)` - Update book
   - `deleteBook(id)` - Delete book

5. **bookReservations.api.js** - Book reservations
   - `getAllReservations()` - Get all reservations
   - `getReservationById(id)` - Get reservation by ID
   - `createReservation(reservationData)` - Create reservation
   - `updateReservation(id, reservationData)` - Update reservation
   - `deleteReservation(id)` - Delete reservation

6. **bookTransactions.api.js** - Transactions
   - `getAllTransactions()` - Get all transactions
   - `getTransactionById(id)` - Get transaction by ID
   - `createTransaction(transactionData)` - Create transaction
   - `updateTransaction(id, transactionData)` - Update transaction
   - `deleteTransaction(id)` - Delete transaction

7. **categories.api.js** - Categories
   - `getAllCategories()` - Get all categories
   - `getCategoryById(id)` - Get category by ID
   - `createCategory(categoryData)` - Create category
   - `updateCategory(id, categoryData)` - Update category
   - `deleteCategory(id)` - Delete category

## Updated Pages

### Login Page (`src/pages/Login.jsx`)
- Integrated with authentication API
- Error handling and loading states
- Redirects to dashboard on successful login

### Signup Page (`src/pages/Signup.jsx`)
- Creates new users via API
- Form validation
- Error handling

### Dashboard (`src/pages/Dashboard.jsx`)
- Fetches real-time statistics:
  - Total users
  - Total books
  - Total borrowed books
  - Overdue borrowers
- Displays current user information
- Shows live data from the API

### BorrowedBooks (`src/pages/BorrowedBooks.jsx`)
- Lists all book reservations from API
- Filterable and searchable
- Modal popup for detailed book information

### Overdue (`src/pages/Overdue.jsx`)
- Filters reservations by due date
- Shows only overdue books
- Real-time data updates

### UserManagement (`src/pages/UserManagement.jsx`)
- Full CRUD operations for users:
  - Create new users
  - Edit existing users
  - Delete users
  - Search and filter users
- Integrated with Users API

## Authentication

The app uses localStorage to manage authentication:
- Token stored in `localStorage.authToken`
- User data stored in `localStorage.currentUser`
- Logout clears all auth data

## Data Flow

1. **Login**: User credentials → API validation → Store token → Navigate to dashboard
2. **Data Fetching**: Components load data on mount using `useEffect`
3. **CRUD Operations**: All operations use async/await with error handling
4. **State Management**: React state hooks for local data management

## Error Handling

- All API calls wrapped in try-catch blocks
- Loading states for better UX
- Error messages displayed to users
- Console logging for debugging

## Running the Application

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints Used

- GET `/api/Users` - Fetch all users
- POST `/api/Users` - Create new user
- PUT `/api/Users/{id}` - Update user
- DELETE `/api/Users/{id}` - Delete user
- GET `/api/Books` - Fetch all books
- GET `/api/BookReservations` - Fetch all reservations
- GET `/api/Categories` - Fetch all categories

## Future Enhancements

- Implement proper password hashing
- Add JWT token-based authentication
- Add refresh token mechanism
- Implement role-based access control
- Add file upload for book images
- Implement pagination for large datasets
- Add data caching for better performance

