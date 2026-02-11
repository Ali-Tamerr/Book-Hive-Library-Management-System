import React from "react";

const DashboardInfoCard = ({ icon, title, value, loading }) => {
  return (
    <div className="flex h-[126px] w-full max-w-[450px] min-w-0 pl-5
    pr-23 items-center gap-3.5 rounded-xl bg-white py-3 max-[1540px]:pr-8 max-[1540px]:pl-2 max-[1540px]:h-full max-[1540px]:flex-1 max-[1540px]:scale-90 max-[650px]:h-[70px] max-[650px]:max-w-full max-[650px]:scale-100 max-[650px]:gap-2 max-[650px]:py-1 max-[650px]:pr-4 max-[650px]:pl-1.5 dark:bg-[#E8E8E8] [1200px]:px-5 [1200px]:py-5">
      <div className="flex h-22 w-22 shrink-0 items-center justify-center rounded-lg bg-[#A7A7A7]/48 p-5 max-[650px]:h-12 max-[650px]:w-12 max-[650px]:p-2.5 dark:bg-[#C0C0C0]">
        {icon}
      </div>
      <div className="h-full w-0.5 shrink-0 bg-[#0a0f33] dark:bg-[#121317]"></div>
      <div className="mt-1.5 flex min-w-0 flex-2 flex-col text-[#0a0f33] max-[1200px]:w-fit max-[650px]:mt-0 max-[650px]:ml-1 dark:text-[#121317] [1200px]:ml-5 [1200px]:justify-self-center">
        <span className="-mb-1 ml-0.5 truncate text-[40px] font-extrabold max-[1200px]:w-fit max-[650px]:text-[22px]">
          {loading ? "..." : String(value).padStart(4, "0")}
        </span>
        <p className="m-0 truncate p-0 text-[14px] max-[1200px]:w-fit max-[650px]:text-[10px]">
          {title}
        </p>
      </div>
    </div>
  );
};

export default DashboardInfoCard;
