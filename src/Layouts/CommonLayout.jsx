import React from "react";
import { FilePenLine, Trash2, ReceiptText } from "lucide-react";
import SearchBar from "../components/SearchBar.jsx";
import ButtonOne from "../components/ButtonOne.jsx";

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
}) => {
  const FormPopupComponent = formPopup;

  return (
    <div className="flex h-full flex-col gap-5 p-7 pb-0 pr-0 max-[1080px]:p-0 max-[1080px]:pt-5">
      <div className="flex flex-col gap-3 pr-7 max-[1080px]:px-5">
        <div className="flex items-center justify-between max-[856px]:gap-2">
          {customTitle ? (
            customTitle
          ) : (
            <h2 className="whitespace-nowrap text-xl font-semibold max-[856px]:text-sm dark:text-[#E8E8E8]">
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

      <section className="flex h-full flex-1 gap-6 rounded-lg">
        <div className="flex h-full flex-1 items-start gap-4 overflow-x-auto rounded-lg bg-white dark:bg-[#121317]">
          <table className="w-full min-w-max border-collapse text-left text-sm dark:text-[#E8E8E8]">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.accessor}
                    className="whitespace-nowrap p-3 text-center font-medium"
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
              <tr>
                <th colSpan={columns.length} className="p-0">
                  <div className="mx-auto w-[97%] border-b border-gray-600 dark:border-[#292D32]"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="p-3 text-center text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="p-3 text-center text-gray-500"
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
                          className="whitespace-nowrap p-3 text-center dark:text-white"
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
        </div>
        {isUserPage && null}
      </section>
      {formPopup}
    </div>
  );
};

export default CommonLayout;
