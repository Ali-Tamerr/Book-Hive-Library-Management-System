import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllUserRequests,
  getUserRequestById,
  createUserRequest,
  updateUserRequest,
  deleteUserRequest,
  approveUserRequest,
  rejectUserRequest
} from '../services/userRequests.api';
import { adminQueryOptions } from './queryConfig';

export const userRequestKeys = {
  all: ['userRequests'],
  lists: () => [...userRequestKeys.all, 'list'],
  list: (filters) => [...userRequestKeys.lists(), { filters }],
  details: () => [...userRequestKeys.all, 'detail'],
  detail: (id) => [...userRequestKeys.details(), id],
};

export const useUserRequests = () => {
  return useQuery({
    queryKey: userRequestKeys.lists(),
    queryFn: getAllUserRequests,
    ...adminQueryOptions,
  });
};

export const useUserRequest = (id) => {
  return useQuery({
    queryKey: userRequestKeys.detail(id),
    queryFn: () => getUserRequestById(id),
    enabled: !!id,
  });
};

export const useCreateUserRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userRequestKeys.lists() });
    },
  });
};

export const useUpdateUserRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateUserRequest(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: userRequestKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: userRequestKeys.lists() });
    },
  });
};

export const useDeleteUserRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userRequestKeys.lists() });
    },
  });
};

export const useApproveUserRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveUserRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userRequestKeys.lists() });
    },
  });
};

export const useRejectUserRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, requestData, reason }) => rejectUserRequest(id, requestData, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userRequestKeys.lists() });
    },
  });
};
