import React from "react";
import { X } from "lucide-react";

const Popup = ({
  show,
  isOpen,
  onClose,
  title,
  icon,
  children,
  maxWidthClass,
  closeButtonClassName,
  dividerClassName,
  heightClass,
  panelClassName,
  contentClassName,
  hideHeader = false,
  hideDivider = false,
  headerClassName,
  titleClassName,
  iconWrapperClassName,
}) => {
  const isVisible = show !== undefined ? show : isOpen;

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm ${heightClass || ""}`}
    >
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div
        className={`popup-typography relative ${maxWidthClass ? maxWidthClass : "max-w-2xl"} flex max-h-[90vh] w-full flex-col rounded-xl border border-[#000035] bg-[#F2F2F2] p-6 pb-0 sm:p-10 sm:pb-0 md:p-14 md:pb-0 shadow-xl dark:border dark:border-[#D7D7D7] dark:border-[#E8E8E8] dark:bg-[#121317] ${panelClassName || ""}`}
      >
        {!hideHeader && (
          <div
            className={`flex shrink-0 items-center justify-between pb-5 ${headerClassName || ""}`}
          >
            <div className="flex items-center gap-4">
              {icon && (
                <div
                  className={`flex min-h-[60px] min-w-[60px] items-center justify-center rounded-lg border border-[#000035] dark:border-[#D7D7D7] ${iconWrapperClassName || ""}`}
                >
                  {icon}
                </div>
              )}
              <h2
                className={`font-['Bebas_Neue',sans-serif] text-2xl font-bold tracking-widest text-[#000035] dark:text-white ${titleClassName || ""}`}
              >
                {title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className={`mr-13 cursor-pointer rounded-md border border-[#000035] p-1 text-[#000035] transition-colors dark:border-[#D7D7D7] dark:text-[#D7D7D7] ${closeButtonClassName || ""}`}
            >
              <X size={14} />
            </button>
          </div>
        )}
        {!hideDivider && (
          <div
            className={`mx-auto h-[1px] w-[100%] bg-[#000035] dark:bg-[#D7D7D7] ${dividerClassName || ""}`}
          ></div>
        )}
        <div
          className={`flex-1 overflow-y-auto ${contentClassName || "px-4 py-8"}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
