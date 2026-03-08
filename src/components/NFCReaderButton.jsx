import React, { useEffect, useState } from "react";
import { useNFCReader } from "../contexts/NFCReaderContext";
import { Wifi, Usb, Loader2 } from "lucide-react";
import { startRegisterMode } from "../services/supabaseEdge.api";

const NFCReaderButton = ({
  onDataReceived,
  bookId,
  deviceId = "kiosk1",
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
    // If already scanning/polling, stop it
    if (isConnected || isWireless) {
      try {
        if (isConnected) await handleConnectClick();
        if (isWireless) toggleWireless();
      } catch (err) {
        console.error("Failed to stop scanning:", err);
      }
      return;
    }

    try {
      setIsActivating(true);

      // 1) Tell the Device (ESP) to start register mode for this ID
      if (bookId) {
        try {
          await startRegisterMode(deviceId, bookId);
        } catch (err) {
          console.warn("Edge Function failed:", err);
        }
      }

      // 2) Start Wireless Polling / Visual pulse
      toggleWireless();

      // 3) Try USB connection (optional/secondary)
      // await handleConnectClick();
    } catch (err) {
      console.error("Activation failed:", err);
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
            : "border border-[#000035] text-[#000035] hover:bg-[#000035] hover:text-[#F2F2F2] dark:text-[#D7D7D7] dark:hover:bg-[#D7D7D7] dark:hover:bg-gray-300 dark:hover:text-[#121317]"
        } ${isActivating ? "cursor-not-allowed opacity-50" : ""}`}
        title={isActive ? "Stop Scanning" : "Scan via USB or Wireless"}
      >
        {isActivating ? (
          <Loader2 size={18} className="animate-spin" />
        ) : isConnected ? (
          <Usb size={18} />
        ) : isWireless ? (
          <Wifi size={18} className="animate-pulse" />
        ) : (
          <Wifi size={18} />
        )}
        {isActivating ? "Syncing..." : isActive ? "Disconnect" : "Scan"}
      </button>
    </div>
  );
};

export default NFCReaderButton;
