import React from 'react';
import LogoIcon from "../assets/logo.svg?react";

const PieChartLegend = ({ variant = 'mobile' }) => {
  if (variant === 'mobile') {
    return (
      <div className="gap-7 items-center bg-white dark:bg-[#D7D7D7] border dark:border-[#292D32] dark:text-black p-5 rounded-md hidden max-[1540px]:flex max-[1080px]:scale-90 max-[340px]:scale-70">
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
    <div className="max-[1540px]:hidden flex gap-7 items-center bg-white dark:bg-[#D7D7D7] py-4 px-5 rounded-md">
      <div className='max-[1650px]:hidden block'>
        <LogoIcon className="w-14 h-14 -mr-2.5 text-[#0a0f33] dark:text-black" />
      </div>
      <div className='h-[112%] bg-[#0a0f33] dark:bg-black w-0.5 rounded-full block max-[1650px]:hidden'></div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <circle cx="9" cy="9" r="7" fill="#3D3E3E" className="dark:fill-[#121317]" />
          </svg>
          <p className="text-sm text-[#000035] dark:text-black font-medium">Total Borrowed Books</p>
        </div>
        <div className="flex items-center gap-4">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <circle cx="9" cy="9" r="7" fill="#000035" className="dark:fill-[#292D32]" />
          </svg>
          <p className="text-sm text-[#000035] dark:text-black font-medium">Total Returned Books</p>
        </div>
      </div>
    </div>
  );
};

export default PieChartLegend;
