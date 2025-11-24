const SecondaryButton = ({ type = "button", onClick, disabled = false, children, className = "" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`border border-white text-white font-semibold w-50 py-2 rounded-[15px] hover:bg-white hover:text-[#0a0f33] transition-colors ${className}`}
        >
            {children}
        </button>
    );
};

export default SecondaryButton;
