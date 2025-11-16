import { apiGet, apiPost, apiPut, apiDelete } from './api.config';

const BASE_ENDPOINT = '/Branches';

// Get all branches
export const getAllBranches = async () => {
  return await apiGet(BASE_ENDPOINT);
};

// Get branch by ID
export const getBranchById = async (id) => {
  return await apiGet(`${BASE_ENDPOINT}/${id}`);
};

// Create new branch
export const createBranch = async (branchData) => {
  return await apiPost(BASE_ENDPOINT, branchData);
};

// Update branch
export const updateBranch = async (id, branchData) => {
  return await apiPut(`${BASE_ENDPOINT}/${id}`, branchData);
};

// Delete branch
export const deleteBranch = async (id) => {
  return await apiDelete(`${BASE_ENDPOINT}/${id}`);
};
