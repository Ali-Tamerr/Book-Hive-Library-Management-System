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
            const port = await navigator.serial.requestPort();
            portRef.current = port;
            await port.open({ baudRate: 9600 });
            setIsConnected(true);

            if (inputRef?.current) {
                inputRef.current.focus();
            }

            port.ondisconnect = () => {
                setIsConnected(false);
                portRef.current = null;
                readerRef.current = null;
            };

            const textDecoder = new TextDecoderStream();
            port.readable.pipeTo(textDecoder.writable);
            const reader = textDecoder.readable.getReader();
            readerRef.current = reader;

            (async () => {
                let buffer = '';
                try {
                    while (true) {
                        const { value, done } = await reader.read();
                        if (done) break;
                        buffer += value;
                        const lines = buffer.split('\n');
                        if (lines.length > 1) {
                            const completeLine = lines.shift().trim();
                            if (completeLine) {
                                console.log('NFC Tag ID:', completeLine);
                                onDataReceived(completeLine);
                            }
                            buffer = lines.join('\n');
                        }
                    }
                } catch (error) {
                    console.log("Read loop was cancelled or an error occurred:", error);
                } finally {
                    reader.releaseLock();
                    setIsConnected(false);
                    if (portRef.current) {
                        await portRef.current.close();
                        portRef.current = null;
                    }
                    readerRef.current = null;
                }
            })();
        } catch (error) {
            if (error.name !== 'NotFoundError') {
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
            className={`px-6 h-[50px] w-[180px] rounded-lg transition-colors text-[13px] font-medium ${isConnected
                    ? 'bg-red-200 text-red-900 hover:bg-red-300'
                    : 'bg-[#D7D7D7] hover:bg-gray-400'
                }`}
        >
            {isConnected ? "Disconnect" : "Connect to NFC Reader"}
        </button>
    );
};

export default NFCReaderButton;
