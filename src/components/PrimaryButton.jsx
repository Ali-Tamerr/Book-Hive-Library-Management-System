const PrimaryButton = ({
  type = "button",
  onClick,
  disabled = false,
  children,
  className = "",
  isDarkMode = false,
}) => {
  const baseClasses = isDarkMode
    ? "w-full py-4 max-w-[500px] text-[#D7D7D7] border border-[#D7D7D7] font-semibold text-lg rounded-[20px] hover:bg-[#D7D7D7] hover:text-[#121317] transition-colors disabled:opacity-50 cursor-pointer font-['Noto_Sans_Georgian',sans-serif]"
    : "w-full py-4 max-w-[500px] text-[#000035] border border-[#000035] font-semibold text-lg rounded-[20px] hover:bg-[#000035] hover:text-[#F2F2F2]  transition-colors disabled:opacity-50 cursor-pointer font-['Noto_Sans_Georgian',sans-serif]";

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
