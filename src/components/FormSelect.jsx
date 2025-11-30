import React from 'react';

const FormSelect = ({ label, name, value, onChange, options }) => {
  return (
    <div>
      <label className="text-sm font-medium block">{label}</label>
      <select
        name={name}
        value={value || ''}
        onChange={onChange}
        className="w-full text-[#727374] h-[50px] px-4 py-3 rounded-xl border border-[#3D3E3E] outline-none focus:border-[#1e255e] text-[13px]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
