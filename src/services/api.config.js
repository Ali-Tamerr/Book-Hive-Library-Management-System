import axios from "axios";

const rawApiUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const API_BASE_URL = rawApiUrl.replace(/^['"]|['"]$/g, "");

const inferMimeFromBytes = (bytes) => {
  if (!bytes || bytes.length < 4) return "image/jpeg";

  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }

  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    return "image/jpeg";
  }

  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
    return "image/gif";
  }

  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }

  return "image/jpeg";
};

const normalizeImageValue = (input) => {
  if (!input) return null;
  if (typeof input === "string") return input.trim();

  if (Array.isArray(input)) {
    try {
      const binary = String.fromCharCode(...input);
      return btoa(binary);
    } catch {
      return null;
    }
  }

  if (typeof input === "object") {
    if (typeof input.base64 === "string") return input.base64.trim();
    if (typeof input.data === "string") return input.data.trim();
    if (Array.isArray(input.data)) {
      try {
        const binary = String.fromCharCode(...input.data);
        return btoa(binary);
      } catch {
        return null;
      }
    }
  }

  return String(input).trim();
};

const decodeBase64ToBytes = (base64) => {
  const clean = base64.replace(/\s+/g, "");
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
};

export const getImageUrl = (rawValue) => {
  const value = normalizeImageValue(rawValue);
  if (!value) return null;

  if (value.startsWith("data:")) return value;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;

  if (value.startsWith("\\x")) {
    try {
      const hex = value.slice(2);
      const bytes = new Uint8Array(
        hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)),
      );
      const binary = String.fromCharCode(...bytes);
      const base64 = btoa(binary);
      const mime = inferMimeFromBytes(bytes);
      return `data:${mime};base64,${base64}`;
    } catch (error) {
      console.error("Failed to convert hex image:", error);
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

  const looksLikeBase64 =
    /^[A-Za-z0-9+/=_\-\r\n]+$/.test(value) && value.length > 40;
  if (looksLikeBase64) {
    try {
      const normalized = value
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .replace(/\s+/g, "");
      const bytes = decodeBase64ToBytes(normalized);

      const decodedTextSample = new TextDecoder("utf-8", {
        fatal: false,
      }).decode(bytes.slice(0, 64));

      if (decodedTextSample.startsWith("data:image/")) {
        return decodedTextSample;
      }

      const firstDecodedLooksLikeBase64 = /^[A-Za-z0-9+/=_\-]+$/.test(
        decodedTextSample.trim(),
      );
      if (firstDecodedLooksLikeBase64 && decodedTextSample.trim().length > 30) {
        const second = decodedTextSample
          .trim()
          .replace(/-/g, "+")
          .replace(/_/g, "/");
        const secondBytes = decodeBase64ToBytes(second);
        const secondMime = inferMimeFromBytes(secondBytes);
        return `data:${secondMime};base64,${second}`;
      }

      const mime = inferMimeFromBytes(bytes);
      return `data:${mime};base64,${normalized}`;
    } catch {
      return null;
    }
  }

  return null;
};

// Create Axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

// Request interceptor - Add auth token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Primary auth: Bearer token from localStorage.
    // The server also sets an HttpOnly cookie as a secondary mechanism,
    // but for cross-origin deployments (e.g. Vercel → Azure),
    // the Authorization header is the reliable method.
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    // Log the full error for debugging only in development
    if (import.meta.env.DEV) {
      console.error("Full error object:", error);
    }

    if (error.response) {
      // Server responded with error
      const message =
        error.response.data?.message ||
        error.response.data?.Message ||
        error.response.data?.error ||
        (typeof error.response.data?.errors === "object"
          ? JSON.stringify(error.response.data.errors)
          : error.response.data?.errors) ||
        `Request failed with status code ${error.response.status}`;
      if (import.meta.env.DEV) {
        console.error(
          "API Error Response:",
          error.response.status,
          error.response.data,
        );
      }

      // Preserve the full error object
      const errorWithDetails = new Error(message);
      errorWithDetails.response = error.response;
      errorWithDetails.status = error.response.status;
      return Promise.reject(errorWithDetails);
    } else if (error.request) {
      // Request made but no response — don't log the URL
      if (import.meta.env.DEV) {
        console.error("Network Error - No response received:", error.message);
      }
      const networkError = new Error(
        "Network error. Please check your connection.",
      );
      networkError.request = error.request;
      return Promise.reject(networkError);
    } else {
      // Something else happened
      if (import.meta.env.DEV) {
        console.error("Error:", error.message);
      }
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
