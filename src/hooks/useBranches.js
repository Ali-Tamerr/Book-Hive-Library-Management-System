import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBranches, createBranch, updateBranch, deleteBranch } from '../services/branches.api';
import { adminQueryOptions } from './queryConfig';

export const useBranches = () => {
    return useQuery({
        queryKey: ['branches'],
        queryFn: getBranches,
        ...adminQueryOptions,
    });
};

export const useCreateBranch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBranch,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['branches'] });
        },
    });
};

export const useUpdateBranch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateBranch(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['branches'] });
        },
    });
};

export const useDeleteBranch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteBranch,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['branches'] });
        },
    });
};