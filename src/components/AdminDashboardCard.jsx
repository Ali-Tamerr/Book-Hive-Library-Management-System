import React from 'react';
import { ShieldCheck, RefreshCw } from 'lucide-react';
import DashboardCard from './DashboardCard';

const AdminDashboardCard = ({ loading, displayAdmins, handleRefreshAdmins, loadingAdmins }) => {
    return (
        <DashboardCard title="BookWorm Admins">
            {loading ? (
                <li className="text-xs  p-3 rounded-lg flex items-center gap-3">Loading...</li>
            ) : displayAdmins.length > 0 ? (
                displayAdmins.map((admin) => (
                    <li key={admin.id} className="text-xs bg-[#f5f7fb] dark:bg-[#929292] h-18 p-1 rounded-lg flex items-center justify-between gap-3 mb-2 border border-[#0a0f33] dark:border-[#121317]">
                        <div className="bg-[#C7C7C77A] dark:bg-[#929292] relative flex gap-3 h-full items-center flex-1 p-2 rounded-lg px-2 py-1">
                            <div className="w-12 h-12 p-2 rounded-lg flex items-center justify-center shrink-0 ">
                                <ShieldCheck className="text-[#0a0f33] dark:text-black h-full w-full" />
                            </div>
                            <div className="w-0.5 h-[90%] bg-[#0a0f33] dark:bg-[#121317]"></div>
                            <div className="flex-1 overflow-hidden flex flex-col justify-between  whitespace-nowrap truncate">
                                <p className="text-[18px] font-semibold text-[#0a0f33] dark:text-black">{admin.name}</p>
                                <p className="max-[1540px]:text-[10px] text-[14px] text-[#6f7390] dark:text-black">Admin ID: {admin.adminId}</p>
                                <div className="flex justify-end absolute right-2 bottom-1 items-center gap-1 mt-1">
                                    <span className={`w-2 h-2 rounded-full ${admin.isOnline ? 'bg-[#0a0f33] dark:bg-black' : 'bg-gray-400'}`}></span>
                                    <span className={`text-[10px] text-[#0a0f33] dark:text-black ${admin.isOnline ? 'font-bold' : 'font-normal'} `}>{admin.isOnline ? 'Active' : 'Not Active'}</span>
                                </div>
                            </div>
                        </div>
                        <RefreshCw
                            onClick={() => handleRefreshAdmins(admin.id)}
                            className={`mr-2 h-15 w-12 px-2 text-[#0a0f33] dark:text-black cursor-pointer ${loadingAdmins[admin.id] ? 'animate-spin' : ''}`}
                        />
                    </li>
                ))
            ) : (
                <li className="text-xs bg-[#f5f7fb] p-3 rounded-lg text-gray-500">No admins found</li>
            )}
        </DashboardCard>
    );
};

export default AdminDashboardCard;
