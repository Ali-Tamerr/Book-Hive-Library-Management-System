import React from "react";
import logoSrc from "../assets/logo.svg";

const sizes = {
  xs: { container: "h-7 w-7", logo: "h-3.5 w-3.5" },
  sm: { container: "h-12 w-12", logo: "h-8 w-8" },
  md: { container: "h-16 w-16", logo: "h-10 w-10" },
  lg: { container: "h-20 w-20", logo: "h-12 w-12" },
};

const LoadingSpinner = ({ size = "md", className = "" }) => {
  const s = sizes[size] || sizes.md;
  return (
    <div className={`relative inline-flex items-center justify-center ${s.container} ${className}`}>
      <div
        className={`${s.logo} spinner-logo-breathe bg-[#000035] dark:bg-[#D7D7D7]`}
        style={{
          mask: `url(${logoSrc}) no-repeat center`,
          WebkitMask: `url(${logoSrc}) no-repeat center`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
