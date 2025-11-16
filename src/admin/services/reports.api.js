import { apiGet, apiPost, apiDelete } from './api.config';

const BASE_ENDPOINT = '/Reports';

// Get all reports
export const getAllReports = async () => {
  return await apiGet(BASE_ENDPOINT);
};

// Get report by ID
export const getReportById = async (id) => {
  return await apiGet(`${BASE_ENDPOINT}/${id}`);
};

// Create new report
export const createReport = async (reportData) => {
  return await apiPost(BASE_ENDPOINT, reportData);
};

// Delete report
export const deleteReport = async (id) => {
  return await apiDelete(`${BASE_ENDPOINT}/${id}`);
};