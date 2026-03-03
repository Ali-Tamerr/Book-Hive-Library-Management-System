import { apiGet, apiPost, apiPut, apiDelete } from "./api.config";

const BASE_ENDPOINT = "/Books";

// Get all books
export const getAllBooks = async () => {
  return await apiGet(BASE_ENDPOINT);
};

export const getBookCovers = async () => {
  return await apiGet(`${BASE_ENDPOINT}/covers`);
};

// Get book by ID
export const getBookById = async (id) => {
  return await apiGet(`${BASE_ENDPOINT}/${id}`);
};

// Search books by title
export const searchBooksByTitle = async (title) => {
  return await apiGet(`${BASE_ENDPOINT}/${title}`);
};

// Create new book
export const createBook = async (bookData) => {
  return await apiPost(BASE_ENDPOINT, bookData);
};

// Update book
export const updateBook = async (id, bookData) => {
  return await apiPut(`${BASE_ENDPOINT}/${id}`, bookData);
};

// Delete book
export const deleteBook = async (id) => {
  return await apiDelete(`${BASE_ENDPOINT}/${id}`);
};
