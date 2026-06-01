import React, { useState, useRef, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner.jsx";

const RequestsTable = ({ columns, data, keyExtractor, isLoading, emptyMessage, className = "", updatingId }) => {
  // ── Custom Tooltip for truncated cells ──────────────────────────────────
  const [tooltipConfig, setTooltipConfig] = useState(null); // { text, x, y }
  const [adjustedX, setAdjustedX] = useState(0);
  const tooltipRef = useRef(null);

  const handleCellClick = (e, text) => {
    e.stopPropagation();
    const element = e.currentTarget;
    if (element.scrollWidth > element.clientWidth) {
      const rect = element.getBoundingClientRect();
      setTooltipConfig({
        text,
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
      setAdjustedX(0); // Reset adjustedX so it recalculates for the new tooltip
    }
  };

  useEffect(() => {
    if (!tooltipConfig) return;

    const adjustPosition = () => {
      const el = tooltipRef.current;
      if (!el) return;

      const width = el.offsetWidth;
      const padding = 16; // Safe padding from screen edges
      const screenWidth = window.innerWidth;
      
      let x = tooltipConfig.x;
      // Clamp left boundary
      if (x - width / 2 < padding) {
        x = width / 2 + padding;
      } 
      // Clamp right boundary
      else if (x + width / 2 > screenWidth - padding) {
        x = screenWidth - padding - width / 2;
      }
      setAdjustedX(x);
    };

    adjustPosition();
    
    // Close tooltips on resize or scroll
    const handleClose = () => setTooltipConfig(null);
    window.addEventListener("click", handleClose);
    window.addEventListener("scroll", handleClose, true);
    window.addEventListener("resize", adjustPosition);
    return () => {
      window.removeEventListener("click", handleClose);
      window.removeEventListener("scroll", handleClose, true);
      window.removeEventListener("resize", adjustPosition);
    };
  }, [tooltipConfig]);

  const isItemUpdating = (item) => {
    if (!updatingId) return false;
    const itemId = item.request_id || item.transaction_id || item.feedback_id || item.id || item.user_id || item.book_id;
    return String(updatingId) === String(itemId);
  };

  return (
    <>
      <table className={`w-full table-fixed border-collapse ${className}`}>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                style={{ width: col.width || `${100 / columns.length}%` }}
                className={`sticky top-0 z-10 bg-[#F2F2F2] p-4 max-[48rem]:p-3 text-center font-['Bebas_Neue',sans-serif] text-xl max-[48rem]:text-[1rem] uppercase tracking-wider text-[#000035] shadow-[inset_0_-0.0625rem_0_0_#000035] dark:bg-[#121317] dark:text-[#D7D7D7] dark:shadow-[inset_0_-0.0625rem_0_0_#D7D7D7] ${col.headerClassName || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="p-8 text-center text-sm text-[#000035] dark:text-[#D7D7D7]"
              >
                Loading requests...
              </td>
            </tr>
          ) : !data || data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="p-8 text-center text-sm text-[#000035] dark:text-[#D7D7D7]"
              >
                {emptyMessage || "No data found."}
              </td>
            </tr>
          ) : (
            data.map((item, index) => {
              const updating = isItemUpdating(item);
              return (
                <tr key={keyExtractor ? keyExtractor(item, index) : index}>
                  {columns.map((col, idx) => {
                    const cellContent = col.render ? col.render(item, index) : item[col.accessor];
                    const isString = typeof cellContent === "string";
                    const isActions = col.accessor === "actions" || col.accessor === "action";
                    const isCenter = idx === Math.floor(columns.length / 2);
                    return (
                      <td
                        key={idx}
                        title={isString ? cellContent : undefined}
                        className={`relative p-4 max-[48rem]:p-3 text-center text-sm max-[48rem]:text-[0.75rem] text-[#000035] dark:text-[#D7D7D7] ${col.cellClassName || ""}`}
                      >
                        <div className="relative w-full h-full flex items-center justify-center min-h-[1.75rem] min-w-0 overflow-hidden">
                          <div 
                            onClick={(e) => !isActions && isString && handleCellClick(e, cellContent)}
                            className={`w-full min-w-0 ${!isActions && isString ? "truncate cursor-pointer hover:underline decoration-dotted" : ""} ${updating ? "opacity-35 pointer-events-none transition-all duration-300" : ""}`}
                          >
                            {cellContent}
                          </div>
                          {updating && (
                            <div className="absolute inset-0 z-10 bg-white/10 dark:bg-black/10 backdrop-blur-[8px] rounded-sm pointer-events-none" />
                          )}
                        </div>
                        {updating && isCenter && (
                          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                            <div className="sticky left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 pointer-events-auto bg-white/90 dark:bg-[#121317]/90 rounded-full shadow-md border border-[#D7D7D7]/30">
                              <LoadingSpinner size="xs" />
                            </div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {tooltipConfig && (
        <div
          ref={tooltipRef}
          className={`animate-in fade-in zoom-in pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-[calc(100%+0.75rem)] rounded-lg border-2 border-[#000035] bg-[#F2F2F2] px-4 py-3 shadow-lg duration-200 dark:border-[#D7D7D7] dark:bg-[#121317] ${adjustedX === 0 ? "opacity-0" : "opacity-100"}`}
          style={{
            left: `${adjustedX || tooltipConfig.x}px`,
            top: `${tooltipConfig.y}px`,
          }}
        >
          <p className="whitespace-normal break-words max-w-[calc(100vw-32px)] md:max-w-[20rem] text-sm font-semibold text-[#000035] dark:text-[#D7D7D7]">
            {tooltipConfig.text}
          </p>
          {/* Tooltip Arrow */}
          <div 
            className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rotate-45 border-b-2 border-r-2 border-[#000035] bg-[#F2F2F2] dark:border-[#D7D7D7] dark:bg-[#121317]" 
            style={{
              left: adjustedX ? `calc(50% + ${tooltipConfig.x - adjustedX}px)` : "50%",
            }}
          />
        </div>
      )}
    </>
  );
};

export default RequestsTable;
