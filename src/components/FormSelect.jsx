import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';

const FormSelect = ({ label, name, value, onChange, options, placeholder, required, variant = 'form', isDarkMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (e) => {
    onChange(e);
    setIsOpen(false);
  };

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const getSelectStyles = () => {
    if (variant === 'auth') {
      return isDarkMode
        ? "w-full p-5 rounded-xl border border-solid border-gray-500 bg-transparent text-white outline-none focus:border-white text-lg max-[1080px]:text-sm max-[1080px]:p-4 pr-12 max-[1080px]:pr-10 appearance-none"
        : "w-full p-5 rounded-xl border border-solid border-[#3D3E3E] bg-white text-[#0a0f33] outline-none focus:border-[#1e255e] text-lg max-[1080px]:text-sm max-[1080px]:p-4 pr-12 max-[1080px]:pr-10 appearance-none";
    }
    return "w-full text-[#727374] h-[50px] px-4 py-3 pr-10 rounded-xl border border-[#3D3E3E] bg-white outline-none focus:border-[#1e255e] text-[13px] appearance-none";
  };

  const getChevronStyles = () => {
    const rotateClass = isOpen ? 'rotate-180' : 'rotate-0';
    const colorClass = isDarkMode ? 'text-gray-400' : 'text-[#727374]';
    if (variant === 'auth') {
      return `absolute right-4 max-[1080px]:right-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colorClass} pointer-events-none transition-transform duration-200 ${rotateClass}`;
    }
    return `absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colorClass} pointer-events-none transition-transform duration-200 ${rotateClass}`;
  };

  return (
    <div className="w-full">
      {label && <label className="text-sm font-medium block">{label}</label>}
      <div className="relative">
        <select
          name={name}
          value={value || ''}
          onChange={handleSelectChange}
          onClick={handleSelectClick}
          onBlur={() => setIsOpen(false)}
          required={required}
          className={getSelectStyles()}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-black bg-white">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronUp
          className={getChevronStyles()}
        />
      </div>
    </div>
  );
};

export default FormSelect;
