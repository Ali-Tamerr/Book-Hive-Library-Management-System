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
import { bookKeys } from "./useBooks";

export const bookTransactionKeys = {
  all: ["bookTransactions"],
  lists: () => [...bookTransactionKeys.all, "list"],
  list: (filters) => [...bookTransactionKeys.lists(), { filters }],
  dashboard: () => [...bookTransactionKeys.all, "dashboard"],
  details: () => [...bookTransactionKeys.all, "detail"],
  detail: (id) => [...bookTransactionKeys.details(), id],
};

export const useBookTransactions = () => {
  const cacheKey = "transactions_all_cache";

  return useQuery({
    queryKey: bookTransactionKeys.lists(),
    queryFn: async () => {
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        try {
          return JSON.parse(cachedData);
        } catch (e) {}
      }

      const data = await getAllTransactions();
      localStorage.setItem(cacheKey, JSON.stringify(data));
      return data;
    },
    ...adminQueryOptions,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useDashboardTransactions = () => {
  const cacheKey = "transactions_dashboard_cache";

  return useQuery({
    queryKey: bookTransactionKeys.dashboard(),
    queryFn: async () => {
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        try {
          return JSON.parse(cachedData);
        } catch (e) {}
      }

      const data = await getDashboardTransactions();
      localStorage.setItem(cacheKey, JSON.stringify(data));
      return data;
    },
    ...adminQueryOptions,
    staleTime: Infinity,
    gcTime: Infinity,
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
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: bookTransactionKeys.lists() });
      localStorage.removeItem("transactions_all_cache");
      localStorage.removeItem("transactions_dashboard_cache");
      localStorage.removeItem("borrowed_books_cache");
      localStorage.removeItem("overdue_books_cache");
      localStorage.removeItem("dashboard_books_cache");
      if (variables?.user_id) {
        queryClient.invalidateQueries({
          queryKey: bookKeys.recommendations(variables.user_id),
        });
        localStorage.removeItem(`ai_recommendations_${variables.user_id}`);
      }
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
      localStorage.removeItem("transactions_all_cache");
      localStorage.removeItem("transactions_dashboard_cache");
      localStorage.removeItem("borrowed_books_cache");
      localStorage.removeItem("overdue_books_cache");
      localStorage.removeItem("dashboard_books_cache");
    },
  });
};

export const useDeleteBookTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookTransactionKeys.lists() });
      localStorage.removeItem("transactions_all_cache");
      localStorage.removeItem("transactions_dashboard_cache");
      localStorage.removeItem("borrowed_books_cache");
      localStorage.removeItem("overdue_books_cache");
      localStorage.removeItem("dashboard_books_cache");
    },
  });
};

export const useReturnBookTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: returnTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookTransactionKeys.lists() });
      localStorage.removeItem("transactions_all_cache");
      localStorage.removeItem("transactions_dashboard_cache");
      localStorage.removeItem("borrowed_books_cache");
      localStorage.removeItem("overdue_books_cache");
      localStorage.removeItem("dashboard_books_cache");
    },
  });
};
