import React from 'react';

const FormInput = ({ label, name, type = 'text', value, onChange, placeholder, required, rows }) => {
  const commonProps = {
    name,
    value: value || '',
    onChange,
    placeholder,
    required,
    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm',
  };

  return (
    <div>
      <label className="text-sm font-medium block">{label}</label>
      {type === 'textarea' ? (
        <textarea {...commonProps} rows={rows || 3} />
      ) : (
        <input type={type} {...commonProps} />
      )}
    </div>
  );
};

export default FormInput;
