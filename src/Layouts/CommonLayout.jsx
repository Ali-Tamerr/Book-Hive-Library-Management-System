import React, { useRef, useEffect, useState, useCallback } from "react";
import { FilePenLine, Trash2, ReceiptText, ChevronUp } from "lucide-react";
import SearchBar from "../components/SearchBar.jsx";
import ButtonOne from "../components/ButtonOne.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const CommonLayout = ({
  searchValue,
  setSearchValue,
  buttonBehaviour,
  isLoading,
  data,
  handleEdit,
  handleDelete,
  handleView,
  title,
  buttonText,
  columns,
  formPopup,
  customActionRenderer,
  isUserPage = false,
  customTitle,
  secondaryButton,
  onLoadMore,
  hasMore,
  emphasizedColumns = [],
  updatingId,
}) => {
  const FormPopupComponent = formPopup;
  const observerTarget = useRef(null);
  const scrollContainerRef = useRef(null);
  const emphasizedColumnsSet = new Set(emphasizedColumns);

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
    const itemId = item.id || item.user_id || item.book_id || item.category_id || item.branch_id;
    return String(updatingId) === String(itemId);
  };

  // ── Mobile detection ──────────────────────────────────────────────────────
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 62.5rem)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 62.5rem)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── Desktop infinite-scroll observer ────────────────────────────────────
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && onLoadMore) {
          onLoadMore();
        }
      },
      { root: scrollContainerRef.current, rootMargin: "300px", threshold: 0 },
    );
    const target = observerTarget.current;
    if (target) observer.observe(target);
    return () => { if (target) observer.unobserve(target); };
  }, [hasMore, onLoadMore, isLoading]);

  // ── Shared cell renderer ──────────────────────────────────────────────────
  const renderCell = (col, item) => {
    if (col.accessor === "action") {
      return customActionRenderer ? (
        customActionRenderer(item)
      ) : (
        <div className="mx-auto flex w-max items-center justify-center">
          {handleEdit && (
            <button
              onClick={() => handleEdit(item)}
              className="mr-2 cursor-pointer text-lg transition-transform hover:scale-125 dark:text-white"
              title="Edit"
            >
              <FilePenLine size={20} />
            </button>
          )}
          <button
            onClick={() =>
              handleDelete(
                item.id || item.user_id || item.book_id || item.category_id || item.branch_id,
              )
            }
            className="mr-2 cursor-pointer text-lg transition-transform hover:scale-125 dark:text-white"
            title="Delete"
          >
            <Trash2 size={20} />
          </button>
          {handleView && (
            <button
              onClick={() => handleView(item)}
              className="cursor-pointer text-lg transition-transform hover:scale-125 dark:text-white"
              title="View"
            >
              <ReceiptText size={20} />
            </button>
          )}
        </div>
      );
    }
    if (col.render) return col.render(item);
    return item[col.accessor] || "-";
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5 max-[67.5rem]:gap-2 overflow-hidden pt-7 pb-0 pr-0 pl-0 max-[67.5rem]:p-0 max-[67.5rem]:pt-5">

      {/* ── Header: title + search/button ─────────────────────────────── */}
      <div className="flex flex-col gap-3 max-[67.5rem]:gap-2 px-7 max-[67.5rem]:px-5">
        <div
          className={`flex items-center justify-between gap-12 max-[62.5rem]:items-stretch max-[62.5rem]:gap-2 ${customTitle ? "max-[62.5rem]:flex-col-reverse" : "max-[62.5rem]:flex-col"}`}
        >
          {customTitle ? (
            customTitle
          ) : (
            <h2 className="max-[62.5rem]:mx-auto max-[62.5rem]:w-[92%] max-[62.5rem]:whitespace-normal max-[62.5rem]:text-center max-[1000]:text-[3.125rem] whitespace-nowrap text-4xl font-semibold tracking-widest max-[30rem]:text-[1.5625rem] dark:text-[#E8E8E8]">
              {title}
            </h2>
          )}
          {/* Mobile search + button row */}
          <div className="max-[62.5rem]:flex hidden h-10 items-stretch flex-1 gap-2">
            <div className="flex-1 h-full">
              <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            {buttonText && (
              <ButtonOne buttonBehaviour={buttonBehaviour} text={buttonText} />
            )}
          </div>
          {/* Desktop search + button row */}
          <div className="max-[62.5rem]:hidden flex h-10 gap-2">
            {secondaryButton}
            {buttonText && (
              <ButtonOne buttonBehaviour={buttonBehaviour} text={buttonText} />
            )}
            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
        </div>
        {secondaryButton && (
          <div className="max-[62.5rem]:flex hidden h-10 gap-2">
            <div className="flex-1 [&>button]:w-full [&>button]:justify-center">
              {secondaryButton}
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* MOBILE VIEW — horizontal scroll table showing all rows             */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {isMobile ? (
        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border-b border-[#000035] dark:border-[#D7D7D7]">
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-auto"
            >
              {isLoading && (data?.length || 0) === 0 ? (
                <div className="flex h-full items-center justify-center py-8">
                  <LoadingSpinner size="sm" />
                </div>
              ) : (data?.length || 0) === 0 ? (
                <div className="flex h-full items-center justify-center p-6 text-center text-[#000035] dark:text-[#D7D7D7]">
                  No items found
                </div>
              ) : (
                <>
                  <table
                    className="w-full table-fixed border-collapse text-left text-sm dark:text-[#E8E8E8]"
                    style={{ minWidth: `${columns.length * 8}rem` }}
                  >
                    <thead className="sticky top-0 z-10 bg-[#f0f0f1] dark:bg-[#121317]">
                      <tr>
                        {columns.map((col) => (
                          <th
                            key={col.accessor}
                            className="whitespace-nowrap px-3 py-2 md:px-4 md:py-3 text-center text-[0.9rem] md:text-[1.2rem] font-extrabold tracking-widest shadow-[inset_0_-1px_0_0_#000035] dark:shadow-[inset_0_-1px_0_0_#D7D7D7]"
                          >
                            {col.header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => {
                        const updating = isItemUpdating(item);
                        return (
                          <tr
                            key={index}
                            className="h-16 md:h-18 font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                          >
                            {columns.map((col, colIdx) => {
                              const cellContent = renderCell(col, item);
                              const isAction = col.accessor === "action";
                              const isFullText = typeof cellContent === "string";
                              const isCenter = colIdx === Math.floor(columns.length / 2);
                              return (
                                <td
                                  key={col.accessor}
                                  title={isFullText ? cellContent : undefined}
                                  className="px-3 py-2 md:px-4 md:py-3 text-center text-[0.675rem] md:text-[0.95rem] dark:text-white"
                                >
                                  <div className="relative w-full h-full flex items-center justify-center min-h-[1.75rem] min-w-0 overflow-hidden">
                                    <div 
                                      onClick={(e) => !isAction && isFullText && handleCellClick(e, cellContent)}
                                      className={`w-full min-w-0 ${!isAction && isFullText ? "truncate cursor-pointer hover:underline decoration-dotted" : ""} ${updating ? "opacity-35 pointer-events-none transition-all duration-300" : ""}`}
                                    >
                                      {cellContent}
                                    </div>
                                    {updating && (
                                      <div className="absolute inset-0 z-10 bg-white/10 dark:bg-black/10 backdrop-blur-[8px] rounded-sm pointer-events-none" />
                                    )}
                                    {updating && isCenter && (
                                      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                                        <LoadingSpinner size="xs" />
                                      </div>
                                    )}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {hasMore && (
                    <div
                      ref={observerTarget}
                      onClick={onLoadMore}
                      className="h-10 w-full cursor-pointer p-2 text-center text-[0.875rem] font-semibold text-[#000035] dark:text-[#D7D7D7] transition-colors hover:text-gray-800"
                    >
                      Load More (Scroll or Click)
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      ) : (
        /* ════════════════════════════════════════════════════════════════ */
        /* DESKTOP VIEW — original infinite-scroll table (UNCHANGED)        */
        /* ════════════════════════════════════════════════════════════════ */
        <section className="flex min-h-0 flex-1 overflow-hidden rounded-lg">
          <div
            ref={scrollContainerRef}
            className="min-h-0 min-w-0 flex-1 overflow-auto rounded-lg pb-4"
          >
            <table className="w-full min-w-250 max-[48rem]:min-w-2xl table-fixed border-collapse text-left text-sm dark:text-[#E8E8E8]">
              <thead className="sticky top-0 z-10 bg-[#f0f0f1] transition-colors duration-300 dark:bg-[#121317]">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.accessor}
                      style={{ width: col.width || "auto" }}
                      className={`whitespace-nowrap px-4 py-3 text-center text-[1.375rem] font-extrabold tracking-widest max-[48rem]:px-3 max-[48rem]:py-2 max-[48rem]:text-[1.125rem] shadow-[inset_0_-1px_0_0_#000035] dark:shadow-[inset_0_-1px_0_0_#D7D7D7]`}
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={columns.length} className="py-12 text-center">
                      <div className="flex justify-center">
                        <LoadingSpinner size="sm" />
                      </div>
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="p-3 text-center text-[#000035] dark:text-[#D7D7D7]"
                    >
                      No items found
                    </td>
                  </tr>
                 ) : (
                  data.map((item, index) => {
                    const updating = isItemUpdating(item);
                    return (
                      <tr
                        key={index}
                        className="h-17 max-[48rem]:h-13 font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                      >
                        {columns.map((col, colIdx) => {
                          const cellContent = renderCell(col, item);
                          const isAction = col.accessor === "action";
                          const isFullText = typeof cellContent === "string";
                          const isCenter = colIdx === Math.floor(columns.length / 2);
                          return (
                            <td
                              key={col.accessor}
                              title={isFullText ? cellContent : undefined}
                              className="px-4 py-3 max-[48rem]:px-3 max-[48rem]:py-2 text-center text-base max-[48rem]:text-[0.675rem] dark:text-white"
                            >
                              <div className="relative w-full h-full flex items-center justify-center min-h-[2.5rem] min-w-0 overflow-hidden">
                                <div 
                                  onClick={(e) => !isAction && isFullText && handleCellClick(e, cellContent)}
                                  className={`w-full min-w-0 ${!isAction && isFullText ? "truncate cursor-pointer hover:underline decoration-dotted" : ""} ${updating ? "opacity-35 pointer-events-none transition-all duration-300" : ""}`}
                                >
                                  {cellContent}
                                </div>
                                {updating && (
                                  <div className="absolute inset-0 z-10 bg-white/10 dark:bg-black/10 backdrop-blur-[8px] rounded-sm pointer-events-none" />
                                )}
                                {updating && isCenter && (
                                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                                    <LoadingSpinner size="xs" />
                                  </div>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            {hasMore && (
              <div
                ref={observerTarget}
                onClick={onLoadMore}
                className="h-10 w-full cursor-pointer p-2 text-center text-[#000035] transition-colors hover:text-gray-800"
              >
                Load More (Scroll or Click)
              </div>
            )}
          </div>
          {isUserPage && null}
        </section>
      )}

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
      {formPopup}
    </div>
  );
};

export default CommonLayout;
