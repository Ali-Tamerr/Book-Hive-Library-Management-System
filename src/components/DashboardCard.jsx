import React from 'react';

function DashboardCard({ title, children }) {
  return (
    <div className="bg-white  flex flex-1  flex-col gap-3 min-h-50 h-full rounded-lg  w-full min-w-[360px] py-8 px-4 shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
      <h4 className="text-lg font-semibold self-center text-[#0a0f33]">{title}</h4>
      <ul className="space-y-1 pt-4 overflow-y-auto">
        {children}
      </ul>
    </div>
  );
}

export default DashboardCard;