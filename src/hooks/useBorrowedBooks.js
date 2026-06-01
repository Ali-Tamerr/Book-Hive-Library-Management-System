import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAllBorrowedBooks, 
  getBorrowedBookById, 
  createBorrowedBook, 
  updateBorrowedBook, 
  deleteBorrowedBook 
} from '../services/borrowedBooks.api';
import { adminQueryOptions } from './queryConfig';
import { bookKeys } from './useBooks';

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
    queryFn: async () => {
      return await getAllBorrowedBooks();
    },
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
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: borrowedBooksKeys.all });
      queryClient.invalidateQueries({ queryKey: ["bookTransactions"] });
      localStorage.removeItem("transactions_all_cache");
      localStorage.removeItem("transactions_dashboard_cache");
      localStorage.removeItem("borrowed_books_cache");
      localStorage.removeItem("overdue_books_cache");
      localStorage.removeItem("dashboard_books_cache");
      localStorage.removeItem("dashboard_resolved_cache");
      if (variables?.user_id) {
        queryClient.invalidateQueries({
          queryKey: bookKeys.recommendations(variables.user_id),
        });
        localStorage.removeItem(`ai_recommendations_${variables.user_id}`);
      }
    },
  });
};

// Update borrowed book mutation
export const useUpdateBorrowedBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => updateBorrowedBook(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: borrowedBooksKeys.all });
      queryClient.invalidateQueries({ queryKey: ["bookTransactions"] });
      localStorage.removeItem("transactions_all_cache");
      localStorage.removeItem("transactions_dashboard_cache");
      localStorage.removeItem("borrowed_books_cache");
      localStorage.removeItem("overdue_books_cache");
      localStorage.removeItem("dashboard_books_cache");
      localStorage.removeItem("dashboard_resolved_cache");
    },
  });
};

// Delete borrowed book mutation
export const useDeleteBorrowedBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteBorrowedBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: borrowedBooksKeys.all });
      queryClient.invalidateQueries({ queryKey: ["bookTransactions"] });
      localStorage.removeItem("transactions_all_cache");
      localStorage.removeItem("transactions_dashboard_cache");
      localStorage.removeItem("borrowed_books_cache");
      localStorage.removeItem("overdue_books_cache");
      localStorage.removeItem("dashboard_books_cache");
      localStorage.removeItem("dashboard_resolved_cache");
    },
  });
};
