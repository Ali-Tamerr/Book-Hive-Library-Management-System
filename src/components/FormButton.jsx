import React from 'react';

const FormButton = ({ type = 'button', onClick, children, isPrimary }) => {
  const baseClasses = 'px-4 py-2 rounded transition-colors  font-semibold';
  const primaryClasses = 'bg-[#0b0b3b] text-white hover:bg-[#1a1a6a]';
  const secondaryClasses = 'bg-gray-300 hover:bg-gray-400';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`}
    >
      {children}
    </button>
  );
};

export default FormButton;
