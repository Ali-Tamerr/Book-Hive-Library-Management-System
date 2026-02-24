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
      ? "rounded-tr-[80px] rounded-br-[80px]"
      : "rounded-tl-[80px] rounded-bl-[80px]";

  const bgColor = isDarkMode ? "bg-[#E8E8E8]" : "bg-[#000035]";
  const textColor = isDarkMode ? "text-[#121317]" : "text-white";
  const borderColor = isDarkMode ? "border-[#121317]" : "border-white";
  const hoverBg = isDarkMode
    ? "hover:bg-[#121317] hover:text-white"
    : "hover:bg-white hover:text-[#000035]";
  const logoSrc = isDarkMode ? logoDark : logoLight;
  const logoAlt = "BookHive Logo";

  const { className: logoClassName = "", style: logoStyle = {} } = logoProps;

  return (
    <div
      className={`w-1/2 max-[1080px]:hidden ${bgColor} ${textColor} flex flex-col items-center justify-center gap-12 p-16 ${roundedClass} relative ${className}`}
    >
      {backButton && (
        <button
          onClick={backButton.onClick}
          className={`absolute ${backButton.position === "left" ? "left-4 top-4" : "right-4 top-4"} border ${borderColor} ${textColor} ${hoverBg} cursor-pointer rounded-sm px-4 py-1 text-xs font-medium transition-colors`}
        >
          {backButton.text}
        </button>
      )}
      {showLogo && (
        <img
          src={logoSrc}
          alt={logoAlt}
          className={`-mb-10 h-auto w-[220px] ${logoClassName}`}
          style={logoStyle}
        />
      )}
      <h1 className={`-mb-8 text-center text-[73px] ${textColor}`}>
        BookHive
        <br />
        <span className="-mt-6 block font-['Merienda_One',cursive] text-[50px] font-medium">
          Library
        </span>
      </h1>
      <p
        className={`text-xl ${textColor} max-w-100 cursor-default text-center`}
      >
        {message}
      </p>
      <div className="flex w-full max-w-[300px] flex-col gap-4">
        {buttonText && onButtonClick && (
          <button
            onClick={onButtonClick}
            className={`border-2 ${borderColor} ${textColor} w-full rounded-[20px] px-10 py-4 text-lg font-semibold ${hoverBg} cursor-pointer transition-colors`}
          >
            {buttonText}
          </button>
        )}
        {secondButtonText && onSecondButtonClick && (
          <button
            onClick={onSecondButtonClick}
            className={`border-2 ${borderColor} ${textColor} w-full rounded-[20px] px-10 py-4 text-lg font-semibold ${hoverBg} cursor-pointer transition-colors`}
          >
            {secondButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default DarkBgSection;
