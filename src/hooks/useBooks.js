import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllBooks,
  getBookManagement,
  getBookCovers,
  getDashboardBooks,
  getBookById,
  searchBooksByTitle,
  createBook,
  updateBook,
  deleteBook,
  getAIRecommendations,
} from "../services/books.api";
import { adminQueryOptions } from "./queryConfig";
import { bookCopyKeys } from "./useBookCopies";

export const bookKeys = {
  all: ["books"],
  lists: () => [...bookKeys.all, "list"],
  list: (filters) => [...bookKeys.lists(), { filters }],
  management: () => [...bookKeys.all, "management"],
  covers: () => [...bookKeys.all, "covers"],
  dashboard: () => [...bookKeys.all, "dashboard"],
  details: () => [...bookKeys.all, "detail"],
  detail: (id) => [...bookKeys.details(), id],
  recommendations: (userId) => [...bookKeys.all, "ai-recommendations", userId],
};

export const useBooks = () => {
  return useQuery({
    queryKey: bookKeys.lists(),
    queryFn: getAllBooks,
    ...adminQueryOptions,
  });
};

export const useBookManagement = () => {
  return useQuery({
    queryKey: bookKeys.management(),
    queryFn: getBookManagement,
    ...adminQueryOptions,
  });
};

export const useBookCovers = (options = {}) => {
  return useQuery({
    queryKey: bookKeys.covers(),
    queryFn: getBookCovers,
    ...adminQueryOptions,
    ...options,
  });
};

export const useDashboardBooks = (options = {}) => {
  return useQuery({
    queryKey: bookKeys.dashboard(),
    queryFn: async () => {
      return await getDashboardBooks();
    },
    ...adminQueryOptions,
    ...options,
  });
};

// Get single book hook
export const useBook = (id) => {
  return useQuery({
    queryKey: bookKeys.detail(id),
    queryFn: () => getBookById(id),
    enabled: !!id,
    staleTime: Infinity,
    gcTime: 10 * 60 * 1000,
  });
};

// Search books hook
export const useSearchBooks = (searchTerm) => {
  return useQuery({
    queryKey: [...bookKeys.lists(), "search", searchTerm],
    queryFn: () => searchBooksByTitle(searchTerm),
    enabled: !!searchTerm && searchTerm.length > 0,
  });
};

// Create book mutation
export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bookKeys.management() });
      queryClient.invalidateQueries({ queryKey: bookCopyKeys.lists() });
    },
  });
};

// Update book mutation
export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateBook(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: bookKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bookKeys.management() });
      queryClient.invalidateQueries({ queryKey: bookCopyKeys.lists() });
      localStorage.removeItem("dashboard_books_cache");
    },
  });
};

// Delete book mutation
export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bookKeys.management() });
      queryClient.invalidateQueries({ queryKey: bookCopyKeys.lists() });
      localStorage.removeItem("dashboard_books_cache");
    },
  });
};

export const useAIRecommendations = (userId) => {
  const queryClient = useQueryClient();
  const cacheKey = `ai_recommendations_${userId}`;

  return useQuery({
    queryKey: bookKeys.recommendations(userId),
    queryFn: async () => {
      // Check if we have a valid cache in localStorage
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        try {
          return JSON.parse(cachedData);
        } catch (e) {
          console.error("Failed to parse cached recommendations", e);
        }
      }

      const response = await getAIRecommendations(userId);
      if (response?.status === "success") {
        localStorage.setItem(cacheKey, JSON.stringify(response));
      }
      return response;
    },
    enabled: !!userId,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
