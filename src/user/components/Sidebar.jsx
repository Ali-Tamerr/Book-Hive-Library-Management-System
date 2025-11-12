import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Book, RotateCcw, LogOut } from 'lucide-react';
import NavLink from './NavLink';
import { logout } from '../../admin/services/auth.api';

const UserSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`bg-[#0a0f33] text-white justify-start flex flex-col items-start py-6 overflow-hidden transition-all duration-300 ${isExpanded ? 'w-55' : 'w-24'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="text-center self-center px-4 h-40">
        {/* Logo here */}
      </div>

      <nav className="mt-10 flex flex-col w-full">
        <NavLink
          isExpanded={isExpanded}
          onClick={() => navigate('/user/dashboard')}
          icon={<Home size={18} strokeWidth={2.3} />}
          text="Dashboard"
        />
        <NavLink
          isExpanded={isExpanded}
          onClick={() => navigate('/user/borrowed')}
          icon={<Book size={18} strokeWidth={2.3} />}
          text="Borrowed Books"
        />
        <NavLink
          isExpanded={isExpanded}
          onClick={() => navigate('/user/returned')}
          icon={<RotateCcw size={18} strokeWidth={2.3} />}
          text="Returned Books"
        />
      </nav>
      <div className={`transition-all w-full mt-auto duration-300 ${isExpanded ? '' : 'flex justify-center'}`}>
        <NavLink
          isExpanded={isExpanded}
          onClick={handleLogout}
          icon={<LogOut size={18} strokeWidth={2.3} />}
          text="Logout"
        />
      </div>
    </aside>
  );
};

export default UserSidebar;
