import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation
} from '../services/bookReservations.api';
import { adminQueryOptions } from './queryConfig';

export const reservationKeys = {
  all: ['reservations'],
  lists: () => [...reservationKeys.all, 'list'],
  list: (filters) => [...reservationKeys.lists(), { filters }],
  details: () => [...reservationKeys.all, 'detail'],
  detail: (id) => [...reservationKeys.details(), id],
};

export const useReservations = () => {
  return useQuery({
    queryKey: reservationKeys.lists(),
    queryFn: async () => {
      return await getAllReservations();
    },
    ...adminQueryOptions,
  });
};

// Get single reservation hook
export const useReservation = (id) => {
  return useQuery({
    queryKey: reservationKeys.detail(id),
    queryFn: () => getReservationById(id),
    enabled: !!id,
  });
};

// Create reservation mutation
export const useCreateReservation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.lists() });
      localStorage.removeItem("reservations_cache");
    },
  });
};

// Update reservation mutation
export const useUpdateReservation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => updateReservation(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: reservationKeys.lists() });
      localStorage.removeItem("reservations_cache");
    },
  });
};

// Delete reservation mutation
export const useDeleteReservation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.lists() });
      localStorage.removeItem("reservations_cache");
    },
  });
};

