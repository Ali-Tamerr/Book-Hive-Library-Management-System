import { useQuery } from '@tanstack/react-query';
import { getAllOverdueBooks } from '../services/overdueBooks.api';
import { adminQueryOptions } from './queryConfig';

const overdueKeys = {
  all: ['overdueBooks'],
  lists: () => [...overdueKeys.all, 'list'],
  list: (filters) => [...overdueKeys.lists(), { filters }],
};

export const useOverdueBooks = () => {
  return useQuery({
    queryKey: overdueKeys.lists(),
    queryFn: getAllOverdueBooks,
    ...adminQueryOptions,
  });
};
