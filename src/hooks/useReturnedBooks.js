import { useQuery } from '@tanstack/react-query';
import { getAllBorrowedBooks } from '../services/borrowedBooks.api';
import { adminQueryOptions } from './queryConfig';

export const useReturnedBooks = () => {
    return useQuery({
        queryKey: ['returnedBooks'],
        queryFn: async () => {
            return await getAllBorrowedBooks();
        },
        select: (data) => {
            return data.filter(transaction =>
                transaction.return_date !== null ||
                transaction.status === 'Returned'
            );
        },
        ...adminQueryOptions,
    });
};

export default useReturnedBooks;
