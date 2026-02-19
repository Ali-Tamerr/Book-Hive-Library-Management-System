import axios from "axios";

const rawApiUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const API_BASE_URL = rawApiUrl.replace(/^['"]|['"]$/g, "");
console.log("API_BASE_URL configured as:", API_BASE_URL);

export const getImageUrl = (path) => {
  if (!path) return null;
  const value = String(path).trim();

  if (value.startsWith("data:")) return value;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;

  // Check for Postgres Hex format (\x...)
  if (value.startsWith("\\x")) {
    try {
      // Remove prefix
      const hex = value.substring(2);
      // Convert hex to binary string
      const match = hex.match(/.{1,2}/g);
      if (match) {
        const binary = match
          .map((byte) => String.fromCharCode(parseInt(byte, 16)))
          .join("");
        return `data:image/jpeg;base64,${btoa(binary)}`;
      }
    } catch (e) {
      console.error("Failed to convert hex image:", e);
      return null;
    }
  }

  const looksLikePath =
    /^\/?(uploads|images|assets)\//i.test(value) ||
    /^[./]/.test(value) ||
    /\\/.test(value) ||
    /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|avif)$/i.test(value);

  if (looksLikePath) {
    const normalizedPath = value.replace(/\\/g, "/");
    const rootUrl = API_BASE_URL.replace(/\/api\/?$/, "");
    const formattedPath = normalizedPath.startsWith("/")
      ? normalizedPath
      : `/${normalizedPath}`;
    return `${rootUrl}${formattedPath}`;
  }

  const looksLikeBase64 = /^[A-Za-z0-9+/=\r\n]+$/.test(value) && value.length > 40;
  if (looksLikeBase64) {
    return `data:image/jpeg;base64,${value.replace(/\s+/g, "")}`;
  }

  // Treat as base64
  return `data:image/jpeg;base64,${value}`;
};

// Create Axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return config;
    }

    let actualToken = null;

    try {
      const tokenData = JSON.parse(token);
      if (typeof tokenData === "string") {
        actualToken = tokenData;
      } else if (tokenData && typeof tokenData === "object") {
        if (typeof tokenData.token === "string") {
          actualToken = tokenData.token;
        } else if (typeof tokenData.accessToken === "string") {
          actualToken = tokenData.accessToken;
        }
      }
    } catch {
      actualToken = token;
    }

    if (typeof actualToken === "string" && actualToken.trim().length > 0) {
      config.headers.Authorization = `Bearer ${actualToken.trim()}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Log the full error for debugging
    console.error("Full error object:", error);

    if (error.response) {
      // Server responded with error
      const message =
        error.response.data?.message ||
        (typeof error.response.data?.errors === "object"
          ? JSON.stringify(error.response.data.errors)
          : error.response.data?.errors) ||
        error.message ||
        `Server error: ${error.response.status}`;
      console.error(
        "API Error Response:",
        error.response.status,
        error.response.data,
      );

      // Preserve the full error object
      const errorWithDetails = new Error(message);
      errorWithDetails.response = error.response;
      errorWithDetails.status = error.response.status;
      return Promise.reject(errorWithDetails);
    } else if (error.request) {
      // Request made but no response
      console.error("Network Error - No response received:", error.message);
      const networkError = new Error(
        "Network error. Please check your connection.",
      );
      networkError.request = error.request;
      return Promise.reject(networkError);
    } else {
      // Something else happened
      console.error("Error:", error.message);
      return Promise.reject(error);
    }
  },
);

// Helper functions for different HTTP methods
export const apiGet = (endpoint, config = {}) =>
  axiosInstance.get(endpoint, config);
export const apiPost = (endpoint, data, config = {}) =>
  axiosInstance.post(endpoint, data, config);
export const apiPut = (endpoint, data, config = {}) =>
  axiosInstance.put(endpoint, data, config);
export const apiPatch = (endpoint, data, config = {}) =>
  axiosInstance.patch(endpoint, data, config);
export const apiDelete = (endpoint, config = {}) =>
  axiosInstance.delete(endpoint, config);

// Export the instance for custom use
export default axiosInstance;
