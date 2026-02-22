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
        className={`relative ${maxWidthClass ? maxWidthClass : "max-w-2xl"} flex max-h-[90vh] w-full flex-col rounded-xl bg-white p-14 pb-0 shadow-xl dark:border dark:border-[#E8E8E8] dark:bg-[#131418] ${panelClassName || ""}`}
      >
        {!hideHeader && (
          <div
            className={`flex shrink-0 items-center justify-between pb-5 ${headerClassName || ""}`}
          >
            <div className="flex items-center gap-4">
              {icon && (
                <div
                  className={`flex min-h-[60px] min-w-[60px] items-center justify-center rounded-lg bg-[#D7D7D7] text-[#0a0f33] ${iconWrapperClassName || ""}`}
                >
                  {icon}
                </div>
              )}
              <h2
                className={`text-xl font-bold text-[#0a0f33] dark:text-white ${titleClassName || ""}`}
              >
                {title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className={`mr-13 cursor-pointer rounded-md border border-[#525252] p-1 text-[#525252] transition-colors hover:bg-gray-100 hover:text-gray-600 dark:border-[#E0E0E0] dark:text-[#E0E0E0] dark:hover:bg-[#2C2D33] ${closeButtonClassName || ""}`}
            >
              <X size={14} />
            </button>
          </div>
        )}
        {!hideDivider && (
          <div
            className={`mx-auto h-[1px] w-[100%] bg-black dark:bg-[#2C2D33] ${dividerClassName || ""}`}
          ></div>
        )}
        <div
          className={`overflow-y-auto ${contentClassName || "px-4 py-8"}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
