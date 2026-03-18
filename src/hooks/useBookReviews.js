import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost, apiDelete } from "../services/api.config";

export const useBookReviews = (bookId) => {
  return useQuery({
    queryKey: ["bookReviews", bookId],
    queryFn: async () => {
      if (!bookId) return [];
      return await apiGet(`/BookReviews/book/${bookId}`);
    },
    enabled: !!bookId,
  });
};

export const useCreateBookReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newReview) => {
      return await apiPost("/BookReviews", newReview);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["bookReviews", variables.book_id],
      });
    },
  });
};

export const useDeleteBookReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId }) => {
      return await apiDelete(`/BookReviews/${reviewId}`);
    },
    onSuccess: (_, variables) => {
      if (variables.book_id) {
        queryClient.invalidateQueries({
          queryKey: ["bookReviews", variables.book_id],
        });
      }
    },
  });
};

export const useCreateBookReviewReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newReply) => {
      return await apiPost("/BookReviews/reply", newReply);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["bookReviews", variables.book_id],
      });
    },
  });
};
