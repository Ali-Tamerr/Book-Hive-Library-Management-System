import React from 'react';

const FormInput = ({ label, name, type = 'text', value, onChange, placeholder, required, rows, autocomplete, step }) => {
  const commonProps = {
    name,
    value: value || '',
    onChange,
    placeholder,
    required,
    autoComplete: autocomplete || 'off',
    className: 'w-full p-5 rounded-xl border-1 border-[#3D3E3E] outline-none focus:border-[#1e255e] text-lg max-[1080px]:text-sm max-[1080px]:p-4',
  };

  if (step) {
    commonProps.step = step;
  }

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
