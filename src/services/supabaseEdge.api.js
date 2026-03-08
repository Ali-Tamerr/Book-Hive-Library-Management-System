import { apiPost } from "./api.config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

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

export const startRegisterMode = async (deviceId) => {
  // 1) Direct table write (Highest priority for hardware synchronization)
  const expiresAt = new Date(Date.now() + 60000).toISOString();

  try {
    // First, clear any old state for this device to simulate an "upsert"
    // since the table lacks a primary key.
    await supabase
      .from("deviceregisterstate")
      .delete()
      .eq("device_id", deviceId);

    // Then insert the new state.
    // Note: 'consumed' column is removed as it doesn't appear in the DB screenshot.
    const { error } = await supabase.from("deviceregisterstate").insert({
      device_id: deviceId,
      expires_at: expiresAt,
    });

    if (error) throw error;
    console.log("Successfully updated deviceregisterstate table");
  } catch (err) {
    console.warn("Direct table write failed:", err);
  }

  // 2) Edge Function call (for additional logic like role validation if needed)
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  if (supabaseKey && supabaseUrl) {
    try {
      await fetch(`${supabaseUrl}/functions/v1/start_register_mode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          device_id: deviceId,
        }),
      });
    } catch (err) {
      console.warn("Edge Function call failed:", err);
    }
  }

  // 3) Fallback/Legacy call (optional)
  return await apiPost("/supabase/start_register_mode", {
    device_id: deviceId,
  });
};
