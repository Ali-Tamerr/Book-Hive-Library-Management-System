import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { apiGet } from "../services/api.config";
import PromptToast from "../components/PromptToast.jsx";

const NFCReaderContext = createContext();

export const useNFCReader = () => {
  const context = useContext(NFCReaderContext);
  if (!context) {
    throw new Error("useNFCReader must be used within NFCReaderProvider");
  }
  return context;
};

export const NFCReaderProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isWebSerialSupported, setIsWebSerialSupported] = useState(false);
  const portRef = useRef(null);
  const readerRef = useRef(null);
  const callbacksRef = useRef(new Set());
  const [isWireless, setIsWireless] = useState(false);
  const [targetDeviceId, setTargetDeviceId] = useState(
    localStorage.getItem("nfc_scanner_id") || "esp32",
  );
  const lastProcessedScanTimeRef = useRef(new Date().toISOString());
  const lastProcessedScanIdRef = useRef(null);
  const [promptConfig, setPromptConfig] = useState({ show: false, resolve: null });

  const requestScannerId = () => {
    return new Promise((resolve) => {
      let id = localStorage.getItem("nfc_scanner_id");
      if (id) {
        resolve(id);
      } else {
        setPromptConfig({ show: true, resolve });
      }
    });
  };

  const handlePromptSubmit = (id) => {
    if (id && id.trim()) {
      localStorage.setItem("nfc_scanner_id", id.trim());
      setTargetDeviceId(id.trim());
      if (promptConfig.resolve) promptConfig.resolve(id.trim());
    } else {
      if (promptConfig.resolve) promptConfig.resolve(null);
    }
    setPromptConfig({ show: false, resolve: null });
  };

  const handlePromptCancel = () => {
    if (promptConfig.resolve) promptConfig.resolve(null);
    setPromptConfig({ show: false, resolve: null });
  };

  useEffect(() => {
    if ("serial" in navigator) {
      setIsWebSerialSupported(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (readerRef.current) {
        readerRef.current
          .cancel()
          .catch((e) =>
            console.error("Error cancelling reader on unmount:", e),
          );
      }
      if (portRef.current) {
        portRef.current
          .close()
          .catch((e) => console.error("Error closing port on unmount:", e));
        portRef.current = null;
      }
    };
  }, []);

  const registerCallback = (callback) => {
    callbacksRef.current.add(callback);
    return () => callbacksRef.current.delete(callback);
  };

  const notifyCallbacks = (data) => {
    callbacksRef.current.forEach((callback) => callback(data));
  };

  const disconnectFromArduino = async () => {
    if (readerRef.current) {
      await readerRef.current
        .cancel()
        .catch((e) =>
          console.error("Error cancelling reader on disconnect:", e),
        );
    } else if (portRef.current) {
      await portRef.current
        .close()
        .catch((e) => console.error("Error closing port:", e));
    }
    setIsConnected(false);
    portRef.current = null;
    readerRef.current = null;
  };

  const connectToArduino = async () => {
    if (!isWebSerialSupported) {
      alert(
        "Your browser does not support the Web Serial API. Please use a compatible browser like Chrome or Edge.",
      );
      return;
    }
    if (portRef.current) {
      console.warn("A port is already selected. Disconnect first.");
      return;
    }

    try {
      const port = await navigator.serial.requestPort();

      portRef.current = port;
      await port.open({ baudRate: 9600 });

      setIsConnected(true);

      port.ondisconnect = () => {
        setIsConnected(false);
        portRef.current = null;
        readerRef.current = null;
      };

      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
      readerRef.current = reader;

      (async () => {
        let buffer = "";
        let flushTimer = null;

        try {
          while (true) {
            const { value, done } = await reader.read();

            if (done) {
              break;
            }

            if (value) {
              buffer += value;

              // Clear any pending flush since we got new data
              if (flushTimer) clearTimeout(flushTimer);

              // Process standard newlines immediately
              if (buffer.includes("\n") || buffer.includes("\r")) {
                // Split by any newline sequence
                const parts = buffer.split(/[\r\n]+/);
                // The last part might be incomplete, so keep it in buffer
                // Unless the string ended with a newline, in which case the last part is empty

                // Proper handling:
                // "ID1\nID2" -> ["ID1", "ID2"] (Wait, ID2 might be incomplete?)
                // "ID1\n" -> ["ID1", ""]

                // We trust that if we split by newline, all parts EXCEPT the last one are complete.
                const lastPart = parts.pop();

                parts.forEach((part) => {
                  const trimmed = part.trim();
                  if (trimmed) {
                    notifyCallbacks(trimmed);
                  }
                });

                buffer = lastPart || "";
              }

              // If we still have data in buffer (incomplete or no newline received),
              // set a timer to flush it if no more data comes soon.
              if (buffer.trim()) {
                flushTimer = setTimeout(() => {
                  const trimmed = buffer.trim();
                  if (trimmed) {
                    notifyCallbacks(trimmed);
                    buffer = "";
                  }
                }, 200);
              }
            }
          }
        } catch (error) {
          console.error("❌ Read loop error:", error);
        } finally {
          reader.releaseLock();
          setIsConnected(false);
          if (portRef.current) {
            await portRef.current
              .close()
              .catch((e) => console.error("Error closing port in finally:", e));
            portRef.current = null;
          }
          readerRef.current = null;
        }
      })();

      readableStreamClosed.catch((e) =>
        console.error("Readable stream closed with error:", e),
      );
    } catch (error) {
      console.error("Connection error:", error);
      if (error.name === "NotFoundError") {
        // User cancelled port selection
      } else if (error.name === "InvalidStateError") {
        alert("The port is already open. Please disconnect and try again.");
      } else {
        console.error("Failed to connect to the serial device:", error);
        alert(
          `An error occurred while connecting to the NFC reader: ${error.message}`,
        );
      }
      setIsConnected(false);
      if (portRef.current) {
        portRef.current = null;
      }
    }
  };

  // Wireless Scanning: Poll the secure backend proxy endpoint.
  // This completely resolves Supabase client-side RLS policy restrictions.
  const toggleWireless = async () => {
    if (!isWireless) {
      const id = await requestScannerId();
      if (!id) return; // User cancelled
    }
    setIsWireless((prev) => !prev);
    lastProcessedScanTimeRef.current = new Date().toISOString();
    lastProcessedScanIdRef.current = null;
  };

  useEffect(() => {
    if (!isWireless) return;

    const handlePoll = async () => {
      try {
        // Fetch the latest scan for this device ID securely through the C# backend API
        const response = await apiGet(`/supabase/latest_scan?deviceId=${targetDeviceId}`);
        
        if (response && response.uid) {
          const scanId = response.id || response.uid;
          const scanTime = response.created_at || new Date().toISOString();
          
          const isDuplicate = lastProcessedScanIdRef.current === scanId;
          const scanTimeMs = new Date(scanTime).getTime();
          
          // Allow a very small 5-second skew in case server time is slightly behind the client
          const thresholdTimeMs = new Date(lastProcessedScanTimeRef.current).getTime() - 5000;
          const isRecent = scanTimeMs > thresholdTimeMs;

          if (!isDuplicate && isRecent) {
            notifyCallbacks(response.uid);
            lastProcessedScanIdRef.current = scanId;
            lastProcessedScanTimeRef.current = scanTime;
          }
        }
      } catch (err) {
        // 404 is expected if the device hasn't scanned anything yet, so we don't log it as an error
        if (err.status !== 404 && err.response?.status !== 404) {
          console.error("Wireless proxy polling error:", err);
        }
      }
    };

    // Run the poll immediately once wireless is toggled, then every 1 second
    handlePoll();
    const intervalId = setInterval(handlePoll, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isWireless, targetDeviceId]);

  const forgetScannerId = () => {
    localStorage.removeItem("nfc_scanner_id");
    setTargetDeviceId("esp32");
    if (isWireless) {
      setIsWireless(false);
    }
  };

  const handleConnectClick = async () => {
    if (isConnected) {
      await disconnectFromArduino();
    } else {
      await connectToArduino();
    }
  };

  const value = {
    isConnected, // Wired status
    isWireless, // Wireless status
    isWebSerialSupported,
    handleConnectClick, // Wired connect
    toggleWireless, // Wireless toggle
    registerCallback,
    targetDeviceId,
    forgetScannerId,
    requestScannerId,
  };

  return (
    <NFCReaderContext.Provider value={value}>
      {children}
      <PromptToast
        show={promptConfig.show}
        message="Enter Scanner ID (shown on LCD):"
        defaultValue="esp32"
        onSubmit={handlePromptSubmit}
        onCancel={handlePromptCancel}
      />
    </NFCReaderContext.Provider>
  );
};
