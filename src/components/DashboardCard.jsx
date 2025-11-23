import React from 'react';

function DashboardCard({ title, children }) {
  return (
    <div className="bg-white  flex flex-1  flex-col gap-3 min-h-50 h-full rounded-lg  w-full min-w-[280px]  p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <h4 className="text-sm font-medium text-[#0a0f33]">{title}</h4>
      <ul className="space-y-1">
        {children}
      </ul>
    </div>
  );
}

export default DashboardCard;