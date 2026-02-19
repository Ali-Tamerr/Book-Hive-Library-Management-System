import React from "react";
import logoUrl from "../assets/logo.svg";

const ColorableLogo = ({ className = "", style = {}, ariaLabel = "BookHive Logo" }) => {
  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={`inline-block ${className}`}
      style={{
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${logoUrl})`,
        maskImage: `url(${logoUrl})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        ...style,
      }}
    />
  );
};

export default ColorableLogo;