import React from 'react';
import { X } from 'lucide-react';

const Popup = ({ show, isOpen, onClose, title, icon, children, maxWidthClass }) => {
  const isVisible = show !== undefined ? show : isOpen;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999]  flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className={`relative ${maxWidthClass ? maxWidthClass : 'max-w-2xl'} w-full bg-white p-14 pb-0 rounded-xl shadow-xl max-h-[90vh] flex flex-col`}>
        <div className="flex items-center justify-between pb-5  shrink-0">
          <div className="flex items-center gap-4"> 
            {icon && <div className="text-[#0a0f33] bg-[#D7D7D7] flex justify-center items-center min-w-[60px] min-h-[60px] rounded-lg">{icon}</div>}
            <h2 className="text-xl font-bold text-[#0a0f33] ">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="mr-13 p-1 text-[#525252] hover:text-gray-600 border border-[#525252] transition-colors rounded-md hover:bg-gray-100  cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
        <div className="w-[100%] h-[1px] bg-black mx-auto"></div>
        <div className="py-8 overflow-y-auto px-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
