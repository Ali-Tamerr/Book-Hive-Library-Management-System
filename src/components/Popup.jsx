import { X } from 'lucide-react';

function Popup({ show, onClose, title, children, maxWidthClass, icon }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    // onClick={onClose}
    >

      <div className={`bg-white flex flex-col gap-12 h-max w-11/12 ${maxWidthClass || 'max-w-[627px]'} rounded-lg p-12 max-[856px]:p-5`} onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {icon && <div className="text-[#0b0b3b] bg-[#D7D7D7] p-4 rounded-lg">{icon}</div>}
              <span className="text-center font-bold text-lg text-[#000035]">{title}</span>
            </div>
            <button
              onClick={onClose}
              className="pr-2 text-[#0b0b3b] hover:text-red-600 transition-colors cursor-pointer"
              type="button"
            >
              <X size={24} strokeWidth={2.9} className='border-[2px] p-1 rounded-[7px] text-[#525252] mr-6' />
            </button>
          </div>
          <div className="h-[1px] bg-[#000035] w-full"></div>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Popup;