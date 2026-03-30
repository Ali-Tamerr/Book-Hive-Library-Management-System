const PrimaryButton = ({
  type = "button",
  onClick,
  disabled = false,
  children,
  className = "",
  isDarkMode = false,
}) => {
  const baseClasses = isDarkMode
    ? "w-full py-4 max-w-[31.25rem] text-[#D7D7D7] border border-[#D7D7D7] font-semibold text-lg rounded-[1.25rem] hover:bg-[#D7D7D7] hover:text-[#121317] disabled:bg-[#D7D7D7] disabled:text-[#121317] disabled:border-[#D7D7D7] disabled:cursor-not-allowed  transition-colors  cursor-pointer font-['Noto_Sans_Georgian',sans-serif]"
    : "w-full py-4 max-w-[31.25rem] text-[#000035] border border-[#000035] font-semibold text-lg rounded-[1.25rem] hover:bg-[#000035] hover:text-[#F2F2F2] disabled:bg-[#000035] disabled:text-[#F2F2F2] disabled:border-[#000035] disabled:cursor-not-allowed  transition-colors  cursor-pointer font-['Noto_Sans_Georgian',sans-serif]";

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
