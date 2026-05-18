import React, { useEffect, useState } from "react";
import { useNFCReader } from "../contexts/NFCReaderContext";
import { Wifi, Usb, Loader2 } from "lucide-react";
import { startRegisterMode } from "../services/supabaseEdge.api";

const NFCReaderButton = ({
  onDataReceived,
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
    if (isConnected || isWireless) {
      const focus = () => {
        if (inputRef?.current) {
          inputRef.current.focus();
        }
      };

      // Try immediately
      focus();

      // Set up sequential timers to ensure focus is grabbed and held,
      // preventing the browser from stealing focus when Web Serial modal closes
      const timers = [
        setTimeout(focus, 50),
        setTimeout(focus, 150),
        setTimeout(focus, 300),
        setTimeout(focus, 600),
        setTimeout(focus, 1000),
      ];

      return () => {
        timers.forEach(clearTimeout);
      };
    }
  }, [isConnected, isWireless, inputRef]);

  const handleScanClick = async () => {
    // لو في اسكان/بولينج شغال، وقفه
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

      // ننده Edge Function ونبعت device_id بس
      await startRegisterMode(deviceId);

      // فعّل wireless visual state والـ polling
      toggleWireless();

      // Automatically focus the first empty ID row after starting registration mode
      // This ensures the software is ready for the upcoming wireless scan.
      if (inputRef?.current) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 300);
      }
    } catch (err) {
      console.error("Activation failed:", err.message || err);
    } finally {
      setIsActivating(false);
    }
  };

  const isActive = isConnected || isWireless;
  const flexClass = isFlexOne === true || isFlexOne === "true" ? "flex-1" : "";

  return (
    <div className="flex h-[3.125rem] gap-2">
      <button
        type="button"
        onClick={handleScanClick}
        disabled={isActivating}
        className={`${flexClass} flex min-w-[6.25rem] cursor-pointer items-center justify-center gap-2 rounded-[0.75rem] px-4 text-[0.8125rem] font-medium transition-colors ${
          isActive
            ? "border border-red-200 bg-red-100 text-red-700 hover:bg-red-200"
            : "border border-[#000035] text-[#000035] hover:bg-[#000035] hover:text-[#F2F2F2] dark:border-[#D7D7D7] dark:text-[#D7D7D7] dark:hover:bg-[#D7D7D7] dark:hover:bg-gray-300 dark:hover:text-[#121317]"
        } ${isActivating ? "cursor-not-allowed opacity-50" : ""}`}
        title={isActive ? "Stop Scanning" : "Scan via Wireless"}
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
