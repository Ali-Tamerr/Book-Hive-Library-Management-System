import { apiGet, apiPost, apiPut, apiDelete, unauthApiGet } from './api.config';

const BASE_ENDPOINT = '/Users';

// Get all users
export const getAllUsers = async () => {
  return await apiGet(BASE_ENDPOINT);
};

export const getAllUsersUnauthenticated = async () => {
  return await unauthApiGet(BASE_ENDPOINT);
};

// Get user by ID
export const getUserById = async (id) => {
  return await apiGet(`${BASE_ENDPOINT}/${id}`);
};

// Get user by name
export const getUserByName = async (name) => {
  return await apiGet(`${BASE_ENDPOINT}/${name}`);
};

// Create new user
export const createUser = async (userData) => {
  return await apiPost(BASE_ENDPOINT, userData);
};

// Update user
export const updateUser = async (id, userData) => {
  return await apiPut(`${BASE_ENDPOINT}/${id}`, userData);
};

// Delete user
export const deleteUser = async (id) => {
  return await apiDelete(`${BASE_ENDPOINT}/${id}`);
};

