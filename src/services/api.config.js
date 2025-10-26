import axios from 'axios';

// API Configuration
export const API_BASE_URL = 'https://library-management-system-bqdmafdqfdamdefv.uaenorth-01.azurewebsites.net/api';

// Create Axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const tokenData = JSON.parse(token);
        config.headers.Authorization = `Bearer ${tokenData}`;
      } catch (e) {
        // If token is not JSON, use it as string
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.message || error.message;
      console.error('API Error:', message);
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return Promise.reject(error);
    }
  }
);

// Helper functions for different HTTP methods
export const apiGet = (endpoint, config = {}) => axiosInstance.get(endpoint, config);
export const apiPost = (endpoint, data, config = {}) => axiosInstance.post(endpoint, data, config);
export const apiPut = (endpoint, data, config = {}) => axiosInstance.put(endpoint, data, config);
export const apiDelete = (endpoint, config = {}) => axiosInstance.delete(endpoint, config);

// Export the instance for custom use
export default axiosInstance;

