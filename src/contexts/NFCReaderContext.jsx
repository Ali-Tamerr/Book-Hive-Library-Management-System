import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const NFCReaderContext = createContext();

export const useNFCReader = () => {
    const context = useContext(NFCReaderContext);
    if (!context) {
        throw new Error('useNFCReader must be used within NFCReaderProvider');
    }
    return context;
};

export const NFCReaderProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [isWebSerialSupported, setIsWebSerialSupported] = useState(false);
    const portRef = useRef(null);
    const readerRef = useRef(null);
    const callbacksRef = useRef(new Set());

    useEffect(() => {
        if ("serial" in navigator) {
            setIsWebSerialSupported(true);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (readerRef.current) {
                readerRef.current.cancel().catch(e => console.error("Error cancelling reader on unmount:", e));
            }
            if (portRef.current) {
                portRef.current.close().catch(e => console.error("Error closing port on unmount:", e));
                portRef.current = null;
            }
        };
    }, []);

    const registerCallback = (callback) => {
        callbacksRef.current.add(callback);
        return () => callbacksRef.current.delete(callback);
    };

    const notifyCallbacks = (data) => {
        callbacksRef.current.forEach(callback => callback(data));
    };

    const disconnectFromArduino = async () => {
        if (readerRef.current) {
            await readerRef.current.cancel().catch(e => console.error("Error cancelling reader on disconnect:", e));
        } else if (portRef.current) {
            await portRef.current.close().catch(e => console.error("Error closing port:", e));
        }
        setIsConnected(false);
        portRef.current = null;
        readerRef.current = null;
    };

    const connectToArduino = async () => {
        if (!isWebSerialSupported) {
            alert("Your browser does not support the Web Serial API. Please use a compatible browser like Chrome or Edge.");
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
                let buffer = '';
                let dataReceivedCount = 0;
                try {
                    while (true) {
                        console.log(`Waiting for data (iteration ${dataReceivedCount})...`);
                        const { value, done } = await reader.read();

                        if (done) {
                            console.log("Reader done");
                            break;
                        }

                        dataReceivedCount++;
                        console.log(`[${dataReceivedCount}] Raw data received:`, value);
                        console.log(`[${dataReceivedCount}] Data length:`, value.length);
                        console.log(`[${dataReceivedCount}] Data bytes:`, Array.from(value).map(c => c.charCodeAt(0)));

                        buffer += value;
                        console.log(`[${dataReceivedCount}] Current buffer:`, buffer);
                        console.log(`[${dataReceivedCount}] Buffer length:`, buffer.length);

                        const lines = buffer.split('\n');
                        console.log(`[${dataReceivedCount}] Lines after split:`, lines);

                        if (lines.length > 1) {
                            const completeLine = lines.shift().trim();
                            console.log(`[${dataReceivedCount}] Complete line extracted:`, completeLine);

                            if (completeLine) {
                                console.log('✅ Complete NFC Tag ID:', completeLine);
                                notifyCallbacks(completeLine);
                                console.log("✅ Data sent to callbacks");
                            } else {
                                console.warn("Complete line was empty after trim");
                            }
                            buffer = lines.join('\n');
                            console.log(`[${dataReceivedCount}] Remaining buffer:`, buffer);
                        } else {
                            console.log(`[${dataReceivedCount}] No complete line yet, waiting for more data...`);

                            if (buffer.length > 50) {
                                console.warn("⚠️ Buffer is getting long without newline. Sending anyway:", buffer);
                                const trimmedBuffer = buffer.trim();
                                if (trimmedBuffer) {
                                    notifyCallbacks(trimmedBuffer);
                                    console.log("✅ Data sent to callbacks (without newline)");
                                }
                                buffer = '';
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
                        await portRef.current.close().catch(e => console.error("Error closing port in finally:", e));
                        portRef.current = null;
                    }
                    readerRef.current = null;
                }
            })();

            readableStreamClosed.catch(e => console.error("Readable stream closed with error:", e));
        } catch (error) {
            console.error("Connection error:", error);
            if (error.name === 'NotFoundError') {
                console.log("User cancelled port selection");
            } else if (error.name === 'InvalidStateError') {
                alert("The port is already open. Please disconnect and try again.");
            } else {
                console.error("Failed to connect to the serial device:", error);
                alert(`An error occurred while connecting to the NFC reader: ${error.message}`);
            }
            setIsConnected(false);
            if (portRef.current) {
                portRef.current = null;
            }
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
        isConnected,
        isWebSerialSupported,
        handleConnectClick,
        registerCallback,
    };

    return (
        <NFCReaderContext.Provider value={value}>
            {children}
        </NFCReaderContext.Provider>
    );
};
