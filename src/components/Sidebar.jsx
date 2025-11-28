import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoIcon from '../assets/logo.svg?react';
import {
    Home,
    BookOpen,
    Library,
    Users,
    BarChart2,
    Folder,
    LogOut,
    Settings, Book, RotateCcw,
    Globe,

} from "lucide-react";
import { logout, getCurrentUser } from '../services/auth.api';

import NavLink from './NavLink';


const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, toggleSidebar }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(getCurrentUser());
    const location = useLocation();

    const isAdmin = (currentUser && currentUser.role === 'Admin');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        setCurrentUser(getCurrentUser());
    }, [location.pathname]);

    return (
        <>
            <div
                className={`fixed inset-0 backdrop-blur-lg bg-[#0000009a] bg-opacity-50 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} max-[1080px]:block hidden `}
                onClick={toggleSidebar}
            ></div>
            <aside
                className={`bg-[#0a0f33] text-white justify-start flex flex-col items-start pt-6 pb-3 overflow-hidden transition-all duration-300 ${isExpanded ? 'w-55' : 'w-24'} max-[1080px]:fixed max-[1080px]:w-64 max-[1080px]:h-full max-[1080px]:z-50 max-[1080px]:transition-transform max-[1080px]:duration-300 ${isSidebarOpen ? 'max-[1080px]:translate-x-0' : 'max-[1080px]:translate-x-full'} max-[1080px]:right-0`}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(true)}
            >

                <div className="text-center self-center px-4 h-40">
                    <LogoIcon className={`mx-auto transition-all duration-300 ${isExpanded ? 'w-20 h-22' : 'w-12 h-14'} max-[1080px]:w-20 max-[1080px]:h-22`} />

                    <h2 className={`text-xl text-center leading-tight transition-all duration-300 mt-2 ${isExpanded ? 'opacity-100 scale-100 max-w-full' : 'opacity-0 scale-50 overflow-hidden max-w-0'} max-[1080px]:text-center max-[1080px]:mt-2 max-[1080px]:opacity-100 max-[1080px]:scale-100 max-[1080px]:max-w-full whitespace-nowrap`}>
                        BookHive<br />
                        <span className="font-light text-center font-['Caveat',cursive] text-[#b5b8d1]">Library</span>
                    </h2>

                </div>

                {!isAdmin && <div className="mt-10 flex flex-col w-full flex-1 overflow-hidden relative">
                    <nav className="w-full h-full overflow-y-auto pb-10">
                        <NavLink
                            isExpanded={isExpanded}
                            onClick={() => { navigate('/user/dashboard') }}
                            icon={<Home size={18} strokeWidth={2.3} />}
                            text="Dashboard"
                        />
                        <NavLink
                            isExpanded={isExpanded}
                            onClick={() => {
                                setActiveTab('/user/books');
                                navigate('/user/books');
                            }}
                            icon={<BookOpen size={18} strokeWidth={2.3} />}
                            text="Books"
                        />
                        <NavLink
                            isExpanded={isExpanded}
                            onClick={() => {
                                setActiveTab('/user/catalog');
                                navigate('/user/catalog');
                            }}
                            icon={<Library size={18} strokeWidth={2.3} />}
                            text="Catalog"
                        />
                    </nav>
                    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0a0f33] to-transparent pointer-events-none" />
                </div>}
                {isAdmin && <div className="mt-10 flex flex-col w-full flex-1 overflow-hidden relative">
                    <nav className="w-full h-full overflow-y-auto pb-3 flex flex-col gap-2">
                        <NavLink
                            isExpanded={isExpanded}
                            active={location.pathname === '/admin/dashboard'}
                            onClick={() => {
                                setActiveTab('/admin/dashboard');
                                navigate('/admin/dashboard');
                            }}
                            icon={<Home size={18} strokeWidth={2.3} />}
                            text="Dashboard"
                            toggleSidebar={toggleSidebar}
                        />
                        <NavLink
                            isExpanded={isExpanded}
                            active={location.pathname.startsWith('/admin/catalog')}
                            onClick={() => {
                                setActiveTab('/admin/catalog');

                                navigate('/admin/catalog');
                            }}
                            icon={<Library size={18} strokeWidth={2.3} />}
                            text="Catalog"
                            toggleSidebar={toggleSidebar}
                        />
                        <NavLink
                            isExpanded={isExpanded}
                            active={location.pathname === '/admin/books'}
                            onClick={() => {
                                setActiveTab('/admin/books');

                                navigate('/admin/books');
                            }}
                            icon={<BookOpen size={18} strokeWidth={2.3} />}
                            text="Books"
                            toggleSidebar={toggleSidebar}
                        />
                        <NavLink
                            isExpanded={isExpanded}
                            active={location.pathname === '/admin/user-management'}
                            onClick={() => {
                                setActiveTab('/admin/user-management');

                                navigate('/admin/user-management');
                            }}
                            icon={<Users size={18} strokeWidth={2.3} />}
                            text="Users"
                            toggleSidebar={toggleSidebar}
                        />
                        <NavLink
                            isExpanded={isExpanded}
                            active={location.pathname === '/admin/reports'}
                            onClick={() => {
                                setActiveTab('/admin/reports');

                                navigate('/admin/reports');
                            }}
                            icon={<BarChart2 size={18} strokeWidth={2.3} />}
                            text="Reports"
                            toggleSidebar={toggleSidebar}
                        />
                        <NavLink
                            isExpanded={isExpanded}
                            active={location.pathname === '/admin/branches'}
                            onClick={() => {
                                setActiveTab('/admin/branches');
                                navigate('/admin/branches');
                            }}
                            icon={<Library size={18} strokeWidth={2.3} />}
                            text="Branches"
                            toggleSidebar={toggleSidebar}
                        />
                        <NavLink
                            isExpanded={isExpanded}
                            active={location.pathname === '/admin/categories'}
                            onClick={() => {
                                setActiveTab('/admin/categories');

                                navigate('/admin/categories');
                            }}
                            icon={<Folder size={18} strokeWidth={2.3} />}
                            text="Categories"
                            toggleSidebar={toggleSidebar}
                        />
                        <NavLink
                            isExpanded={isExpanded}
                            active={location.pathname === '/admin/languages'}
                            onClick={() => {
                                setActiveTab('/admin/languages');

                                navigate('/admin/languages');
                            }}
                            icon={<Globe size={18} strokeWidth={2.3} />}
                            text="Languages"
                            toggleSidebar={toggleSidebar}
                        />
                    </nav>
                    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#0a0f33] to-transparent pointer-events-none" />
                </div>}
                <div className={`transition-all flex flex-col gap-2 w-full mt-auto duration-300 ${isExpanded ? '' : 'flex justify-center'}`}>
                    <div className="max-[1080px]:block hidden">
                        <NavLink
                            isExpanded={isExpanded}
                            active={location.pathname === '/admin/settings'}
                            onClick={() => {
                                setActiveTab('/settings');

                                navigate('/settings');
                            }}
                            icon={<Settings size={18} strokeWidth={2.3} />}
                            text="Settings"
                            toggleSidebar={toggleSidebar}
                        />
                    </div>

                    <NavLink
                        isExpanded={isExpanded}
                        active={false}
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
