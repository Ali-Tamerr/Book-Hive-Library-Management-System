import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getLanguages,
  getLanguageById,
  createLanguage,
  updateLanguage,
  deleteLanguage
} from '../services/languages.api';

export const useLanguages = () => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: getLanguages,
  });
};

export const useLanguage = (id) => {
  return useQuery({
    queryKey: ['language', id],
    queryFn: () => getLanguageById(id),
    enabled: !!id,
  });
};

export const useCreateLanguage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages'] });
    },
  });
};

export const useUpdateLanguage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateLanguage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages'] });
    },
  });
};

export const useDeleteLanguage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages'] });
    },
  });
};
