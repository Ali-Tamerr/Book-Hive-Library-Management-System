# Online Status Implementation Guide

## Overview
This document explains the implementation of the admin online/offline status feature on the Dashboard.

## Problem Statement
On Dashboard.jsx line 222, the admin status was hardcoded to show "Active" for all admins, regardless of whether they were actually online. The goal was to make this dynamic and show real online/offline status.

## Solution Architecture

### Frontend Implementation

The solution consists of three main components:

#### 1. User Activity Tracking Service (`src/services/userActivity.api.js`)
- **`updateUserActivity(userId)`**: Sends a PUT request to update the user's last activity timestamp
- **`getUserOnlineStatus(lastActivityAt)`**: Determines if a user is online based on their last activity (threshold: 5 minutes)
- **`isUserOnline(user)`**: Helper function to check if a user object indicates online status

#### 2. Activity Tracking Hook (`src/hooks/useUserActivity.js`)
- Automatically tracks user activity and sends heartbeat to the server
- **Heartbeat Interval**: Every 2 minutes
- **Activity Events**: Tracks mousedown, keydown, scroll, touchstart, click
- **Throttling**: Activity updates are throttled to 1 minute to prevent excessive API calls
- Automatically starts when the user is logged in
- Cleans up intervals and event listeners on unmount

#### 3. Dashboard Updates (`src/pages/Dashboard.jsx`)
- Imports and uses the `useUserActivity` hook to track current user's activity
- Computes `isOnline` status for each admin in the display list
- Displays dynamic status indicators:
  - **Online**: Green dot with "Online" text
  - **Offline**: Gray dot with "Offline" text

### Backend Requirements

For the feature to work completely, the backend needs to be updated. See `BACKEND_REQUIREMENTS.md` for detailed instructions.

**Required Backend Changes:**
1. Add `last_activity_at` column to Users table
2. Add `LastActivityAt` property to User model and UserDTO
3. Create PUT endpoint at `/api/Users/{id}/activity` to update activity timestamp
4. Update GET `/api/Users` endpoint to include `lastActivityAt` in response

## How It Works

### Flow Diagram
```
User Logs In
    ↓
useUserActivity Hook Starts
    ↓
Initial Activity Update → PUT /api/Users/{id}/activity
    ↓
Every 2 minutes → Heartbeat Update
    ↓
User Interacts (click, type, scroll, etc.) → Throttled Activity Update (max once per minute)
    ↓
Dashboard Refreshes → GET /api/Users
    ↓
For Each Admin:
  - Check lastActivityAt
  - If within 5 minutes → Show "Online" (green)
  - If older than 5 minutes → Show "Offline" (gray)
```

### Online Status Logic
A user is considered "online" if:
```javascript
(currentTime - lastActivityAt) < 5 minutes
```

### Activity Update Logic
- **On Component Mount**: Immediate activity update
- **Every 2 Minutes**: Automatic heartbeat regardless of user activity
- **On User Interaction**: Throttled updates (maximum once per minute) for:
  - Mouse clicks
  - Keyboard input
  - Scrolling
  - Touch events

## Visual Changes

### Before
All admins showed:
```
● Active  (always dark blue)
```

### After
Admins show dynamic status:
```
🟢 Online   (if active within 5 minutes)
⚪ Offline  (if inactive for more than 5 minutes)
```

## Files Changed

### New Files
1. `src/services/userActivity.api.js` - Activity tracking API service
2. `src/hooks/useUserActivity.js` - React hook for automatic activity tracking
3. `BACKEND_REQUIREMENTS.md` - Backend implementation guide
4. `ONLINE_STATUS_IMPLEMENTATION.md` - This file

### Modified Files
1. `src/pages/Dashboard.jsx`
   - Added imports for activity tracking
   - Added `useUserActivity()` hook call
   - Updated `displayAdmins` mapping to include `isOnline` status
   - Updated JSX to display dynamic status with color-coded indicators

## Testing the Feature

### Frontend Testing (Current State)
1. **Run the development server:**
   ```bash
   npm run dev
   ```

