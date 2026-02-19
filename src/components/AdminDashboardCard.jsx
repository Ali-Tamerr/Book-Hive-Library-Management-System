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
        <li className="flex items-center gap-2.5 rounded-md p-2.5 text-xs dark:text-[#121317]">
          Loading...
        </li>
      ) : displayAdmins.length > 0 ? (
        displayAdmins.map((admin) => (
          <li
            key={admin.id}
            className="flex h-14 items-center gap-2.5 rounded-xl border border-[#0a0f33] bg-transparent px-2.5 py-3 text-xs dark:border-[#0a0f33] "
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full ">
              <User className="h-full w-full text-[#0a0f33] dark:text-[#0a0f33]" />
            </div>
            <div className="h-full w-[1.8px] rounded-full bg-[#0b0b3b] dark:bg-[#0a0f33]"></div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-[#0a0f33] dark:text-[#121317]">
                {admin.name}
              </p>
              <p className="truncate text-xs font-medium text-[#6f7390] dark:text-[#121317]">
                {admin.subtitle || `Librarian ID: ${admin.adminId}`}
              </p>
            </div>
            <RefreshCw
              onClick={() => handleRefreshAdmins(admin.id)}
              className={`h-7 w-7 cursor-pointer text-[#0a0f33] dark:text-[#121317] ${loadingAdmins[admin.id] ? "animate-spin" : ""}`}
            />
          </li>
        ))
      ) : (
        <li className="rounded-md bg-[#f5f7fb] p-2.5 text-xs text-gray-500 dark:bg-transparent dark:text-[#121317]">
          {emptyLabel}
        </li>
      )}
    </DashboardCard>
  );
};

export default AdminDashboardCard;
