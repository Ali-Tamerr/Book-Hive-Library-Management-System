import logoDark from "../assets/logo.svg";
import logoLight from "../assets/bookhive_icon_only-removebg-preview 2.svg";

const DarkBgSection = ({
  message,
  buttonText,
  onButtonClick,
  secondButtonText,
  onSecondButtonClick,
  position = "left",
  backButton = null,
  isDarkMode = false,
  showLogo = true,
  logoProps = {},
  className = "",
}) => {
  const roundedClass =
    position === "left"
      ? "rounded-tr-[5rem] rounded-br-[5rem]"
      : "rounded-tl-[5rem] rounded-bl-[5rem]";

  const bgColor = isDarkMode ? "bg-[#E8E8E8]" : "bg-[#000035]";
  const textColor = isDarkMode ? "!text-[#121317]" : "!text-[#F2F2F2]";
  const btnTextColor = isDarkMode
    ? "!text-[#121317] hover:!text-[#F2F2F2]"
    : "!text-[#F2F2F2] hover:!text-[#000035]";
  const borderColor = isDarkMode ? "border-[#121317]" : "border-[#F2F2F2]";
  const hoverBg = isDarkMode
    ? "hover:bg-[#121317] "
    : "hover:bg-white ";
  const headingFontClass = "font-['Bebas_Neue',sans-serif]";
  const contentFontClass = "font-['Noto_Sans_Georgian',sans-serif]";
  const logoSrc = isDarkMode ? logoDark : logoLight;
  const logoAlt = "BookHive Logo";

  const { className: logoClassName = "", style: logoStyle = {} } = logoProps;

  return (
    <div
      className={`w-1/2 max-[67.5rem]:hidden ${bgColor} ${textColor} flex flex-col items-center justify-center gap-12 p-16 ${roundedClass} relative ${className}`}
    >
      {backButton && (
        <button
          onClick={backButton.onClick}
          className={`absolute ${backButton.position === "left" ? "left-4 top-4" : "right-4 top-4"} border ${borderColor} ${btnTextColor} ${hoverBg} cursor-pointer rounded-sm px-4 py-1 text-xs font-medium transition-colors`}
        >
          {backButton.text}
        </button>
      )}
      {showLogo && (
        <img
          src={logoSrc}
          alt={logoAlt}
          className={`-mb-10 h-auto w-[13.75rem] ${logoClassName}`}
          style={logoStyle}
        />
      )}
      <h1
        className={`-mb-8 text-center text-[4.5625rem] ${headingFontClass} ${textColor}`}
      >
        BookHive
        <br />
        <span
          className={`-mt-6 block ${headingFontClass} ${textColor} text-[3.125rem] font-medium`}
        >
          Library
        </span>
      </h1>
      <p
        className={`text-2xl ${contentFontClass} ${textColor} max-w-100 cursor-default whitespace-pre-line text-center leading-tight`}
      >
        {message}
      </p>
      <div className="flex w-full max-w-[18.75rem] flex-col gap-4">
        {buttonText && onButtonClick && (
          <button
            onClick={onButtonClick}
            className={`border-2 ${borderColor} ${contentFontClass} ${btnTextColor} w-full rounded-[1.25rem] px-10 py-4 text-lg font-semibold ${hoverBg} cursor-pointer transition-colors`}
          >
            {buttonText}
          </button>
        )}
        {secondButtonText && onSecondButtonClick && (
          <button
            onClick={onSecondButtonClick}
            className={`border-2 ${borderColor} ${contentFontClass} ${btnTextColor} w-full rounded-[1.25rem] px-10 py-4 text-lg font-semibold ${hoverBg} cursor-pointer transition-colors`}
          >
            {secondButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default DarkBgSection;
