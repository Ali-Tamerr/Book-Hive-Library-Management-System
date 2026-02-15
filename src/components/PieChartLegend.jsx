import React from 'react';
import LogoIcon from "../assets/logo.svg?react";

const PieChartLegend = ({ variant = 'mobile' }) => {
  if (variant === 'mobile') {
    return (
      <div className="gap-7 whitespace-nowrap items-center bg-white dark:bg-[#D7D7D7] border dark:border-[#292D32] dark:text-black p-5 rounded-md hidden max-[1540px]:flex max-[1080px]:scale-90 max-[340px]:scale-70">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="5" fill="#3D3E3E" className="dark:fill-[#121317]" />
            </svg>
            <p className="text-xs text-[#000035] dark:text-black font-medium max-[340px]:whitespace-nowrap">Total Borrowed Books</p>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="5" fill="#000035" className="dark:fill-[#292D32]" />
            </svg>
            <p className="text-xs text-[#000035] dark:text-black font-medium max-[340px]:whitespace-nowrap">Total Returned Books</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-7  rounded-md bg-white px-8 py-5 whitespace-nowrap max-[1540px]:hidden dark:bg-[#D7D7D7]">
      <div className="block max-[1650px]:hidden">
        <LogoIcon className="-mr-1.5 h-16 w-17 text-[#0a0f33] dark:text-black" />
      </div>
      <div className="block h-[112%] w-0.5 rounded-full bg-[#0a0f33] max-[1650px]:hidden dark:bg-black"></div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <circle
              cx="9"
              cy="9"
              r="9"
              fill="#3D3E3E"
              className="dark:fill-[#121317]"
            />
          </svg>
          <p className="text-lg font-medium text-[#000035] dark:text-black">
            Total Borrowed Books
          </p>
        </div>
        <div className="flex items-center gap-4">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <circle
              cx="9"
              cy="9"
              r="9"
              fill="#000035"
              className="dark:fill-[#292D32]"
            />
          </svg>
          <p className="text-lg font-medium text-[#000035] dark:text-black">
            Total Returned Books
          </p>
        </div>
      </div>
    </div>
  );
};

export default PieChartLegend;
