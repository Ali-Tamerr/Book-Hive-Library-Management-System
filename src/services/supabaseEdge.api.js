export const startRegisterMode = async (deviceId) => {
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabaseUrl = "https://guoanmhasnpjmlewqzrs.supabase.co";

  // 1) حاول تنادي Edge Function مباشرة
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
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        console.warn(
          "Direct Supabase start_register_mode failed:",
          response.status,
          text
        );
      } else {
        return await response.json();
      }
    } catch (err) {
      console.warn(
        "Direct Supabase call failed, falling back to backend:",
        err
      );
    }
  }

  // 2) Fallback: ننده نفس الفنكشن عبر الباك .NET لو محتاجين
  return await apiPost("/supabase/start_register_mode", {
    device_id: deviceId,
  });
};