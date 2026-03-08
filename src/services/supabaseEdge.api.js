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
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabaseUrl = "https://guoanmhasnpjmlewqzrs.supabase.co";

  if (supabaseKey) {
    try {
      const response = await fetch(
        `${supabaseUrl}/functions/v1/start_register_mode`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({
            device_id: deviceId,
            book_id: bookId,
          }),
        },
      );

      if (response.ok) {
        return await response.json();
      }

      const text = await response.text();
      console.warn(
        "Direct Supabase start_register_mode failed:",
        response.status,
        text,
      );
    } catch (err) {
      console.warn(
        "Direct Supabase call failed, falling back to backend:",
        err,
      );
    }
  }

  return await apiPost("/supabase/start_register_mode", {
    device_id: deviceId,
    book_id: bookId,
  });
};