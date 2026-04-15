const AuthInput = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  required = false,
  className = "",
  autoComplete,
  isDarkMode = false,
}) => {
  const baseClasses = isDarkMode
    ? "w-full p-5 rounded-xl border border-solid border-[#D7D7D7] text-[#D7D7D7] placeholder-[#D7D7D7] bg-transparent outline-none text-lg max-[67.5rem]:text-sm max-[67.5rem]:p-4 font-['Noto_Sans_Georgian',sans-serif]"
    : "w-full p-5 rounded-xl border border-solid border-[#000035]  text-[#000035] bg-transparent outline-none text-lg max-[67.5rem]:text-sm max-[67.5rem]:p-4 font-['Noto_Sans_Georgian',sans-serif]";

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
      autoComplete={autoComplete || "off"}
      className={`${baseClasses} ${className}`}
      style={{
        transition: "background-color 5000s ease-in-out 0s",
        WebkitTextFillColor: isDarkMode ? "#D7D7D7" : "#000035",
      }}
    />
  );
};

export default AuthInput;
