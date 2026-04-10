import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getBranches,
    getBranchesManagementSummary,
    createBranch,
    updateBranch,
    deleteBranch,
} from '../services/branches.api';
import { adminQueryOptions } from './queryConfig';

export const branchKeys = {
    all: ['branches'],
    lists: () => [...branchKeys.all, 'list'],
    management: () => [...branchKeys.all, 'management'],
};

export const useBranches = (options = {}) => {
    return useQuery({
        queryKey: branchKeys.lists(),
        queryFn: getBranches,
        ...adminQueryOptions,
        ...options,
    });
};

export const useBranchesManagement = () => {
    return useQuery({
        queryKey: branchKeys.management(),
        queryFn: getBranchesManagementSummary,
        ...adminQueryOptions,
    });
};

export const useCreateBranch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBranch,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
            queryClient.invalidateQueries({ queryKey: branchKeys.management() });
        },
    });
};

export const useUpdateBranch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateBranch(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
            queryClient.invalidateQueries({ queryKey: branchKeys.management() });
        },
    });
};

export const useDeleteBranch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteBranch,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
            queryClient.invalidateQueries({ queryKey: branchKeys.management() });
        },
    });
};