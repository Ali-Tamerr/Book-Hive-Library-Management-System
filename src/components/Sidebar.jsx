import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoIcon from "../assets/logo/logo.svg?react";
import {
    Home,
    BookOpen,
    Library,
    Users,
    BarChart2,
    Folder,
    LogOut
} from "lucide-react";
import { logout } from '../services/auth.api';
import NavLink from './Navlink';

const Sidebar = ({ activeTab }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside
            className={`bg-[#0a0f33] text-white justify-start flex flex-col items-start py-6 transition-all duration-300 ${isExpanded ? 'w-55' : 'w-24'}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className="text-center self-center px-4 h-40">
                <LogoIcon className={`mx-auto transition-all duration-300 ${isExpanded ? 'w-20 h-22' : 'w-12 h-14'}`} />
               
                    <h2 className={`text-xl text-center leading-tight transition-all duration-300 mt-2 ${isExpanded ? 'opacity-100 scale-100 max-w-full' : 'opacity-0 scale-50 overflow-hidden max-w-0'}`}>
                        BookHive<br />
                        <span className="font-light text-center text-[#b5b8d1]">Library</span>
                    </h2>
               
            </div>

            <nav className="mt-10 flex flex-col w-full">
                <NavLink
                    isExpanded={isExpanded}
                    active={activeTab === 'dashboard'}
                    onClick={() => navigate('/dashboard')}
                    icon={<Home size={18} strokeWidth={2.3} />}
                    text="Dashboard"
                />
                <NavLink
                    isExpanded={isExpanded}
                    active={activeTab === 'catalog'}
                    onClick={() => navigate('/catalog')}
                    icon={<Library size={18} strokeWidth={2.3} />}
                    text="Catalog"
                />
                <NavLink
                    isExpanded={isExpanded}
                    active={activeTab === 'books'}
                    onClick={() => navigate('/books')}
                    icon={<BookOpen size={18} strokeWidth={2.3} />}
                    text="Books"
                />
                <NavLink
                    isExpanded={isExpanded}
                    active={activeTab === 'users'}
                    onClick={() => navigate('/user-management')}
                    icon={<Users size={18} strokeWidth={2.3} />}
                    text="Users"
                />
                <NavLink
                    isExpanded={isExpanded}
                    active={activeTab === 'reports'}
                    onClick={() => navigate('/reports')}
                    icon={<BarChart2 size={18} strokeWidth={2.3} />}
                    text="Reports"
                />
                <NavLink
                    isExpanded={isExpanded}
                    active={activeTab === 'categories'}
                    onClick={() => navigate('/categories')}
                    icon={<Folder size={18} strokeWidth={2.3} />}
                    text="Categories"
                />

            </nav>
            <div className={`transition-all w-full mt-auto duration-300 ${isExpanded ? '' : 'flex justify-center'}`}>
                <NavLink
                    isExpanded={isExpanded}
                    active={activeTab === 'logout'}
                    onClick={handleLogout}
                    icon={<LogOut size={18} strokeWidth={2.3} />}
                    text="Logout"
                />
            </div>

        </aside>
    );
};



export default Sidebar;
