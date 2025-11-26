import React from 'react';

const FormInput = ({ label, name, type = 'text', value, onChange, placeholder, required, rows }) => {
  const commonProps = {
    name,
    value: value || '',
    onChange,
    placeholder,
    required,
    className: 'w-full p-5 rounded-xl border-2 border-[#3D3E3E] outline-none focus:border-[#1e255e] text-lg max-[1080px]:text-sm max-[1080px]:p-4',
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
