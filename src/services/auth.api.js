import { createUser, loginUser } from "./users.api";

const persistAuthSession = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));

  const token =
    typeof user?.token === "string"
      ? user.token
      : typeof user?.accessToken === "string"
        ? user.accessToken
        : null;

  if (token) {
    localStorage.setItem("authToken", token);
  } else {
    localStorage.removeItem("authToken");
  }

  window.dispatchEvent(new Event("userUpdated"));
};

export const login = async (email, password) => {
  try {
    // Call the new backend login endpoint
    const user = await loginUser({ email, password });

    if (!user || !user.user_id) {
      throw new Error("Invalid response from server.");
    }

    persistAuthSession(user);
    return user;
  } catch (error) {
    // If the error message is from the backend, it will be in error.message
    // (thanks to the axios interceptor in api.config.js)
    console.error("Login error:", error);
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const createdUser = await createUser({
      user_id: userData.user_id,
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password_hash: userData.password,
      role: "User",
      status: "Active",
    });

    // The backend add method returns Ok(), so createdUser might be null/empty
    // But we know the user was created successfully if no error was thrown.
    // If we need the full user object, we could fetch it, but typically
    // we can just construct a basic session or force a login.
    
    // For now, let's just attempt to log them in automatically after signup
    // to get the sanitized user object from the server.
    return await login(userData.email, userData.password);
  } catch (error) {
    console.error("Signup error:", error);
    
    // Handle unique constraint violation (User already exists)
    if (error.message?.includes("duplicate key") || error.message?.includes("already exists") || error.status === 409) {
      throw new Error("This email is already linked to another account.");
    }
    
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentUser");
  window.dispatchEvent(new Event("userUpdated"));
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("currentUser");
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user) => {
  persistAuthSession(user);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("currentUser");
};
