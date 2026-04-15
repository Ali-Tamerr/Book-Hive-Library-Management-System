import { apiPost } from "./api.config";

/**
 * All Supabase operations are now proxied through our secure backend
 * to avoid exposing the Supabase Anon Key and to enable proper RBAC.
 */

/**
 * Checks if a book exists/is valid via Supabase Edge Function
 */
export const checkBook = async (userId, bookCopyId) => {
  return await apiPost("/supabase/check_book", {
    user_id: userId,
    book_copy_id: bookCopyId,
  });
};

/**
 * Checks if a user is valid via Supabase Edge Function
 */
export const checkUser = async (userId) => {
  return await apiPost("/supabase/check_user", {
    user_id: userId,
  });
};

/**
 * Starts device registration mode.
 * Direct table writes have been moved to the backend proxy for security.
 */
export const startRegisterMode = async (deviceId) => {
  return await apiPost("/supabase/start_register_mode", {
    device_id: deviceId,
  });
};
