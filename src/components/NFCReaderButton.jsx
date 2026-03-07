import React, { useEffect } from "react";
import { useNFCReader } from "../contexts/NFCReaderContext";
import { Wifi, Usb, Loader2 } from "lucide-react";

const NFCReaderButton = ({ onDataReceived, inputRef, isFlexOne = "false" }) => {
  const {
    isConnected,
    isWireless,
    handleConnectClick,
    toggleWireless,
    registerCallback,
  } = useNFCReader();

  useEffect(() => {
    if (onDataReceived) {
      const unregister = registerCallback(onDataReceived);
      return unregister;
    }
  }, [onDataReceived, registerCallback]);

  useEffect(() => {
    // Keep focus logic if inputRef is provided (legacy support or if re-added)
    if ((isConnected || isWireless) && inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isConnected, isWireless, inputRef]);

  const [isActivating, setIsActivating] = React.useState(false);

  const handleScanClick = async () => {
    // If already connected or wireless, we disconnect/disable everything
    if (isConnected || isWireless) {
      if (isConnected) await handleConnectClick();
      if (isWireless) toggleWireless();
      return;
    }

    // Otherwise, we ACTIVATE
    try {
      setIsActivating(true);

      // 1. Try to start Wireless registration mode if in book context
      if (onDataReceived?.context === "book_copy") {
        const bookId = onDataReceived?.book_id;
        if (bookId) {
          try {
            await fetch(
              `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"}/supabase/start_register_mode`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ device_id: "esp8266", book_id: bookId }),
              },
            );
          } catch (err) {
            console.warn(
              "Supabase register mode failed (Wireless might not register tags with IDs):",
              err,
            );
          }
        }
      }

      // 2. Enable Wireless Polling
      toggleWireless();

      // 3. Attempt USB Serial Connection (Async)
      // This will open the browser's port selection window
      await handleConnectClick();
    } catch (err) {
      console.error("Failed to activate scanning:", err);
    } finally {
      setIsActivating(false);
    }
  };

  const isActive = isConnected || isWireless;

  return (
    <div className={`flex h-[50px] gap-2`}>
      <button
        type="button"
        onClick={handleScanClick}
        disabled={isActivating}
        className={` ${isFlexOne === "true" ? "flex-1" : ""} flex min-w-[100px] cursor-pointer items-center justify-center gap-2 rounded-[12px] px-4 text-[13px] font-medium transition-colors ${
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
