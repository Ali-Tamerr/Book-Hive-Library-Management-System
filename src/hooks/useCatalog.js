import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../services/books.api';
import { adminQueryOptions } from './queryConfig';

export const newBooksKeys = {
  all: ['newBooks'],
  lists: () => [...newBooksKeys.all, 'list'],
  list: (filters) => [...newBooksKeys.lists(), { filters }],
  details: () => [...newBooksKeys.all, 'detail'],
  detail: (id) => [...newBooksKeys.details(), id],
};

export const useNewBooks = () => {
  return useQuery({
    queryKey: newBooksKeys.lists(),
    queryFn: getAllBooks,
    ...adminQueryOptions,
  });
};

// Get single book hook
export const useNewBook = (id) => {
  return useQuery({
    queryKey: newBooksKeys.detail(id),
    queryFn: () => getBookById(id),
    enabled: !!id,
  });
};

// Create book mutation
export const useCreateNewBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newBooksKeys.lists() });
    },
  });
};

// Update book mutation
export const useUpdateNewBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => updateBook(id, data),
    onSuccess: (data, variables) => {
      // Update the specific book in cache
      queryClient.invalidateQueries({ queryKey: newBooksKeys.detail(variables.id) });
      // Refetch all books
      queryClient.invalidateQueries({ queryKey: newBooksKeys.lists() });
    },
  });
};

// Delete book mutation
export const useDeleteNewBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      // Invalidate and refetch books list
      queryClient.invalidateQueries({ queryKey: newBooksKeys.lists() });
    },
  });
};
