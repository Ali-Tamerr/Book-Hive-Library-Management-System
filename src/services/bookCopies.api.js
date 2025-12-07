import { apiGet, apiPost, apiDelete } from './api.config';

const BASE_ENDPOINT = '/BookCopies';

export const getAllBookCopies = async () => {
  return await apiGet(BASE_ENDPOINT);
};

export const getBookCopyById = async (id) => {
  return await apiGet(`${BASE_ENDPOINT}/${id}`);
};

export const getBookCopiesByBookId = async (bookId) => {
  const allCopies = await apiGet(BASE_ENDPOINT);
  return allCopies.filter(copy => copy.book_id === bookId);
};

export const createBookCopy = async (copyData) => {
  return await apiPost(BASE_ENDPOINT, copyData);
};

export const deleteBookCopy = async (id) => {
  return await apiDelete(`${BASE_ENDPOINT}/${id}`);
};
