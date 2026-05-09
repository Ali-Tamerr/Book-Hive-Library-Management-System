import React, { useRef, useEffect, useState } from "react";
import { FilePenLine, Trash2, ReceiptText } from "lucide-react";
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
}) => {
  const FormPopupComponent = formPopup;
  const observerTarget = useRef(null);
  const scrollContainerRef = useRef(null);
  const emphasizedColumnsSet = new Set(emphasizedColumns);

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
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [hasMore, onLoadMore, isLoading]);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5 max-[67.5rem]:gap-2 overflow-hidden p-7 pb-0 pr-0 max-[67.5rem]:p-0 max-[67.5rem]:pt-5">
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
          <div className="max-[62.5rem]:flex hidden h-10 flex-1 gap-2">
            <div className="flex-1">
              <SearchBar
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </div>
            {buttonText && (
              <ButtonOne
                buttonBehaviour={buttonBehaviour}
                text={buttonText}
              />
            )}
          </div>
          <div className="max-[62.5rem]:hidden flex h-10 gap-2">
            {secondaryButton}
            {buttonText && (
              <ButtonOne buttonBehaviour={buttonBehaviour} text={buttonText} />
            )}
            <SearchBar
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
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

      <section className="flex min-h-0 flex-1 overflow-hidden rounded-lg">
        <div
          ref={scrollContainerRef}
          className="min-h-0 min-w-0 flex-1 overflow-auto rounded-lg pb-4"
        >
          <table className="w-full min-w-[62.5rem] max-[48rem]:min-w-[42rem] table-auto border-collapse text-left text-sm dark:text-[#E8E8E8]">
            <thead className="sticky top-0 z-10 bg-[#f0f0f1] transition-colors duration-300 dark:bg-[#121317]">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.accessor}
                    style={{ width: col.width || "auto" }}
                    className={`px-4 py-3 text-center text-[1.375rem] font-extrabold tracking-widest max-[48rem]:px-3 max-[48rem]:py-2 max-[48rem]:text-[1.125rem] shadow-[inset_0_-1px_0_0_#000035] dark:shadow-[inset_0_-1px_0_0_#D7D7D7]`}
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
                  <tr key={index} className="h-[4.25rem] max-[48rem]:h-[3.25rem] font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5">
                    {columns.map((col) => {
                      let cellContent;
                      if (col.accessor === "action") {
                        cellContent = customActionRenderer ? (
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
                                  item.id ||
                                    item.user_id ||
                                    item.book_id ||
                                    item.category_id ||
                                    item.branch_id,
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
                      } else if (col.render) {
                        cellContent = col.render(item);
                      } else {
                        cellContent = item[col.accessor] || "-";
                      }
                      
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
      {formPopup}
    </div>
  );
};

export default CommonLayout;
