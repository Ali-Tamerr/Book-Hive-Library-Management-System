import { apiPut } from './api.config';

const BASE_ENDPOINT = '/users';

export const updateUserActivity = async (userId) => {
  try {
    const encodedUserId = encodeURIComponent(userId);
    console.log('Updating activity for user:', userId, 'Encoded:', encodedUserId);
    
    const response = await apiPut(`${BASE_ENDPOINT}/${encodedUserId}/activity`, {
      LastActivityAt: new Date().toISOString()
    });
    
    console.log('Activity update response:', response);
    return response;
  } catch (error) {
    console.error('Error updating user activity:', error);
    console.error('Error details:', {
      userId,
      status: error.status,
      message: error.message,
      response: error.response?.data
    });
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
  return getUserOnlineStatus(user.LastActivityAt);
};