import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../services/users.api";
import { adminQueryOptions } from "./queryConfig";

export const userKeys = {
  all: ["users"],
  lists: () => [...userKeys.all, "list"],
  list: (filters) => [...userKeys.lists(), { filters }],
  // Separate key for infinite queries to avoid conflicts
  infinite: () => [...userKeys.all, "infinite"],
  details: () => [...userKeys.all, "detail"],
  detail: (id) => [...userKeys.details(), id],
};

export const useUsers = () => {
  return useInfiniteQuery({
    queryKey: userKeys.infinite(),
    queryFn: ({ pageParam = 1 }) => getAllUsers({ page: pageParam, limit: 12 }),
    getNextPageParam: (lastPage, allPages) => {
      // Robust pagination logic
      const total = lastPage.total || lastPage.totalCount || 0;
      const currentPage = lastPage.page || allPages.length;

      // Calculate total loaded so far
      const totalLoaded = allPages.reduce(
        (acc, page) => acc + (page.data?.length || 0),
        0,
      );

     

      if (total > 0) {
        if (totalLoaded < total) {
          return currentPage + 1;
        }
      } else {
        // Fallback: If no total is provided, assume more pages if last page was full
        const lastPageLength = lastPage.data?.length || 0;
        const LIMIT = 12;
        if (lastPageLength === LIMIT) {
          return currentPage + 1;
        }
      }
      return undefined;
    },
    ...adminQueryOptions,
  });
};

// Get single user hook
export const useUser = (id) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};

// Create user mutation
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

// Update user mutation
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onSuccess: (data, variables) => {
      // Update the specific user in cache
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.id),
      });
      // Refetch all users
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

// Delete user mutation
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
