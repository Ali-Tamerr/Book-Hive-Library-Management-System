import React from 'react';

const DashboardInfoCard = ({ icon, title, value, loading }) => {
  return (
    <div className="bg-white max-w-[500px] min-w-[270px] w-full h-26 max-[1540px]:flex-1 max-[1540px]:scale-90 max-[670px]:min-w-[280px] max-[650px]:scale-60 max-[1080px]:min-w-[230px] rounded-lg p-4 flex items-center gap-4 shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
      <div className="p-5 h-20 w-18 bg-[#E3E3E3] rounded-xl flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="h-full w-0.5 bg-[#0a0f33]"></div>
      <div className="flex-2 flex ml-1 flex-col text-[#0a0f33]">
        <span className="text-[42px] ml-1 font-extrabold ">
          {loading ? '...' : String(value).padStart(4, '0')}
        </span>
        <p className="text-[14px]">{title}</p>
      </div>
    </div>
  );
};


export default DashboardInfoCard;
