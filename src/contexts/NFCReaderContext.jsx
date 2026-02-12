import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

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

  // Hardcoded for the Wireless Scanner feature (Bypassing .NET for this specific hardware feature)
  const SUPABASE_URL =
    "https://guoanmhasnpjmlewqzrs.supabase.co/rest/v1/nfc_scans";
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1b2FubWhhc25wam1sZXdxenJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1Njk5NDEsImV4cCI6MjA3NjE0NTk0MX0.PD4QzTLaVGw3WIGr5oZ_kLdnWTE-CE485ZK83rMjLtU";

  const toggleWireless = () => {
    setIsWireless((prev) => !prev);
    // Reset last processed time to now so we don't process old scans
    lastProcessedScanTimeRef.current = new Date().toISOString();
  };

  useEffect(() => {
    let pollInterval;

    if (isWireless) {
      console.log("Starting Wireless Polling...");
      pollInterval = setInterval(async () => {
        try {
          // Fetch latest scan that is NEWER than our reference time
          const url = `${SUPABASE_URL}?select=tag_id,created_at&order=created_at.desc&limit=1`;

          const response = await fetch(url, {
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
              const latestScan = data[0];
              // Compare timestamps
              if (latestScan.created_at > lastProcessedScanTimeRef.current) {
                console.log("New Wireless Scan:", latestScan.tag_id);
                notifyCallbacks(latestScan.tag_id);
                lastProcessedScanTimeRef.current = latestScan.created_at;
              }
            }
          } else {
            console.error("Wireless Poll Error:", response.status);
            // If 404, table doesn't exist. Stop polling to avoid spam.
            if (response.status === 404) {
              alert(
                "Wireless setup incomplete. Ensure 'nfc_scans' table exists in Supabase.",
              );
              setIsWireless(false);
            }
          }
        } catch (err) {
          console.error("Wireless Poll Network Error:", err);
        }
      }, 750); // Poll every 750ms
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