2. **Login as a user and navigate to Dashboard**

3. **Current Behavior (without backend changes):**
   - All admins will show as "Offline" because the API doesn't return `lastActivityAt` yet
   - Activity updates will be sent but will fail (404 or 405 errors) until backend is implemented
   - Console will show errors (these are expected and non-breaking)

### Full Testing (After Backend Implementation)
1. **Login as Admin User A in Browser 1**
   - Navigate to Dashboard
   - Verify Admin A shows as "Online" (green indicator)

2. **Login as Admin User B in Browser 2 (or incognito)**
   - Navigate to Dashboard
   - Verify both Admin A and Admin B show as "Online"

3. **Test Inactivity:**
   - Leave both browsers inactive for 6 minutes
   - Refresh the Dashboard
   - Both admins should now show as "Offline" (gray indicator)

4. **Test Reactivation:**
   - Interact with Browser 1 (click, type, scroll)
   - Wait 1-2 minutes for sync
   - Refresh Dashboard in Browser 2
   - Admin A should show as "Online" again

## Configuration Options

You can adjust these parameters in the code:

### Activity Tracking (`src/hooks/useUserActivity.js`)
```javascript
const HEARTBEAT_INTERVAL = 2 * 60 * 1000;  // 2 minutes - how often to send heartbeat
const THROTTLE_MS = 60 * 1000;             // 1 minute - minimum time between activity updates
```

### Online Status (`src/services/userActivity.api.js`)
```javascript
const ONLINE_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes - how long until user is considered offline
```

## Performance Considerations

1. **API Call Frequency:**
   - Minimum: 1 call every 2 minutes (heartbeat)
   - Maximum: 1 call every minute (with constant user activity)
   - This is very conservative and shouldn't impact server performance

2. **Network Impact:**
   - Each activity update is a small PUT request (~50 bytes)
   - Approximately 30-60 requests per hour per active user

3. **Browser Performance:**
   - Event listeners are throttled to prevent performance issues
   - Intervals and listeners are properly cleaned up on unmount

## Security Notes

1. **Non-Blocking:** Activity tracking failures don't break the application
2. **Authentication Required:** Activity updates should require authentication (implemented in backend)
3. **Authorization:** Users should only update their own activity status
4. **No Sensitive Data:** Activity updates only send timestamps

## Future Enhancements

Consider these improvements:
1. **Real-time Updates:** Use WebSockets (SignalR) for instant status changes
2. **Presence Indicators:** Show more granular status (Active, Away, Busy)
3. **Last Seen Time:** Display "Last seen X minutes ago" for offline users
4. **Activity Types:** Track what users are doing (viewing books, managing users, etc.)
5. **Redis Caching:** Store online status in Redis for better performance
6. **Batch Updates:** Collect multiple activity updates and send in batches

## Troubleshooting

### All admins show as "Offline"
- **Cause:** Backend not implemented yet or `lastActivityAt` field not in database
- **Solution:** Implement backend changes from `BACKEND_REQUIREMENTS.md`

### Console shows 404/405 errors for activity updates
- **Cause:** Activity endpoint not implemented in backend
- **Solution:** Add PUT `/api/Users/{id}/activity` endpoint

### Status doesn't update in real-time
- **Expected Behavior:** Status updates require page refresh since we're using React Query with staleTime
- **Solution:** Reduce `staleTime` in `useUsers` hook or implement WebSocket connection

### Activity updates are too frequent
- **Solution:** Increase `THROTTLE_MS` or `HEARTBEAT_INTERVAL` in `useUserActivity.js`

## Support

For questions or issues:
1. Review this documentation
2. Check `BACKEND_REQUIREMENTS.md` for backend implementation details
3. Review console logs for API errors
4. Verify database schema includes `last_activity_at` column

## Related Documentation
- `BACKEND_REQUIREMENTS.md` - Detailed backend implementation guide
- `API Documentation.md` - General API documentation
- `API_INTEGRATION.md` - API integration guide
