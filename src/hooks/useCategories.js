import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllCategories,
  getCategoryById,
  getCategoryManagementSummary,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categories.api';
import { adminQueryOptions } from './queryConfig';

export const categoryKeys = {
  all: ['categories'],
  lists: () => [...categoryKeys.all, 'list'],
  list: (filters) => [...categoryKeys.lists(), { filters }],
  management: () => [...categoryKeys.all, 'management'],
  details: () => [...categoryKeys.all, 'detail'],
  detail: (id) => [...categoryKeys.details(), id],
};

export const useCategories = (options = {}) => {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: getAllCategories,
    ...adminQueryOptions,
    ...options,
  });
};

export const useCategoriesManagement = () => {
  return useQuery({
    queryKey: categoryKeys.management(),
    queryFn: getCategoryManagementSummary,
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
      queryClient.invalidateQueries({ queryKey: categoryKeys.management() });
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
      queryClient.invalidateQueries({ queryKey: categoryKeys.management() });
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
      queryClient.invalidateQueries({ queryKey: categoryKeys.management() });
    },
  });
};