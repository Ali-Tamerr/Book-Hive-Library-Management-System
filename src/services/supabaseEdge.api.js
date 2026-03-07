import { apiPost } from "./api.config";

export const checkBook = async (userId, bookCopyId) => {
  return await apiPost("/supabase/check_book", {
    user_id: userId,
    book_copy_id: bookCopyId,
  });
};

export const checkUser = async (userId) => {
  return await apiPost("/supabase/check_user", {
    user_id: userId,
  });
};

export const startRegisterMode = async (deviceId, bookId) => {
  return await apiPost("/supabase/start_register_mode", {
    device_id: deviceId,
    book_id: bookId,
  });
};
