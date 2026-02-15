import { apiGet, apiPost, apiPut, apiDelete } from "./api.config";

const BASE_ENDPOINT = "/BookCopies";

export const getAllBookCopies = async () => {
  return await apiGet(BASE_ENDPOINT);
};

export const getBookCopyById = async (id) => {
  return await apiGet(`${BASE_ENDPOINT}/${id}`);
};

export const getBookCopiesByBookId = async (bookId) => {
  const allCopies = await apiGet(BASE_ENDPOINT);
  return allCopies.filter((copy) => copy.book_id === bookId);
};

export const getBookCopiesByBranchId = async (branchId) => {
  const allCopies = await apiGet(BASE_ENDPOINT);
  return allCopies.filter((copy) => copy.branch_id === branchId);
};

export const createBookCopy = async (copyData) => {
  return await apiPost(BASE_ENDPOINT, copyData);
};

export const updateBookCopy = async (id, copyData) => {
  return await apiPut(`${BASE_ENDPOINT}/${id}`, copyData);
};

export const deleteBookCopy = async (id) => {
  return await apiDelete(`${BASE_ENDPOINT}/${id}`);
};
