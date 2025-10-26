# Debugging Signup "Network Error"

## The API is Working! ✅
The API is reachable and returning data. The issue is likely with the POST request.

## Steps to Debug:

### 1. **Open Browser DevTools**
1. Press `F12` or `Ctrl+Shift+I`
2. Go to the **Console** tab
3. Try to signup
4. Check for error messages

### 2. **Check Network Tab**
1. Go to **Network** tab
2. Try to signup
3. Look for the request to `/Users`
4. Click on it to see:
   - **Request URL**: Should be `https://library-management-system-bqdmafdqfdamdefv.uaenorth-01.azurewebsites.net/api/Users`
   - **Request Method**: Should be `POST`
   - **Status Code**: Check if it's 200 (success) or an error code
   - **Response**: See what the API returned

### 3. **Common Issues**

#### Issue 1: CORS Error
**Error Message**: `"Access to XMLHttpRequest at '...' from origin 'http://localhost:5173' has been blocked by CORS policy"`

**Solution**: The Azure deployment needs to allow requests from your localhost. The backend needs CORS configured.

#### Issue 2: Required Fields Missing
**Error**: `400 Bad Request` or validation errors

**Solution**: Check what fields the API expects. The README says it needs:
- `first_name`
- `last_name`  
- `email`
- `password_hash`
- `role` (optional)

#### Issue 3: Duplicate Email
**Error**: Email already exists

**Solution**: Try a different email address.

### 4. **What to Look For**

When you try to signup, you should see in the Console:
```
Signup - Preparing user data: {firstName: "...", lastName: "...", ...}
Signup - Sending user data to API: {first_name: "...", last_name: "...", ...}
```

Then either:
- `Signup - Response from API: {...}` ✅ Success
- OR `Error details: {...}` ❌ Failure

### 5. **Quick Test Commands**

You can test the API directly with PowerShell:

```powershell
# Test GET (should work)
Invoke-WebRequest -Uri 'https://library-management-system-bqdmafdqfdamdefv.uaenorth-01.azurewebsites.net/api/Users' -Method GET

# Test POST (will fail if fields are wrong)
$body = @{
    first_name = "Test"
    last_name = "User"
    email = "test@example.com"
    phone_number = "1234567890"
    password_hash = "test123"
    role = "User"
} | ConvertTo-Json

Invoke-WebRequest -Uri 'https://library-management-system-bqdmafdqfdamdefv.uaenorth-01.azurewebsites.net/api/Users' -Method POST -Body $body -ContentType 'application/json'
```

### 6. **What the Console Should Show**

**If Working:**
```
Signup - Preparing user data: {firstName: "...", ...}
Signup - Sending user data to API: {first_name: "...", ...}
Signup - Response from API: {id: X, first_name: "...", ...}
Signup successful, navigating to dashboard
```

**If Failing:**
```
Signup - Preparing user data: {firstName: "...", ...}
Signup - Sending user data to API: {first_name: "...", ...}
Signup error: [error details]
Error message: [error message]
Full error object: [full error]
```

## Most Likely Issue: CORS 🔴

If you see a CORS error, the Azure deployment doesn't allow requests from `localhost:5173`. 

**To fix CORS on the backend**, add this to your backend `Program.cs`:

```csharp
// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Use CORS
app.UseCors("AllowAll");
```

Or allow specific origins:
```csharp
policy.WithOrigins("http://localhost:5173", "https://yourdomain.com")
```

## Check These Next:

1. **Run the app**: `npm run dev`
2. **Open DevTools**: Press F12
3. **Try to signup**
4. **Copy the error message** from the Console tab
5. **Share the error message** so we can fix it!

## Updated Debug Logging

I've added detailed logging to:
- `src/services/auth.api.js` - Logs request/response
- `src/services/api.config.js` - Logs full error details
- `src/pages/Signup.jsx` - Logs form submission

All errors will now show detailed information in the browser console.

