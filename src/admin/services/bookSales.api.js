import { apiGet, apiPost, apiPut, apiDelete } from './api.config';

const BASE_ENDPOINT = '/BookSales';

// Get all book sales
export const getAllBookSales = async () => {
  return await apiGet(BASE_ENDPOINT);
};

// Get book sale by ID
export const getBookSaleById = async (id) => {
  return await apiGet(`${BASE_ENDPOINT}/${id}`);
};

// Create new book sale
export const createBookSale = async (bookSaleData) => {
  return await apiPost(BASE_ENDPOINT, bookSaleData);
};

// Update book sale
export const updateBookSale = async (id, bookSaleData) => {
  return await apiPut(`${BASE_ENDPOINT}/${id}`, bookSaleData);
};

// Delete book sale
export const deleteBookSale = async (id) => {
  return await apiDelete(`${BASE_ENDPOINT}/${id}`);
};