import { apiPut } from './api.config';

const BASE_ENDPOINT = '/Users';

export const updateUserActivity = async (userId) => {
  try {
    const encodedUserId = encodeURIComponent(userId);
    
    const response = await apiPut(`${BASE_ENDPOINT}/${encodedUserId}/activity`, {
      LastActivityAt: new Date().toISOString().slice(0, -1)
    });
    
    return response;
  } catch (error) {
    return null;
  }
};


export const getUserOnlineStatus = (lastActivityAt) => {
  if (!lastActivityAt) return false;
  
  const ONLINE_THRESHOLD_MS = 5 * 60 * 1000;
  let timestamp = lastActivityAt;
  if (!timestamp.endsWith('Z') && !timestamp.includes('+') && !timestamp.includes('-', 10)) {
    timestamp = timestamp + 'Z';
  }
  const lastActivity = new Date(timestamp);
  const now = new Date();
  
  return (now - lastActivity) < ONLINE_THRESHOLD_MS;
};


export const isUserOnline = (user) => {
  const lastActivity = user.lastActivityAt || user.LastActivityAt || user.last_activity_at;
  return getUserOnlineStatus(lastActivity);
};