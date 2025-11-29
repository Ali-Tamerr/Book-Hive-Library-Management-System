import React from 'react';
import { FilePenLine, Trash2, BookUser } from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import ButtonOne from '../components/ButtonOne.jsx';

const CommonLayout = ({
  searchValue,
  buttonBehaviour,
  isLoading,
  data,
  handleEdit,
  handleDelete,
  title,
  buttonText,
  columns,
  formPopup,
  customActionRenderer,
  isUserPage = false,
  customTitle,
}) => {
  const FormPopupComponent = formPopup;

  return (
    <div className='flex flex-col h-full p-7 pb-0 pr-0 gap-5 max-[1080px]:p-0 max-[1080px]:pt-5'>
      <div className="flex justify-between items-center pr-7 max-[1080px]:px-5">
        {customTitle ? customTitle : <h2 className="text-xl max-[856px]:text-sm font-semibold">{title}</h2>}
        <div className='flex gap-2 h-10'>
          {buttonText && <ButtonOne buttonBehaviour={buttonBehaviour} text={buttonText} />}
          <SearchBar searchValue={searchValue} />
        </div>
      </div>

      <section className="flex-1 h-full  gap-6 rounded-lg flex">
        <div className="overflow-x-auto bg-white rounded-lg flex items-start gap-4 flex-1 h-full">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col.accessor} className="p-3 font-medium text-center" style={{ width: `${100 / columns.length}%` }}>{col.header}</th>
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
                  <tr key={index} className="border-b font-medium border-gray-200">
                    {columns.map(col => {
                      let cellContent;
                      if (col.accessor === 'action') {
                        cellContent = customActionRenderer ? (
                          customActionRenderer(item)
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(item)}
                              className="mr-2 text-lg hover:scale-125 transition-transform"
                              title="Edit"><FilePenLine size={20} /></button>
                            <button
                              onClick={() => handleDelete(item.id || item.book_id || item.category_id)}
                              className="mr-2 text-lg hover:scale-125 transition-transform"
                              title="Delete"><Trash2 size={20} /></button>
                            {title === "User Management" && (
                              <button
                                className="text-lg hover:scale-125 transition-transform"
                                title="View"><BookUser size={20} /></button>
                            )}
                          </>
                        );
                      } else if (col.render) {
                        cellContent = col.render(item);
                      } else {
                        cellContent = item[col.accessor] || 'N/A';
                      }
                      return <td key={col.accessor} className="p-3 text-center">{cellContent}</td>;
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {isUserPage && (
          <div className="flex flex-col items-center justify-center gap-2 w-28 h-full bg-[#0a0f33] rounded-tl-lg">
            <span className='text-upright text-white text-2xl tracking-[5px]'>BOOK&nbsp;&nbsp;HIVE</span>
          </div>
        )}
      </section>
      {formPopup}
    </div>
  );
};

export default CommonLayout;
