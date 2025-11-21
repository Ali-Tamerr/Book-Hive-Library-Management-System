import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllReports,
  getReportById,
  createReport,
  deleteReport
} from '../services/reports.api';
// Query Key Factory
export const reportKeys = {
  all: ['reports'],
  lists: () => [...reportKeys.all, 'list'],
  list: (filters) => [...reportKeys.lists(), { filters }],
  details: () => [...reportKeys.all, 'detail'],
  detail: (id) => [...reportKeys.details(), id],
};

// Get all reports hook
export const useReports = () => {
  return useQuery({
    queryKey: reportKeys.lists(),
    queryFn: getAllReports,
    staleTime: 5 * 60 * 1000, 
  });
};

// Get single report hook
export const useReport = (id) => {
  return useQuery({
    queryKey: reportKeys.detail(id),
    queryFn: () => getReportById(id),
    enabled: !!id,
  });
};

// Create report mutation
export const useCreateReport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reportKeys.lists() });
    },
  });
};

// Delete report mutation
export const useDeleteReport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reportKeys.lists() });
    },
  });
};