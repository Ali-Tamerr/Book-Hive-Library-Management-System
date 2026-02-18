import logoDark from '../assets/logo.svg';
import logoLight from '../Home/assets/bookhive_icon_only-removebg-preview 2.svg';

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
    className = ""
}) => {
    const roundedClass = position === "left"
        ? "rounded-tr-[80px] rounded-br-[80px]"
        : "rounded-tl-[80px] rounded-bl-[80px]";

    const bgColor = isDarkMode ? "bg-[#E8E8E8]" : "bg-[#0a0f33]";
    const textColor = isDarkMode ? "text-[#121317]" : "text-white";
    const borderColor = isDarkMode ? "border-[#121317]" : "border-white";
    const hoverBg = isDarkMode ? "hover:bg-[#121317] hover:text-white" : "hover:bg-white hover:text-[#0a0f33]";
    const logoSrc = isDarkMode ? logoDark : logoLight;
    const logoAlt = "BookHive Logo";

    const { className: logoClassName = "", style: logoStyle = {} } = logoProps;

    return (
        <div className={`w-1/2 max-[1080px]:hidden ${bgColor} ${textColor} flex flex-col items-center justify-center gap-12 p-16 ${roundedClass} relative ${className}`}>
            {backButton && (
                <button
                    onClick={backButton.onClick}
                    className={`absolute ${backButton.position === 'left' ? 'top-4 left-4' : 'top-4 right-4'} border ${borderColor} ${textColor} ${hoverBg} rounded-sm px-4 py-1 text-xs font-medium transition-colors cursor-pointer`}
                >
                    {backButton.text}
                </button>
            )}
            {showLogo && (
                <img
                    src={logoSrc}
                    alt={logoAlt}
                    className={`w-[220px] -mb-10 h-auto ${logoClassName}`}
                    style={logoStyle}
                />
            )}
            <h1 className={`text-[73px] text-center -mb-8 ${textColor}`}>
                BookHive
                <br />
                <span className="block font-['Merienda_One',cursive] text-[50px] -mt-6 font-medium">Library</span>
            </h1>
            <p className={`text-xl ${textColor} max-w-100 text-center cursor-default`}>{message}</p>
            <div className="flex flex-col gap-4 w-full max-w-[300px]">
                {buttonText && onButtonClick && (
                    <button
                        onClick={onButtonClick}
                        className={`border-2 ${borderColor} ${textColor} font-semibold text-lg w-full px-10 py-4 rounded-[20px] ${hoverBg} transition-colors cursor-pointer`}
                    >
                        {buttonText}
                    </button>
                )}
                {secondButtonText && onSecondButtonClick && (
                    <button
                        onClick={onSecondButtonClick}
                        className={`border-2 ${borderColor} ${textColor} font-semibold text-lg w-full px-10 py-4 rounded-[20px] ${hoverBg} transition-colors cursor-pointer`}
                    >
                        {secondButtonText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default DarkBgSection;
