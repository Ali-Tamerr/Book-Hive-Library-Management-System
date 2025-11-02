import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllBranches, getBranchById, createBranch, updateBranch, deleteBranch } from '../services/branches.api';

// Query Key Factory
export const branchKeys = {
  all: ['branches'],
  lists: () => [...branchKeys.all, 'list'],
  list: (filters) => [...branchKeys.lists(), { filters }],
  details: () => [...branchKeys.all, 'detail'],
  detail: (id) => [...branchKeys.details(), id],
};

// Get all branches hook
export const useBranches = () => {
  return useQuery({
    queryKey: branchKeys.lists(),
    queryFn: getAllBranches,
    staleTime: 5 * 60 * 1000, 
  });
};

// Get single branch hook
export const useBranch = (id) => {
  return useQuery({
    queryKey: branchKeys.detail(id),
    queryFn: () => getBranchById(id),
    enabled: !!id,
  });
};

// Create branch mutation
export const useCreateBranch = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
    },
  });
};

// Update branch mutation
export const useUpdateBranch = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => updateBranch(id, data),
    onSuccess: (data, variables) => {
      // Update the specific branch in cache
      queryClient.invalidateQueries({ queryKey: branchKeys.detail(variables.id) });
      // Refetch all branches
      queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
    },
  });
};

// Delete branch mutation
export const useDeleteBranch = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteBranch,
    onSuccess: () => {
      // Invalidate and refetch branches list
      queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
    },
  });
};
