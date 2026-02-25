const AuthInput = ({ type, placeholder, value, onChange, name, required = false, className = "", autoComplete, isDarkMode = false }) => {
    const baseClasses = isDarkMode
        ? "w-full p-5 rounded-xl border border-solid border-gray-500 bg-transparent text-white placeholder-gray-400 outline-none focus:border-white text-lg max-[1080px]:text-sm max-[1080px]:p-4 font-['Noto_Sans_Georgian',sans-serif]"
        : "w-full p-5 rounded-xl border border-solid border-[#3D3E3E] bg-white text-[#0a0f33] outline-none focus:border-[#1e255e] text-lg max-[1080px]:text-sm max-[1080px]:p-4 font-['Noto_Sans_Georgian',sans-serif]";

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            required={required}
            autoComplete={autoComplete || 'off'}
            className={`${baseClasses} ${className}`}
        />
    );
};

export default AuthInput;
