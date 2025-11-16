import React from 'react';

const DashboardInfoCard = ({ icon, title, value, loading }) => {
  return (
    <div className="bg-white max-w-[400px] w-full max-[1540px]:flex-1 max-[1540px]:scale-90 [1540px]:scale-110 max-[1080px]:min-w-[230px] rounded-lg p-5 flex border border-[#0a0f3373] items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <div className="w-12 h-12 bg-[#f5f7fb] rounded-lg flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="h-14 w-0.5 bg-[#0a0f33]"></div>
      <div className="flex-1">
        <h3 className="text-3xl font-semibold text-[#0a0f33] mb-1">
          {loading ? '...' : String(value)}
        </h3>
        <p className="text-xs text-[#6f7390]">{title}</p>
      </div>
    </div>
  );
};

export default DashboardInfoCard;
