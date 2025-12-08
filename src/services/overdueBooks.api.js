import { apiGet } from './api.config';

const BASE_ENDPOINT = '/BookReservations';

export const getAllOverdueBooks = async () => {
  return await apiGet(`${BASE_ENDPOINT}?filter=overdue`);
};
