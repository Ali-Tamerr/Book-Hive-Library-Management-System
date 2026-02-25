import { apiGet, apiPost, apiPut, apiDelete } from "./api.config";

const BASE_ENDPOINT = "/Feedbacks";

export const getAllFeedbacks = async () => {
  return await apiGet(BASE_ENDPOINT);
};

export const getApprovedFeedbacks = async () => {
  return await apiGet(`${BASE_ENDPOINT}/approved`);
};

export const createFeedback = async (feedbackData) => {
  return await apiPost(BASE_ENDPOINT, feedbackData);
};

export const updateFeedbackStatus = async (id, data) => {
  return await apiPut(`${BASE_ENDPOINT}/${id}`, data);
};

export const deleteFeedback = async (id) => {
  return await apiDelete(`${BASE_ENDPOINT}/${id}`);
};
