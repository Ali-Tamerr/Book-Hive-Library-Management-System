import { useQuery } from '@tanstack/react-query';
import { getAllBorrowedBooks } from '../services/borrowedBooks.api';
import { adminQueryOptions } from './queryConfig';

export const useReturnedBooks = () => {
    const cacheKey = "borrowed_books_cache";

    return useQuery({
        queryKey: ['returnedBooks'],
        queryFn: async () => {
            const cachedData = localStorage.getItem(cacheKey);
            if (cachedData) {
                try {
                    return JSON.parse(cachedData);
                } catch (e) {}
            }

            const data = await getAllBorrowedBooks();
            localStorage.setItem(cacheKey, JSON.stringify(data));
            return data;
        },
        select: (data) => {
            return data.filter(transaction =>
                transaction.return_date !== null ||
                transaction.status === 'Returned'
            );
        },
        ...adminQueryOptions,
        staleTime: Infinity,
        gcTime: Infinity,
    });
};

export default useReturnedBooks;
