import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllBookSales,
  getBookSaleById,
  createBookSale,
  updateBookSale,
  deleteBookSale
} from '../services/bookSales.api';
// Query Key Factory
export const bookSalesKeys = {
  all: ['bookSales'],
  lists: () => [...bookSalesKeys.all, 'list'],
  list: (filters) => [...bookSalesKeys.lists(), { filters }],
  details: () => [...bookSalesKeys.all, 'detail'],
  detail: (id) => [...bookSalesKeys.details(), id],
};

// Get all book sales hook
export const useBookSales = () => {
  return useQuery({
    queryKey: bookSalesKeys.lists(),
    queryFn: getAllBookSales,
    staleTime: 5 * 60 * 1000, 
  });
};

// Get single book sale hook
export const useBookSale = (id) => {
  return useQuery({
    queryKey: bookSalesKeys.detail(id),
    queryFn: () => getBookSaleById(id),
    enabled: !!id,
  });
};

// Create book sale mutation
export const useCreateBookSale = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createBookSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookSalesKeys.lists() });
    },
  });
};

// Update book sale mutation
export const useUpdateBookSale = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => updateBookSale(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: bookSalesKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: bookSalesKeys.lists() });
    },
  });
};

// Delete book sale mutation
export const useDeleteBookSale = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteBookSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookSalesKeys.lists() });
    },
  });
};