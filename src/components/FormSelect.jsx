import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';

const FormSelect = ({ label, name, value, onChange, options, placeholder, required }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (e) => {
    onChange(e);
    setIsOpen(false);
  };

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
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
          className="w-full text-[#727374] h-[50px] px-4 py-3 pr-10 rounded-xl border border-[#3D3E3E] outline-none focus:border-[#1e255e] text-[13px] appearance-none"
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
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#727374] pointer-events-none transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'
            }`}
        />
      </div>
    </div>
  );
};

export default FormSelect;
