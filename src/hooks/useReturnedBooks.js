import { useQuery } from '@tanstack/react-query';
import { getAllBorrowedBooks } from '../services/borrowedBooks.api';

export const useReturnedBooks = () => {
    return useQuery({
        queryKey: ['returnedBooks'],
        queryFn: getAllBorrowedBooks,
        select: (data) => {
            // Filter for books that have been returned
            return data.filter(transaction =>
                transaction.return_date !== null ||
                transaction.status === 'Returned'
            );
        },
        staleTime: 5 * 60 * 1000,
    });
};

export default useReturnedBooks;
