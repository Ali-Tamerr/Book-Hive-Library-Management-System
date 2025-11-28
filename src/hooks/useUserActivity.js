import { useEffect, useRef, useState } from 'react';
import { updateUserActivity } from '../services/userActivity.api';
import { getCurrentUser } from '../services/auth.api';


export const useUserActivity = () => {
  const intervalRef = useRef(null);
  const lastActivityUpdateRef = useRef(Date.now());
  const [currentUser] = useState(() => getCurrentUser());

  useEffect(() => {
    if (!currentUser || !currentUser.user_id) {
      return;
    }

    updateUserActivity(currentUser.user_id);

    const HEARTBEAT_INTERVAL = 2 * 60 * 1000;
    
    intervalRef.current = setInterval(() => {
      updateUserActivity(currentUser.user_id);
    }, HEARTBEAT_INTERVAL);

    const handleUserActivity = () => {
      updateUserActivity(currentUser.user_id);
    };

    const events = [
      { name: 'mousedown', options: undefined },
      { name: 'keydown', options: undefined },
      { name: 'scroll', options: { passive: true } },
      { name: 'touchstart', options: { passive: true } },
      { name: 'click', options: undefined }
    ];
    
    const THROTTLE_MS = 60 * 1000;

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