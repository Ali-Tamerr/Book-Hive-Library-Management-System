import { useQuery } from '@tanstack/react-query';
import { getAllOverdueBooks } from '../services/overdueBooks.api';
import { adminQueryOptions } from './queryConfig';

const overdueKeys = {
  all: ['overdueBooks'],
  lists: () => [...overdueKeys.all, 'list'],
  list: (filters) => [...overdueKeys.lists(), { filters }],
};

export const useOverdueBooks = () => {
  const cacheKey = "overdue_books_cache";

  return useQuery({
    queryKey: overdueKeys.lists(),
    queryFn: async () => {
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        try {
          return JSON.parse(cachedData);
        } catch (e) {}
      }

      const data = await getAllOverdueBooks();
      localStorage.setItem(cacheKey, JSON.stringify(data));
      return data;
    },
    ...adminQueryOptions,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
