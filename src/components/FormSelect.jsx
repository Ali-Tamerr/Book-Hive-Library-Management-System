import React from 'react';

const FormSelect = ({ label, name, value, onChange, options }) => {
  return (
    <div>
      <label className="text-sm font-medium block">{label}</label>
      <select
        name={name}
        value={value || ''}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
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
