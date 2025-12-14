const SecondaryButton = ({ type = "button", onClick, disabled = false, children, className = "" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`border-2 border-white text-white font-semibold text-lg max-w-[500px] px-10 py-4 rounded-[20px] hover:bg-white hover:text-[#0a0f33] transition-colors cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
};

export default SecondaryButton;
