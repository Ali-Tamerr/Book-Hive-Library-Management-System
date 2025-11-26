import React from 'react';

const FormSelect = ({ label, name, value, onChange, options }) => {
  return (
    <div>
      <label className="text-sm font-medium block">{label}</label>
      <select
        name={name}
        value={value || ''}
        onChange={onChange}
        className="w-full p-5 rounded-xl border-2 border-[#3D3E3E] outline-none focus:border-[#1e255e] text-lg max-[1080px]:text-sm max-[1080px]:p-4"
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
