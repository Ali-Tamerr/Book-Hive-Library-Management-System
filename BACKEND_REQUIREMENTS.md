# Backend Requirements for Online Status Feature

## Overview
This document describes the backend changes required to support the admin online/offline status feature on the Dashboard.

## Database Changes

### Users Table
Add a new column to track user activity:

```sql
ALTER TABLE Users 
ADD COLUMN last_activity_at TIMESTAMP NULL DEFAULT NULL;
```

Or in your Supabase migration:

```sql
-- Migration: Add last_activity_at column to Users table
ALTER TABLE "Users" 
ADD COLUMN "last_activity_at" TIMESTAMP WITH TIME ZONE NULL;

-- Create index for better query performance
CREATE INDEX idx_users_last_activity ON "Users"("last_activity_at");
```

## .NET Core API Changes

### 1. Update User Model

In your `Models/User.cs` (or equivalent), add the new property:

```csharp
public class User
{
    // ... existing properties ...
    
    [Column("last_activity_at")]
    public DateTime? LastActivityAt { get; set; }
}
```

### 2. Update UserDTO

In your `DTOs/UserDTO.cs`, add the new property:

```csharp
public class UserDTO
{
    // ... existing properties ...
    
    public DateTime? LastActivityAt { get; set; }
}
```

### 3. Add Activity Update Endpoint

In `Controllers/UsersController.cs`, add a new endpoint to update user activity:

```csharp
/// <summary>
/// Update user's last activity timestamp
/// </summary>
/// <param name="id">User ID</param>
/// <param name="activityData">Activity data containing timestamp</param>
/// <returns>NoContent on success</returns>
[HttpPut("{id}/activity")]
public async Task<IActionResult> UpdateUserActivity(int id, [FromBody] UserActivityDto activityData)
{
    var user = await _context.Users.FindAsync(id);
    
    if (user == null)
    {
        return NotFound(new { message = "User not found" });
    }
    
    // Update the last activity timestamp
    user.LastActivityAt = activityData.LastActivityAt ?? DateTime.UtcNow;
    
    try
    {
        await _context.SaveChangesAsync();
        return NoContent();
    }
    catch (DbUpdateException)
    {
        return StatusCode(500, new { message = "Error updating user activity" });
    }
}
```

### 4. Create UserActivityDto

Create a new DTO for the activity update:

```csharp
public class UserActivityDto
{
    public DateTime? LastActivityAt { get; set; }
}
```

### 5. Update GetUsers to Include LastActivityAt

Make sure your existing `GET /api/Users` endpoint maps the `LastActivityAt` field:

```csharp
[HttpGet]
public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
{
    var users = await _context.Users
        .Include(u => u.BookReservations)
        .Include(u => u.BookSales)
        .ToListAsync();

    var userDTOs = users.Select(u => new UserDTO
    {
        // ... existing mappings ...
        LastActivityAt = u.LastActivityAt,
    }).ToList();

    return Ok(userDTOs);
}
```

## API Endpoint Summary

### New Endpoint
- **PUT** `/api/Users/{id}/activity`
  - Description: Update user's last activity timestamp
  - Request Body: `{ "lastActivityAt": "2024-11-06T15:30:00Z" }`
  - Response: 204 No Content (success), 404 Not Found (user not found)

### Modified Endpoint
- **GET** `/api/Users`
  - Now includes `lastActivityAt` field in UserDTO response

## Frontend Integration

The frontend has been updated to:
1. Send periodic heartbeat updates to `/api/Users/{id}/activity` every 2 minutes
2. Track user interactions (clicks, keyboard, scroll) and update activity (throttled to 1 minute)
3. Display "Online" status if user was active within the last 5 minutes
4. Display "Offline" status if user hasn't been active for more than 5 minutes

## Testing

To test the feature:

1. **Database Migration**: Run the SQL migration to add the `last_activity_at` column
2. **Backend Changes**: Implement the model, DTO, and controller changes
3. **Test Activity Updates**: 
   - Login as a user
   - Verify that `/api/Users/{id}/activity` endpoint accepts PUT requests
   - Verify the `last_activity_at` field updates in the database
4. **Test Status Display**:
   - Open the Dashboard
   - Verify admins show as "Online" (green indicator)
   - Wait for 5+ minutes without activity
   - Refresh and verify admin shows as "Offline" (gray indicator)

## Security Considerations

1. **Authentication**: Ensure the activity update endpoint requires authentication
2. **Authorization**: Users should only be able to update their own activity status
3. **Rate Limiting**: Consider implementing rate limiting to prevent abuse

### Optional: Add Authorization Check

```csharp
[HttpPut("{id}/activity")]
[Authorize] // Requires authentication
public async Task<IActionResult> UpdateUserActivity(int id, [FromBody] UserActivityDto activityData)
{
    // Get the authenticated user's ID from the JWT token
    var authenticatedUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
    
    // Check if user is trying to update their own activity or is an admin
    if (authenticatedUserId != id && !User.IsInRole("Admin"))
    {
        return Forbid();
    }
    
    // ... rest of the implementation ...
}
```

## Performance Considerations

1. **Index**: The migration includes an index on `last_activity_at` for better query performance
2. **Caching**: Consider caching user online status on the backend for 30-60 seconds to reduce database queries
3. **Batch Updates**: For high-traffic scenarios, consider batching activity updates

## Alternative Approaches

If you want a more real-time solution, consider:
1. **SignalR/WebSockets**: Use real-time communication for instant status updates
2. **Redis**: Store online status in Redis with TTL for better performance
3. **Presence Service**: Implement a dedicated microservice for managing user presence

## Deployment Notes

1. Backup your database before running migrations
2. Test the migration on a staging environment first
3. Deploy backend changes before frontend for backward compatibility
4. Monitor API logs for any errors in the activity update endpoint
