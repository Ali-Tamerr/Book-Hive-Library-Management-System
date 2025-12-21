import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../services/categories.api';
import { adminQueryOptions } from './queryConfig';

export const categoryKeys = {
  all: ['categories'],
  lists: () => [...categoryKeys.all, 'list'],
  list: (filters) => [...categoryKeys.lists(), { filters }],
  details: () => [...categoryKeys.all, 'detail'],
  detail: (id) => [...categoryKeys.details(), id],
};

export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: getAllCategories,
    ...adminQueryOptions,
  });
};

// Get single category hook
export const useCategory = (id) => {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
};

// Create category mutation
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });
};

// Update category mutation
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => updateCategory(id, data),
    onSuccess: (data, variables) => {
      // Update the specific category in cache
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(variables.id) });
      // Refetch all categories
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });
};

// Delete category mutation
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      // Invalidate and refetch categories list
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });
};