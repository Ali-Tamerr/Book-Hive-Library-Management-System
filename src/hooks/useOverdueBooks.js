import { useQuery } from '@tanstack/react-query';
import { getAllOverdueBooks } from '../services/overdueBooks.api';

const overdueKeys = {
  all: ['overdueBooks'],
  lists: () => [...overdueKeys.all, 'list'],
  list: (filters) => [...overdueKeys.lists(), { filters }],
};

export const useOverdueBooks = () => {
  return useQuery({
    queryKey: overdueKeys.lists(),
    queryFn: getAllOverdueBooks,
    staleTime: 5 * 60 * 1000,
  });
};
