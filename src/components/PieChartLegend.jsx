import React from "react";
import ColorableLogo from "./ColorableLogo";

const PieChartLegend = ({
  variant = "mobile",
  className,
  label1 = "Total Borrowed Books",
  label2 = "Borrowed Limited Books",
}) => {
  if (variant === "mobile") {
    return (
      <div
        className={`max-[21.25rem]:scale-90 hidden w-fit flex-col items-center justify-center gap-2 rounded-md border border-[#000035] bg-transparent px-3.5 py-3 dark:border-[rgba(185,189,200,0.78)] dark:bg-[#121317] dark:text-[#d3d6de] max-[64rem]:flex ${className || ""}`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <svg width="12" height="12" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="6" fill="var(--pie-returned-color)" />
            </svg>
            <p className="text-sm font-medium text-[#000035] dark:text-[#d3d6de]">
              {label1}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <svg width="12" height="12" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="6" fill="var(--pie-borrowed-color)" />
            </svg>
            <p className="text-sm font-medium text-[#000035] dark:text-[#d3d6de]">
              {label2}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-4 flex-wrap justify-center rounded-md border border-[#000035] bg-transparent px-4 py-4 max-[64rem]:hidden dark:border dark:border-[rgba(185,189,200,0.78)] dark:bg-[#121317] ${className || ""}`}
      style={{ transform: `scale(clamp(0.75, calc((100vh - 12.5rem) / 43.75rem), 1))`, transformOrigin: "center center" }}
    >
      <div className="block max-[103.125rem]:hidden">
        <ColorableLogo className="w-17 -mr-1.5 h-16 text-[#000035] dark:text-[#d3d6de]" />
      </div>
      <div className="block h-[112%] w-0.5 rounded-full bg-[#000035] max-[103.125rem]:hidden dark:bg-[rgba(185,189,200,0.78)]"></div>
      <div className="flex flex-col gap-3 min-w-0">
        <div className="flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 18 18" className="shrink-0">
            <circle cx="9" cy="9" r="9" fill="var(--pie-returned-color)" />
          </svg>
          <p className="text-base font-medium leading-tight text-[#000035] dark:text-[#d3d6de]">
            {label1}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 18 18" className="shrink-0">
            <circle cx="9" cy="9" r="9" fill="var(--pie-borrowed-color)" />
          </svg>
          <p className="text-base font-medium leading-tight text-[#000035] dark:text-[#d3d6de]">
            {label2}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PieChartLegend;
