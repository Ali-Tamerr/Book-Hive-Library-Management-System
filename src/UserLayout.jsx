import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./user/components/Sidebar";
import UserNavbar from "./user/components/Navbar";

function UserLayout() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#f5f7fb] text-[#000035]">
      <UserSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <main className="flex flex-1 flex-col overflow-hidden">
        <UserNavbar toggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default UserLayout;
