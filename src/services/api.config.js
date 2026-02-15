import axios from "axios";

const rawApiUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const API_BASE_URL = rawApiUrl.replace(/^['"]|['"]$/g, "");
console.log("API_BASE_URL configured as:", API_BASE_URL);

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
    if (token) {
      try {
        const tokenData = JSON.parse(token);
        // Check if tokenData is an object with a 'token' property, otherwise use it directly
        const actualToken =
          tokenData && typeof tokenData === "object" && tokenData.token
            ? tokenData.token
            : tokenData;
        config.headers.Authorization = `Bearer ${actualToken}`;
      } catch (e) {
        // If token is not JSON, use it as string
        config.headers.Authorization = `Bearer ${token}`;
      }
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
