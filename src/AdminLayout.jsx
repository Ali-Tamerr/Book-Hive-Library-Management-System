import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './admin/components/Sidebar';
import Navbar from './admin/components/Navbar';

function AdminLayout() {
  const [activeTab, setActiveTab] = React.useState('');
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#f5f7fb] text-[#0a0f33]">
      <Sidebar
        activeTab={activeTab}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar searchValue={searchValue} setSearchValue={setSearchValue} toggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-y-auto">
          <Outlet context={{ setActiveTab, setSearchValue }} />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
