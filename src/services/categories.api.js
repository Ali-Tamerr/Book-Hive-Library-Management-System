import { apiGet, apiPost, apiPut, apiDelete } from './api.config';

const BASE_ENDPOINT = '/Categories';

// Get all categories
export const getAllCategories = async () => {
  return await apiGet(BASE_ENDPOINT);
};

// Get category by ID
export const getCategoryById = async (id) => {
  return await apiGet(`${BASE_ENDPOINT}/${id}`);
};

// Create new category
export const createCategory = async (categoryData) => {
  return await apiPost(BASE_ENDPOINT, categoryData);
};

// Update category
export const updateCategory = async (id, categoryData) => {
  return await apiPut(`${BASE_ENDPOINT}/${id}`, categoryData);
};

// Delete category
export const deleteCategory = async (id) => {
  return await apiDelete(`${BASE_ENDPOINT}/${id}`);
};

