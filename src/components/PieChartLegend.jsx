import React from "react";
import ColorableLogo from "./ColorableLogo";

const PieChartLegend = ({ variant = "mobile", className }) => {
  if (variant === "mobile") {
    return (
      <div
        className={`max-[340px]:scale-90 hidden w-fit flex-col items-center justify-center gap-2 rounded-md border border-[#000035] bg-transparent px-3.5 py-3 dark:border-[rgba(185,189,200,0.78)] dark:bg-[#121317] dark:text-[#d3d6de] max-[1024px]:flex ${className || ""}`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <svg width="12" height="12" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="6" fill="var(--pie-returned-color)" />
            </svg>
            <p className="text-sm font-medium text-[#000035] dark:text-[#d3d6de]">
              Total Borrowed Books
            </p>
          </div>
          <div className="flex items-center gap-3">
            <svg width="12" height="12" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="6" fill="var(--pie-borrowed-color)" />
            </svg>
            <p className="text-sm font-medium text-[#000035] dark:text-[#d3d6de]">
              Borrowed Limited Books
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-7 whitespace-nowrap rounded-md border border-[#000035] bg-transparent px-8 py-5 max-[1024px]:hidden dark:border dark:border-[rgba(185,189,200,0.78)] dark:bg-[#121317] ${className || ""}`}
      style={{ transform: `scale(clamp(0.75, calc((100vh - 200px) / 700px), 1))`, transformOrigin: "center center" }}
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
