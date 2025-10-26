# React Query & Axios Integration Guide

## What We Installed

### 1. **Axios** 🚀
A promise-based HTTP client for making API requests. Much better than fetch()!

### 2. **React Query (TanStack Query)** ⚡
The best library for data fetching in React - handles caching, refetching, and state management automatically!

### 3. **React Query Devtools** 🔧
Developer tools to visualize your queries, cache state, and debug API calls.

---

## Benefits Over Plain Fetch

### ❌ **Before (with plain fetch)**
```jsx
// Manual state management everywhere
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetch('/api/users');
      setUsers(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  loadUsers();
}, []);
```

### ✅ **After (with React Query)**
```jsx
// Automatic caching, loading, error states!
const { data: users, isLoading, error } = useUsers();
```

---

## Key Features

### 1. **Automatic Caching** 🗄️
- Data is cached automatically
- No unnecessary API calls
- Data shared across components
- Configurable cache time (we set 5 minutes)

### 2. **Smart Refetching** 🔄
- Refetches on window focus
- Background updates
- Configurable stale time
- Automatic garbage collection

### 3. **Built-in Loading & Error States** ✅
```jsx
const { data, isLoading, isError, error } = useUsers();

if (isLoading) return <Loading />;
if (isError) return <Error message={error} />;
return <UserList users={data} />;
```

### 4. **Optimistic Updates** 🎯
Update UI before API confirms - instant feedback!

### 5. **Mutations with Auto-refetch** 🔄
```jsx
const deleteUser = useDeleteUser();

// Delete and automatically refetch users list
deleteUser.mutate(userId);
```

---

## Available Hooks

### Users (`src/hooks/useUsers.js`)
```jsx
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../hooks/useUsers';

// Fetch all users
const { data: users, isLoading } = useUsers();

// Create user
const createUser = useCreateUser();
createUser.mutate({ name: 'John', email: 'john@example.com' });

// Update user
const updateUser = useUpdateUser();
updateUser.mutate({ id: 1, data: { name: 'Jane' } });

// Delete user (automatically refetches list!)
const deleteUser = useDeleteUser();
deleteUser.mutate(userId);
```

### Books (`src/hooks/useBooks.js`)
```jsx
import { useBooks, useCreateBook, useUpdateBook, useDeleteBook } from '../hooks/useBooks';

const { data: books, isLoading } = useBooks();
const { data: book } = useBook(bookId);
```

### Reservations (`src/hooks/useReservations.js`)
```jsx
import { useReservations, useCreateReservation } from '../hooks/useReservations';

const { data: reservations, isLoading } = useReservations();
```

---

## Updated Components

### Dashboard
**Before:** Manual `useEffect` with `useState` for loading  
**After:** Simple `useUsers()`, `useBooks()`, `useReservations()` hooks

### UserManagement
**Before:** Manual state management for loading, error, data  
**After:** Automatic with `useUsers()` and mutation hooks

---

## How React Query Works

### 1. **Query Keys** 🔑
```jsx
// Organized key structure
export const userKeys = {
  all: ['users'],
  lists: () => [...userKeys.all, 'list'],
  detail: (id) => [...userKeys.details(), id],
};
```

### 2. **Automatic Refetching**
- When mutation succeeds, invalidate queries
- Automatically refetch stale data
- Update cache with new data

### 3. **Optimistic Updates**
```jsx
onMutate: async (newUser) => {
  // Cancel outgoing refetches
  await queryClient.cancelQueries({ queryKey: userKeys.lists() });
  
  // Snapshot previous value
  const previousUsers = queryClient.getQueryData(userKeys.lists());
  
  // Optimistically update
  queryClient.setQueryData(userKeys.lists(), (old) => [...old, newUser]);
  
  return { previousUsers };
},
```

---

## Axios Benefits

### 1. **Request/Response Interceptors** 🔄
```jsx
// Automatically add auth token to all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle errors consistently
  }
);
```

### 2. **Better Error Handling**
```jsx
// Axios provides more details
error.response.status    // HTTP status code
error.response.data      // Response body
error.response.headers   // Response headers
```

### 3. **Automatic JSON Parsing**
```jsx
// Automatically parses JSON - no manual .json()
const data = await axiosInstance.get('/users'); // Already parsed!
```

---

## React Query Devtools

Once you run the app, you'll see a floating button in the bottom corner that opens the React Query Devtools.

### What You Can See:
- ✅ All active queries
- ✅ Cache status
- ✅ Data in cache
- ✅ Refetching status
- ✅ Query inspector

### How to Use:
1. Run `npm run dev`
2. Look for the React Query logo in the bottom corner
3. Click to open the Devtools
4. Inspect all your queries and mutations!

---

## Best Practices

### 1. **Use Hooks in Components**
```jsx
// ✅ Good - Use custom hook
const { data, isLoading } = useUsers();

// ❌ Bad - Don't use API directly
const users = await getAllUsers();
```

### 2. **Handle Loading States**
```jsx
if (isLoading) return <Loader />;
if (isError) return <ErrorMessage error={error} />;
```

### 3. **Use Mutations with Optimistic Updates**
```jsx
const mutation = useUpdateUser({
  onSuccess: () => {
    // Show success toast
  },
  onError: (error) => {
    // Show error toast
  }
});
```

### 4. **Organize Query Keys**
```jsx
// Centralized query key factory
export const userKeys = {
  all: ['users'],
  list: () => [...userKeys.all, 'list'],
};
```

---

## Migration Path

Already converted:
- ✅ `Dashboard.jsx` - Using React Query hooks
- ✅ `UserManagement.jsx` - Using React Query with mutations

To convert more components:
1. Import the hook (e.g., `useBooks`)
2. Replace `useState` + `useEffect` with hook
3. Use `data`, `isLoading`, `error` from hook
4. That's it! No more manual loading states!

---

## Advanced Features

### 1. **Parallel Queries**
```jsx
const { data: users } = useUsers();
const { data: books } = useBooks();
// Both run in parallel automatically!
```

### 2. **Dependent Queries**
```jsx
const { data: user } = useUser(userId);
const { data: reservations } = useReservations(user?.id);
```

### 3. **Conditional Queries**
```jsx
const { data } = useQuery({
  queryKey: ['book', bookId],
  queryFn: () => getBook(bookId),
  enabled: !!bookId, // Only fetch if bookId exists
});
```

### 4. **Infinite Scroll**
```jsx
const { data, fetchNextPage } = useInfiniteQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
});
```

---

## Performance Benefits

### Before:
- ❌ Every render might fetch data
- ❌ No caching
- ❌ Manual loading states everywhere
- ❌ No background updates

### After:
- ✅ Smart caching - data reused
- ✅ Background refetching
- ✅ Automatic loading/error states
- ✅ Optimistic updates
- ✅ 50-70% fewer API calls!

---

## Resources

- [React Query Docs](https://tanstack.com/query/latest)
- [Axios Docs](https://axios-http.com/)
- [React Query Devtools](https://tanstack.com/query/latest/docs/react/devtools)

---

## Quick Start

```bash
npm install axios @tanstack/react-query @tanstack/react-query-devtools
```

Then use the hooks we created:
```jsx
import { useUsers } from './hooks/useUsers';

function MyComponent() {
  const { data: users, isLoading } = useUsers();
  return <div>{/* render users */}</div>;
}
```

That's it! Data fetching made simple! 🎉

