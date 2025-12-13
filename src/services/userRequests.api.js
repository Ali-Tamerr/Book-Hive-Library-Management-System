import { apiGet, apiPost, apiPut, apiDelete } from './api.config';

const BASE_ENDPOINT = '/UserRequests';

export const getAllUserRequests = async () => {
  return await apiGet(BASE_ENDPOINT);
};

export const getUserRequestById = async (id) => {
  return await apiGet(`${BASE_ENDPOINT}/${id}`);
};

export const createUserRequest = async (requestData) => {
  return await apiPost(BASE_ENDPOINT, requestData);
};

export const updateUserRequest = async (id, requestData) => {
  return await apiPut(`${BASE_ENDPOINT}/${id}`, requestData);
};

export const deleteUserRequest = async (id) => {
  return await apiDelete(`${BASE_ENDPOINT}/${id}`);
};

export const approveUserRequest = async (id) => {
  return await apiPut(`${BASE_ENDPOINT}/${id}`, { status: 'Approved' });
};

export const rejectUserRequest = async (id) => {
  return await apiPut(`${BASE_ENDPOINT}/${id}`, { status: 'Rejected' });
};
