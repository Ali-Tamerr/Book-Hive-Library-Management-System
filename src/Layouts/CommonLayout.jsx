import React, { useRef, useEffect, useState, useCallback } from "react";
import { FilePenLine, Trash2, ReceiptText, ChevronUp, ChevronDown } from "lucide-react";
import SearchBar from "../components/SearchBar.jsx";
import ButtonOne from "../components/ButtonOne.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

// ─── Mobile swipe pagination animation styles ───────────────────────────────
const MOBILE_ANIM_STYLES = `
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideOutUp {
    from { opacity: 1; transform: translateY(0); }
    to   { opacity: 0; transform: translateY(-28px); }
  }
  @keyframes slideInDown {
    from { opacity: 0; transform: translateY(-28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideOutDown {
    from { opacity: 1; transform: translateY(0); }
    to   { opacity: 0; transform: translateY(28px); }
  }
  .mobile-slide-in-up   { animation: slideInUp 280ms ease forwards; }
  .mobile-slide-out-up  { animation: slideOutUp 280ms ease forwards; }
  .mobile-slide-in-down { animation: slideInDown 280ms ease forwards; }
  .mobile-slide-out-down{ animation: slideOutDown 280ms ease forwards; }
`;

const ROWS_PER_PAGE = 3;
const SWIPE_THRESHOLD = 50; // px

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
}) => {
  const FormPopupComponent = formPopup;
  const observerTarget = useRef(null);
  const scrollContainerRef = useRef(null);
  const emphasizedColumnsSet = new Set(emphasizedColumns);

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

  // ── Mobile pagination state ───────────────────────────────────────────────
  const [mobilePage, setMobilePage] = useState(0);
  const [animClass, setAnimClass] = useState("mobile-slide-in-up");
  const [visibleRows, setVisibleRows] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartY = useRef(null);

  const totalMobilePages = Math.ceil((data?.length || 0) / ROWS_PER_PAGE);

  // Reset to page 0 when data (search results) changes
  useEffect(() => {
    setMobilePage(0);
    setAnimClass("mobile-slide-in-up");
    setVisibleRows((data || []).slice(0, ROWS_PER_PAGE));
  }, [data]);

  // ── Pre-fetch: when user is 1 page away from end of loaded data ───────────
  useEffect(() => {
    if (!isMobile || !hasMore || !onLoadMore) return;
    // Trigger when the NEXT page's rows aren't in memory yet
    const nextPageStart = (mobilePage + 2) * ROWS_PER_PAGE;
    if (nextPageStart >= (data?.length || 0)) {
      onLoadMore();
    }
  }, [mobilePage, isMobile, hasMore, onLoadMore, data]);

  const goToPage = useCallback(
    (dir) => {
      if (isAnimating) return;
      const next = mobilePage + dir;
      if (next < 0 || next >= totalMobilePages) return;

      const outClass = dir > 0 ? "mobile-slide-out-up" : "mobile-slide-out-down";
      const inClass = dir > 0 ? "mobile-slide-in-up" : "mobile-slide-in-down";

      setIsAnimating(true);
      setAnimClass(outClass);

      setTimeout(() => {
        const nextRows = (data || []).slice(next * ROWS_PER_PAGE, (next + 1) * ROWS_PER_PAGE);
        setVisibleRows(nextRows);
        setMobilePage(next);
        setAnimClass(inClass);
        setTimeout(() => setIsAnimating(false), 300);
      }, 280);
    },
    [isAnimating, mobilePage, totalMobilePages, data],
  );

  // ── Touch handlers ────────────────────────────────────────────────────────
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    touchStartY.current = null;
    touchStartX.current = null;
    // Only trigger page change if the swipe is predominantly vertical
    if (Math.abs(deltaY) < SWIPE_THRESHOLD || Math.abs(deltaY) < Math.abs(deltaX)) return;
    goToPage(deltaY > 0 ? 1 : -1);
  };

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
    <div className="flex min-h-0 flex-1 flex-col gap-5 max-[67.5rem]:gap-2 overflow-hidden p-7 pb-0 pr-0 max-[67.5rem]:p-0 max-[67.5rem]:pt-5">
      {/* Inject animation keyframes once */}
      <style>{MOBILE_ANIM_STYLES}</style>

      {/* ── Header: title + search/button ─────────────────────────────── */}
      <div className="flex flex-col gap-3 max-[67.5rem]:gap-2 pr-7 max-[67.5rem]:px-5">
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
      {/* MOBILE VIEW — swipe paginated (3 rows at a time)                  */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {isMobile ? (
        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#000035] dark:border-[#D7D7D7]">

            {/* Single scrollable container — horizontal scroll + vertical swipe */}
            <div
              className="flex-1 overflow-auto"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {isLoading ? (
                <div className="flex h-full items-center justify-center py-8">
                  <LoadingSpinner size="sm" />
                </div>
              ) : (data?.length || 0) === 0 ? (
                <div className="flex h-full items-center justify-center p-6 text-center text-[#000035] dark:text-[#D7D7D7]">
                  No items found
                </div>
              ) : (
                <table className="w-full min-w-max table-auto border-collapse text-left text-sm dark:text-[#E8E8E8]">
                  {/* Sticky header — same table so column widths are shared */}
                  <thead className="sticky top-0 z-10 bg-[#f0f0f1] dark:bg-[#121317]">
                    <tr>
                      {columns.map((col) => (
                        <th
                          key={col.accessor}
                          className="whitespace-nowrap px-3 py-2 text-center text-[0.9rem] font-extrabold tracking-widest shadow-[inset_0_-1px_0_0_#000035] dark:shadow-[inset_0_-1px_0_0_#D7D7D7]"
                        >
                          {col.header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {/* Animated tbody — key change re-mounts it, triggering CSS animation */}
                  <tbody key={mobilePage} className={animClass}>
                    {visibleRows.map((item, index) => (
                      <tr
                        key={index}
                        className="h-13 font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                      >
                        {columns.map((col) => {
                          const cellContent = renderCell(col, item);
                          const isAction = col.accessor === "action";
                          const isFullText = typeof cellContent === "string";
                          return (
                            <td
                              key={col.accessor}
                              title={isFullText ? cellContent : undefined}
                              className={`px-3 py-2 text-center text-[0.675rem] dark:text-white ${!isAction ? "truncate overflow-hidden whitespace-nowrap" : ""}`}
                            >
                              {cellContent}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Navigation bar */}
            {(data?.length || 0) > 0 && !isLoading && (
              <div className="flex shrink-0 items-center justify-between border-t border-[#000035] px-4 py-2 dark:border-[#D7D7D7]">
                <button
                  onClick={() => goToPage(-1)}
                  disabled={mobilePage === 0 || isAnimating}
                  className="flex cursor-pointer items-center gap-1 text-[0.75rem] font-semibold text-[#000035] disabled:opacity-30 dark:text-[#D7D7D7]"
                >
                  <ChevronUp size={16} /> Prev
                </button>
                <span className="text-[0.7rem] font-medium text-[#000035] dark:text-[#D7D7D7]">
                  {mobilePage * ROWS_PER_PAGE + 1}–
                  {Math.min((mobilePage + 1) * ROWS_PER_PAGE, data?.length || 0)}{" "}
                  / {data?.length || 0}
                  {hasMore ? "+" : ""}
                </span>
                <button
                  onClick={() => goToPage(1)}
                  disabled={mobilePage >= totalMobilePages - 1 || isAnimating}
                  className="flex cursor-pointer items-center gap-1 text-[0.75rem] font-semibold text-[#000035] disabled:opacity-30 dark:text-[#D7D7D7]"
                >
                  Next <ChevronDown size={16} />
                </button>
              </div>
            )}
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
            <table className="w-full min-w-250 max-[48rem]:min-w-2xl table-auto border-collapse text-left text-sm dark:text-[#E8E8E8]">
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
                  data.map((item, index) => (
                    <tr
                      key={index}
                      className="h-17 max-[48rem]:h-13 font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      {columns.map((col) => {
                        const cellContent = renderCell(col, item);
                        const isAction = col.accessor === "action";
                        const isFullText = typeof cellContent === "string";
                        return (
                          <td
                            key={col.accessor}
                            title={isFullText ? cellContent : undefined}
                            className={`px-4 py-3 max-[48rem]:px-3 max-[48rem]:py-2 text-center text-base max-[48rem]:text-[0.675rem] dark:text-white ${!isAction ? "truncate overflow-hidden whitespace-nowrap" : ""}`}
                          >
                            {cellContent}
                          </td>
                        );
                      })}
                    </tr>
                  ))
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

      {formPopup}
    </div>
  );
};

export default CommonLayout;
