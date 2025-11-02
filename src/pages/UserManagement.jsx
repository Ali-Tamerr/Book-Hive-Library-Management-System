import DashboardLayout from '../layouts/DashboardLayout';
import { useState } from 'react';
import { 
  useUsers, 
  useCreateUser, 
  useUpdateUser, 
  useDeleteUser 
} from '../hooks/useUsers';

function UserManagement() {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  const [formData, setFormData] = useState({ 
    first_name: '', 
    last_name: '', 
    email: '', 
    phone_number: '',
    role: 'User'
  });

  // Use React Query hooks - automatic caching, refetching, and error handling!
  const { data: users = [], isLoading } = useUsers();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      if (editMode && formData.id) {
        await updateUserMutation.mutateAsync({ id: formData.id, data: formData });
      } else {
        await createUserMutation.mutateAsync(formData);
      }
      setFormData({ first_name: '', last_name: '', email: '', phone_number: '', role: 'User' });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
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
      role: user.role || 'User'
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

  const filteredUsers = users.filter(
    user =>
      `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.id?.toString().includes(searchValue)
  );

  return (
    <DashboardLayout activeTab="users">
      <div className="flex flex-col h-screen">
        <header className="bg-white flex justify-between items-center px-6 py-3 border-b-2 border-gray-300">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
            <div>
              <h3 className="text-sm font-semibold">Abdelmohymen</h3>
              <p className="text-xs text-gray-600">Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs font-semibold">12:29 PM</span>
              <p className="text-xs text-gray-600">Sep 27, 2025</p>
            </div>
            <div className="relative">
              <input
                type="text"
                id="searchInput"
                placeholder="Search by ID or Name"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="px-3 py-1 pr-8 rounded border border-gray-300 outline-none text-xs"
              />
              <button className="absolute right-2 top-1 text-base">🔍</button>
            </div>
            <button className="text-2xl">⚙️</button>
          </div>
        </header>

        <section className="flex-1 bg-white mx-6 my-5 rounded-lg p-5 border-2 border-[#c7d5f2] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">User Management</h2>
            <button
              onClick={() => {
                setFormData({ first_name: '', last_name: '', email: '', phone_number: '', role: 'User' });
                setEditMode(false);
                setShowPopup(true);
              }}
              className="bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium"
            >
              ➕ Add User
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
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
                          title="Edit">✏️</button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="mr-2 text-lg hover:scale-125 transition-transform" 
                          title="Delete">🗑️</button>
                        <button 
                          className="text-lg hover:scale-125 transition-transform" 
                          title="View">📘</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => {
          setShowPopup(false);
          setEditMode(false);
        }}>
          <div className="bg-white w-11/12 max-w-[400px] rounded-lg p-5 border-2 border-[#0b0b3b]" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-center mb-5 text-lg text-[#0b0b3b]">{editMode ? 'Edit User' : 'Add New User'}</h3>
            <form onSubmit={handleAddUser} className="space-y-3">
              <label className="text-sm font-medium block">First Name</label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                placeholder="Enter first name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <label className="text-sm font-medium block">Last Name</label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                placeholder="Enter last name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <label className="text-sm font-medium block">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <label className="text-sm font-medium block">Phone Number</label>
              <input
                type="text"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                placeholder="Enter phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <label className="text-sm font-medium block">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
              <div className="flex justify-between mt-5">
                <button
                  type="submit"
                  className="bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors font-semibold"
                >
                  {editMode ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPopup(false);
                    setEditMode(false);
                  }}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default UserManagement;

