import React from 'react';
import { ShieldCheck, RefreshCw } from 'lucide-react';
import DashboardCard from './DashboardCard';

const AdminDashboardCard = ({ loading, displayAdmins, handleRefreshAdmins, loadingAdmins }) => {
    return (
      <DashboardCard title="BookWorm Admins">
        {loading ? (
          <li className="flex items-center gap-2.5 rounded-md p-2.5 text-xs dark:text-[#121317]">
            Loading...
          </li>
        ) : displayAdmins.length > 0 ? (
          displayAdmins.map((admin) => (
            <li
              key={admin.id}
              className="h-18 flex items-center justify-between gap-2.5 rounded-xl border border-[2px] border-[#0a0f33] p-1 text-xs dark:border-[#0a0f33] dark:bg-[#E3E3E3]"
            >
              <div className="bg-[#C7C7C7]/48 relative flex h-full flex-1 items-center gap-2.5 rounded-lg p-1.5 px-1.5 py-1 dark:bg-[#C7C7C7]/60">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md p-1.5">
                  <ShieldCheck className="h-full w-full text-[#0a0f33] dark:text-[#121317]" />
                </div>
                <div className="h-[90%] w-0.5 bg-[#0a0f33] dark:bg-[#0a0f33]"></div>
                <div className="flex flex-1 flex-col justify-between overflow-hidden truncate whitespace-nowrap">
                  <p className="text-[16px] font-semibold text-[#0a0f33] dark:text-[#121317]">
                    {admin.name}
                  </p>
                  <p className="text-[13px] text-[#6f7390] max-[1540px]:text-[9px] dark:text-[#121317]">
                    Admin ID: {admin.adminId}
                  </p>
                  <div className="absolute bottom-0.5 right-1.5 mt-1 flex items-center justify-end gap-1">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${admin.isOnline ? "bg-[#0a0f33] dark:bg-[#0a0f33]" : "bg-gray-400"}`}
                    ></span>
                    <span
                      className={`text-[9px] font-medium text-[#0a0f33] dark:text-[#121317]`}
                    >
                      {admin.isOnline ? "Active" : "Not Active"}
                    </span>
                  </div>
                </div>
              </div>
              <RefreshCw
                onClick={() => handleRefreshAdmins(admin.id)}
                className={`h-13 mr-1.5 w-11 cursor-pointer px-1.5 text-[#0a0f33] dark:text-[#121317] ${loadingAdmins[admin.id] ? "animate-spin" : ""}`}
              />
            </li>
          ))
        ) : (
          <li className="rounded-md bg-[#f5f7fb] p-2.5 text-xs text-gray-500 dark:bg-[#E3E3E3] dark:text-[#121317]">
            No admins found
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
