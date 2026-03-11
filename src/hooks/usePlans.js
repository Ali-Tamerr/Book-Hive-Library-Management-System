import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../services/api.config";

export const planKeys = {
  all: ["plans"],
  lists: () => [...planKeys.all, "list"],
};

export function usePlans() {
  return useQuery({
    queryKey: planKeys.lists(),
    queryFn: async () => {
      const response = await apiGet("/api/Plans");
      if (!response.ok) {
        throw new Error("Failed to fetch plans");
      }
      return response.json();
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
