import React from 'react';
import { X } from 'lucide-react';

const Popup = ({ show, isOpen, onClose, title, icon, children }) => {
  const isVisible = show !== undefined ? show : isOpen;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-2xl bg-white dark:bg-[#121317] rounded-2xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-[#292D32] shrink-0">
          <div className="flex items-center gap-3">
            {icon && <div className="text-[#0a0f33] dark:text-white bg-[#F3F4F6] dark:bg-[#292D32] p-2 rounded-lg">{icon}</div>}
            <h2 className="text-xl font-bold text-[#0a0f33] dark:text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-[#292D32] cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
