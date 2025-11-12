import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoIcon from "../assets/logo.svg?react";
import {
    Home,
    BookOpen,
    Library,
    Users,
    BarChart2,
    Folder,
    LogOut,
    Settings
} from "lucide-react";
import { logout } from '../services/auth.api';
import NavLink from './Navlink';


const Sidebar = ({ activeTab, isSidebarOpen, toggleSidebar }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    const [sidebarVisibilty, setSidebarVisibilty] = useState(true);
    const location = useLocation();


    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        const authRoutes = ['/login', '/signup', '/forgot-password', '/otp', '/reset-password'];
        if (authRoutes.includes(location.pathname)) {
            setSidebarVisibilty(false);
        } else {
            setSidebarVisibilty(true);
        }
    }, [location.pathname]);

    return (
        <>
        <div
        className={`fixed inset-0 backdrop-blur-lg bg-[#0000009a] bg-opacity-50 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} max-[1080px]:block hidden `}
        onClick={toggleSidebar}
      ></div>
        <aside
            className={`bg-[#0a0f33] text-white justify-start flex flex-col items-start py-6 overflow-hidden transition-all duration-300 ${isExpanded ? 'w-55' : 'w-24'} ${sidebarVisibilty ? '' : 'hidden'}  max-[1080px]:fixed max-[1080px]:w-64 max-[1080px]:h-full max-[1080px]:z-50 max-[1080px]:transition-transform max-[1080px]:duration-300 ${isSidebarOpen ? 'max-[1080px]:translate-x-0' : 'max-[1080px]:translate-x-full'} max-[1080px]:right-0`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            
            <div className="text-center self-center px-4 h-40">
                <LogoIcon className={`mx-auto transition-all duration-300 ${isExpanded ? 'w-20 h-22' : 'w-12 h-14'} max-[1080px]:w-20 max-[1080px]:h-22`} />
               
                    <h2 className={`text-xl text-center leading-tight transition-all duration-300 mt-2 ${isExpanded ? 'opacity-100 scale-100 max-w-full' : 'opacity-0 scale-50 overflow-hidden max-w-0'} max-[1080px]:text-center max-[1080px]:mt-2 max-[1080px]:opacity-100 max-[1080px]:scale-100 max-[1080px]:max-w-full whitespace-nowrap`}>
                        BookHive<br />
                        <span className="font-light text-center text-[#b5b8d1]">Library</span>
                    </h2>
               
            </div>

            <nav className="mt-10 flex gap-2 flex-col w-full">
                <NavLink
                    isExpanded={isExpanded}
                    active={activeTab === 'dashboard'}
                    onClick={() => navigate('/dashboard')}
                    icon={<Home size={18} strokeWidth={2.3} />}
                    text="Dashboard"
                    toggleSidebar={toggleSidebar}
                />
                <NavLink
                    isExpanded={isExpanded}
                    active={activeTab === 'catalog'}
                    onClick={() => navigate('/catalog')}
                    icon={<Library size={18} strokeWidth={2.3} />}
                    text="Catalog"
                    toggleSidebar={toggleSidebar}
                />
                <NavLink
                    isExpanded={isExpanded}
                    active={activeTab === 'books'}
                    onClick={() => navigate('/books')}
                    icon={<BookOpen size={18} strokeWidth={2.3} />}
                    text="Books"
                    toggleSidebar={toggleSidebar}
                />
                <NavLink
                    isExpanded={isExpanded}
                    active={activeTab === 'user-management'}
                    onClick={() => navigate('/user-management')}
                    icon={<Users size={18} strokeWidth={2.3} />}
                    text="Users"
                    toggleSidebar={toggleSidebar}
                />
                <NavLink
                    isExpanded={isExpanded}
                    active={activeTab === 'reports'}
                    onClick={() => navigate('/reports')}
                    icon={<BarChart2 size={18} strokeWidth={2.3} />}
                    text="Reports"
                    toggleSidebar={toggleSidebar}
                />
                <NavLink
                    isExpanded={isExpanded}
                    active={activeTab === 'categories'}
                    onClick={() => navigate('/categories')}
                    icon={<Folder size={18} strokeWidth={2.3} />}
                    text="Categories"
                    toggleSidebar={toggleSidebar}
                />

            </nav>
            <div className={`transition-all flex flex-col gap-2 w-full mt-auto duration-300 ${isExpanded ? '' : 'flex justify-center'}`}>
                <div className="max-[1080px]:block hidden">
                    <NavLink
                    isExpanded={isExpanded}
                    active={activeTab === 'settings'}
                    onClick={() => navigate('/settings')}
                    icon={<Settings size={18} strokeWidth={2.3} />}
                    text="Settings"
                    toggleSidebar={toggleSidebar}
                />
                </div>
            
                <NavLink
                    isExpanded={isExpanded}
                    active={activeTab === 'logout'}
                    onClick={handleLogout}
                    icon={<LogOut size={18} strokeWidth={2.3} />}
                    text="Logout"
                    toggleSidebar={toggleSidebar}
                />
            </div>

        </aside>
        </>
    );
};



export default Sidebar;
