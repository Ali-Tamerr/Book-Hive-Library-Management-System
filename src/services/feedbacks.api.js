import { apiGet, apiPost, apiPut, apiDelete } from "./api.config";

const FEEDBACKS_ENDPOINT = "/Feedbacks";
const FEEDBACK_REQUESTS_ENDPOINT = "/FeedbackRequests";

const isNotFoundError = (error) => error?.status === 404;

const withFallback = async (primaryCall, fallbackCall) => {
  try {
    return await primaryCall();
  } catch (error) {
    if (!isNotFoundError(error)) throw error;
    return await fallbackCall();
  }
};

export const getAllFeedbacks = async () => {
  return await withFallback(
    () => apiGet(FEEDBACKS_ENDPOINT),
    () => apiGet(FEEDBACK_REQUESTS_ENDPOINT),
  );
};

export const getApprovedFeedbacks = async () => {
  return await withFallback(
    () => apiGet(`${FEEDBACKS_ENDPOINT}/approved`),
    () => apiGet(`${FEEDBACK_REQUESTS_ENDPOINT}?status=Approved`),
  );
};

export const createFeedback = async (feedbackData) => {
  const payload = {
    user_id: feedbackData?.user_id,
    description: feedbackData?.description,
    rate: feedbackData?.rate,
  };

  return await withFallback(
    () => apiPost(FEEDBACKS_ENDPOINT, payload),
    () => apiPost(FEEDBACK_REQUESTS_ENDPOINT, payload),
  );
};

export const updateFeedbackStatus = async (id, data) => {
  return await withFallback(
    () => apiPut(`${FEEDBACKS_ENDPOINT}/${id}`, data),
    () =>
      apiPut(`${FEEDBACK_REQUESTS_ENDPOINT}/${id}`, {
        feedback_id: id,
        ...data,
      }),
  );
};

export const deleteFeedback = async (id) => {
  return await withFallback(
    () => apiDelete(`${FEEDBACKS_ENDPOINT}/${id}`),
    () => apiDelete(`${FEEDBACK_REQUESTS_ENDPOINT}/${id}`),
  );
};
