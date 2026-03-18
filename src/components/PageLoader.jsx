import React from "react";
import LoadingSpinner from "./LoadingSpinner.jsx";

const PageLoader = ({ className = "" }) => {
  return (
    <div
      className={`flex h-screen w-full items-center justify-center bg-[#F2F2F2] dark:bg-[#121317] ${className}`}
    >
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="md" />
      </div>
    </div>
  );
};

export default PageLoader;
