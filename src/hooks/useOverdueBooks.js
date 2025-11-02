import { useQuery } from '@tanstack/react-query';
import { getAllOverdueBooks } from '../services/overdueBooks.api';

// Query Key Factory
export const overdueBooksKeys = {
  all: ['overdueBooks'],
  lists: () => [...overdueBooksKeys.all, 'list'],
  list: (filters) => [...overdueBooksKeys.lists(), { filters }],
};

// Get all overdue books hook
export const useOverdueBooks = () => {
  return useQuery({
    queryKey: overdueBooksKeys.lists(),
    queryFn: getAllOverdueBooks,
    stleTime: 5 * 60 * 1000, 
  });
};
