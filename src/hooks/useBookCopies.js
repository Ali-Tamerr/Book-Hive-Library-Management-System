import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllBookCopies,
  getBookCopyById,
  getBookCopiesByBookId,
  createBookCopy,
  deleteBookCopy
} from '../services/bookCopies.api';
import { bookKeys } from './useBooks';
import { adminQueryOptions } from './queryConfig';

export const bookCopyKeys = {
  all: ['bookCopies'],
  lists: () => [...bookCopyKeys.all, 'list'],
  byBook: (bookId) => [...bookCopyKeys.all, 'byBook', bookId],
  detail: (id) => [...bookCopyKeys.all, 'detail', id],
};

export const useBookCopies = () => {
  return useQuery({
    queryKey: bookCopyKeys.lists(),
    queryFn: getAllBookCopies,
    ...adminQueryOptions,
  });
};

export const useBookCopiesByBookId = (bookId) => {
  return useQuery({
    queryKey: bookCopyKeys.byBook(bookId),
    queryFn: () => getBookCopiesByBookId(bookId),
    enabled: !!bookId,
  });
};

export const useBookCopy = (id) => {
  return useQuery({
    queryKey: bookCopyKeys.detail(id),
    queryFn: () => getBookCopyById(id),
    enabled: !!id,
  });
};

export const useCreateBookCopy = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createBookCopy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookCopyKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
    },
  });
};

export const useDeleteBookCopy = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteBookCopy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookCopyKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
    },
  });
};
