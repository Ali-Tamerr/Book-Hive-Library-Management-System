import { useQuery } from '@tanstack/react-query';
import { getAllBorrowedBooks } from '../../admin/services/borrowedBooks.api';

// Query Key Factory
export const returnedBooksKeys = {
  all: ['returnedBooks'],
  lists: () => [...returnedBooksKeys.all, 'list'],
  list: (filters) => [...returnedBooksKeys.lists(), { filters }],
};

// Get all returned books hook
export const useReturnedBooks = () => {
  return useQuery({
    queryKey: returnedBooksKeys.lists(),
    queryFn: async () => {
      const allBorrowedBooks = await getAllBorrowedBooks();
      return allBorrowedBooks.filter(book => book.return_date);
    },
    staleTime: 5 * 60 * 1000, 
  });
};
