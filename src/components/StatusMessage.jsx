import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const StatusMessage = ({ message, type }) => {
    if (!message) return null;

    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium animate-pulse ${type === 'success'
            ? 'bg-green-100 text-green-700 border border-green-300'
            : 'bg-red-100 text-red-700 border border-red-300'
            }`}>
            {type === 'success' ? (
                <CheckCircle size={16} />
            ) : (
                <XCircle size={16} />
            )}
            <span>{message}</span>
        </div>
    );
};

export default StatusMessage;
