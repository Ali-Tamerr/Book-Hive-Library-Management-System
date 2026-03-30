import React, { useState } from "react";
import { ChevronUp } from "lucide-react";

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  required,
  variant = "form",
  isDarkMode = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (e) => {
    onChange(e);
    setIsOpen(false);
  };

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const getSelectStyles = () => {
    if (variant === "auth") {
      return isDarkMode
        ? "w-full p-5 rounded-xl border border-solid border-[#D7D7D7] bg-transparent text-[#D7D7D7] outline-none placeholder-[#D7D7D7]  text-lg max-[67.5rem]:text-sm max-[67.5rem]:p-4 pr-12 max-[67.5rem]:pr-10 appearance-none font-['Noto_Sans_Georgian',sans-serif] cursor-pointer"
        : "w-full p-5 rounded-xl border border-solid border-[#000035] text-[#000035] outline-none placeholder-[#000035] text-lg max-[67.5rem]:text-sm max-[67.5rem]:p-4 pr-12 max-[67.5rem]:pr-10 appearance-none font-['Noto_Sans_Georgian',sans-serif] cursor-pointer";
    }
    return "w-full h-[3.125rem] px-4 py-4 rounded-xl border border-[#000035] dark:border-[#D7D7D7]  text-[#000035] dark:text-[#D7D7D7] placeholder-[#000035] dark:placeholder-[#D7D7D7] outline-none  text-[0.8125rem] appearance-none cursor-pointer";
  };

  const getChevronStyles = () => {
    const rotateClass = isOpen ? "rotate-180" : "rotate-0";
    if (variant === "auth") {
      return `absolute right-4 max-[67.5rem]:right-3 text-[#000035] dark:text-[#D7D7D7] top-1/2 -translate-y-1/2 w-5 h-5  pointer-events-none transition-transform duration-200 ${rotateClass}`;
    }
    return `absolute right-3 top-1/2 text-[#000035] dark:text-[#D7D7D7] -translate-y-1/2 w-5 h-5  pointer-events-none  transition-transform duration-200 ${rotateClass}`;
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium">{label}</label>}
      <div className="relative">
        <select
          name={name}
          value={value || ""}
          onChange={handleSelectChange}
          onClick={handleSelectClick}
          onBlur={() => setIsOpen(false)}
          required={required}
          className={getSelectStyles()}
        >
          {placeholder && (
            <option value=""  disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-[#F2F2F2] font-['Noto_Sans_Georgian',sans-serif] text-[#000035] dark:bg-[#121317] dark:text-[#D7D7D7]"
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronUp className={getChevronStyles()} />
      </div>
    </div>
  );
};

export default FormSelect;
