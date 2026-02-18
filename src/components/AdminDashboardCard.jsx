import React from 'react';
import { RefreshCw, User } from 'lucide-react';
import DashboardCard from './DashboardCard';

const AdminDashboardCard = ({ loading, displayAdmins, handleRefreshAdmins, loadingAdmins }) => {
    return (
      <DashboardCard title="BookWorm Librarians">
        {loading ? (
          <li className="flex items-center gap-2.5 rounded-md p-2.5 text-xs dark:text-[#121317]">
            Loading...
          </li>
        ) : displayAdmins.length > 0 ? (
          displayAdmins.map((admin) => (
            <li
              key={admin.id}
              className="flex h-14 items-center gap-2.5 rounded-xl border border-[#0a0f33] bg-transparent px-2.5 py-3 text-xs dark:border-[#0a0f33] dark:bg-[#E3E3E3]"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0a0f33] dark:bg-[#0a0f33]">
                <User size={14} className="text-white dark:text-[#121317]" />
              </div>
              <div className="h-full w-[1.8px] rounded-full bg-[#0b0b3b] dark:bg-[#0a0f33]"></div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-[#0a0f33] dark:text-[#121317]">
                  {admin.name}
                </p>
                <p className="text-xs font-medium text-[#6f7390] dark:text-[#121317]">
                  Librarian ID: {admin.adminId}
                </p>
              </div>
              <RefreshCw
                onClick={() => handleRefreshAdmins(admin.id)}
                className={`h-7 w-7 cursor-pointer text-[#0a0f33] dark:text-[#121317] ${loadingAdmins[admin.id] ? "animate-spin" : ""}`}
              />
            </li>
          ))
        ) : (
          <li className="rounded-md bg-[#f5f7fb] p-2.5 text-xs text-gray-500 dark:bg-[#E3E3E3] dark:text-[#121317]">
            No librarians found
          </li>
        )}
        {/* <li className="flex h-16 items-center justify-between gap-2.5 rounded-lg border border-[2px] border-[#0a0f33] p-1 text-xs dark:border-[#121317] dark:bg-[#929292]"></li>
        <li className="flex h-16 items-center justify-between gap-2.5 rounded-lg border border-[2px] border-[#0a0f33] p-1 text-xs dark:border-[#121317] dark:bg-[#929292]"></li>
        <li className="flex h-16 items-center justify-between gap-2.5 rounded-lg border border-[2px] border-[#0a0f33] p-1 text-xs dark:border-[#121317] dark:bg-[#929292]"></li>
        <li className="flex h-16 items-center justify-between gap-2.5 rounded-lg border border-[2px] border-[#0a0f33] p-1 text-xs dark:border-[#121317] dark:bg-[#929292]"></li> */}
      </DashboardCard>
    );
};

export default AdminDashboardCard;
