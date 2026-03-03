import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTransactions,
  getDashboardTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  returnTransaction,
} from "../services/bookTransactions.api";
import { adminQueryOptions } from "./queryConfig";

export const bookTransactionKeys = {
  all: ["bookTransactions"],
  lists: () => [...bookTransactionKeys.all, "list"],
  list: (filters) => [...bookTransactionKeys.lists(), { filters }],
  dashboard: () => [...bookTransactionKeys.all, "dashboard"],
  details: () => [...bookTransactionKeys.all, "detail"],
  detail: (id) => [...bookTransactionKeys.details(), id],
};

export const useBookTransactions = () => {
  return useQuery({
    queryKey: bookTransactionKeys.lists(),
    queryFn: getAllTransactions,
    ...adminQueryOptions,
  });
};

export const useDashboardTransactions = () => {
  return useQuery({
    queryKey: bookTransactionKeys.dashboard(),
    queryFn: getDashboardTransactions,
    ...adminQueryOptions,
  });
};

export const useBookTransaction = (id) => {
  return useQuery({
    queryKey: bookTransactionKeys.detail(id),
    queryFn: () => getTransactionById(id),
    enabled: !!id,
  });
};

export const useCreateBookTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookTransactionKeys.lists() });
    },
  });
};

export const useUpdateBookTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateTransaction(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: bookTransactionKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: bookTransactionKeys.lists() });
    },
  });
};

export const useDeleteBookTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookTransactionKeys.lists() });
    },
  });
};

export const useReturnBookTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: returnTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookTransactionKeys.lists() });
    },
  });
};
