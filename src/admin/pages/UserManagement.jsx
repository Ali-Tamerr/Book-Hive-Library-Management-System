import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, FilePenLine, Trash2, Search, BookUser } from 'lucide-react';
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser
} from '../hooks/useUsers';
import { getUserById } from '../services/users.api';
import UserFormPopup from '../../components/UserFormPopup.jsx';
import SearchBar from '../../components/SearchBar.jsx';
import ButtonOne from '../../components/ButtonOne.jsx';

function UserManagement({ searchValue }) {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingUser, setEditingUser] = useState(null);




  // Hide search bar if on dashboard route
  const isDashboard = location.pathname === '/dashboard';
  const showSearchInput = !isDashboard;

  const [formData, setFormData] = useState({
    id: Math.floor(10000000 + Math.random() * 90000000),
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    role: 'User',
    password: '',
    booksBought: [],
    booksReserved: []
  });

  const [activeTab, setActiveTab] = useState('user-management');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/admin/user-management')) {
      setActiveTab('user-management');
    }
  }, [location.pathname]);

  const { data: users = [], isLoading } = useUsers();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      if (editMode && formData.id) {
        // Merge the original user data with the form data
        const dataToUpdate = { ...editingUser, ...formData };

        // If a new password is provided, use it. Otherwise, the existing password_hash is preserved from editingUser.
        if (formData.password) {
          dataToUpdate.password_hash = formData.password;
        }

        // Remove the temporary 'password' field from the payload
        delete dataToUpdate.password;

        await updateUserMutation.mutateAsync({ id: formData.id, data: dataToUpdate });
      } else {
        const { password, ...userData } = formData;
        if (!password) {
          alert("Password is required for new users.");
          return;
        }
        await createUserMutation.mutateAsync({ ...userData, password_hash: password });
      }
      setFormData({ first_name: '', last_name: '', email: '', phone_number: '', role: 'User', password: '', booksBought: [], booksReserved: [] });
      setShowPopup(false);
      setEditMode(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Failed to save user:", error);
      alert('Failed to save user. Please try again.');
    }
  };

  const handleEdit = async (user) => {
    try {
      const fullUserData = await getUserById(user.id);
      setEditingUser(fullUserData); // Store the original full user data
      setFormData({
        ...fullUserData,
        password: '', // Keep password field blank in UI
      });
      setEditMode(true);
      setShowPopup(true);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      alert("Failed to fetch user details. Please try again.");
    }
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

  const buttonBehaviour = () => {
    setFormData({ first_name: '', last_name: '', email: '', phone_number: '', role: 'User', password: '', booksBought: [], booksReserved: [] });
    setEditMode(false);
    setShowPopup(true);
  }
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
    <div className='flex flex-col h-full p-7 gap-5'>
      <div className="flex justify-between items-center">
        <h2 className="text-xl max-[856px]:text-sm font-semibold">User Management</h2>
        <div className='flex gap-2 h-10'>
          <ButtonOne buttonBehaviour={buttonBehaviour}/>
          <SearchBar searchValue={searchValue}/>

        </div>
      </div>

      <section className="flex-1 h-full bg-white  rounded-lg flex flex-col">
        <div className="overflow-x-auto flex-1 h-full">
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
                        title="Edit"><FilePenLine size={20} /></button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="mr-2 text-lg hover:scale-125 transition-transform"
                        title="Delete"><Trash2 size={20} /></button>
                      <button
                        className="text-lg hover:scale-125 transition-transform"
                        title="View"><BookUser size={20} /></button>
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
    </div>
  );
}

export default UserManagement;

