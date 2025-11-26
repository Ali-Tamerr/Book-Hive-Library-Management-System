const AuthInput = ({ type, placeholder, value, onChange, name, required = false, className = "" }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            required={required}
            className={`w-full p-5 rounded-xl border-2 border-[#3D3E3E] outline-none focus:border-[#1e255e] text-lg max-w-[500px] max-[1080px]:text-sm max-[1080px]:p-4 ${className}`}
        />
    );
};

export default AuthInput;
