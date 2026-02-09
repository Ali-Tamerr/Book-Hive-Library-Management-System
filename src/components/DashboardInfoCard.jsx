import React from 'react';

const DashboardInfoCard = ({ icon, title, value, loading }) => {
  return (
    <div className="bg-white dark:bg-[#E8E8E8] max-w-[450px] min-w-[378px] w-full h-[126px] max-[1540px]:h-full max-[1540px]:flex-1 max-[1540px]:scale-90 max-[670px]:min-w-[252px] max-[650px]:scale-60 max-[1080px]:scale-80 max-[1080px]:min-w-[207px] rounded-xl py-1.5 px-5 flex items-center gap-3.5">
      <div className="p-5 h-22 w-22 bg-[#A7A7A7]/48 dark:bg-[#C0C0C0] rounded-lg flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="h-full w-0.5 bg-[#0a0f33] dark:bg-[#121317]"></div>
      <div className="flex-2 flex ml-5 mt-1.5 flex-col text-[#0a0f33] dark:text-[#121317]">
        <span className="text-[40px] ml-0.5 -mb-1 font-extrabold ">
          {loading ? '...' : String(value).padStart(4, '0')}
        </span>
        <p className="text-[14px] m-0 p-0">{title}</p>
      </div>
    </div>
  );
};


export default DashboardInfoCard;
