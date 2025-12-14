import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';

const FormSelect = ({ label, name, value, onChange, options, placeholder, required, variant = 'form' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (e) => {
    onChange(e);
    setIsOpen(false);
  };

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const selectStyles = {
    form: "w-full text-[#0a0f33] h-[50px] px-4 py-3 pr-10 rounded-xl border border-[#3D3E3E] outline-none focus:border-[#1e255e] text-[13px] appearance-none",
    auth: "w-full p-5 rounded-xl border-2 border-solid border-[#3D3E3E] bg-white outline-none focus:border-[#1e255e] text-lg max-[1080px]:text-sm max-[1080px]:p-4 pr-12 max-[1080px]:pr-10 appearance-none"
  };

  const chevronStyles = {
    form: `absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#727374] pointer-events-none transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`,
    auth: `absolute right-4 max-[1080px]:right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#727374] pointer-events-none transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`
  };

  return (
    <div>
      <label className="text-sm font-medium block">{label}</label>
      <div className="relative">
        <select
          name={name}
          value={value || ''}
          onChange={handleSelectChange}
          onClick={handleSelectClick}
          onBlur={() => setIsOpen(false)}
          required={required}
          className={selectStyles[variant]}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronUp
          className={chevronStyles[variant]}
        />
      </div>
    </div>
  );
};

export default FormSelect;

