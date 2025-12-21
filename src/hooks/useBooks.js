import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllBooks,
  getBookById,
  searchBooksByTitle,
  createBook,
  updateBook,
  deleteBook
} from '../services/books.api';
import { adminQueryOptions } from './queryConfig';

export const bookKeys = {
  all: ['books'],
  lists: () => [...bookKeys.all, 'list'],
  list: (filters) => [...bookKeys.lists(), { filters }],
  details: () => [...bookKeys.all, 'detail'],
  detail: (id) => [...bookKeys.details(), id],
};

export const useBooks = () => {
  return useQuery({
    queryKey: bookKeys.lists(),
    queryFn: getAllBooks,
    ...adminQueryOptions,
  });
};

// Get single book hook
export const useBook = (id) => {
  return useQuery({
    queryKey: bookKeys.detail(id),
    queryFn: () => getBookById(id),
    enabled: !!id,
  });
};

// Search books hook
export const useSearchBooks = (searchTerm) => {
  return useQuery({
    queryKey: [...bookKeys.lists(), 'search', searchTerm],
    queryFn: () => searchBooksByTitle(searchTerm),
    enabled: !!searchTerm && searchTerm.length > 0,
  });
};

// Create book mutation
export const useCreateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
    },
  });
};

// Update book mutation
export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => updateBook(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: bookKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
    },
  });
};

// Delete book mutation
export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
    },
  });
};

