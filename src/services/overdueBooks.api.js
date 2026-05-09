import { apiGet } from './api.config';

const BASE_ENDPOINT = '/BookTransactions';

export const getAllOverdueBooks = async () => {
  const transactions = await apiGet(BASE_ENDPOINT);
  const now = new Date();
  // Set time to beginning of the day to avoid timezone issues with pure dates
  now.setHours(0, 0, 0, 0);

  return transactions.filter(t => {
    const status = (t.status || "").toLowerCase();
    if (status === 'overdue') return true;
    if (status === 'returned' || t.return_date) return false;

    if (t.due_date) {
      const dueDate = new Date(t.due_date);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate < now;
    }
    return false;
  });
};
