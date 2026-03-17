import React from "react";
import ColorableLogo from "./ColorableLogo";

const PieChartLegend = ({ variant = "mobile", className }) => {
  if (variant === "mobile") {
    return (
      <div
        className={`max-[340px]:scale-70 hidden items-center gap-7 whitespace-nowrap rounded-md border border-[#000035] bg-transparent p-5 max-[1540px]:flex max-[1080px]:scale-90 dark:border-[rgba(185,189,200,0.78)] dark:bg-[#121317] dark:text-[#d3d6de] ${className || ""}`}
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="5" fill="var(--pie-returned-color)" />
            </svg>
            <p className="text-xs font-medium text-[#000035] max-[340px]:whitespace-nowrap dark:text-[#d3d6de]">
              Total Borrowed Books
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="5" fill="var(--pie-borrowed-color)" />
            </svg>
            <p className="text-xs font-medium text-[#000035] max-[340px]:whitespace-nowrap dark:text-[#d3d6de]">
              Borrowed Limited Books
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-7 whitespace-nowrap rounded-md border border-[#000035] bg-transparent px-8 py-5 max-[1540px]:hidden dark:border dark:border-[rgba(185,189,200,0.78)] dark:bg-[#121317] ${className || ""}`}
    >
      <div className="block max-[1650px]:hidden">
        <ColorableLogo className="w-17 -mr-1.5 h-16 text-[#000035] dark:text-[#d3d6de]" />
      </div>
      <div className="block h-[112%] w-0.5 rounded-full bg-[#000035] max-[1650px]:hidden dark:bg-[rgba(185,189,200,0.78)]"></div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <circle cx="9" cy="9" r="9" fill="var(--pie-returned-color)" />
          </svg>
          <p className="text-lg font-medium text-[#000035] dark:text-[#d3d6de]">
            Total Borrowed Books
          </p>
        </div>
        <div className="flex items-center gap-4">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <circle cx="9" cy="9" r="9" fill="var(--pie-borrowed-color)" />
          </svg>
          <p className="text-lg font-medium text-[#000035] dark:text-[#d3d6de]">
            Borrowed Limited Books
          </p>
        </div>
      </div>
    </div>
  );
};

export default PieChartLegend;
