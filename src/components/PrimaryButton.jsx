const PrimaryButton = ({
  type = "button",
  onClick,
  disabled = false,
  children,
  className = "",
  isDarkMode = false,
}) => {
  const baseClasses = isDarkMode
    ? "w-full py-4 bg-white max-w-[500px] text-[#000035] font-semibold text-lg rounded-[20px] hover:bg-gray-200 transition-colors disabled:opacity-50 cursor-pointer font-['Noto_Sans_Georgian',sans-serif]"
    : "w-full py-4 bg-[#000035] max-w-[500px] text-white font-semibold text-lg rounded-[20px] hover:bg-[#192261] transition-colors disabled:opacity-50 cursor-pointer font-['Noto_Sans_Georgian',sans-serif]";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
