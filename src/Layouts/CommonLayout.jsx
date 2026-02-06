import React from 'react';
import { FilePenLine, Trash2, ReceiptText } from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import ButtonOne from '../components/ButtonOne.jsx';

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
    <div className='flex flex-col h-full p-7 pb-0 pr-0 gap-5 max-[1080px]:p-0 max-[1080px]:pt-5'>
      <div className="flex flex-col gap-3 pr-7 max-[1080px]:px-5">
        <div className="flex justify-between items-center max-[856px]:gap-2">
          {customTitle ? customTitle : <h2 className="text-xl max-[856px]:text-sm font-semibold whitespace-nowrap">{title}</h2>}
          <div className='hidden max-[856px]:flex flex-1 h-10'>
            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
          <div className='flex gap-2 h-10 max-[856px]:hidden'>
            {secondaryButton}
            {buttonText && <ButtonOne buttonBehaviour={buttonBehaviour} text={buttonText} />}
            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
        </div>
        <div className='hidden max-[856px]:flex gap-2 h-10'>
          {secondaryButton && <div className='flex-1 [&>button]:w-full [&>button]:justify-center'>{secondaryButton}</div>}
          {buttonText && <div className='flex-1'><ButtonOne buttonBehaviour={buttonBehaviour} text={buttonText} /></div>}
        </div>
      </div>

      <section className="flex-1 h-full  gap-6 rounded-lg flex">
        <div className="overflow-x-auto bg-white rounded-lg flex items-start gap-4 flex-1 h-full">
          <table className="w-full min-w-max border-collapse text-left text-sm">
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col.accessor} className="p-3 font-medium text-center whitespace-nowrap">{col.header}</th>
                ))}
              </tr>
              <tr>
                <th colSpan={columns.length} className="p-0">
                  <div className="mx-auto  w-[97%] border-b border-gray-600"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="p-3 text-center text-gray-500">Loading...</td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="p-3 text-center text-gray-500">No items found</td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index} className="font-medium  h-[68px]">
                    {columns.map(col => {
                      let cellContent;
                      if (col.accessor === 'action') {
                        cellContent = customActionRenderer ? (
                          customActionRenderer(item)
                        ) : (
                          <div className=' w-max mx-auto flex justify-center items-center'>
                            <button
                              onClick={() => handleEdit(item)}
                              className="mr-2 text-lg hover:scale-125 transition-transform cursor-pointer dark:text-white"
                              title="Edit"><FilePenLine size={20} /></button>
                            <button
                              onClick={() => handleDelete(item.id || item.user_id || item.book_id || item.category_id)}
                              className="mr-2 text-lg hover:scale-125 transition-transform cursor-pointer dark:text-white"
                              title="Delete"><Trash2 size={20} /></button>
                            {handleView && (
                              <button
                                onClick={() => handleView(item)}
                                className="text-lg hover:scale-125 transition-transform cursor-pointer dark:text-white"
                                title="View"><ReceiptText size={20} /></button>
                            )}
                          </div>
                        );
                      } else if (col.render) {
                        cellContent = col.render(item);
                      } else {
                        cellContent = item[col.accessor] || '-';
                      }
                      return <td key={col.accessor} className="p-3 dark:text-white text-center whitespace-nowrap">{cellContent}</td>;
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {isUserPage && (
          <div className="flex flex-col items-center dark:bg-white justify-center gap-2 w-28 h-full bg-[#0a0f33] dark:bg-[#121317] rounded-tl-lg">
            <span className='text-upright dark:text-black text-white text-2xl tracking-[5px]'>BOOK&nbsp;&nbsp;HIVE</span>
          </div>
        )}
      </section>
      {formPopup}
    </div>
  );
};

export default CommonLayout;
