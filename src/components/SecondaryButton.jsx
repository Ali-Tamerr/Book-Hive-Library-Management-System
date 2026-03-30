const SecondaryButton = ({
  type = "button",
  onClick,
  disabled = false,
  children,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`max-w-[31.25rem] cursor-pointer rounded-[1.25rem] border-2 border-white px-10 py-4 text-lg font-semibold text-white transition-colors hover:bg-white hover:text-[#000035] ${className}`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
