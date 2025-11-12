import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook 
} from '../../admin/services/books.api';
// Query Key Factory
export const bookKeys = {
  all: ['books'],
  lists: () => [...bookKeys.all, 'list'],
  list: (filters) => [...bookKeys.lists(), { filters }],
  details: () => [...bookKeys.all, 'detail'],
  detail: (id) => [...bookKeys.details(), id],
};

// Get all books hook
export const useBooks = () => {
  return useQuery({
    queryKey: bookKeys.lists(),
    queryFn: getAllBooks,
    staleTime: 5 * 60 * 1000,
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

