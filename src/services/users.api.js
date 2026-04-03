import { apiGet, apiPost, apiPut, apiDelete } from "./api.config";

const BASE_ENDPOINT = "/Users";

export const getAllUsers = async ({ page = 1, limit = 12 } = {}) => {
  return await apiGet(`${BASE_ENDPOINT}?page=${page}&limit=${limit}`);
};

export const getLibrarians = async () => {
  return await apiGet(`${BASE_ENDPOINT}/librarians`);
};

// Get user by ID
export const getUserById = async (id) => {
  return await apiGet(`${BASE_ENDPOINT}/byid/${id}`);
};

// Get user by name
export const getUserByName = async (name) => {
  return await apiGet(`${BASE_ENDPOINT}/${name}`);
};

// Create new user
export const createUser = async (userData) => {
  return await apiPost(BASE_ENDPOINT, userData);
};

export const updateUser = async (id, userData) => {
  return await apiPut(`${BASE_ENDPOINT}/${encodeURIComponent(id)}`, userData);
};

export const deleteUser = async (id) => {
  return await apiDelete(`${BASE_ENDPOINT}/${encodeURIComponent(id)}`);
};

export const loginUser = async (credentials) => {
  return await apiPost(`${BASE_ENDPOINT}/login`, credentials);
};

