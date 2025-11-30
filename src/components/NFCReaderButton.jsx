import React, { useState, useEffect, useRef } from 'react';

const NFCReaderButton = ({ onDataReceived, inputRef }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [isWebSerialSupported, setIsWebSerialSupported] = useState(false);
    const portRef = useRef(null);
    const readerRef = useRef(null);

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

            setTimeout(() => {
                if (inputRef?.current) {
                    console.log("Focusing input field...");
                    inputRef.current.focus();
                } else {
                    console.warn("Input ref is not available");
                }
            }, 100);

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
                try {
                    while (true) {
                        const { value, done } = await reader.read();
                        if (done) {
                            console.log("Reader done");
                            break;
                        }
                        console.log("Raw data received:", value);
                        buffer += value;
                        const lines = buffer.split('\n');
                        if (lines.length > 1) {
                            const completeLine = lines.shift().trim();
                            if (completeLine) {
                                console.log('Complete NFC Tag ID:', completeLine);
                                onDataReceived(completeLine);
                                console.log("Data sent to callback");
                            }
                            buffer = lines.join('\n');
                        }
                    }
                } catch (error) {
                    console.error("Read loop error:", error);
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

    return (
        <button
            type="button"
            onClick={handleConnectClick}
            className={`px-6 h-[50px] w-[180px] rounded-[12px] transition-colors text-[13px] font-medium ${isConnected
                ? 'bg-red-200 text-red-900 hover:bg-red-300'
                : 'bg-[#D7D7D7] hover:bg-gray-400'
                }`}
        >
            {isConnected ? "Disconnect" : "Connect to NFC Reader"}
        </button>
    );
};

export default NFCReaderButton;
