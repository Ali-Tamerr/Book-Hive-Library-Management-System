import React from "react";

const DashboardInfoCard = ({ icon, title, value, loading }) => {
  return (
    <div className="pr-23 [75rem]:px-5 [75rem]:py-5 flex h-[12vh] max-h-[7.875rem] min-h-[3.75rem] w-full min-w-0 max-w-[28.125rem] items-center gap-3.5 rounded-xl bg-white py-3 pl-5 max-[96.25rem]:h-full max-[96.25rem]:flex-1 max-[96.25rem]:scale-90 max-[96.25rem]:pl-2 max-[96.25rem]:pr-8 max-[40.625rem]:h-[4.375rem] max-[40.625rem]:max-w-full max-[40.625rem]:scale-100 max-[40.625rem]:gap-2 max-[40.625rem]:py-1 max-[40.625rem]:pl-1.5 max-[40.625rem]:pr-4 dark:bg-[#D7D7D7]">
      <div className="bg-[#A7A7A7]/48 flex h-[8vh] max-h-[5.5rem] min-h-[3rem] w-[8vh] min-w-[3rem] max-w-[5.5rem] shrink-0 items-center justify-center rounded-lg p-[1.8vh] max-[40.625rem]:h-12 max-[40.625rem]:w-12 max-[40.625rem]:p-2.5 dark:bg-[#C0C0C0]">
        {icon}
      </div>
      <div className="h-full w-0.5 shrink-0 bg-[#000035] dark:bg-[#121317]"></div>
      <div className="flex-2 [75rem]:ml-5 [75rem]:justify-self-center flex min-w-0 flex-col text-[#000035] max-[75rem]:w-fit max-[40.625rem]:ml-1 max-[40.625rem]:mt-0 dark:text-[#121317]">
        <span className="-mb-1 ml-0.5 truncate text-[clamp(1.375rem,4vh+0.0625rem,2.6875rem)] font-extrabold max-[75rem]:w-fit max-[40.625rem]:text-[1.375rem]">
          {loading ? "..." : String(value).padStart(4, "0")}
        </span>
        <p className="m-0 truncate p-0 text-[0.875rem] max-[75rem]:w-fit max-[40.625rem]:text-[0.625rem]">
          {title}
        </p>
      </div>
    </div>
  );
};

export default DashboardInfoCard;
