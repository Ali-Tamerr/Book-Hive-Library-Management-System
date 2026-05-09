import React from "react";

function DashboardCard({ title, children, className = "", listClassName = "" }) {
  return (
    <div
      className={`flex h-full w-full min-w-0 flex-1 flex-col gap-2.5 rounded-[0.6875rem] border border-[#000035] bg-transparent px-3.5 py-7 dark:border dark:border-[rgba(185,189,200,0.78)] dark:bg-[#121317] dark:shadow-[0_0.625rem_1.375rem_rgba(0,0,0,0.42)] ${className}`}
    >
      <h4 className="self-center text-[2rem] leading-none font-bold text-[#000035] dark:text-[#d3d6de] max-[75rem]:text-[1.5rem]">
        {title}
      </h4>
      <ul className={`flex-1 space-y-2 overflow-y-auto pr-1 pt-3 ${listClassName}`}>
        {children}
      </ul>
    </div>
  );
}

export default DashboardCard;
