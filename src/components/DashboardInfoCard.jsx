import React from 'react';

const DashboardInfoCard = ({ icon, title, value, loading }) => {
  return (
    <div className="bg-white dark:bg-[#E8E8E8] max-w-[500px] min-w-[420px] w-full h-[140px] max-[1540px]:h-full max-[1540px]:flex-1 max-[1540px]:scale-90 max-[670px]:min-w-[280px] max-[650px]:scale-60 max-[1080px]:scale-80 max-[1080px]:min-w-[230px] rounded-2xl py-2 px-6 flex items-center gap-4">
      <div className="p-6 h-24 w-24 bg-[#A7A7A7]/48 dark:bg-[#C0C0C0] rounded-xl flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="h-full w-0.5 bg-[#0a0f33] dark:bg-[#121317]"></div>
      <div className="flex-2 flex ml-6 mt-2 scale-110 flex-col text-[#0a0f33] dark:text-[#121317]">
        <span className="text-[44px] ml-0.5 -mb-1 font-extrabold ">
          {loading ? '...' : String(value).padStart(4, '0')}
        </span>
        <p className="text-[16px] m-0 p-0">{title}</p>
      </div>
    </div>
  );
};


export default DashboardInfoCard;
