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
            className="flex h-14 items-center gap-2.5 rounded-xl border border-[#000035] bg-transparent px-2.5 py-3 text-xs dark:border-[rgba(185,189,200,0.78)]"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full ">
              <User className="h-full w-full text-[#000035] dark:text-[#d3d6de]" />
            </div>
            <div className="h-full w-[1.8px] rounded-full bg-[#000035] dark:bg-[rgba(185,189,200,0.78)]"></div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-[#000035] dark:text-[#d3d6de]">
                {admin.name}
              </p>
              <p className="truncate text-xs font-medium text-[#000035] dark:text-[#c3c7d1]">
                {admin.subtitle || `Librarian ID: ${admin.adminId}`}
              </p>
            </div>
            <RefreshCw
              onClick={() => handleRefreshAdmins(admin.id)}
              className={`h-7 w-7 cursor-pointer text-[#000035] dark:text-[#d3d6de] ${loadingAdmins[admin.id] ? "animate-spin" : ""}`}
            />
          </li>
        ))
      ) : (
        <li className="rounded-md bg-[#f5f7fb] p-2.5 text-xs text-gray-500 dark:bg-transparent dark:text-[#c3c7d1]">
          {emptyLabel}
        </li>
      )}
    </DashboardCard>
  );
};

export default AdminDashboardCard;
