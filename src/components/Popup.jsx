import React from 'react';
import { X } from 'lucide-react';

const Popup = ({ show, isOpen, onClose, title, icon, children }) => {
  const isVisible = show !== undefined ? show : isOpen;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-2xl bg-white  rounded-2xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6  shrink-0">
          <div className="flex items-center gap-4">
            {icon && <div className="text-[#0a0f33] bg-[#D7D7D7] p-[15px] rounded-lg">{icon}</div>}
            <h2 className="text-xl font-bold text-[#0a0f33] ">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="mr-15 p-1 text-[#525252] hover:text-gray-600 border border-[#525252] transition-colors rounded-md hover:bg-gray-100  cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
        <div className="w-[90%] h-[1px] bg-black mx-auto"></div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
