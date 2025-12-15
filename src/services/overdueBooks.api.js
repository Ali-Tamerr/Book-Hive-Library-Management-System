import { apiGet } from './api.config';

const BASE_ENDPOINT = '/BookTransactions';

export const getAllOverdueBooks = async () => {
  const transactions = await apiGet(BASE_ENDPOINT);
  return transactions.filter(t => t.status === 'Overdue');
};
