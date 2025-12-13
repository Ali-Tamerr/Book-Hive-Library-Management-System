const PrimaryButton = ({ type = "button", onClick, disabled = false, children, className = "" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`w-full py-4 bg-[#0a0f33] max-w-[500px] text-white font-semibold text-lg rounded-[20px] hover:bg-[#192261] transition-colors disabled:opacity-50 cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
