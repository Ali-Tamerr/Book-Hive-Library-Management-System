import { apiGet, apiPost, apiPut, apiDelete } from './api.config';

const BASE_ENDPOINT = '/BookTransactions';

// Get all transactions
export const getAllTransactions = async () => {
  return await apiGet(BASE_ENDPOINT);
};

// Get transaction by ID
export const getTransactionById = async (id) => {
  return await apiGet(`${BASE_ENDPOINT}/${id}`);
};

// Create new transaction
export const createTransaction = async (transactionData) => {
  return await apiPost(BASE_ENDPOINT, transactionData);
};

// Update transaction
export const updateTransaction = async (id, transactionData) => {
  return await apiPut(`${BASE_ENDPOINT}/${id}`, transactionData);
};

// Delete transaction
export const deleteTransaction = async (id) => {
  return await apiDelete(`${BASE_ENDPOINT}/${id}`);
};

