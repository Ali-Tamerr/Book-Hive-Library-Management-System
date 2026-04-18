import { apiGet, apiPost, apiPut, apiDelete } from "./api.config";

const BASE_ENDPOINT = "/Books";

// Get all books
export const getAllBooks = async () => {
  return await apiGet(BASE_ENDPOINT);
};

export const getBookManagement = async () => {
  return await apiGet(`${BASE_ENDPOINT}/management`);
};

export const getBookCovers = async () => {
  return await apiGet(`${BASE_ENDPOINT}/covers`);
};

// Get richer book data for dashboard filtering
export const getDashboardBooks = async () => {
  return await apiGet(`${BASE_ENDPOINT}/dashboard`);
};

// Get book by ID
export const getBookById = async (id) => {
  return await apiGet(`${BASE_ENDPOINT}/${id}`);
};

// Search books by title
export const searchBooksByTitle = async (title) => {
  const normalizedTitle = String(title || "").trim();
  if (!normalizedTitle) return [];
  return await apiGet(
    `${BASE_ENDPOINT}/title/${encodeURIComponent(normalizedTitle)}`,
  );
};

export const searchBooks = async (query) => {
  const normalizedQuery = String(query || "").trim();
  if (!normalizedQuery) return [];
  return await apiGet(
    `${BASE_ENDPOINT}/search?query=${encodeURIComponent(normalizedQuery)}`,
  );
};

export const getRecommendedBooks = async (title) => {
  const normalizedTitle = String(title || "").trim();
  if (!normalizedTitle) return [];
  return await apiGet(
    `${BASE_ENDPOINT}/recommend?title=${encodeURIComponent(normalizedTitle)}`,
  );
};

// Create new book
export const createBook = async (bookData) => {
  return await apiPost(BASE_ENDPOINT, bookData);
};

// Update book
export const updateBook = async (id, bookData) => {
  return await apiPut(`${BASE_ENDPOINT}/${id}`, bookData);
};

// Delete book
export const deleteBook = async (id) => {
  return await apiDelete(`${BASE_ENDPOINT}/${id}`);
};

/**
 * Fetch AI-powered recommendations for a specific user
 * from the deployed Hugging Face Space.
 */
export const getAIRecommendations = async (userId) => {
  if (!userId) return { status: "error", data: [] };
  
  const HF_SPACE_URL = "https://alitaamrr-book-hive.hf.space";
  
  try {
    const response = await fetch(`${HF_SPACE_URL}/api/recommendations/${userId}`);
    if (!response.ok) throw new Error("HF Space response was not ok");
    return await response.json();
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return { status: "error", data: [], message: error.message };
  }
};
