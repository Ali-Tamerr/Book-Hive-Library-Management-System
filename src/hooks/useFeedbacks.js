import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllFeedbacks,
  getApprovedFeedbacks,
  createFeedback,
  updateFeedbackStatus,
  deleteFeedback,
} from "../services/feedbacks.api";
import { adminQueryOptions } from "./queryConfig";

export const feedbackKeys = {
  all: ["feedbacks"],
  lists: () => [...feedbackKeys.all, "list"],
  list: (filters) => [...feedbackKeys.lists(), { filters }],
  approved: () => [...feedbackKeys.all, "approved"],
};

export const useFeedbacks = (options = {}) => {
  return useQuery({
    queryKey: feedbackKeys.lists(),
    queryFn: getAllFeedbacks,
    ...adminQueryOptions,
    ...options,
  });
};

export const useApprovedFeedbacks = () => {
  return useQuery({
    queryKey: feedbackKeys.approved(),
    queryFn: getApprovedFeedbacks,
    staleTime: Infinity,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    retry: 1,
  });
};

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.all });
      queryClient.invalidateQueries({ queryKey: feedbackKeys.approved() });
    },
  });
};

export const useUpdateFeedbackStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }) => updateFeedbackStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.all });
    },
  });
};

export const useDeleteFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.all });
    },
  });
};
