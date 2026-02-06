const PrimaryButton = ({ type = "button", onClick, disabled = false, children, className = "", isDarkMode = false }) => {
    const baseClasses = isDarkMode
        ? "w-full py-4 bg-white max-w-[500px] text-[#121317] font-semibold text-lg rounded-[20px] hover:bg-gray-200 transition-colors disabled:opacity-50 cursor-pointer"
        : "w-full py-4 bg-[#0a0f33] max-w-[500px] text-white font-semibold text-lg rounded-[20px] hover:bg-[#192261] transition-colors disabled:opacity-50 cursor-pointer";

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
