import { apiGet, apiPost, apiPut, apiDelete } from './api.config';

const BASE_ENDPOINT = '/BookTransactions';

// Get all borrowed books
export const getAllBorrowedBooks = async () => {
  return await apiGet(BASE_ENDPOINT);
};

// Get borrowed book by ID
export const getBorrowedBookById = async (id) => {
  return await apiGet(`${BASE_ENDPOINT}/${id}`);
};

// Create new borrowed book
export const createBorrowedBook = async (borrowedBookData) => {
  return await apiPost(BASE_ENDPOINT, borrowedBookData);
};

// Update borrowed book
export const updateBorrowedBook = async (id, borrowedBookData) => {
  return await apiPut(`${BASE_ENDPOINT}/${id}`, borrowedBookData);
};

// Delete borrowed book
export const deleteBorrowedBook = async (id) => {
  return await apiDelete(`${BASE_ENDPOINT}/${id}`);
};
