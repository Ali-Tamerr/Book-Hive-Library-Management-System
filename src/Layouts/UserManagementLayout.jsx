import React from 'react';
import { FilePenLine, Trash2, BookUser } from 'lucide-react';
import UserFormPopup from '../components/UserFormPopup.jsx';
import SearchBar from '../components/SearchBar.jsx';
import ButtonOne from '../components/ButtonOne.jsx';

const UserManagementLayout = ({
  searchValue,
  buttonBehaviour,
  isLoading,
  filteredUsers,
  handleEdit,
  handleDelete,
  showPopup,
  editMode,
  formData,
  setFormData,
  handleAddUser,
  setShowPopup,
  setEditMode,
  title,
  buttonText,
  columns,
}) => {
  return (
    <div className='flex flex-col h-full p-7 gap-5'>
      <div className="flex justify-between items-center">
        <h2 className="text-xl max-[856px]:text-sm font-semibold">{title}</h2>
        <div className='flex gap-2 h-10'>
          <ButtonOne buttonBehaviour={buttonBehaviour} text={buttonText} />
          <SearchBar searchValue={searchValue} />
        </div>
      </div>

      <section className="flex-1 h-full bg-white rounded-lg flex flex-col">
        <div className="overflow-x-auto flex-1 h-full">
          <table className="w-full border-collapse text-left text-sm min-w-max">
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col.accessor} className="p-3 border-b border-gray-300 font-semibold">{col.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="p-3 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="p-3 text-center text-gray-500">No users found</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200">
                    {columns.map(col => {
                      let cellContent;
                      if (col.accessor === 'name') {
                        cellContent = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'N/A';
                      } else if (col.accessor === 'action') {
                        cellContent = (
                          <>
                            <button
                              onClick={() => handleEdit(user)}
                              className="mr-2 text-lg hover:scale-125 transition-transform"
                              title="Edit"><FilePenLine size={20} /></button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="mr-2 text-lg hover:scale-125 transition-transform"
                              title="Delete"><Trash2 size={20} /></button>
                            <button
                              className="text-lg hover:scale-125 transition-transform"
                              title="View"><BookUser size={20} /></button>
                          </>
                        );
                      } else {
                        cellContent = user[col.accessor] || 'N/A';
                      }
                      return <td key={col.accessor} className="p-3">{cellContent}</td>;
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      <UserFormPopup
        showPopup={showPopup}
        editMode={editMode}
        formData={formData}
        setFormData={setFormData}
        handleAddUser={handleAddUser}
        setShowPopup={setShowPopup}
        setEditMode={setEditMode}
      />
    </div>
  );
};

export default UserManagementLayout;
