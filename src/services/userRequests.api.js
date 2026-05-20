import { apiGet, apiPost, apiPut, apiDelete } from './api.config';

const BASE_ENDPOINT = '/UserRequests';

export const getAllUserRequests = async () => {
  return await apiGet(BASE_ENDPOINT);
};

export const getUserRequestById = async (id) => {
  return await apiGet(`${BASE_ENDPOINT}/${id}`);
};

export const createUserRequest = async (requestData, otp) => {
  // Ensure branch_id is sent as a number (or null) to match backend model expectations
  const sanitizedData = {
    ...requestData,
    branch_id: requestData.branch_id ? parseInt(requestData.branch_id, 10) : null,
  };
  return await apiPost(BASE_ENDPOINT, { UserRequest: sanitizedData, Otp: otp });
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

export const rejectUserRequest = async (id, reason = "") => {
  const url = reason 
    ? `${BASE_ENDPOINT}/${id}?reason=${encodeURIComponent(reason)}`
    : `${BASE_ENDPOINT}/${id}`;
  return await apiPut(url, { status: 'Rejected' });
};

export const verifyUserRequestOtp = async (email, otp) => {
  return await apiPost(`${BASE_ENDPOINT}/verify-otp`, { email, otp });
};

export const sendOtpToEmail = async (email) => {
  return await apiPost(`${BASE_ENDPOINT}/send-otp`, { email });
};
