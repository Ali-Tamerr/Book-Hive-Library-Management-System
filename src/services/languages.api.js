import apiClient from './api.config';

export const getLanguages = async () => {
  const response = await apiClient.get('/Languages');
  return response.data;
};

export const getLanguageById = async (id) => {
  const response = await apiClient.get(`/Languages/${id}`);
  return response.data;
};

export const createLanguage = async (data) => {
  const response = await apiClient.post('/Languages', data);
  return response.data;
};

export const updateLanguage = async (id, data) => {
  const response = await apiClient.put(`/Languages/${id}`, data);
  return response.data;
};

export const deleteLanguage = async (id) => {
  const response = await apiClient.delete(`/Languages/${id}`);
  return response.data;
};
