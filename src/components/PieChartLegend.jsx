import React from 'react';
import LogoIcon from "../assets/logo.svg?react";

const PieChartLegend = ({ variant = 'mobile' }) => {
  if (variant === 'mobile') {
    return (
      <div className="gap-8 items-center bg-white dark:bg-[#D7D7D7] border dark:border-[#292D32] dark:text-black p-6 rounded-lg hidden max-[1540px]:flex max-[1080px]:scale-90 max-[340px]:scale-70">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="6" fill="#4b5563" className="dark:fill-[#121317]" />
            </svg>
            <p className="text-sm text-[#000035] dark:text-black font-medium max-[340px]:whitespace-nowrap">Total Borrowed Books</p>
          </div>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="6" fill="#000035" className="dark:fill-[#292D32]" />
            </svg>
            <p className="text-sm text-[#000035] dark:text-black font-medium max-[340px]:whitespace-nowrap">Total Returned Books</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-[1540px]:hidden flex gap-8 items-center bg-white dark:bg-[#D7D7D7] py-5 px-6 rounded-lg scale-125">
      <div className='max-[1650px]:hidden block'>
        <LogoIcon className="w-16 h-16 -mr-3 text-[#0a0f33] dark:text-black" />
      </div>
      <div className='h-[125%] bg-[#0a0f33] dark:bg-black w-0.5 rounded-full block max-[1650px]:hidden'></div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-5">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8" fill="#4b5563" className="dark:fill-[#121317]" />
          </svg>
          <p className="text-md text-[#000035] dark:text-black font-medium">Total Borrowed Books</p>
        </div>
        <div className="flex items-center gap-5">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8" fill="#000035" className="dark:fill-[#292D32]" />
          </svg>
          <p className="text-md text-[#000035] dark:text-black font-medium">Total Returned Books</p>
        </div>
      </div>
    </div>
  );
};

export default PieChartLegend;
