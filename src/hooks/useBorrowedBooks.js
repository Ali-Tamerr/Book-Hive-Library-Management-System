import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAllBorrowedBooks, 
  getBorrowedBookById, 
  createBorrowedBook, 
  updateBorrowedBook, 
  deleteBorrowedBook 
} from '../services/borrowedBooks.api';
import { adminQueryOptions } from './queryConfig';

export const borrowedBooksKeys = {
  all: ['borrowedBooks'],
  lists: () => [...borrowedBooksKeys.all, 'list'],
  list: (filters) => [...borrowedBooksKeys.lists(), { filters }],
  details: () => [...borrowedBooksKeys.all, 'detail'],
  detail: (id) => [...borrowedBooksKeys.details(), id],
};

export const useBorrowedBooks = () => {
  return useQuery({
    queryKey: borrowedBooksKeys.lists(),
    queryFn: getAllBorrowedBooks,
    ...adminQueryOptions,
  });
};

// Get single borrowed book hook
export const useBorrowedBook = (id) => {
  return useQuery({
    queryKey: borrowedBooksKeys.detail(id),
    queryFn: () => getBorrowedBookById(id),
    enabled: !!id,
  });
};

// Create borrowed book mutation
export const useCreateBorrowedBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createBorrowedBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: borrowedBooksKeys.lists() });
    },
  });
};

// Update borrowed book mutation
export const useUpdateBorrowedBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => updateBorrowedBook(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: borrowedBooksKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: borrowedBooksKeys.lists() });
    },
  });
};

// Delete borrowed book mutation
export const useDeleteBorrowedBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteBorrowedBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: borrowedBooksKeys.lists() });
    },
  });
};
