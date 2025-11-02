import { apiGet } from './api.config';

const BASE_ENDPOINT = '/BookReservations';

// Get all overdue books
export const getAllOverdueBooks = async () => {
  return await apiGet(`${BASE_ENDPOINT}?filter=overdue`);
};
