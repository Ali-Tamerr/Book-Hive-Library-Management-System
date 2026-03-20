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
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/10 backdrop-blur-sm ${heightClass || ""}`}
    >
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div
        className={`popup-typography relative flex h-full max-h-none w-full flex-col rounded-none border-[#000035] bg-[#F2F2F2] p-6 pb-0 shadow-xl min-[769px]:h-auto min-[769px]:max-h-[90vh] min-[769px]:rounded-xl min-[769px]:border sm:p-10 sm:pb-0 md:p-14 md:pb-0 dark:bg-[#121317] dark:min-[769px]:border-[#D7D7D7] ${maxWidthClass ? maxWidthClass : "min-[769px]:max-w-2xl"} ${panelClassName || ""}`}
      >
        {!hideHeader && (
          <div
            className={`flex shrink-0 max-[768px]:flex-col max-[768px]:gap-4 min-[769px]:flex-row-reverse min-[769px]:items-center min-[769px]:justify-between pb-5 ${headerClassName || ""}`}
          >
            {/* Row 1 for Mobile / Right side for Desktop */}
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className={`cursor-pointer rounded-md border border-[#000035] p-1 text-[#000035] transition-colors dark:border-[#D7D7D7] dark:text-[#D7D7D7] min-[769px]:mr-13 ${closeButtonClassName || ""}`}
              >
                <X size={14} />
              </button>
            </div>

            {/* Row 2 for Mobile / Left side for Desktop */}
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
          </div>
        )}
        {!hideDivider && (
          <div
            className={`mx-auto h-[1px] w-[100%] bg-[#000035] dark:bg-[#D7D7D7] ${dividerClassName || ""}`}
          ></div>
        )}
        <div
          className={`flex-1 overflow-y-auto max-[768px]:flex max-[768px]:flex-col ${contentClassName || "px-4 py-8 max-[768px]:px-2"}`}
        >
          <div className="max-[768px]:my-auto max-[768px]:w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
