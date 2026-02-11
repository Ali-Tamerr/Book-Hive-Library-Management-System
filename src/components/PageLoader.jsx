import React from "react";
import { Loader2 } from "lucide-react";

const PageLoader = ({ className = "" }) => {
  return (
    <div
      className={`flex h-screen w-full items-center justify-center bg-[#F2F2F2] dark:bg-[#121317] ${className}`}
    >
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-10 w-10 animate-spin text-[#0a0f33] dark:text-[#E8E8E8]" />
        <span className="text-lg font-medium text-[#0a0f33] dark:text-[#E8E8E8]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default PageLoader;
