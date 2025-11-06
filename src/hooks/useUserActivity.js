import { useEffect, useRef, useState } from 'react';
import { updateUserActivity } from '../services/userActivity.api';
import { getCurrentUser } from '../services/auth.api';

/**
 * Hook to track user activity and send heartbeat to server
 * This keeps the user's online status updated
 */
export const useUserActivity = () => {
  const intervalRef = useRef(null);
  const [currentUser] = useState(() => getCurrentUser());

  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      return;
    }

    // Send initial activity update
    updateUserActivity(currentUser.id);

    // Set up interval to send heartbeat every 2 minutes
    // This ensures the user stays "online" if they're active
    const HEARTBEAT_INTERVAL = 2 * 60 * 1000; // 2 minutes
    
    intervalRef.current = setInterval(() => {
      updateUserActivity(currentUser.id);
    }, HEARTBEAT_INTERVAL);

    // Update activity on user interactions
    const handleUserActivity = () => {
      updateUserActivity(currentUser.id);
    };

    // Listen to various user activity events
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    // Throttle activity updates to avoid too many API calls
    let lastActivityUpdate = Date.now();
    const THROTTLE_MS = 60 * 1000; // 1 minute throttle

    const throttledHandler = () => {
      const now = Date.now();
      if (now - lastActivityUpdate > THROTTLE_MS) {
        lastActivityUpdate = now;
        handleUserActivity();
      }
    };

    events.forEach(event => {
      window.addEventListener(event, throttledHandler);
    });

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, throttledHandler);
      });
    };
  }, [currentUser]);

  return null;
};
