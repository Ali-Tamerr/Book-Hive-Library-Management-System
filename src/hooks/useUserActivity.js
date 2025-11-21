import { useEffect, useRef, useState } from 'react';
import { updateUserActivity } from '../services/userActivity.api';
import { getCurrentUser } from '../services/auth.api';


export const useUserActivity = () => {
  const intervalRef = useRef(null);
  const lastActivityUpdateRef = useRef(Date.now());
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
    const events = [
      { name: 'mousedown', options: undefined },
      { name: 'keydown', options: undefined },
      { name: 'scroll', options: { passive: true } },
      { name: 'touchstart', options: { passive: true } },
      { name: 'click', options: undefined }
    ];
    
    // Throttle activity updates to avoid too many API calls
    const THROTTLE_MS = 60 * 1000; // 1 minute throttle

    const throttledHandler = () => {
      const now = Date.now();
      if (now - lastActivityUpdateRef.current > THROTTLE_MS) {
        lastActivityUpdateRef.current = now;
        handleUserActivity();
      }
    };

    events.forEach(({ name, options }) => {
      window.addEventListener(name, throttledHandler, options);
    });

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      events.forEach(({ name, options }) => {
        window.removeEventListener(name, throttledHandler, options);
      });
    };
  }, [currentUser]);

  return null;
};