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
    <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-hidden p-7 pb-0 pr-0 max-[1080px]:p-0 max-[1080px]:pt-5 ">
      <div className="flex flex-col gap-3 pr-7 max-[1080px]:px-5">
        <div className="flex items-center justify-between max-[856px]:flex-col-reverse max-[856px]:items-stretch max-[856px]:gap-4">
          {customTitle ? (
            customTitle
          ) : (
            <h2 className="whitespace-nowrap text-4xl font-semibold tracking-widest max-[856px]:text-sm dark:text-[#E8E8E8]">
              {title}
            </h2>
          )}
          <div className="hidden h-10 flex-1 max-[856px]:flex">
            <SearchBar
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </div>
          <div className="flex h-10 gap-2 max-[856px]:hidden">
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
        <div className="hidden h-10 gap-2 max-[856px]:flex">
          {secondaryButton && (
            <div className="flex-1 [&>button]:w-full [&>button]:justify-center">
              {secondaryButton}
            </div>
          )}
          {buttonText && (
            <div className="flex-1">
              <ButtonOne buttonBehaviour={buttonBehaviour} text={buttonText} />
            </div>
          )}
        </div>
      </div>

      <section className="flex min-h-0 flex-1 overflow-hidden rounded-lg">
        <div
          ref={scrollContainerRef}
          className="min-h-0 min-w-0 flex-1 overflow-auto rounded-lg pb-4"
        >
          <table className="w-full min-w-[800px] border-collapse text-left text-sm dark:text-[#E8E8E8]">
            <thead className="sticky top-0 z-10 bg-[#f0f0f1] transition-colors duration-300 dark:bg-[#121317]">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.accessor}
                    className={`whitespace-nowrap px-4 py-3 text-center text-[22px] font-extrabold tracking-widest`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
              <tr>
                <th colSpan={columns.length} className="p-0">
                  <div className="mx-auto w-full border-b border-gray-600 dark:border-[#D7D7D7]"></div>
                </th>
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
                  <tr key={index} className="h-[68px] font-medium">
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
                      return (
                        <td
                          key={col.accessor}
                          className={`whitespace-nowrap px-4 py-3 text-center dark:text-white`}
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
