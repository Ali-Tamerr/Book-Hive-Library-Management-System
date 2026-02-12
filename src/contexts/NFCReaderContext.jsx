import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { apiGet } from "../services/api.config";

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
  const lastProcessedScanTimeRef = useRef(new Date().toISOString());

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
      console.log("Requesting serial port...");
      const port = await navigator.serial.requestPort();
      console.log("Port selected:", port);

      portRef.current = port;
      console.log("Opening port with baudRate 9600...");
      await port.open({ baudRate: 9600 });
      console.log("Port opened successfully!");

      setIsConnected(true);
      console.log("Connection state set to true");

      port.ondisconnect = () => {
        console.log("Port disconnected");
        setIsConnected(false);
        portRef.current = null;
        readerRef.current = null;
      };

      console.log("Setting up text decoder...");
      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
      readerRef.current = reader;
      console.log("Reader ready, waiting for data...");

      (async () => {
        let buffer = "";
        let flushTimer = null;

        try {
          while (true) {
            const { value, done } = await reader.read();

            if (done) {
              console.log("Reader done");
              break;
            }

            if (value) {
              console.log("Raw data received:", value);
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
                    console.log("✅ NFC Tag ID:", trimmed);
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
                    console.log("✅ NFC Tag ID (Timeout Flush):", trimmed);
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
          console.log("Cleaning up reader...");
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
        console.log("User cancelled port selection");
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

  // Wireless Scanning: Poll the Backend API directly
  // This respects the new architecture where the Backend proxies/manages the database access.
  const toggleWireless = () => {
    setIsWireless((prev) => !prev);
    lastProcessedScanTimeRef.current = new Date().toISOString();
  };

  useEffect(() => {
    let pollInterval;

    if (isWireless) {
      console.log("Starting Wireless Polling via Backend API...");
      pollInterval = setInterval(async () => {
        try {
          // Fetch latest scans from our Backend (.NET/Supabase integration)
          // The API returns ordered list by created_at desc
          const data = await apiGet("/NfcScans");

          if (data && Array.isArray(data) && data.length > 0) {
            const latestScan = data[0];

            // Backend returns 'created_at'. Ensure we parse it correctly.
            // Compare string timestamps or Date objects
            if (
              new Date(latestScan.created_at) >
              new Date(lastProcessedScanTimeRef.current)
            ) {
              console.log("New Wireless Scan (API):", latestScan.tag_id);
              notifyCallbacks(latestScan.tag_id);
              lastProcessedScanTimeRef.current = latestScan.created_at;
            }
          }
        } catch (err) {
          console.error("Wireless Poll API Error:", err);
          // Don't auto-disable on error, as transient network issues might occur.
        }
      }, 1000); // Poll every 1 second
    }

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [isWireless]);

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
  };

  return (
    <NFCReaderContext.Provider value={value}>
      {children}
    </NFCReaderContext.Provider>
  );
};
