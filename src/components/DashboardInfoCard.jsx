import React from "react";

const DashboardInfoCard = ({ icon, title, value, loading }) => {
  return (
    <div className="pr-23 [1200px]:px-5 [1200px]:py-5 flex h-[12vh] max-h-[126px] min-h-[60px] w-full min-w-0 max-w-[450px] items-center gap-3.5 rounded-xl bg-white py-3 pl-5 max-[1540px]:h-full max-[1540px]:flex-1 max-[1540px]:scale-90 max-[1540px]:pl-2 max-[1540px]:pr-8 max-[650px]:h-[70px] max-[650px]:max-w-full max-[650px]:scale-100 max-[650px]:gap-2 max-[650px]:py-1 max-[650px]:pl-1.5 max-[650px]:pr-4 dark:bg-[#D7D7D7]">
      <div className="bg-[#A7A7A7]/48 flex h-[8vh] max-h-[88px] min-h-[48px] w-[8vh] min-w-[48px] max-w-[88px] shrink-0 items-center justify-center rounded-lg p-[1.8vh] max-[650px]:h-12 max-[650px]:w-12 max-[650px]:p-2.5 dark:bg-[#C0C0C0]">
        {icon}
      </div>
      <div className="h-full w-0.5 shrink-0 bg-[#000035] dark:bg-[#121317]"></div>
      <div className="flex-2 [1200px]:ml-5 [1200px]:justify-self-center flex min-w-0 flex-col text-[#000035] max-[1200px]:w-fit max-[650px]:ml-1 max-[650px]:mt-0 dark:text-[#121317]">
        <span className="-mb-1 ml-0.5 truncate text-[clamp(22px,4vh+1px,43px)] font-extrabold max-[1200px]:w-fit max-[650px]:text-[22px]">
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
