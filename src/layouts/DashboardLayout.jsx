import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.api';
import Navbar from '../components/Navbar';
import React from 'react';

function DashboardLayout({ children, activeTab }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#f5f7fb] text-[#0a0f33]">
      <aside className="w-60 bg-[#0a0f33] text-white flex flex-col justify-between py-6">
        <div>
          <div className="text-center">
            <img src="/assets/logo.svg" alt="BookHive Logo" className="w-16 mx-auto mb-2" />
            <h2 className="text-xl leading-tight">
              BookHive<br />
              <span className="font-light text-[#b5b8d1]">Library</span>
            </h2>
          </div>

          <nav className="mt-10 flex flex-col">
            <button
              onClick={() => navigate('/dashboard')}
              className={`px-8 py-3 text-left transition-colors ${
                activeTab === 'dashboard' ? 'bg-white text-[#0a0f33] rounded-l-[30px] font-medium' : 'text-[#b5b8d1] hover:bg-white/10'
              }`}
            >
              🏠 Dashboard
            </button>
            <button
              onClick={() => navigate('/catalog')}
              className={`px-8 py-3 text-left transition-colors ${
                activeTab === 'catalog' ? 'bg-white text-[#0a0f33] rounded-l-[30px] font-medium' : 'text-[#b5b8d1] hover:bg-white/10'
              }`}
            >
              📚 Catalog
            </button>
            <button
              onClick={() => navigate('/books')}
              className={`px-8 py-3 text-left transition-colors ${
                activeTab === 'books' ? 'bg-white text-[#0a0f33] rounded-l-[30px] font-medium' : 'text-[#b5b8d1] hover:bg-white/10'
              }`}
            >
              📖 Books
            </button>
            <button
              onClick={() => navigate('/user-management')}
              className={`px-8 py-3 text-left transition-colors ${
                activeTab === 'users' ? 'bg-white text-[#0a0f33] rounded-l-[30px] font-medium' : 'text-[#b5b8d1] hover:bg-white/10'
              }`}
            >
              👤 Users
            </button>
            <button
              onClick={() => navigate('/reports')}
              className={`px-8 py-3 text-left transition-colors ${
                activeTab === 'reports' ? 'bg-white text-[#0a0f33] rounded-l-[30px] font-medium' : 'text-[#b5b8d1] hover:bg-white/10'
              }`}
            >
              📈 Reports
            </button>
            <button
              onClick={() => navigate('/categories')}
              className={`px-8 py-3 text-left transition-colors ${
                activeTab === 'categories' ? 'bg-white text-[#0a0f33] rounded-l-[30px] font-medium' : 'text-[#b5b8d1] hover:bg-white/10'
              }`}
            >
              📂 Categories
            </button>
          </nav>
        </div>

        <div className="pl-8">
          <button
            onClick={handleLogout}
            className="text-[#b5b8d1] text-sm hover:text-white transition-colors"
          >
            🚪 Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />
        {React.Children.map(children, child =>
          React.isValidElement(child) ? React.cloneElement(child, { searchValue }) : child
        )}  

        {showPopup && (
          <div className="fixed inset-0 bg-[rgba(10,15,51,0.5)] flex items-center justify-center z-50">
            <div className="bg-white w-96 p-6 rounded-lg shadow-[0_5px_25px_rgba(0,0,0,0.1)]">
              <h3 className="text-center text-lg mb-4">Change Credentials</h3>
              <form className="space-y-3">
                <label className="text-sm font-medium block">Enter Current Password</label>
                <input
                  type="password"
                  placeholder="Enter Current Password"
                  className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg outline-none text-sm"
                />
                <label className="text-sm font-medium block">Enter New Password</label>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg outline-none text-sm"
                />
                <label className="text-sm font-medium block">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg outline-none text-sm"
                />
                <div className="flex justify-between gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowPopup(false)}
                    className="w-[48%] bg-gray-300 text-black rounded-lg py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-[48%] bg-[#0a0f33] text-white rounded-lg py-2 hover:bg-[#192261]"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardLayout;

