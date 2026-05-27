import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const baseClasses = isDarkMode
    ? "w-full p-5 rounded-xl border border-solid border-[#D7D7D7] text-[#D7D7D7] placeholder-[#D7D7D7] bg-transparent outline-none text-lg max-[67.5rem]:text-sm max-[67.5rem]:p-4 font-['Noto_Sans_Georgian',sans-serif] pr-14"
    : "w-full p-5 rounded-xl border border-solid border-[#000035]  text-[#000035] bg-transparent outline-none text-lg max-[67.5rem]:text-sm max-[67.5rem]:p-4 font-['Noto_Sans_Georgian',sans-serif] pr-14";

  const renderInput = () => (
    <input
      type={inputType}
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

  if (isPassword) {
    return (
      <div className="relative w-full">
        {renderInput()}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer transition-opacity hover:opacity-80 ${
            isDarkMode ? "text-[#D7D7D7]" : "text-[#000035]"
          }`}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-6 w-6 max-[67.5rem]:h-5 max-[67.5rem]:w-5" />
          ) : (
            <Eye className="h-6 w-6 max-[67.5rem]:h-5 max-[67.5rem]:w-5" />
          )}
        </button>
      </div>
    );
  }

  return renderInput();
};

export default AuthInput;
