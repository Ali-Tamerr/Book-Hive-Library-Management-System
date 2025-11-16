import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';

function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#f5f7fb]">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} setSearchValue={setSearchValue} />
        <Outlet context={{ setSearchValue }} />
      </div>
    </div>
  );
}

export default AdminLayout;
