import React from "react";

function DashboardCard({ title, children }) {
  return (
    <div className="flex h-full w-full min-w-[280px] flex-1 flex-col gap-2.5 rounded-[11px] bg-white px-3.5 py-7">
      <h4 className="self-center text-lg font-medium text-[#0a0f33] dark:text-[#121317]">
        {title}
      </h4>
      <ul className="flex-1 space-y-0.5 overflow-y-auto pt-3 pr-1">
        {children}
      </ul>
    </div>
  );
}

export default DashboardCard;
