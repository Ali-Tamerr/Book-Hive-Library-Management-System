import React, { useEffect } from 'react';
import { useNFCReader } from '../contexts/NFCReaderContext';

const NFCReaderButton = ({ onDataReceived, inputRef }) => {
    const { isConnected, handleConnectClick, registerCallback } = useNFCReader();

    useEffect(() => {
        if (onDataReceived) {
            const unregister = registerCallback(onDataReceived);
            return unregister;
        }
    }, [onDataReceived, registerCallback]);

    useEffect(() => {
        if (isConnected && inputRef?.current) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 100);
        }
    }, [isConnected, inputRef]);

    return (
        <button
            type="button"
            onClick={handleConnectClick}
            className={`px-6 h-[50px] w-full rounded-[12px] transition-colors text-[13px] font-medium ${isConnected
                    ? 'bg-red-200 text-red-900 hover:bg-red-300'
                    : 'bg-[#D7D7D7] hover:bg-gray-400'
                }`}
        >
            {isConnected ? "Disconnect" : "Connect to NFC Reader"}
        </button>
    );
};

export default NFCReaderButton;
