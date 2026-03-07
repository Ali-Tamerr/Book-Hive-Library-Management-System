import React, { useEffect, useState } from "react";
import { useNFCReader } from "../contexts/NFCReaderContext";
import { Wifi, Usb, Loader2 } from "lucide-react";

const NFCReaderButton = ({
  onDataReceived,
  bookId,
  context = "book_copy",
  inputRef,
  isFlexOne = "false",
}) => {
  const {
    isConnected,
    isWireless,
    handleConnectClick,
    toggleWireless,
    registerCallback,
  } = useNFCReader();

  const [isActivating, setIsActivating] = useState(false);

  useEffect(() => {
    if (!onDataReceived) return;

    const unregister = registerCallback(onDataReceived);
    return unregister;
  }, [onDataReceived, registerCallback]);

  useEffect(() => {
    if ((isConnected || isWireless) && inputRef?.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isConnected, isWireless, inputRef]);

  const handleScanClick = async () => {
    if (isConnected || isWireless) {
      try {
        if (isConnected) await handleConnectClick(); // disconnect USB
        if (isWireless) toggleWireless(); // stop polling
      } catch (err) {
        console.error("Failed to stop scanning:", err);
      }
      return;
    }

    try {
      setIsActivating(true);

      if (context === "book_copy" && bookId) {
        try {
          const base =
            import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

          await fetch(`${base}/supabase/start_register_mode`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              device_id: "kiosk1",
              book_id: bookId,
            }),
          });
        } catch (err) {
          console.warn("Failed to start register mode on Supabase:", err);
        }
      }

      toggleWireless();

      await handleConnectClick();
    } catch (err) {
      console.error("Failed to activate scanning:", err);
    } finally {
      setIsActivating(false);
    }
  };

  const isActive = isConnected || isWireless;
  const flexClass = isFlexOne === true || isFlexOne === "true" ? "flex-1" : "";

  return (
    <div className="flex h-[50px] gap-2">
      <button
        type="button"
        onClick={handleScanClick}
        disabled={isActivating}
        className={`${flexClass} flex min-w-[100px] cursor-pointer items-center justify-center gap-2 rounded-[12px] px-4 text-[13px] font-medium transition-colors ${
          isActive
            ? "border border-red-200 bg-red-100 text-red-700 hover:bg-red-200"
            : "border border-transparent bg-[#F2F2F2] text-[#000035] hover:bg-gray-200 dark:bg-[#D7D7D7] dark:text-[#000035] dark:hover:bg-gray-300"
        } ${isActivating ? "cursor-not-allowed opacity-50" : ""}`}
        title={
          isActive ? "Disconnect / Stop Scanning" : "Scan via USB or Wireless"
        }
      >
        {isActivating ? (
          <Loader2 size={18} className="animate-spin" />
        ) : isConnected ? (
          <Usb size={18} />
        ) : isWireless ? (
          <Wifi size={18} className="animate-pulse" />
        ) : (
          <Usb size={18} />
        )}
        {isActivating ? "Syncing..." : isActive ? "Disconnect" : "Scan"}
      </button>
    </div>
  );
};

export default NFCReaderButton;
