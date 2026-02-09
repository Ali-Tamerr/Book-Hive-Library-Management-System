import React from 'react';

function DashboardCard({ title, children }) {
  return (
    <div className="bg-white flex flex-1 flex-col gap-2.5 h-full rounded-[11px] w-full min-w-[342px] py-7 px-3.5 ">
      <h4 className="text-lg font-medium self-center text-[#0a0f33] dark:text-[#121317]">{title}</h4>
      <ul className="space-y-0.5 pt-3 pr-1 overflow-y-auto flex-1">
        {children}
      </ul>
    </div>
  );
}

export default DashboardCard;