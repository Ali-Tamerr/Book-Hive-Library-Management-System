import React from 'react';

function DashboardCard({ title, children }) {
  return (
    <div className="bg-white flex flex-1 flex-col gap-3 h-full rounded-[12px] w-full min-w-[380px] py-8 px-4 ">
      <h4 className="text-xl font-medium self-center text-[#0a0f33] dark:text-[#121317]">{title}</h4>
      <ul className="space-y-1 pt-4 pr-1 overflow-y-auto flex-1">
        {children}
      </ul>
    </div>
  );
}

export default DashboardCard;