import React, { useEffect } from "react";
import { useNFCReader } from "../contexts/NFCReaderContext";
import { Wifi, Usb, Loader2 } from "lucide-react";

const NFCReaderButton = ({ onDataReceived, inputRef }) => {
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

  return (
    <div className="flex h-[50px] w-full gap-2">
      {/* USB Button */}
      <button
        type="button"
        onClick={handleConnectClick}
        className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-[12px] text-[13px] font-medium transition-colors ${
          isConnected
            ? "border border-red-200 bg-red-100 text-red-700 hover:bg-red-200"
            : "border border-transparent bg-[#F2F2F2] text-[#000035] hover:bg-gray-200"
        }`}
        title={isConnected ? "Disconnect USB" : "Connect via USB Cable"}
      >
        <Usb size={18} />
        {isConnected ? "Disconnect" : "USB"}
      </button>

      {/* Wireless Button */}
      <button
        type="button"
        onClick={toggleWireless}
        className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-[12px] text-[13px] font-medium transition-colors ${
          isWireless
            ? "border border-blue-200 bg-blue-100 text-blue-700 hover:bg-blue-200"
            : "border border-transparent bg-[#F2F2F2] text-[#000035] hover:bg-gray-200"
        }`}
        title={isWireless ? "Disable Wireless" : "Enable Wireless Scanning"}
      >
        {isWireless ? (
          <Wifi size={18} className="animate-pulse" />
        ) : (
          <Wifi size={18} />
        )}
        {isWireless ? "Active" : "Wireless"}
      </button>
    </div>
  );
};

export default NFCReaderButton;
