import React, { useState } from "react";
import { Wifi, Loader2 } from "lucide-react";
import { startRegisterMode } from "../services/supabaseEdge.api";

const NFCReaderButton = ({ deviceId = "kiosk1", isFlexOne = "false" }) => {
  const [isActivating, setIsActivating] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleScanClick = async () => {
    // لو الزر شغال اعتبر الضغط تاني إلغاء انتظار
    if (isActive) {
      setIsActive(false);
      return;
    }

    try {
      setIsActivating(true);

      // شغّل وضع Admin على الكشك عبر Edge Function
      await startRegisterMode(deviceId);

      // من اللحظة دي الكشك هيستنى Scan ويكتب في scanned_book_uids
      setIsActive(true);

      // بعد دقيقة نطفي الحالة (اختياري)
      setTimeout(() => setIsActive(false), 60000);
    } catch (err) {
      console.error("Failed to start register mode:", err);
    } finally {
      setIsActivating(false);
    }
  };

  const flexClass = isFlexOne === true || isFlexOne === "true" ? "flex-1" : "";

  return (
    <div className="flex h-[50px] gap-2">
      <button
        type="button"
        onClick={handleScanClick}
        disabled={isActivating}
        className={`${flexClass} flex min-w-[100px] cursor-pointer items-center justify-center gap-2 rounded-[12px] px-4 text-[13px] font-medium transition-colors ${
          isActive
            ? "border border-emerald-200 bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
            : "border border-[#000035] text-[#000035] hover:bg-[#000035] hover:text-[#F2F2F2] dark:text-[#D7D7D7] dark:hover:bg-[#D7D7D7] dark:hover:bg-gray-300 dark:hover:text-[#121317]"
        } ${isActivating ? "cursor-not-allowed opacity-50" : ""}`}
        title={isActive ? "Waiting for NFC scan..." : "Start wireless scan"}
      >
        {isActivating ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Wifi size={18} className={isActive ? "animate-pulse" : ""} />
        )}
        {isActivating ? "Syncing..." : isActive ? "Waiting..." : "Scan"}
      </button>
    </div>
  );
};

export default NFCReaderButton;
