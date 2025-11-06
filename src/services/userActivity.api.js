import { apiPut } from './api.config';

const BASE_ENDPOINT = '/Users';

/**
 * Update user's last activity timestamp
 * This should be called periodically to indicate the user is online
 */
export const updateUserActivity = async (userId) => {
  try {
    // Send a PUT request to update the user's last activity time
    // The backend should handle updating the lastActivityAt field
    return await apiPut(`${BASE_ENDPOINT}/${userId}/activity`, {
      lastActivityAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating user activity:', error);
    // Don't throw - activity tracking should be non-blocking
    return null;
  }
};

/**
 * Get user's online status based on last activity
 * A user is considered online if they were active within the last 5 minutes
 */
export const getUserOnlineStatus = (lastActivityAt) => {
  if (!lastActivityAt) return false;
  
  const ONLINE_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes
  const lastActivity = new Date(lastActivityAt);
  const now = new Date();
  
  return (now - lastActivity) < ONLINE_THRESHOLD_MS;
};

/**
 * Check if a user is online based on their last activity timestamp
 */
export const isUserOnline = (user) => {
  return getUserOnlineStatus(user.lastActivityAt);
};
