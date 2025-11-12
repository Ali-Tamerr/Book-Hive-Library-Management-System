import { useState } from 'react';
import { Plus, FilePenLine, Trash2, BookUser } from 'lucide-react';
import { 
  useUsers, 
  useCreateUser, 
  useUpdateUser, 
  useDeleteUser 
} from '../hooks/useUsers';
import UserFormPopup from '../components/UserFormPopup.jsx';

function UserManagement({ searchValue }) {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const [formData, setFormData] = useState({ 
    first_name: '', 
    last_name: '', 
    email: '', 
    phone_number: '',
    role: 'User',
    password: '',
    booksBought: [],
    booksReserved: []
  });

  const { data: users = [], isLoading } = useUsers();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      if (editMode && formData.id) {
        const { password, ...updatedData } = formData;
        await updateUserMutation.mutateAsync({ id: formData.id, data: updatedData });
      } else {
        const { password, ...userData } = formData;
        await createUserMutation.mutateAsync({ ...userData, password_hash: password });
      }
      setFormData({ first_name: '', last_name: '', email: '', phone_number: '', role: 'User', password: '', booksBought: [], booksReserved: [] });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save user:", error);
      alert('Failed to save user. Please try again.');
    }
  };

  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email || '',
      phone_number: user.phone_number || '',
      role: user.role || 'User',
      password: ''
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUserMutation.mutateAsync(id);
      } catch (error) {
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const filteredUsers = searchValue
    ? users.filter(
        (user) =>
          `${user.first_name || ""} ${user.last_name || ""}`
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.id?.toString().includes(searchValue)
      )
    : users;

  return (
    <>
        <section className="flex-1 bg-white mx-6 my-5 rounded-lg p-5 border-2 border-[#c7d5f2] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">User Management</h2>
            <button
              onClick={() => {
                setFormData({ first_name: '', last_name: '', email: '', phone_number: '', role: 'User', password: '', booksBought: [], booksReserved: [] });
                setEditMode(false);
                setShowPopup(true);
              }}
              className="bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Plus size={15}/> Add User
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full border-collapse text-left text-sm min-w-max">
              <thead>
                <tr>
                  <th className="p-3 border-b border-gray-300 font-semibold">ID</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Name</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Email</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Phone</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Role</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="p-3 text-center text-gray-500">Loading...</td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-3 text-center text-gray-500">No users found</td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-200">
                      <td className="p-3">{user.id}</td>
                      <td className="p-3">{`${user.first_name || ''} ${user.last_name || ''}`.trim() || 'N/A'}</td>
                      <td className="p-3">{user.email || 'N/A'}</td>
                      <td className="p-3">{user.phone_number || 'N/A'}</td>
                      <td className="p-3">{user.role || 'User'}</td>
                      <td className="p-3">
                        <button 
                          onClick={() => handleEdit(user)}
                          className="mr-2 text-lg hover:scale-125 transition-transform" 
                          title="Edit"><FilePenLine size={20}/></button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="mr-2 text-lg hover:scale-125 transition-transform" 
                          title="Delete"><Trash2 size={20}/></button>
                        <button 
                          className="text-lg hover:scale-125 transition-transform" 
                          title="View"><BookUser size={20}/></button>
                      </td>
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
    </>
  );
}

export default UserManagement;

