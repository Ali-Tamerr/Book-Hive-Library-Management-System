import React from "react";
import { RefreshCw, User } from "lucide-react";
import DashboardCard from "./DashboardCard";

const AdminDashboardCard = ({
  loading,
  displayAdmins,
  handleRefreshAdmins,
  loadingAdmins = {},
  title = "BookWorm Librarians",
  emptyLabel = "No librarians found",
}) => {
  return (
    <DashboardCard title={title}>
      {loading ? (
        <li className="flex items-center gap-2.5 rounded-md p-2.5 text-xs dark:text-[#d3d6de]">
          Loading...
        </li>
      ) : displayAdmins.length > 0 ? (
        displayAdmins.map((admin) => (
          <li
            key={admin.id}
            className="flex items-center gap-3 rounded-[16px] border border-[#000035] bg-transparent p-3 py-2.5 dark:border-[#D7D7D7]"
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full fill-[#000035]"
              >
                <path
                  d="M50 12 L82 30 L82 70 L50 88 L18 70 L18 30 Z"
                  strokeWidth="24"
                  strokeLinejoin="round"
                  stroke="#000035"
                />
              </svg>
              <User className="relative z-10 h-5 w-5 text-[#F2F2F2]" />
            </div>

            <div className="h-10 w-[2px] rounded-full bg-[#000035] dark:bg-[#D7D7D7]"></div>

            <div className="flex-1 overflow-hidden">
              <p className="truncate text-lg font-bold leading-tight text-[#000035] dark:text-[#D7D7D7]">
                {admin.name}
              </p>
              <p className="truncate text-[13px] font-medium leading-tight text-[#000035] dark:text-[#D7D7D7]">
                {admin.subtitle || `Unknown Branch`}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 self-stretch">
              <RefreshCw
                onClick={() => handleRefreshAdmins(admin.id)}
                className={`h-8 w-8 cursor-pointer text-[#000035] transition-transform dark:text-[#D7D7D7] ${loadingAdmins[admin.id] ? "animate-spin" : ""}`}
              />
              <div className="flex items-center gap-1.5">
                <div
                  className={`h-2 w-2 rounded-full ${admin.isOnline ? "bg-[#000035] dark:bg-[#D7D7D7]" : "bg-[#3d3e3e] dark:bg-[#3d3e3e]"}`}
                ></div>
                <p
                  className={`text-[12px] font-bold text-[#000035] dark:text-[#D7D7D7]`}
                >
                  {admin.isOnline ? "Active" : "Not Active"}
                </p>
              </div>
            </div>
          </li>
        ))
      ) : (
        <li className="rounded-md bg-[#f5f7fb] p-2.5 text-xs text-[#000035] dark:bg-transparent dark:text-[#c3c7d1]">
          {emptyLabel}
        </li>
      )}
    </DashboardCard>
  );
};

export default AdminDashboardCard;
