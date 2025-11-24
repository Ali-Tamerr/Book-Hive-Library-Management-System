const AuthInput = ({ type, placeholder, value, onChange, name, required = false, className = "" }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            required={required}
            className={`w-full p-3 rounded-xl border border-[#0a0f33] outline-none focus:border-[#1e255e] text-sm ${className}`}
        />
    );
};

export default AuthInput;
