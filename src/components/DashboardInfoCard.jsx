import React from 'react';

const DashboardInfoCard = ({ icon, title, value, loading }) => {
  return (
    <div className="bg-white max-w-[500px] w-full h-24 max-[1540px]:flex-1 max-[1540px]:scale-90 max-[1080px]:min-w-[230px] rounded-lg p-3 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <div className="p-4 h-20 w-20 bg-[#E3E3E3] rounded-xl flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="h-full w-0.5 bg-[#0a0f33]"></div>
      <div className="flex-2 flex flex-col">
        <span className="text-[30px] font-bold text-[#0a0f33]">
          {loading ? '...' : String(value)}
        </span>
        <p className="text-[14px] text-[#6f7390]">{title}</p>
      </div>
    </div>
  );
};

export default DashboardInfoCard;
