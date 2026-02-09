import React from 'react';
import { ShieldCheck, RefreshCw } from 'lucide-react';
import DashboardCard from './DashboardCard';

const AdminDashboardCard = ({ loading, displayAdmins, handleRefreshAdmins, loadingAdmins }) => {
    return (
        <DashboardCard title="BookWorm Admins">
            {loading ? (
                <li className="text-xs p-2.5 rounded-md flex items-center gap-2.5">Loading...</li>
            ) : displayAdmins.length > 0 ? (
                displayAdmins.map((admin) => (
                    <li key={admin.id} className="text-xs dark:bg-[#929292] h-16 p-1 rounded-lg flex items-center justify-between gap-2.5 mb-1.5 border border-[2px] border-[#0a0f33] dark:border-[#121317]">
                        <div className="bg-[#C7C7C7]/48 dark:bg-[#929292] relative flex gap-2.5 h-full items-center flex-1 p-1.5 rounded-lg px-1.5 py-1">
                            <div className="w-11 h-11 p-1.5 rounded-md flex items-center justify-center shrink-0 ">
                                <ShieldCheck className="text-[#0a0f33] dark:text-black h-full w-full" />
                            </div>
                            <div className="w-0.5 h-[90%] bg-[#0a0f33] dark:bg-[#121317]"></div>
                            <div className="flex-1 overflow-hidden flex flex-col justify-between whitespace-nowrap truncate">
                                <p className="text-[16px] font-semibold text-[#0a0f33] dark:text-black">{admin.name}</p>
                                <p className="max-[1540px]:text-[9px] text-[13px] text-[#6f7390] dark:text-black">Admin ID: {admin.adminId}</p>
                                <div className="flex justify-end absolute right-1.5 bottom-0.5 items-center gap-1 mt-1">
                                    <span className={`w-1.5 h-1.5 rounded-full ${admin.isOnline ? 'bg-[#0a0f33] dark:bg-black' : 'bg-gray-400'}`}></span>
                                    <span className={`text-[9px] text-[#0a0f33] dark:text-black font-medium `}>{admin.isOnline ? 'Active' : 'Not Active'}</span>
                                </div>
                            </div>
                        </div>
                        <RefreshCw
                            onClick={() => handleRefreshAdmins(admin.id)}
                            className={`mr-1.5 h-13 w-11 px-1.5 text-[#0a0f33] dark:text-black cursor-pointer ${loadingAdmins[admin.id] ? 'animate-spin' : ''}`}
                        />
                    </li>
                ))
            ) : (
                <li className="text-xs bg-[#f5f7fb] p-2.5 rounded-md text-gray-500">No admins found</li>
            )}
        </DashboardCard>
    );
};

export default AdminDashboardCard;
