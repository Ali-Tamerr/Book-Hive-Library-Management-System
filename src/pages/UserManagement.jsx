import DashboardLayout from '../layouts/DashboardLayout';
import { useState } from 'react';

function UserManagement() {
  const [showPopup, setShowPopup] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'Ahmed Mohammed', email: 'Ahmedmohammed@gmail.com', username: 'prabathjay' },
    { id: 2, name: 'Ahmedmohammed', email: 'Ahmedmohammed@gmail.com', username: 'prabathjay' },
    { id: 3, name: 'Ahmedmohammed', email: 'Ahmedmohammed@gmail.com', username: 'prabathjay' },
    { id: 4, name: 'Ahmedmohammed', email: 'Ahmedmohammed@gmail.com', username: 'prabathjay' },
    { id: 5, name: 'Ahmedmohammed', email: 'Ahmedmohammed@gmail.com', username: 'prabathjay' },
    { id: 6, name: 'Ahmedmohammed', email: 'Ahmedmohammed@gmail.com', username: 'prabathjay' },
    { id: 7, name: 'Ahmedmohammed', email: 'Ahmedmohammed@gmail.com', username: 'prabathjay' },
    { id: 8, name: 'Ahmedmohammed', email: 'Ahmedmohammed@gmail.com', username: 'prabathjay' },
    { id: 9, name: 'Ahmedmohammed', email: 'Ahmedmohammed@gmail.com', username: 'prabathjay' },
    { id: 10, name: 'Ahmedmohammed', email: 'Ahmedmohammed@gmail.com', username: 'prabathjay' },
    { id: 11, name: 'Ahmedmohammed', email: 'Ahmedmohammed@gmail.com', username: 'prabathjay' },
    { id: 12, name: 'Ahmedmohammed', email: 'Ahmedmohammed@gmail.com', username: 'prabathjay' },
  ]);

  const [formData, setFormData] = useState({ name: '', email: '', username: '' });

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      ...formData
    };
    setUsers([...users, newUser]);
    setFormData({ name: '', email: '', username: '' });
    setShowPopup(false);
  };

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.id.toString().includes(searchValue)
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
              onClick={() => setShowPopup(true)}
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
                  <th className="p-3 border-b border-gray-300 font-semibold">Username</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200">
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">
                      <button className="mr-2 text-lg hover:scale-125 transition-transform" title="Edit">✏️</button>
                      <button className="mr-2 text-lg hover:scale-125 transition-transform" title="Delete">🗑️</button>
                      <button className="text-lg hover:scale-125 transition-transform" title="View">📘</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowPopup(false)}>
          <div className="bg-white w-11/12 max-w-[400px] rounded-lg p-5 border-2 border-[#0b0b3b]" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-center mb-5 text-lg text-[#0b0b3b]">Add New User</h3>
            <form onSubmit={handleAddUser} className="space-y-3">
              <label className="text-sm font-medium block">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
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
              <label className="text-sm font-medium block">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter username"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <div className="flex justify-between mt-5">
                <button
                  type="submit"
                  className="bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors font-semibold"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
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

