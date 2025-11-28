import { apiPut } from './api.config';

const BASE_ENDPOINT = '/Users';

export const updateUserActivity = async (userId) => {
  try {
    return await apiPut(`${BASE_ENDPOINT}/${userId}/activity`, {
      LastActivityAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating user activity:', error);
    return null;
  }
};


export const getUserOnlineStatus = (lastActivityAt) => {
  if (!lastActivityAt) return false;
  
  const ONLINE_THRESHOLD_MS = 5 * 60 * 1000;
  const lastActivity = new Date(lastActivityAt);
  const now = new Date();
  
  return (now - lastActivity) < ONLINE_THRESHOLD_MS;
};


export const isUserOnline = (user) => {
  return getUserOnlineStatus(user.lastActivityAt);
};