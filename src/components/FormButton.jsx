import React from 'react';

const FormButton = ({ type = 'button', onClick, children, isPrimary }) => {
  const baseClasses = 'px-4 py-4 rounded-lg whitespace-nowrap transition-colors min-w-[100px] w-full max-w-[500px] font-semibold cursor-pointer';
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
